## Development logbook
***
#### December 2018
I decide to start developing an **API** in **node:11** first. We will see for the frontend later on...

I will use **github** to host the source code

I will use **Docker** to simulate the execution environment. Eventually I will find a **CAAS provider** ("container as a service"), perhaps on **OVH**

Database server will be **mysql** (for the time being will be **version 5.7** to be compatible with present database), with engine **InnoDB** (so as to take advantage of the ForeignKeys constraints) coupled with **adminer** (replacing *phpmyadmin*)

**mysql2** is the node package used as mysql driver. I will use **sequelize** as ORM

I will use **mocha** and **chai** as test facilities in `node`

Use the node modules **JSDoc** (for automatic documentation generation) and **debug** for log messages to the console for debugging
