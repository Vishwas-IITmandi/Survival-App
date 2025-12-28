if(NOT TARGET hermes-engine::hermesvm)
add_library(hermes-engine::hermesvm SHARED IMPORTED)
set_target_properties(hermes-engine::hermesvm PROPERTIES
    IMPORTED_LOCATION "C:/Users/Vishwas/.gradle/caches/9.0.0/transforms/9dca2d7b2a7e29146c09bb2469a9eaf8/transformed/hermes-android-0.14.0-release/prefab/modules/hermesvm/libs/android.arm64-v8a/libhermesvm.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/Vishwas/.gradle/caches/9.0.0/transforms/9dca2d7b2a7e29146c09bb2469a9eaf8/transformed/hermes-android-0.14.0-release/prefab/modules/hermesvm/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

