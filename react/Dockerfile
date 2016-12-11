FROM node:4

COPY src/package.json /srv/react/

WORKDIR /srv/react
RUN chown -R node:node .
USER node

RUN npm install --quiet
COPY src /srv/react
USER root
RUN chown -R node:node .
USER node

ARG NODE_ENV=production
RUN npm run build -- --config webpack.config.prod.js

CMD [ "npm", "start" ]
