
#version 140

in vec3 position;
in vec3 normal;
in vec2 texCoord;

out vec2 fragTexCoord;
out vec3 fragNorm;
out vec3 fragPos;

uniform mat4 normalMatrix; // inverse transposed VMmatrix
uniform mat4 PVMmatrix;
uniform mat4 Vmatrix; // View                       --> world to eye coordinates
uniform mat4 Mmatrix; // Model                      --> model to world coordinates



void main()
{

	fragNorm = normalize((normalMatrix * vec4(normal, 0.0)).xyz); // normal in eye coordinates by NormalMatrix
	fragTexCoord = texCoord;
	fragPos = (Vmatrix * Mmatrix * vec4(position, 1)).xyz;

	gl_Position = PVMmatrix * vec4(position, 1); // out:v vertex in clip coordinates

}
