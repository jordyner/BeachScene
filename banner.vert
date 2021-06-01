#version 140

uniform mat4 PVMmatrix;     // Projection * View * Model --> model to clip coordinates
uniform float time;         // used for simulation of moving lights (such as sun)

in vec3 position;           // vertex position in world space
in vec2 texCoord;           // incoming texture coordinates

float speedOfBanner;

smooth out vec2 coord_v; // outgoing texture coordinates

float decay = 0.5;

void main() {

  // vertex position after the projection (gl_Position is predefined output variable)
  gl_Position = PVMmatrix * vec4(position, 1.0f);   // outgoing vertex in clip coordinates
  speedOfBanner = 2.3f;

  float localTime = time * decay;

  vec2 offset = vec2((floor(time) - time) * speedOfBanner + 0.05, 1.0);

  // outputs entering the fragment shader
  coord_v = texCoord + offset;
}
