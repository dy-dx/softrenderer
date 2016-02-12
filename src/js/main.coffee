# $ = require 'jquery'
# _ = require 'lodash'

Vec2 = require 'gl-matrix-vec2'
Vec3 = require 'gl-matrix-vec3'
Vec4 = require 'gl-matrix-vec4'
Mat4 = require 'gl-matrix-mat4'
Teapot = require 'teapot'

POINTS = location.search == '?points'
WIREFRAME = location.search == '?wireframe'
SOLID = location.search == '?solid'
AHHHHH = location.search == '?AHHHHH'

# http://blogs.msdn.com/b/davrous/archive/2013/06/13/tutorial-series-learning-how-to-write-a-3d-soft-engine-from-scratch-in-c-typescript-or-javascript.aspx

class Camera
  constructor: ->
    @position = Vec3.create()
    @target = Vec3.create()

class Mesh
  constructor: (@name) ->
    @vertices = []
    @faces = []
    @normals = []
    @rotation = Vec3.create()
    @position = Vec3.create()

  computeNormals: ->
    for face, i in @faces
      v1 = @vertices[face[0]]
      v2 = @vertices[face[1]]
      v3 = @vertices[face[2]]
      cb = Vec3.subtract(Vec3.create(), v3, v2)
      ab = Vec3.subtract(Vec3.create(), v1, v2)

      normal = Vec3.cross(Vec3.create(), cb, ab)
      Vec3.normalize(normal, normal)
      @normals[i] = normal

class Device
  constructor: (@canvas) ->
    # Note: the back buffer size is equal to the number of pixels to draw
    # on screen (width*height) * 4 (R,G,B & Alpha values).
    @width = @canvas.width
    @height = @canvas.height
    @context = @canvas.getContext('2d')
    @depthbuffer = []

  # This function is called to clear the back buffer with a specific color
  clear: ->
    # Clearing with black color by default
    # @context.clearRect(0, 0, @width, @height)
    @context.fillStyle = 'black'
    @context.fillRect(0, 0, @width, @height)
    # Once cleared with black pixels, we're getting back the associated
    # image data to clear out back buffer
    @backbuffer = @context.getImageData(0, 0, @width, @height)
    @depthbuffer[i] = 1000000.0 for i in [0...@width * @height] by 1

  # Once everything is ready, we can flush the back buffer into
  # the front bufer
  present: ->
    @context.putImageData(@backbuffer, 0, 0)

  putPixel: (x, y, z, color) ->
    @backbufferdata = @backbuffer.data
    # As we have a 1D array for our back buffer, we need to know the
    # equivalent 1D cell index on the 2D coordinates of the screen
    index = ((x >> 0) + (y >> 0) * @width)
    index4 = index * 4

    return if @depthbuffer[index] < z
    @depthbuffer[index] = z

    # RGBA color space is used by the HTML5 canvas
    @backbufferdata[index4 + 0] = color[0] * 255
    @backbufferdata[index4 + 1] = color[1] * 255
    @backbufferdata[index4 + 2] = color[2] * 255
    @backbufferdata[index4 + 3] = color[3] * 255

  # Project takes some 3D coordinates and transforms them in 2D
  # coordinates using the transformation matrix
  project: (coord, transMat, worldMat, normal) ->
    point = Vec4.fromValues(coord[0], coord[1], coord[2], 1)
    point = Vec4.transformMat4(Vec4.create(), point, transMat)

    point3DWorld = Vec3.transformMat4(Vec3.create(), coord, worldMat)
    normal3DWorld = Vec3.transformMat4(Vec3.create(), normal, worldMat)

    # perspective divide
    w = point[3]
    point[0] /= w
    point[1] /= w
    point[2] /= w # do we need to do this?

    # The transformed coordinates will be based on a coordinate
    # system starting on the center of the screen. But drawing on
    # screen normally starts from top left. We then need to transform
    # them again to have (0, 0) on top left
    x = ( point[0] * @width  + @width  / 2.0) >> 0
    y = (-point[1] * @height + @height / 2.0) >> 0
    return {
      screen: Vec3.fromValues(x, y, point[2])
      world: point3DWorld
      normal: normal3DWorld
    }

  # drawPoint calls putPixel but does the clipping operation before
  drawPoint: (point, color) ->
    color ||= Vec4.fromValues(1, 1, 1, 1)
    # Clipping what's visible on screen
    if 0 <= point[0] < @width && 0 <= point[1] < @height
      # draw white
      @putPixel point[0], point[1], point[2], color

  drawLine: (p0, p1) ->
    p0p1 = Vec2.subtract(Vec2.create(), p1, p0)
    dist = Vec2.length(p0p1)
    # exit early if the distance between the 2 points is less than 2 pixels
    return if dist < 2

    # find the middle point between p0 & p1
    midPoint = Vec2.scaleAndAdd(Vec2.create(), p0, p0p1, 0.5)
    @drawPoint(midPoint)
    # recursive algorithm launched between p0 & midpoint
    # and between midpoint & p1
    @drawLine(p0, midPoint)
    @drawLine(midPoint, p1)

  # http://en.wikipedia.org/wiki/Bresenham's_line_algorithm
  drawBLine: (p0, p1) ->
    x0 = p0[0] >> 0
    y0 = p0[1] >> 0
    x1 = p1[0] >> 0
    y1 = p1[1] >> 0
    dx = Math.abs(x1 - x0)
    dy = Math.abs(y1 - y0)
    sx = if x0 < x1 then 1 else -1
    sy = if y0 < y1 then 1 else -1
    err = dx - dy
    while true
      @drawPoint(Vec2.fromValues(x0, y0))
      break if x0 == x1 && y0 == y1
      e2 = err * 2
      if e2 > -dy
        err -= dy
        x0 += sx
      if e2 < dx
        err += dx
        y0 += sy

  drawScanLine: (x1, x2, y, z, color) ->
    [x1, x2] = [x2, x1] if x1 > x2

    if AHHHHH
      color[2] = color[2] * Math.cos(y % 10 + tick / 2) + 0.3
      color[1] = color[1] * Math.sin((x1 + x2) / 2 + tick / 8)

      # x1 += Math.tan(Math.floor(y/10 % 2) + tick / 10) * 8
      # x2 += Math.tan(Math.floor(y/10 % 2) + tick / 10) * 8

    for x in [(x1 | 0)..(x2 | 0)] by 1
      @drawPoint(Vec3.fromValues(x, y, z), color)

  # The main method of the engine that recomputes each vertex
  # projection on every frame
  render: (camera, meshes) ->
    up = Vec3.fromValues(0, 1, 0)
    viewMatrix = Mat4.lookAt(Mat4.create(), camera.position, camera.target, up)

    projectionMatrix = Mat4.perspective(Mat4.create(), 0.78, @width / @height, 0.01, 100.0)

    for mesh, index in meshes
      # Rotate & translate
      worldMatrix = Mat4.identity(Mat4.create())
      Mat4.rotateZ(worldMatrix, worldMatrix, mesh.rotation[2])
      Mat4.rotateY(worldMatrix, worldMatrix, mesh.rotation[1])
      Mat4.rotateX(worldMatrix, worldMatrix, mesh.rotation[0])
      Mat4.translate(worldMatrix, worldMatrix, mesh.position)

      # PVM
      transformMatrix = Mat4.create()
      Mat4.multiply(transformMatrix, projectionMatrix, viewMatrix)
      Mat4.multiply(transformMatrix, transformMatrix, worldMatrix)

      ### Naive line test ###
      # for vertex, i in mesh.vertices[0...-1]
      #   point0 = @project(mesh.vertices[i+0], transformMatrix, worldMatrix, Vec3.create())
      #   point1 = @project(mesh.vertices[i+1], transformMatrix, worldMatrix, Vec3.create())
      #   @drawLine(point0, point1)

      ## Points only ###
      if POINTS
        for vertex in mesh.vertices
          @drawPoint(@project(vertex, transformMatrix, worldMatrix, Vec3.create()).screen)
        ### Wireframe, Bresenham's ###
      else if WIREFRAME
        for face, faceIndex in mesh.faces
          vertexA = mesh.vertices[face[0]]
          vertexB = mesh.vertices[face[1]]
          vertexC = mesh.vertices[face[2]]
          normal = mesh.normals[faceIndex]

          projectedA = @project(vertexA, transformMatrix, worldMatrix, normal)
          projectedB = @project(vertexB, transformMatrix, worldMatrix, normal)
          projectedC = @project(vertexC, transformMatrix, worldMatrix, normal)
          @drawBLine(projectedA.screen, projectedB.screen)
          @drawBLine(projectedB.screen, projectedC.screen)
          @drawBLine(projectedC.screen, projectedA.screen)
      else
        for face, faceIndex in mesh.faces
          vertexA = mesh.vertices[face[0]].slice()
          vertexB = mesh.vertices[face[1]].slice()
          vertexC = mesh.vertices[face[2]].slice()
          normal = mesh.normals[faceIndex]

          if AHHHHH
            # displacement
            vertexA[1] = vertexA[1] + Math.sin((vertexA[0]*1.5 + tick)/10) * 3.1
            vertexB[1] = vertexB[1] + Math.sin((vertexB[0]*1.5 + tick)/10) * 3.1
            vertexC[1] = vertexC[1] + Math.sin((vertexC[0]*1.5 + tick)/10) * 3.1


          projectedA = @project(vertexA, transformMatrix, worldMatrix, normal)
          projectedB = @project(vertexB, transformMatrix, worldMatrix, normal)
          projectedC = @project(vertexC, transformMatrix, worldMatrix, normal)

          centerPoint = Vec3.add(Vec3.create(), projectedA.world, projectedB.world)
          Vec3.add(centerPoint, centerPoint, projectedC.world)
          Vec3.scale(centerPoint, centerPoint, 1/3)

          light1 = Vec3.fromValues(-10, 20, 30)
          Vec3.subtract(light1, light1, centerPoint)
          Vec3.normalize(light1, light1)

          grayVal = Math.max(0, Vec3.dot(projectedA.normal, light1))
          if SOLID
            grayVal = 1
          color = Vec4.fromValues(grayVal, grayVal, grayVal, 1)
          @drawTriangle(projectedA.screen, projectedB.screen, projectedC.screen, color)

  _fillBottomFlatTriangle: (v1, v2, v3, color) ->
    invSlope1 = (v2[0] - v1[0]) / (v2[1] - v1[1])
    invSlope2 = (v3[0] - v1[0]) / (v3[1] - v1[1])
    curx1 = v1[0]
    curx2 = v1[0]
    for scanlineY in [ v1[1] .. v2[1] ] by 1
      z = Math.min(v1[2], v2[2], v3[2]) # naive
      @drawScanLine(curx1, curx2, scanlineY, z, color)
      curx1 += invSlope1
      curx2 += invSlope2

  _fillTopFlatTriangle: (v1, v2, v3, color) ->
    invSlope1 = (v3[0] - v1[0]) / (v3[1] - v1[1])
    invSlope2 = (v3[0] - v2[0]) / (v3[1] - v2[1])
    curx1 = v3[0]
    curx2 = v3[0]
    for scanlineY in [ v3[1] .. v1[1] ] by -1
      z = Math.min(v1[2], v2[2], v3[2]) # naive
      @drawScanLine(curx1, curx2, scanlineY, z, color)
      curx1 -= invSlope1
      curx2 -= invSlope2

  # http://www.sunshine2k.de/coding/java/TriangleRasterization/TriangleRasterization.html
  drawTriangle: (v1, v2, v3, color) ->
    # sort vertices by Y ascending (so v1 is topmost point)
    [v1, v2] = [v2, v1] if v1[1] > v2[1]
    [v2, v3] = [v3, v2] if v2[1] > v3[1]
    [v1, v2] = [v2, v1] if v1[1] > v2[1]

    if v1[1] == v2[1]
      @_fillTopFlatTriangle(v1, v2, v3, color)
    else if v2[1] == v3[1]
      @_fillBottomFlatTriangle(v1, v2, v3, color)
    else
     # general case - split triangle into a top-flat and a bottom-flat
     v4 = Vec3.fromValues(v1[0] + ((v2[1] - v1[1]) / (v3[1] - v1[1])) * (v3[0] - v1[0]), v2[1], v2[2])
     v4[0] = v4[0] | 0
     @_fillBottomFlatTriangle(v1, v2, v4, color)
     @_fillTopFlatTriangle(v2, v4, v3, color)


canvas = document.getElementById('front-buffer')
device = new Device(canvas)
camera = new Camera()
meshes = []

cubeMesh = new Mesh("Cube", 8, 12)
cubeMesh.vertices = [
  [ -10,  10,  10 ]
  [  10,  10,  10 ]
  [ -10, -10,  10 ]
  [  10, -10,  10 ]
  [ -10,  10, -10 ]
  [  10,  10, -10 ]
  [  10, -10, -10 ]
  [ -10, -10, -10 ]
]
cubeMesh.faces = [
  [ 0, 1, 2 ]
  [ 1, 2, 3 ]
  [ 1, 3, 6 ]
  [ 1, 5, 6 ]
  [ 0, 1, 4 ]
  [ 1, 4, 5 ]
  [ 2, 3, 7 ]
  [ 3, 6, 7 ]
  [ 0, 2, 7 ]
  [ 0, 4, 7 ]
  [ 4, 5, 6 ]
  [ 4, 6, 7 ]
]
# cubeMesh.computeNormals()
# meshes.push cubeMesh

mesh = new Mesh('Teapot')
mesh.vertices = Teapot.positions
mesh.faces = Teapot.cells
mesh.computeNormals()
meshes.push mesh

camera.position = Vec3.fromValues(0, 0, 80)
camera.target = Vec3.fromValues(0, 0, 0)

# mesh.rotation = [0.3, 0.3, 0.3]

tick = 0

render = ->
  tick += 1
  device.clear()

  # X
  # mesh.rotation[0] += 0.01
  # Y
  mesh.rotation[1] += 0.02
  # Z
  # mesh.rotation[2] += 0.01

  # cubeMesh.rotation[1] += 0.02
  device.render(camera, meshes)
  device.present()


  requestAnimationFrame(render)


render()
