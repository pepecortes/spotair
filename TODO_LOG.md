Explore https://www.npmjs.com/package/vue-picture-swipe
https://www.npmjs.com/package/pkgcloud

Verificar http://static.spotair.org
Verificar http://storage.gra5.cloud.ovh.net/v1/AUTH_204701acb74a4804903a0a7699535282/static/
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
https://www.npmjs.com/package/node-ovh-storage


