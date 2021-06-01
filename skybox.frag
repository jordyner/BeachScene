#version 140

uniform samplerCube skyboxSampler;
in vec3 fragTexCoord;
out vec4 color_f;
uniform float intensity;
void main() {
    color_f = texture(skyboxSampler, fragTexCoord) * intensity;
}