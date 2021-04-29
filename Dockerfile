# ------------- COMPILE STAGE ---------------
FROM node:14 AS build

RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run compile

# -------------- BUILD STAGE -----------------
FROM node:14-alpine

RUN mkdir -p /app
WORKDIR /app
COPY --from=build /app /app

EXPOSE 8080
CMD [ "yarn", "prod" ]
