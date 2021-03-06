### STAGE 1: Build ### FROM  node  AS  buil... by Bhavya jain

### STAGE 1: Build ###
FROM node AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
### STAGE 2: Run ###
FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/booksweb-client /usr/share/nginx/html
EXPOSE 80
