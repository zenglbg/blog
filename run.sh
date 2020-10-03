
cd docker
docker-compose  up -d nginx mysql redis workspace 
cd ..
cd packages/server
yarn dev
