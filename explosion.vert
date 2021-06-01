#version 140

uniform mat4 PVMmatrix;     // Projection * View * Model --> model to clip coordinates
uniform float time;         // time used for simulation of moving lights (such as sun)

in vec3 position;           // vertex position in world space
in vec2 texCoord;           // incoming texture coordinates

smooth out vec2 texCoord_v; // outgoing vertex texture coordinates
out float time_out;

void main() {


  // vertex position after the projection (gl_Position is predefined output variable)
  gl_Position = PVMmatrix * vec4(position*time, 1);   // size of explosion changes depending on time

  time_out = time;

  // outputs entering the fragment shader
  texCoord_v = texCoord;
}
