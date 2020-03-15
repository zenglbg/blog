container=${container_name}
image=${blog-srever || f43379b3bb45}
​

docker run -p 9998:9998 --name mynode blog-server:node

# docker run \
#     --rm \
#     -d \
#     -p ${9998}:${9998} \
#     --name $container \
#     $image
