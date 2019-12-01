SEARCH
	id:3456 should work as well as id: 3456

PICTADD
	Add "des liens pour vous aider..."
	Could the user update his photo (i.e. remove) before it is validated?
	
ADMIN
	Put a title in each interface so as to know what you are dealing with

ADMIN / AERODROMES
	interface googlemaps pour rentrer les coordonées?

DATABASE CHANGES FOR EXTENDED ADMIN ROLE (SCREENER)
	Change 'isAdmin' field -> 'group'
	
ADMIN.PHOTOGRAPHES.UTILISATEURS DU SITE
	When creating a photographe, the user should be automatic? (note that there is not any email field in photographes...)

PHOTO-DATA-EDIT
	DELETE API call manage all the tasks linked to deletion?
	Think if you can refactor ModifySinglePhoto

BUILD
	Document somewhere how to build the app_client sources in production (install dependencies, launch webpack...)

LOADING ICON
	VALIDATION: When using REMOTE: validation takes a long time: add icon for waiting
	
CAROUSEL - ACCUEIL
	 Why cannot I use the freemode upon initialization: check if there is some bug

DATABASE MIGRATION
	before migration; choose IMG_HEIGHT in .env, because thubnails size depends on it
	after the migration, many users will have a username xxx@nomail.com. how to manage this?
	in galeries, many comments appear as "-": erase them (after migration, or add a SQL to do it automatically upon migration)
	in avions: rows 2 + 3 can be fusion to 1 (the NIL row)
	some text fields have trailing spaces: should be removed
	in appareils: some of the initial ones (id 3, 7) do not make sense
	
http://static.spotair.org
	document
	(doc https://docs.ovh.com/fr/storage/)

https://www.npmjs.com/package/node-ovh-storage
	document in README

local container:
	document in README
	
LATER:
	Reinforce security using expiring JWT tokens (ref: https://www.techynovice.com/setting-up-JWT-token-refresh-mechanism-with-axios/)
	SSL certificates in acme.json: backup and store off-premises
	Should we protect the images object server?
	You might need to backup SPOTAIR BLOCK STORAGE VOLUMEs
	You might need to configure the FAILOVER IP firewall
	


