cmake_minimum_required(VERSION 3.15)
project(asteroids)

set(CMAKE_CXX_STANDARD 14)

include_directories(.)

add_executable(asteroids
        asteroids.cpp
        data.h
        render_stuff.cpp
        render_stuff.h
        spline.cpp
        spline.h)

add_definitions(-Wno-deprecated)

find_package(DevIL REQUIRED)
find_package(assimp REQUIRED)
find_package(GLUT REQUIRED)
find_package(OpenGL REQUIRED)

include_directories(.
        ${CMAKE_EXTRA_GENERATOR_CXX_SYSTEM_INCLUDE_DIRS}
        ${CMAKE_CURRENT_SOURCE_DIR}/../pgr-framework/include)

target_include_directories(
        ${PROJECT_NAME}
        PUBLIC
        ${CMAKE_CURRENT_SOURCE_DIR}/../pgr-framework/include
        ${OPENGL_INCLUDE_DIR}
        ${GLUT_INCLUDE_DIR}
        ${IL_INCLUDE_DIR}/..
)

target_link_libraries (
        ${PROJECT_NAME}
        PUBLIC
        ${CMAKE_CURRENT_SOURCE_DIR}/../pgr-framework/libpgr.a
        ${assimp_DIR}/../../${ASSIMP_LIBRARIES}
        ${IL_LIBRARIES}
        ${OPENGL_LIBRARIES}
        ${GLUT_LIBRARIES}
)
