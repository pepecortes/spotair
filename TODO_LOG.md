VALIDATE PHOTO
	photos controller. validate upload: I need photo caption, but it does
	not work (possible cause: the creation of a new photo instance does
	not produce xxx.text -> photo.caption
	
HOW TO DEAL WITH NIL?

WATERMARK FUNCTION (SpotairPict.js)
	needs improvement (i.e. when data is NIL)
	suggestion: make a 'caption' virtual getter in the model

DATABASE MIGRATION
	after the migration, many users will have a username xxx@nomail.com. how to manage this?
	
When using REMOTE: validation takes a long time: add icon for waiting
In validation: why can I select an immat that does not correspond to the avion?
In pictadd, we can try to skip avion if immat is selected from list (instead of free text)
Same thing with the couple galerie-aerodrome
Pictadd profile: nom premon do not appear

http://static.spotair.org
	document
	(doc https://docs.ovh.com/fr/storage/)

https://www.npmjs.com/package/node-ovh-storage
	document in README

local container:
	document in README
	


