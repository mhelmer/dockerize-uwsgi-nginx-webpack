FROM node:4

RUN npm install -g webpack

RUN useradd -s /bin/bash --uid 1000 --home-dir /srv/react react
COPY src /srv/react

WORKDIR /srv/react
RUN chown -R react:react .
USER react

RUN npm install

RUN webpack

CMD [ "npm", "start" ]
