#stage 1
FROM node:18.10 as node
WORKDIR /home/ubuntu/build/workspace/car-app
COPY . .
RUN npm install
RUN npm run build --prod
#stage 2
FROM nginx:alpine
COPY --from=node /home/ubuntu/build/workspace/car-app/dist/demo-app /usr/share/nginx/html
