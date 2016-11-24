FROM node:4

RUN npm install --quiet -g webpack

COPY src/package.json /srv/react/

WORKDIR /srv/react
RUN chown -R node:node .
USER node

RUN npm install --quiet
COPY src /srv/react
USER root
RUN chown -R node:node .
USER node

RUN webpack

CMD [ "npm", "start" ]
