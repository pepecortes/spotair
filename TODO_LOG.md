ONE STEP BEYOND AUTHENTICATION
	The problem to solve is how to protect CRUD routes involving database update while keeping GET routes public
	Other approach is to protect the whole API with JWT token, but how public users will use this? (and what is the sense of transmitting the token to public users?)

SMARTPHONE
	"Server error: no response" when accessing by smartphone
		several problems together:
			- passport.config.js, api strategy only allows localhost or JWT token
			- problem: axios.defaults.baseURL = process.env.API_URL (localhost?)
			- you will have a similar problem with .env (everywhere where you have localhost)

PICTADD
	"TypeError: undefined is not a function" when uploading form

DATABASE MIGRATION
	after the migration, many users will have a username xxx@nomail.com. how to manage this?
	in galeries, many comments appear as "-": erase them (after migration, or add a SQL to do it automatically upon migration)
	in avions: rows 2 + 3 can be fusion to 1 (the NIL row)
	some text fields have trailing spaces: should be removed
	in appareils: some of the initial ones (id 3, 7) do not make sense
	
VALIDATION
	When using REMOTE: validation takes a long time: add icon for waiting

http://static.spotair.org
	document
	(doc https://docs.ovh.com/fr/storage/)

https://www.npmjs.com/package/node-ovh-storage
	document in README

local container:
	document in README
	
WHEN IN PROD:
	Monitor size of javascript sources: can be compressed
	


