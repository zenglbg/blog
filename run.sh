#!/usr/bin/env bash
# -e filename 如果 filename存在，则为真
# -d filename 如果 filename为目录，则为真
# -f filename 如果 filename为常规文件，则为真
# -L filename 如果 filename为符号链接，则为真
# -r filename 如果 filename可读，则为真
# -w filename 如果 filename可写，则为真
# -x filename 如果 filename可执行，则为真
# -s filename 如果文件长度不为0，则为真
# -h filename 如果文件是软链接，则为真

# 脚本绝对路径
ROOT_PATH=$(
  cd "$(dirname "$0")" || exit
  pwd
)
# docker路径
laradock="${ROOT_PATH}/laradock"

if [ ! -d "$laradock" ]; then
  echo directory exists

  git clone https://github.com/Laradock/laradock.git
  cd "$laradock" && cp env-example .env && cd "$ROOT_PATH" || exit
fi
function run() {
  if [ ! -d "${ROOT_PATH}/packages/${1}/node_modules" ]; then
    cd "${ROOT_PATH}/packages/${1}" || exit
    yarn
    yarn dev
  fi
  cd "${ROOT_PATH}/packages/${1}" || exit
  yarn dev
}

function server() {
  cd "$laradock" || exit
  docker-compose up -d mysql redis
  # docker-compose up -d mysql redis workspace nextjs nestjs
  # docker-compose up -d nginx mysql redis workspace nextjs nestjs
  run "server" &
  # run "admin" &
  # run "client"  
  # run "test"
}

server
