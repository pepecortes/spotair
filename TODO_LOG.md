Explore https://www.npmjs.com/package/vue-picture-swipe
https://www.npmjs.com/package/pkgcloud

Verificar http://static.spotair.org
(doc https://docs.ovh.com/fr/storage/)

rclone install: curl https://rclone.org/install.sh | sudo bash

config rclone: home/.config/rclone/rclone.conf
[remote]
type = swift
env_auth = false
user = sJm6rkJbMD8h
key = MJytnwmVM5aENpku2YTwXGQWwhnvqcpM
auth = https://auth.cloud.ovh.net/v3/
tenant = 6263100080167097
tenant_domain = default
region = GRA5
auth_version = 3
endpoint_type = public
storage_policy = pcs
domain = default

test rclone: rclone lsd remote:

https://hub.docker.com/r/morrisjobke/docker-swift-onlyon
https://www.npmjs.com/package/node-ovh-storage
https://www.npmjs.com/package/openstack-swift-client

local container: 
	docker-swift-only as container server
	openstack-swift-client as npm client (see test.js)
	rclone to sync server content and be able to serve it by express
	
finish local setting and try remote settings
why the dev_* folders change their owner when starting the container?

file uploads:
	https://scotch.io/tutorials/how-to-handle-file-uploads-in-vue-2
	https://flaviocopes.com/express-forms-files/
	https://www.npmjs.com/package/express-formidable
	
Ensure that the adequate container exists in the localStorage: otherwise the upload will fail


