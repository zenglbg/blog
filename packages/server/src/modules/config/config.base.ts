import { registerAs } from "@nestjs/config";
import { ConnectionOptions } from "typeorm";

import {
  uploadAudioWhiteList,
  uploadFileWhiteList,
  uploadImageWhiteList,
  uploadVideoWhiteList,
} from './upload.config';


// 后台路由前缀
export const adminPrefix = '/api';

// 应用的 url 前缀
export const appUrl = 'https://xxx.com';

// 静态资源的 url 集合配置，用于前端拼接完整的资源路径
export const staticUrls = {
  default: appUrl,
};
 

export const redisBaseConfig = {
  host: process.env.redisHost || "192.168.43.144",
  port: process.env.redisPort || 6379,
  password: "",
  db: 1,
};



 

// 自定义配置/未提供 .d.ts 文件的拓展配置
export const customizeConfig = {

  admin: {
    name: 'admin',
    password: 'admin',
  },


  // 中间件配置
  // middleware: [],


  // log 配置
  logrotator: {
    maxFileSize: 2 * 1024 * 1024, // 当文件超过 2G 时进行切割
    maxDays: 31, // 日志保留最大天数
  },

 

  // app 应用设置
  myApp: {
    appName: 'lbg', // 应用名称
    debug: false, // 是否本地开发环境
    staticUrls, // 静态状态跟域名
    appUrl, // 应用的 url
    adminPrefix, // 后台路由前缀
    language: 'cn', // 当前语言
    languageType: {
      // 语言列表，配合 language 当前语言来用于后面查询时，可以判断应该输出何种语言的数据
      cn: 0,
      en: 1,
    },

 
    uploadImageWhiteList,
    uploadFileWhiteList,
    uploadVideoWhiteList,
    uploadAudioWhiteList,
    uploadsMaxSizes: {
      image: 1,
      file: 1,
      video: 1,
      audio: 1,
    },
    // 文件上传白名单
    uploadExtWhiteList: [
      ...uploadImageWhiteList,
      ...uploadVideoWhiteList,
      ...uploadFileWhiteList,
      ...uploadAudioWhiteList,
    ],
  },
 
  // 代理
  proxy: true,

  // 上传设置
  multipart: {
    fileSize: '500mb',
    // 添加到 whilelist 中
    fileExtensions: ['.apk'],
    /**
     * @description 因为 egg 的 multipart 配置是在应用启动的时候就加载到 egg-multipart 插件的，并且判断格式的方法也是在这时加载到进程中。
     *              所以如果想要在业务代码里面动态限制上传的文件的话，那么只有两种方式可以做到:
     *              1、利用 fileExtensions ,把所有业务需要上传的文件格式都添加上去，然后在业务代码里面获取文件流的时候，再自行进行判断
     *                 但是这样会有一点浪费，毕竟需要验证两次，并且还需要把所有需要上传的文件格式都硬编码到配置中
     *              2、直接把 whitelist 设置为 true, 即允许所有文件通行，然后再自行在业务代码里面做判断
     */
    // 白名单
    whitelist: () => true,
  },


};

export default registerAs("base", () => customizeConfig);


