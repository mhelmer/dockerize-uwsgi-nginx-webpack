dockerize-uwsgi-nginx-webpack
=============================

[![Build Status](https://travis-ci.org/mhelmer/dockerize-uwsgi-nginx-webpack.svg?branch=master)](https://travis-ci.org/mhelmer/dockerize-uwsgi-nginx-webpack)

Current stack
-------------

###Backend

The python stack consists of:

- Python 3.5
- Django 1.9
- Django REST framework 3.4
- Django REST Swagger 2.0
- Celery 3.1

`PostgreSQL` is used as the django database.

Celery runs with `RabbitMQ 3.6` as broker and `Django ORM` as result backend. I would appriciate PRs with a good setup for `Celery`.

Cache setup is missing, but will be added.

###Frontend

- Webpack
- Babel
- React
- React Hot Loader
- React Router
- Redux
- Redux Devtools

Will upgrade to `React Hot Loader 3` once it's released.

Usage
-----

If you decide to use this, I would suggest that you keep `django/src` and `react/src` in separate repos or submodules, but that's a matter of preference.

### Develpment

For development, the `docker-compose.override.yml` is provided. It is used to set up overrides suitable for development, such as mounting `{django,react}/src` in their respective containers and loading the dev configs.

```bash
docker-compose  build

# New docker volumes are created with root as owner.
docker-compose run nginx chown -R 1000:1000 /srv/*

docker-compose run django ./bootstrap-dev
docker-compose run react npm install

docker-compose up
```

Browse the frontend on port `8000` and django routes (eg admin, api) on port `8080`.

### Production

To use the production compose file you will need to tell `docker-compose` to use the production compose file:

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml <args>
```

Extract static files for nginx:
```
docker-compose build django
docker-compose run django ./manage.py collectstatic --noinput
mkdir nginx/django
rsync -a --include 'static' django/src/static nginx/django

docker-compose build react
docker-compose run react sleep 1
docker run --name react_static dockerizeuwsginginxwebpack_react:latest sleep
rm -r nginx/react/dist && docker cp react_static:/srv/react/dist nginx/react/dist
docker rm react_static
```



Not that this configuration is not suitable for production since it is not running HTTPS. You could for example use [JrCs/docker-letsencrypt-nginx-proxy-companion](https://github.com/JrCs/docker-letsencrypt-nginx-proxy-companion) with [jwilder/nginx-proxy](https://github.com/jwilder/nginx-proxy) to achieve this.
