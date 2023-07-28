# Stage 1
FROM node:18.10 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/car-crud-app /usr/share/nginx/html
