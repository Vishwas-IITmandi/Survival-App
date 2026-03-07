if(NOT TARGET op-engineering_op-sqlite::op-sqlite)
add_library(op-engineering_op-sqlite::op-sqlite INTERFACE IMPORTED)
set_target_properties(op-engineering_op-sqlite::op-sqlite PROPERTIES
    INTERFACE_INCLUDE_DIRECTORIES "C:/workspace/projects/survival/node_modules/@op-engineering/op-sqlite/android/build/headers/op-sqlite"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

