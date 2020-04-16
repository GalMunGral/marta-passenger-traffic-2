### Install MySQL server (Ubuntu)
```bash
sudo apt install mysql-server
```
### Manually start MySQL server (Ubuntu on WSL)
```bash
sudo /etc/init.d/mysql start
```
### IMPORTANT: Create new MySQL user (inside MySQL shell)
```mysql
create user 'dev'@'localhost' identified by 'pass';
grant all privileges on *.* to 'dev'@'localhost';
flush privileges;
```
