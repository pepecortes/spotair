EXPOGALERIE
	If not a single component (with Search.vue) then inspire to remove deepclone
	There is something wrong with the use of the button to ask for more photos in galerie (search Maxime)

LOADING ICON
	Is implemented in index.js & Search.vue: extend
	VALIDATION: When using REMOTE: validation takes a long time: add icon for waiting
	
CAROUSEL - ACCUEIL
	 Why cannot I use the freemode upon initialization: check if there is some bug

DATABASE MIGRATION
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
	
WHEN IN PROD:
	Monitor size of javascript sources: can be compressed
	
LATER:
	Reinforce security using expiring JWT tokens (ref: https://www.techynovice.com/setting-up-JWT-token-refresh-mechanism-with-axios/)
	


