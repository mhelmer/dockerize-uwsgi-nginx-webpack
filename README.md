dockerize-uwsgi-nginx-webpack
=============================

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

### Dev compose-file

```bash
docker-compose -f docker-compose.dev.yml build

docker-compose -f docker-compose.dev.yml run django ./bootstrap-dev
docker-compose -f docker-compose.dev.yml run react npm install

docker-compose -f docker-compose.dev.yml up
```

