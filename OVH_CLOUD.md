HOW DID I CREATE THE CLOUD STRUCTURE

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
			
	Create a persistent volume and attach it to the instance

	spotair
		create spotair folder in the persistent volume
		create home in the volume and change spotair home there
		create .env (note: set database password before running docker-compose)
		run docker-compose
		create spotair database (collation: utf8-general-ci)
		
		
	next: how to proxy port 80 to port 3000 (or something like this: check ip firewall)

	next: create webserver. do not forget https

	next: create database spotair

	next: SSL certificate and HTTPS server
	

HOW DO I CONNECT AND RUN THE SERVER IN cloud.spotair.org (WARNING: SETUP IS FOR DEVELOPMENT YET!)

		OVH PUBLIC CLOUD: https://www.ovh.com/manager/public-cloud/?onboarding#/

		STORAGE / INSTANCE BACKUP: create instance
		COMPUTE / INSTANCES: check that the instance is ACTIVATED (it might take 5 minutes)
		NETWORK / FAILOVER IP: modify associated instance (so that you can access DNS cloud.spotair.org)
		STORAGE / BLOCK STORAGE: attach to instance
		ssh spotair@cloud.spotair.org (you might have SSH warning concerning DNS SPOOFING: you can remove the key and reconnect)
		cd docker, then git fetch and pull if needed, then docker-compose down -v, then docker-compuse up --build
		docker-compose exec web bash + npm run watch



