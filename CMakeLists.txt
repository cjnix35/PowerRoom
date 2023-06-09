cmake_minimum_required(VERSION 3.15)

project(power_room VERSION 1.0
        DESCRIPTION "Simple toggle switch app"
        LANGUAGES CXX)

include(CheckIPOSupported)
include(FetchContent)
include(ExternalProject)
include(FindOpenSSL)

option(SOCKETIO_TLS "Build using TLS version of socketio" OFF)
option(STATIC_OPENSSL "Build using static version of OpenSSL. Requires static version of OpenSSL library placed in PATH." OFF)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

set(BACKEND_PATH "src/backend" CACHE STRING "Path to backend")
set(API_PATH "src/backend/overload" CACHE STRING "Path to overload source code")
set(OVERLOAD_APP_PATH "src/backend/app" CACHE STRING "Path to overload-app backend")
set(DEFAULT_BUILD_TYPE "Release" CACHE STRING "Define default build type")

file(TO_CMAKE_PATH "${PROJECT_BINARY_DIR}/CMakeLists.txt" LOC_PATH)
if(EXISTS "${LOC_PATH}")
    message(FATAL_ERROR "You cannot build in a source directory (or any directory with a CMakeLists.txt file). Please make a build subdirectory. Feel free to remove CMakeCache.txt and CMakeFiles.")
endif()

if (CMAKE_SYSTEM_NAME STREQUAL "Windows")

	find_program(NUGET_EXE NAMES nuget "${CMAKE_BINARY_DIR}/nuget.exe")
	if(NOT NUGET_EXE)
		message("nuget.exe not found.")
		message(FATAL_ERROR "Please install NuGet package manager, after that run CMake again.")
	endif()

	exec_program(${NUGET_EXE}
    	ARGS install "Microsoft.Web.WebView2" -Version 1.0.1549-prerelease -ExcludeVersion -OutputDirectory ${CMAKE_BINARY_DIR}/packages)
	exec_program(${NUGET_EXE}
    	ARGS install "Microsoft.Windows.ImplementationLibrary" -Version 1.0.220914.1 -ExcludeVersion -OutputDirectory ${CMAKE_BINARY_DIR}/packages)
        exec_program(${NUGET_EXE}
        ARGS install "openssl-vc141-native" -Version 3.0.0 -ExcludeVersion -OutputDirectory ${CMAKE_BINARY_DIR}/packages)
endif()	
if (CMAKE_SYSTEM_NAME STREQUAL "Linux")
        find_package(PkgConfig REQUIRED)
        pkg_check_modules(GTK REQUIRED gtk+-3.0 webkit2gtk-4.0)

        include_directories(${GTK_INCLUDE_DIRS})
        link_directories(${GTK_LIBRARY_DIRS})
        add_definitions(${GTK_CFLAGS_OTHER})
endif()

if (UNIX)
        add_compile_options(-Ofast -fno-exceptions)
endif()

if(NOT CMAKE_BUILD_TYPE AND NOT CMAKE_CONFIGURATION_TYPES)
        message(STATUS "Setting build type to '${DEFAULT_BUILD_TYPE}' as none was specified.")
        set(CMAKE_BUILD_TYPE "${DEFAULT_BUILD_TYPE}" CACHE
        STRING "Choose the type of build." FORCE)
        set_property(CACHE CMAKE_BUILD_TYPE PROPERTY STRINGS
        "Debug" "Release" "MinSizeRel" "RelWithDebInfo")
endif()

if (CMAKE_SYSTEM_NAME STREQUAL "Windows")
        if (CMAKE_BUILD_TYPE STREQUAL "Release")
        add_compile_options(/Ot /Ox /Zc:auto /fp:fast /GT /GS- /Oi /GF /utf-8 /D_HAS_EXCEPTIONS=0 /MT /MTd)
        endif()
	add_executable(main WIN32 "$CACHE{OVERLOAD_APP_PATH}/main.cpp")
else()
	add_executable(main "$CACHE{OVERLOAD_APP_PATH}/main.cpp")
endif()

check_ipo_supported(RESULT result)
if(result)
        set_target_properties(main PROPERTIES INTERPROCEDURAL_OPTIMIZATION TRUE)
endif()

include_directories(${BACKEND_PATH})
include_directories(${socketio_client_SOURCE_DIR}/src)
link_directories(${socketio_client_BINARY_DIR})

add_library(overfs "$CACHE{API_PATH}/filesystem/fs.cpp")
add_library(overcpu "$CACHE{API_PATH}/sys/hardware/cpu.cpp")
add_library(overdisplay "$CACHE{API_PATH}/sys/hardware/display.cpp")
add_library(overmem "$CACHE{API_PATH}/sys/hardware/mem.cpp")
add_library(overos "$CACHE{API_PATH}/sys/os/os.cpp")
add_library(overhttp "$CACHE{API_PATH}/net/http.cpp")
add_library(oversocketio "$CACHE{API_PATH}/net/socketio.cpp")
add_library(misc "$CACHE{API_PATH}/misc.cpp")

add_compile_definitions(_WEBSOCKETPP_NO_EXCEPTIONS_ ASIO_NO_EXCEPTIONS)

FetchContent_Declare(
  socketio_client
  GIT_REPOSITORY https://github.com/Bolderaysky/socketio-cpp-no-exceptions.git
  GIT_TAG        master
)

FetchContent_GetProperties(socketio_client)
if(NOT socketio_client_POPULATED)
    FetchContent_Populate(socketio_client)
endif()

add_subdirectory(${socketio_client_SOURCE_DIR} ${socketio_client_BINARY_DIR})

if (CMAKE_SYSTEM_NAME STREQUAL "Windows")
        include_directories(${CMAKE_BINARY_DIR}/packages/Microsoft.Web.WebView2/build/native/include)
        target_link_libraries(main PUBLIC "${CMAKE_BINARY_DIR}/packages/Microsoft.Web.WebView2/build/native/x64/WebView2LoaderStatic.lib")
	target_link_libraries(main PRIVATE "${CMAKE_BINARY_DIR}/packages/Microsoft.Windows.ImplementationLibrary/build/native/Microsoft.Windows.ImplementationLibrary.targets")

        include_directories(${CMAKE_BINARY_DIR}/packages/openssl-vc141-native/build/native/include)
        if(STATIC_OPENSSL)
        target_link_libraries(main PRIVATE "${CMAKE_BINARY_DIR}/packages/openssl-vc141-native/build/native/lib/x64/libssl_static.lib")
        target_link_libraries(main PRIVATE "${CMAKE_BINARY_DIR}/packages/openssl-vc141-native/build/native/lib/x64/libcrypto_static.lib")
        else()
        target_link_libraries(main PRIVATE "${CMAKE_BINARY_DIR}/packages/openssl-vc141-native/build/native/openssl-vc141-native.targets")  
        endif()


endif()

if (CMAKE_SYSTEM_NAME STREQUAL "Darwin")
        include_directories(${OPENSSL_INCLUDE_DIR})
        add_library(overdarwin "$CACHE{API_PATH}/sys/os/darwin.cpp")
        target_link_libraries(main PUBLIC overdarwin)
	set(CMAKE_EXE_LINKER_FLAGS "-framework CoreFoundation -framework WebKit -framework CoreServices -framework CoreGraphics")  
endif()

if (STATIC_OPENSSL)
        set(OPENSSL_USE_STATIC_LIBS TRUE)
endif()
if (UNIX)
        find_package(OpenSSL REQUIRED)
        target_link_libraries(oversocketio PRIVATE OpenSSL::SSL)
endif()

if (SOCKETIO_TLS)
target_link_libraries(oversocketio PUBLIC sioclient_tls)
else()
target_link_libraries(oversocketio PUBLIC sioclient)
endif()

target_link_libraries(main PUBLIC misc overfs overcpu overdisplay overmem overos overhttp oversocketio)

target_compile_features(main PUBLIC cxx_std_17)
set_target_properties(main PROPERTIES CXX_EXTENSIONS OFF)

if (CMAKE_SYSTEM_NAME STREQUAL "Linux")
        target_link_libraries(main PUBLIC ${GTK_LIBRARIES} -lpthread)
endif()

message(STATUS "OpenSSL static linkage: ${STATIC_OPENSSL}")
message(STATUS "Socketio with TLS: ${SOCKETIO_TLS}")
