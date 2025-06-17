# Etapa de desenvolvimento
FROM node:20-alpine AS dev
LABEL maintainer "Cristian <cristianjobs@outlook.com.br>"
WORKDIR /web
COPY package.json .
RUN npm cache clean --force \
    && npm install --force 
COPY . .

CMD ["npm", "run", "dev"]


# Etapa de produção
FROM node:20-alpine AS builder
WORKDIR /web
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build 

FROM nginx:alpine
COPY --from=builder /web/dist /usr/share/nginx/html
EXPOSE 80
