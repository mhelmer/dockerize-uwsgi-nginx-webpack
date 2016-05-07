FROM node:4


RUN npm install -g webpack

RUN adduser --disabled-login --home /srv/react --group --system react
WORKDIR /srv/react
COPY src/package.json .
RUN npm install

COPY src /srv/react
RUN chown -R react:react .

USER react
RUN webpack

CMD [ "npm", "start" ]
