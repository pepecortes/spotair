#Notes for a new local installation
---

####Install git and clone https://github.com/pepecortes/spotair into your local machine

Checkout the branch you want to work on (avoid master!

####Install docker (linux: docker-ce, v20.10.5) + docker-compose (v1.25)

_(hint: configure docker to run as $USER instead of sudo)_

	sudo usermod -a -G docker $USER
	sudo chown $USER /var/run/docker.sock
	start docker service (sudo service docker start)
	
#### Optional: use Portainer to manage docker
	docker volume create portainer_data
	docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce
	(navigate to http://localhost:9000)
  
####Create .env on the folder root (see example on git repo)

####Link the necessary config files from ./config_files

	Dockerfile
	docker-compose.yml
	traefik.toml
		
#### Launch the containers
	docker-compose up --build

The site and the database cannot yet work:

* 'spotair' database does not exist yet
* there is not any user available

####Navigate to dbadmin.localhost (or the adminer host:port) and create  'spotair' database (collation 'utf8mb4_general_ci')
	  
	(refresh) docker-compose down -v &&	docker-compose up
	
* (Option: you can import a test database (see "test" folder)
* The first items of each model table (id=1) is a "none": you might need to create it
*	Navigate again to dbamin and create a Photographe + an 'admin' User (link to the Photographe just created, group=1, passwordHash unchanged -corresponds to "membres!"-)

	
####Create a local folder for photo storage, with an "uploads", "pictures", "thumbnails" subfolders (see .env)

####Build the client side javascript (see "webpack")
	
	docker-compose exec web bash & npm run watch (this will create the client-side javascript)
	
