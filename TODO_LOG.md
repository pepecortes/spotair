SEARCH.VUE
	Refresh method not completed

PHOTO-DATA-EDIT
	DELETE API call manage all the tasks linked to deletion?
	Think if you can refactor ModifySinglePhoto

BUILD
	Document somewhere how to build the app_client sources in production (install dependencies, launch webpack...)

LOADING ICON
	VALIDATION: When using REMOTE: validation takes a long time: add icon for waiting
	
CAROUSEL - ACCUEIL
	 Why cannot I use the freemode upon initialization: check if there is some bug
	 
VALIDATION
	Could the user update his picture (i.e. remove) before it is validated?

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
	


