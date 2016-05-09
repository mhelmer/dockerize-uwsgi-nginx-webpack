dockerize-uwsgi-nginx-webpack
=============================

Early work in progress

Dev compose-file
----------------

```bash
docker-compose -f docker-compose.dev.yaml run django pip install -r requirements.txt
docker-compose -f docker-compose.dev.yaml run django ./manage.py migrate
docker-compose -f docker-compose.dev.yaml run django ./manage.py collectstatic

docker-compose -f docker-compose.dev.yaml run react npm install

docker-compose -f docker-compose.dev.yaml up
```
