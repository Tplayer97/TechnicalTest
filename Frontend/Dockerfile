# here I build the angular app
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build --prod

# here I serve the application using nginx
FROM nginx:alpine

COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
# here I expose the port 4200
EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]