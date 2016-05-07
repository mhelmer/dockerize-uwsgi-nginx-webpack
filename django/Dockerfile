FROM python:3.5

RUN mkdir -p /srv/uwsgi
COPY requirements.txt /srv/uwsgi
RUN pip install --no-cache-dir -r /srv/uwsgi/requirements.txt

# Create django user, will own the Django app
RUN adduser --disabled-login --home /srv/django --group --system django

# Add code
ADD ./src /srv/django

RUN /bin/bash -c "virtualenv /srv/django/.env \
    && source /srv/django/.env/bin/activate \
	&& pip install -r /srv/django/requirements.txt"

RUN chown -R django:django /srv/django

EXPOSE 8000

# Execute start script
CMD ["uwsgi", "/srv/django/uwsgi.ini"]
