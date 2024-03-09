FROM node:latest as build-stage
WORKDIR /app
# Copy require PNPM files
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm run build

FROM nginx:latest as production-stage
# Replace configuration
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

COPY ./nginx-entrypoint.sh /entrypoint.sh

# Set to non-root users
RUN chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Copy project into serving directory
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 8080

# We use our entrypoint file to perform our environment injection
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]