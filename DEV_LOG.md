## Development logbook
***
#### December 2018
I decide to start developing an **API** in **node:11** first. We will see for the frontend later on...

I will use **github** to host the source code

I will use **Docker** to simulate the execution environment. Eventually I will find a **CAAS provider** ("container as a service"), perhaps on **OVH**

Database server will be **mysql** (for the time being will be **version 5.7** to be compatible with present database), with engine **InnoDB** (so as to take advantage of the ForeignKeys constraints) coupled with **adminer** (replacing *phpmyadmin*)

**mysql2** is the node package used as mysql driver. I will use **sequelize** as ORM

I will use **mocha** and **chai** as test facilities in `node`

Use the node modules **JSDoc** and **docco** (for automatic documentation generation) and **debug** for log messages to the console for debugging

Client side I use **vuejs** as a framework on the browser and **webpack** as the module bundler (expecting to use it also for other task automation, like environment management or importing 3rd-party libraries

(note on `webpack`: 2 ways of build up the bundle: see package.json ("watch" allows to rebundle each time a file is modified, making it suitable for development)

Also for the client, I use **bootstrap-vue.js** that does not depend on jquery. All this client tools are completely unknown to me so lets go experimental for a while

## Vue.js
For the time being I have decided not to use the vue-cli. I rely on webpack, and we will see later on if we have other needs

I use **bootstrap-vue** for patterns and componentes. I use **vuelidate** for form validation

#### January 2019
The application will manage **sessions** through **express-session**. The sessions are stored on a **redis** server using **connect-reddis**

I use **passport.js** as authentication middleware for `express`. I still do not know which authentication strategy I will use

#### February 2019
I will use **SCSS** for styles. **Airbus B612** as main font

#### March 2019
Notes for a new local installation

	Install git and clone https://github.com/pepecortes/spotair into your local machine
	Checkout the branch you want to work on (avoid master!)
	Install docker (linux: docker-ce, v20.10.5) + docker-compose (v1.25)
	  (hint: configure docker to run as $USER instead of sudo)
	  sudo usermod -a -G docker $USER
	  sudo chown $USER /var/run/docker.sock
		start docker service (sudo service docker start)
		
  ------------------------------------------------------------------------
	  Optional: use Portainer to manage docker
			  docker volume create portainer_data
			  docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce
  ------------------------------------------------------------------------
  
	Create .env on the folder root (see example on git repo)
	Link the necessary config files from ./config_files
		Dockerfile
		docker-compose.yml
		traefik.toml
		
	docker-compose up --build
	The site will not work: 'spotair' database does not exist yet + there is not any user available
		Navigate to dbadmin.localhost (or the adminer host:port) and create  'spotair' database (collation 'utf8mb4_general_ci')
	  Refresh: docker-compose down -v &&	docker-compose up
	  The first items of each model table (id=1) is a "none": you might need to create it
		Navigate again to dbamin and create a Photographe + an 'admin' User (link to the Photographe just created, group=1, passwordHash unchanged -corresponds to "membres!"-)
	docker-compose exec web bash & npm run watch (this will create the client-side javascript)
	Navigate to localhost:3001, then Admin, and create some database entries
	
#### May 2019
Full Text search function
Strategy: create a MYSQL table every 1 hour (for instance) that will link photo ids to text (all related text fields)
Create a FULLTEXT index on the text field
(automatic: MYSQL stored procedure + schedule)

#### June 2019
After several tests of different carousel (sliders) I keep vue-awesome-swiper
Tested: vue-agile, hooper, bootstrap carousel component

#### July 2019
API authorization: all GET calls are public (except 'users' and 'photographes')
All POST, PUT... are restricted (via a JWT token, obtained after login)
CORS (cross-origin resource sharing) is not allowed

#### August 2019
Start deploying on **OVH PUBLIC CLOUD**: Ubuntu instance and then docker + docker-compose installation
Using **TRAEFIK** as a reverse proxy. It will be configured to serve everything over HTTPS using Let's Encrypt
Remove **mocha** and **chai** as test facilities (never used)

Using TRAEFIK and Let's Encrypt to create and manage SSL certificates. Principles
	
https://letsencrypt.org is a certificate authority that provides free X.509 certificates for TLS. It works automatically. Basically, when you apply for a certificate, you need to demonstrate that you have control over the DNS of the domain you are trying to certify. Traefik is capable to automate the task of applying to letsencrypt, but it needs to make API calls to add and remove information to the DNS servers (this demonstrate that you are in control over it for your domain).

OVH documentation is poor.
API calls can be found here: https://api.ovh.com/console/
API calls referring to API applications: /me/api/application
	(i.e:  GET /me/api/application lists all your current applications)

Use https://eu.api.ovh.com/createToken/ to create the following variables: OVH_ENDPOINT, OVH_APPLICATION_KEY, OVH_APPLICATION_SECRET, OVH_CONSUMER_KEY
You need to allow the following API calls:
	POST: /domain/zone/spotair.org/record
	POST: /domain/zone/spotair.org/refresh
	DELETE: /domain/zone/spotair.org/record/*


