######### server

# alloy 团队 eslint
npm install --save-dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-config-alloy

# 中间件
yarn add express-rate-limit compression helmet

# mysql
docker run --name lbg-mysql -p 3300:3306/tcp -e MYSQL_ROOT_PASSWORD=123 --rm -d mysql:latest
######### server
