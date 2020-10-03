# mysql 用户管理笔记

[mysql 用户管理 1](https://www.hi-linux.com/posts/61905.html)
[mysql 用户管理 2](https://www.yiibai.com/mysql/create-user.html)
[mysql 用户管理 3](https://github.com/Laradock/laradock.git)

## 允许 root 远程连接

- 改表

```
use mysql;
update user set host = '%' where user = 'root';
select host, user from user;
```

- 授权

  ```
  GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root' WITH GRANT OPTION;
  ```

  ```
  GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;

  FLUSH PRIVILEGES;
  ```
