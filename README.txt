Task 1 (done with the teacher)
------
* blender export plugin - export of models from blender into C style arrays
* loader for single mesh geometry -> assimp library -> 
  function loadSingleMesh() in file render_stuff.cpp 
* quick review of the Phong illumination model
* normal vectors
* glsl functions - reflect, normalize, dot, cross, pow, min, max


Task 2 [1 point]      >>> TASK 3_2-Y <<<
----------------
description: Implement PHONG illumination model for the DIRECTIONAL LIGHTs 
(e.g., the Sun). Lighting has to be calculated on PER-VERTEX basis in camera
space, i.e., lighting is calculated for each vertex, and the computed color
is interpolated across the surface of the graphical primitive to get colors 
of fragments (per vertex lighting).

Subtasks:

>>> TASK 3_2-1 <<< 
* append lines into function directionalLight() located in vertex shader 
  lightingPerVertex.vert to:
  - compute ambient, diffuse, and specular component of the Phong illumination
    model (see lectures slides for details and equations), sum them together 
	and store the result as a return value to the ret variable 
  - use the Material and Light structures to obtain surface and light 
    properties
  - the vertexPosition and vertexNormal variables contain transformed surface 
    position and normal
  - for directional lights, light.position contains the direction
  - everything is expressed in the view coordinate system -> eye/camera is at
    the origin

>>> TASK 3_2-2 <<< 
* change position of the Sun according to the current time to make it rotate
  in XZ plane in world coordinates (i.e. use goniometric functions -> circle)
  - append your code into the function setupLights() in vertex shader 
    lightingPerVertex.vert


Task 3 [1 point]      >>> TASK 3_3-Y <<< 
----------------
decription: Implement Phong illumination model for the SPOTLIGHTs (e.g. the
camera headlight). Lighting has to be calculated on PER-VERTEX basis.

Subtasks:

* change position and direction of the reflector (spotlight) to be the same as
  spaceship's position and orientation in world coordinates:
  - use vertex shader uniforms named spaceShipReflector.position and
    spaceShipReflector.spotDirection
  - set correct position and direction of the reflector for the shaders
    (through mentioned uniforms)
	=> function drawWindowContents() in file asteroids.cpp  >>> TASK 3_3-2 <<<
  - append lines to setupLights() function in vertex shader 
    lightingPerVertex.vert to fill in correct position and spotDirection
	entries in the spaceShipReflector structure according to the values of 
	passed unifoms reflectorPosition and reflectorDirection (keep in mind that
	uniforms' values are defined in world space while the lighting evaluation
	is done in camera space)       >>> TASK 3_3-3 <<< 

>>> TASK 3_3-1 <<<
* append lines into function spotLight() located in vertex shader 
  lightingPerVertex.vert
  - for spotlights, light.position contains the light's position within the 
    scene
  - in comparison to the previous task, now you have to take into account 
    additional light parameters - spotlight direction, spot exponent, and 
	spot cutoff


Task 4 - bonus [1 point]
------------------------
description: Implement the Phong illumination model for the directional light
and spotlight that have to be evaluated on PER-PIXEL basis.

Subtasks:

* lighting has to be evaluated for each fragment separately in the fragment
  shader (per-fragment lighting)
* normals have to be converted to the camera space and then passed from the
  vertex shader into fragment shader and interpolated
* shaders should be stored into lightingPerFragment.vert and 
  lightingPerFragment.frag files
* equations are the same as in the previous task except for the evaluation on 
  per-pixel basis (done through normal vector interpolation)


Notes:
------

* !!! lighting is evaluated in camera coordinates i.e. in camera space !!!

* parts of the source code that should be modified to fulfill the tasks are
  marked by the following sequence of comments where X indicates the task
  number and Y the subtask number:

    // ======== BEGIN OF SOLUTION - TASK 3_X-Y ======== //
    ...
    // ========  END OF SOLUTION - TASK 3_X-Y  ======== //




What files do you have to edit:
TASK 3_2:
 -> lightingPerVertex.vert: 78, 103
TASK 3_3:
 -> asteroids.cpp: 301
 -> lightingPerVertex.vert: 56, 119
