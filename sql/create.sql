create user 'lerna'@'%' identified by 'secret';
-- create user 'lerna'@'%'


grant all on *.* to 'lerna'@'%';


-- 创建数据库
CREATE DATABASE  `blog` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
