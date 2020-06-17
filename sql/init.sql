-- 进入MySQL服务器
mysql -h localhost -u root
-- 赋予任何主机访问数据的权限
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION
-- 使修改生效
FLUSH PRIVILEGES
-- 退出MySQL服务器
EXIT