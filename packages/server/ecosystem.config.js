module.exports = {
  apps: [{
    name: 'server',
    script: 'dist/main.js',
    cwd: './',
    ignore_watch: [  // 从监控目录中排除
      "node_modules",
      "logs",
      "public"
    ],
    error_file: "./logs/app-err.log",  // 错误日志路径
    out_file: "./logs/app-out.log",  // 普通日志路径
    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: '',
    instances: 1,
    startup: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {  // 环境参数，当前指定为生产环境
      NODE_ENV: 'production'
      // NODE_ENV: 'development'
    }
  }],

  // deploy: {
  //   production: {
  //     user: 'SSH_USERNAME',
  //     host: 'SSH_HOSTMACHINE',
  //     ref: 'origin/master',
  //     repo: 'GIT_REPOSITORY',
  //     path: 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': ''
  //   }
  // }
}
