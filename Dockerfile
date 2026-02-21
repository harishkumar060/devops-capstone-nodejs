FROM node:18
WORKDIR /app
COPY package*.json ./
# This line is the secret—it installs the monitoring library
RUN npm install prom-client express 
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
