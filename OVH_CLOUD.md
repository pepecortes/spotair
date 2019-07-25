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
		(in progress) https://www.howtoforge.com/linux-basics-set-a-static-ip-on-ubuntu
		(check whether or not this is really persistent...)

next: create webserver. do not forget https
next: create database spotair

