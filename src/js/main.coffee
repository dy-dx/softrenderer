# $ = require 'jquery'
# _ = require 'lodash'

Vec2 = require 'gl-matrix-vec2'
Vec3 = require 'gl-matrix-vec3'
Vec4 = require 'gl-matrix-vec4'
Mat4 = require 'gl-matrix-mat4'
Teapot = require 'teapot'


# http://blogs.msdn.com/b/davrous/archive/2013/06/13/tutorial-series-learning-how-to-write-a-3d-soft-engine-from-scratch-in-c-typescript-or-javascript.aspx

class Camera
  constructor: ->
    @position = Vec3.create()
    @target = Vec3.create()

class Mesh
  constructor: (@name) ->
    @vertices = []
    @faces = []
    @rotation = Vec3.create()
    @position = Vec3.create()


class Device
  constructor: (@canvas) ->
    # Note: the back buffer size is equal to the number of pixels to draw
    # on screen (width*height) * 4 (R,G,B & Alpha values).
    @width = @canvas.width
    @height = @canvas.height
    @context = @canvas.getContext('2d')

  # This function is called to clear the back buffer with a specific color
  clear: ->
    # Clearing with black color by default
    # @context.clearRect(0, 0, @canvas.width, @canvas.height)
    @context.fillStyle = 'black'
    @context.fillRect(0, 0, @canvas.width, @canvas.height)
    # Once cleared with black pixels, we're getting back the associated
    # image data to clear out back buffer
    @backbuffer = @context.getImageData(0, 0, @canvas.width, @canvas.height)

  # Once everything is ready, we can flush the back buffer into
  # the front bufer
  present: ->
    @context.putImageData(@backbuffer, 0, 0)

  putPixel: (x, y, color) ->
    @backbufferdata = @backbuffer.data
    # As we have a 1D array for our back buffer, we need to know the
    # equivalent 1D cell index on the 2D coordinates of the screen
    index = ((x >> 0) + (y >> 0) * @canvas.width) * 4

    # RGBA color space is used by the HTML5 canvas
    @backbufferdata[index + 0] = color.r * 255
    @backbufferdata[index + 1] = color.g * 255
    @backbufferdata[index + 2] = color.b * 255
    @backbufferdata[index + 3] = color.a * 255

  # Project takes some 3D coordinates and transforms them in 2D
  # coordinates using the transformation matrix
  project: (coord, transMat) ->
    point = Vec4.fromValues(coord[0], coord[1], coord[2], 1)
    point = Vec4.transformMat4(Vec4.create(), point, transMat)

    # perspective divide
    w = point[3]
    point[0] /= w
    point[1] /= w

    # The transformed coordinates will be based on a coordinate
    # system starting on the center of the screen. But drawing on
    # screen normally starts from top left. We then need to transform
    # them again to have (0, 0) on top left
    x =  point[0] * @canvas.width  + @canvas.width  / 2.0 >> 0
    y = -point[1] * @canvas.height + @canvas.height / 2.0 >> 0
    return Vec2.fromValues(x, y)

  # drawPoint calls putPixel but does the clipping operation before
  drawPoint: (point) ->
    # Clipping what's visible on screen
    if 0 <= point[0] < @canvas.width && 0 <= point[1] < @canvas.height
      # draw white
      @putPixel point[0], point[1], {r:1, g:1, b:1, a:1}

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

  # The main method of the engine that recomputes each vertex
  # projection on every frame
  render: (camera, meshes) ->
    up = Vec3.fromValues(0, 1, 0)
    viewMatrix = Mat4.lookAt(Mat4.create(), camera.position, camera.target, up)

    projectionMatrix = Mat4.perspective(Mat4.create(), 0.78, @canvas.width / @canvas.height, 0.01, 100.0)

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

      ### Points only ###
      # for vertex in mesh.vertices
      #   @drawPoint @project(vertex, transformMatrix)

      ### Naive line test ###
      # for vertex, i in mesh.vertices[0...-1]
      #   point0 = @project(mesh.vertices[i+0], transformMatrix)
      #   point1 = @project(mesh.vertices[i+1], transformMatrix)
      #   @drawLine(point0, point1)

      for face in mesh.faces
        vertexA = mesh.vertices[face[0]]
        vertexB = mesh.vertices[face[1]]
        vertexC = mesh.vertices[face[2]]
        pixelA = @project(vertexA, transformMatrix)
        pixelB = @project(vertexB, transformMatrix)
        pixelC = @project(vertexC, transformMatrix)
        @drawBLine(pixelA, pixelB)
        @drawBLine(pixelB, pixelC)
        @drawBLine(pixelC, pixelA)


canvas = document.getElementById('front-buffer')
device = new Device(canvas)
camera = new Camera()
meshes = []

cubeMesh = new Mesh("Cube", 8, 12)
cubeMesh.vertices = [
  [ -1,  1,  1 ]
  [  1,  1,  1 ]
  [ -1, -1,  1 ]
  [  1, -1,  1 ]
  [ -1,  1, -1 ]
  [  1,  1, -1 ]
  [  1, -1, -1 ]
  [ -1, -1, -1 ]
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
# meshes.push cubeMesh

mesh = new Mesh('Teapot')
mesh.vertices = Teapot.positions
mesh.faces = Teapot.cells
meshes.push mesh

camera.position = Vec3.fromValues(0, 0, 80)
camera.target = Vec3.fromValues(0, 0, 0)


render = ->
  device.clear()

  # X
  mesh.rotation[0] += 0.01
  # Z
  mesh.rotation[2] += 0.01

  device.render(camera, meshes)
  device.present()


  requestAnimationFrame(render)


render()
