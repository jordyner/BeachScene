#version 140

in float time_out;           // used for simulation of moving lights (such as sun) and to select proper animation frame
uniform mat4 Vmatrix;         // view (camera) transform --> world to eye coordinates
uniform sampler2D texSampler; // sampler for texture access

smooth in vec3 position_v;    // camera space fragment position
smooth in vec2 texCoord_v;    // fragment texture coordinates

out vec4 color_f;             // outgoing fragment color

// there are 5 frames in the row, two rows total
uniform ivec2 pattern = ivec2(5, 2);
// one frame lasts 0.1s
uniform float frameDuration = 0.1f;


vec4 sampleTexture(int frame) {

  // Here is mapping of each position in M*N picture so I dont return whole explosion picture but only one part of the picture.
  // There is 5*2 pictures and I return only 1.
  vec2 offset = vec2(1.0) / vec2(pattern); 
  vec2 texCoordBase = texCoord_v / vec2(pattern); // x part is divided by 5 and y part is divided by 2
  // vec2(frame % pattern.x, (frame / pattern.x)) -> how many rows and colums I should move
  vec2 texCoord = texCoordBase + vec2(frame % pattern.x, (frame / pattern.x)) * offset; 
  return texture(texSampler, texCoord);
}

void main() {
  // frame of the texture to be used for explosion drawing 
  int frame = int(time_out / frameDuration);

  // sample proper frame of the texture to get a fragment color  
  color_f = sampleTexture(frame);
}
