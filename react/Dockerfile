FROM node:4

RUN npm install -g webpack

RUN useradd -s /bin/bash --uid 1000 --home-dir /srv/react react
COPY src/package.json /srv/react/

WORKDIR /srv/react
RUN chown -R react:react .
USER react

RUN npm install
COPY src /srv/react
USER root
RUN chown -R react:react .
USER react

RUN webpack

CMD [ "npm", "start" ]
