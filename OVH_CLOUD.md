Create a Ubuntu instance
	
Upgrade Ubuntu
	sudo apt update && sudo apt upgrade && sudo apt autoremove

Create user donpepe and add sudo
	adduser donpepe
	usermod -aG sudo donpepe
	
Allow ssh login with password
	 /etc/ssh/sshd_config: PasswordAuthentication yes

Create user spotair (not sudo!) and add to docker group
	sudo gpasswd -a spotair docker
	sudo sercive docker restart
	logout and login to apply changes
	
Create ssh key for spotair
	ssh-keygen -b 4096
	
Install docker && docker-compose
	sudo apt install docker.io
	https://docs.docker.com/compose/install/
	
Add ssh key to github and clone spotair
	do not forget .env
	docker-compose up
	
Configure the instance to use a fixed IP
	Associate FAILOVER IP to the running instance
	Configure instance
		https://community.ovh.com/t/configuration-ip-failover-avec-netplan-ubuntu-17-10/6157/9

spotairApp
	create .env (note: set database password before running docker-compose)
	run docker-compose
	create spotair database (collation: utf8-general-ci)
	
next: how to proxy port 80 to port 3000 (or something like this: check ip firewall)

next: create webserver. do not forget https

next: create database spotair

next: SSL certificate and HTTPS server

