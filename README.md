dockerize-uwsgi-nginx-webpack
=============================

Early work in progress

Dev compose-file
----------------

```bash
docker-compose -f docker-compose.dev.yml run django ./bootstrap-dev
docker-compose -f docker-compose.dev.yml run react npm install

docker-compose -f docker-compose.dev.yml up
```
