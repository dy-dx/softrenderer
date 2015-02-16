$ = require 'jquery'
_ = require 'lodash'

BabylonMath = require 'babylon-math'
Vector2 = BabylonMath.Vector2
Vector3 = BabylonMath.Vector3
Color4 = BabylonMath.Color4
Matrix = BabylonMath.Matrix


# http://blogs.msdn.com/b/davrous/archive/2013/06/13/tutorial-series-learning-how-to-write-a-3d-soft-engine-from-scratch-in-c-typescript-or-javascript.aspx

# $(document.body).append 'Hello, World!'


class Camera
  constructor: ->
    @position = Vector3.Zero()
    @target = Vector3.Zero()

class Mesh
  constructor: (@name) ->
    @vertices = []
    @rotation = Vector3.Zero()
    @position = Vector3.Zero()


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
    point = Vector3.TransformCoordinates(coord, transMat)
    # The transformed coordinates will be based on a coordinate
    # system starting on the center of the screen. But drawing on
    # screen normally starts from top left. We then need to transform
    # them again to have (0, 0) on top left
    x =  point.x * @canvas.width  + @canvas.width  / 2.0 >> 0
    y = -point.y * @canvas.height + @canvas.height / 2.0 >> 0
    return new Vector2(x, y)

  # drawPoint calls putPixel but does the clipping operation before
  drawPoint: (point) ->
    # Clipping what's visible on screen
    if 0 <= point.x < @canvas.width && 0 <= point.y < @canvas.height
      # draw yellow
      @putPixel point.x, point.y, new Color4(1, 1, 0, 1)


  # The main method of the engine that recomputes each vertex
  # projection on every frame
  render: (camera, meshes) ->
    viewMatrix = Matrix.LookAtLH(camera.position, camera.target, Vector3.Up())
    projectionMatrix = Matrix.PerspectiveFovLH(0.78, @canvas.width / @canvas.height, 0.01, 10.0)

    for mesh, index in meshes
      worldMatrix = Matrix.RotationYawPitchRoll(mesh.rotation.y, mesh.rotation.x, mesh.rotation.z)
        .multiply(Matrix.Translation(mesh.position.x, mesh.position.y, mesh.position.z))

      transformMatrix = worldMatrix.multiply(viewMatrix).multiply(projectionMatrix)

      for vertex in mesh.vertices
        @drawPoint @project(vertex, transformMatrix)



canvas = document.getElementById('front-buffer')
device = new Device(canvas)
camera = new Camera()
meshes = []

mesh = new Mesh("Cube", 8)
mesh.vertices = [
  new Vector3(-1,  1,  1)
  new Vector3( 1,  1,  1)
  new Vector3(-1, -1,  1)
  new Vector3(-1, -1, -1)
  new Vector3(-1,  1, -1)
  new Vector3( 1,  1, -1)
  new Vector3( 1, -1,  1)
  new Vector3( 1, -1, -1)
]
meshes.push mesh

camera.position = new Vector3(0, 0, 20)
camera.target = new Vector3(0, 0, 0)


render = ->
  device.clear()

  mesh.rotation.x += 0.01
  mesh.rotation.z += 0.01

  device.render(camera, meshes)
  device.present()


  requestAnimationFrame(render)


render()
