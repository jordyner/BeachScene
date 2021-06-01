#version 140

struct Material {
	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
	float shininess;

	bool useTexture;
};

struct Light {
	vec3 ambient; 
	vec3 diffuse; 
	vec3 specular;
	vec3 position; 
	vec3 spotDirection;
	float spotCosCutOff;
	float spotExponent;
	vec3 red;
};

uniform sampler2D texSampler;
uniform Material material;
uniform float time; 
uniform bool fog;


uniform mat4 PVMmatrix; 
uniform mat4 Vmatrix; 
uniform mat4 Mmatrix; 
uniform mat4 normalMatrix; 

smooth in vec2 fragTexCoord;
smooth in vec3 fragNorm;
smooth in vec3 fragPos;
out vec4 fragCol;

Light sun;
Light lamp;
Light lighthouseLightSpecs;
uniform bool dayDirectionalLight;
uniform bool lampLight;

uniform vec3 spotlightPosition;
uniform vec3 spotlightDirection;
uniform bool lighthouseSpotLight;

uniform bool sunAngle;

vec4 directionalLight(Light light, Material material, vec3 vertexPosition, vec3 vertexNormal)
{
	vec3 ret = vec3(0.0f);
    vec3 L = normalize(light.position.xyz); // position = direction to light
    vec3 R = reflect(-L, vertexNormal); // ideal mirror reflection 
    vec3 V = normalize(-vertexPosition);
    ret += material.ambient * light.ambient;
    ret += material.diffuse * light.diffuse * max(0.0f, dot(L, vertexNormal));
    ret += material.specular * light.specular * pow(max(0.0f, dot(R, V)), material.shininess);

    return vec4(ret, 1.0f);
}

vec4 ptLight(Light light, Material material, vec3 vertexPosition, vec3 vertexNormal)
{
	vec3 ret = vec3(0.0f);
	vec3 L = normalize(light.position.xyz - vertexPosition);
	vec3 R = reflect(-L, vertexNormal);
	vec3 V = normalize(-vertexPosition);
	ret += material.ambient + light.ambient;
	ret += material.diffuse + light.diffuse * max(0.0f, dot(vertexNormal, L));
	ret += material.specular + light.specular * pow(max(0.0f, dot(R, V)), material.shininess);
	ret /= 30 * length(light.position.xyz - fragPos);
	return vec4(ret, 1.0);
}

vec4 spotLight(Light light, Material material, vec3 vertexPosition, vec3 vertexNormal)
{
	vec3 ret = vec3(0.0);

	vec3 L = normalize(light.position.xyz - vertexPosition);
	vec3 R = reflect(-L, vertexNormal);
	vec3 V = normalize(-vertexPosition);
	float NdotL = max(0.0, dot(vertexNormal, L));
	float RdotV = max(0.0, dot(R, V));
	float spotCoef = max(0.0, dot(-L, light.spotDirection));

	ret += material.ambient * light.ambient;
	ret += material.diffuse * light.diffuse * NdotL;
	ret += material.specular * light.specular * pow(RdotV, material.shininess);

	if (spotCoef < light.spotCosCutOff)
		ret *= 0.0;
	else
		ret *= pow(spotCoef, light.spotExponent);

	return vec4(ret, 1.0);
}


void setupLights()
{
	float sunAngle = time * 0.1f;
	sun.position = (Vmatrix * vec4(cos(sunAngle), 0.0, sin(sunAngle), 0.0)).xyz;

	float pos = sin(sunAngle);
	if(pos < 0.0){
		sun.ambient = vec3(0);
		sun.diffuse = vec3(0);
		sun.specular = vec3(0);
	} else {
		sun.ambient = vec3(pos);
		sun.diffuse = vec3(pos);
		sun.specular = vec3(pos);
	}
	
	lighthouseLightSpecs.ambient = vec3(0.6f);
	lighthouseLightSpecs.diffuse = vec3(1.0f);
	lighthouseLightSpecs.specular = vec3(1.0f);
	lighthouseLightSpecs.spotCosCutOff = 0.85f;
	lighthouseLightSpecs.spotExponent = 5.0;
	lighthouseLightSpecs.position = (Vmatrix * vec4(spotlightPosition, 1.0)).xyz;
	lighthouseLightSpecs.spotDirection = normalize((Vmatrix * vec4(spotlightDirection, 0.0f))).xyz;

	lamp.ambient = vec3(0.1f);
	lamp.diffuse = vec3(0.2f);
	lamp.specular = vec3(0.1f);
	lamp.position = (Vmatrix * vec4(0.0, -1.8, -0.8, 1.0)).xyz;
}

void createFog()
{
	float fogDistance = abs(fragPos.x) + abs(fragPos.z) + abs(fragPos.y);
		float fogFac = clamp ((1.5f - fogDistance) / (1.5f - 0.0), 0.0, 1.0);
		float fogForm = 1.0f - clamp(fogFac, 0.0f, 1.0f);

		vec4 fogColor = vec4(0.4f, 0.5, 0.65f, 1.0f);

		fragCol = mix(fragCol, fogColor, fogForm);
}
void main()
{

	setupLights();

	vec3 normal = normalize(fragNorm);
	vec4 outputColor = vec4(material.ambient * vec3(0.25f), 0.0f);
	fragCol = outputColor;
	
	
	if (dayDirectionalLight){
		outputColor += directionalLight(sun, material, fragPos, normal);
	}
	if(lampLight){
		outputColor += ptLight(lamp, material, fragPos, normal)*10;
	}
	if(lighthouseSpotLight){
		outputColor += spotLight(lighthouseLightSpecs, material, fragPos, normal);
	}
	
	// Enable to use textures
	if (material.useTexture){
		fragCol = outputColor * texture(texSampler, fragTexCoord);
	}

	// FOG SETUP
	if (fog) {
		createFog();
	}


}
