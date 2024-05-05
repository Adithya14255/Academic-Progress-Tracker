FROM node:alpine

WORKDIR /frontend

COPY . /frontend

RUN npm cache clean --force

RUN npm install -g npm@latest

RUN npm install -g @angular/cli@latest

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]



