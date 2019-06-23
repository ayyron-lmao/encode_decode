FROM ubuntu:18.04
LABEL maintainer="james@example.com"
ENV REFRESHED_AT 2016-06-01

WORKDIR /home/user

RUN apt-get update -yqq; apt-get install -yqq curl
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -yqq nodejs

RUN npm i -g mocha

RUN mkdir -p webapp

EXPOSE 4567

CMD [ "node", "webapp/app.js" ]