#!/usr/bin/env bash
# 脚本绝对路径
ROOT_PATH=$(
  cd "$(dirname "$0")" || exit
  pwd
)
images="laradock_nestjs laradock_nextjs"
echo 'stopping old container'

function delImage() {
  number=65 #定义一个退出值
  index=1   #定义一个计数器

  echo "$1" # arguments are accessible through delImage, echo "$1" # arguments are accessible through delImage, ,...,...

  if [ -z "$1" ]; then #对用户输入的参数做判断，如果未输入参数则返回脚本的用法并退出，退出值65
    echo "Usage:$0 + canshu"
    exit $number
  fi

  for arg in "$@"; do
    echo "$arg"
    echo "arg: $index = $arg"
    let index+=1
    docker rmi "$arg"
  done

  index=1 #将计数器重新设置为1
}

function delContainer() {

  old_id=("$(docker ps --filter "name=$name" --filter status=running -q)")
  for id in ${old_id[*]}; do
    echo "$id"

    if test -n "$id"; then
      docker stop "$id"
      docker rm "$id"
      echo "$id"" is stopped."
    else
      echo "container id is empty."
    fi

  done
}


delContainer
delImage $images

echo "end--------"
