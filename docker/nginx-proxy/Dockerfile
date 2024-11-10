FROM nginxproxy/nginx-proxy:alpine

ARG BASIC_AUTH=false
ARG BASIC_AUTH_USERNAME=project-b
ARG BASIC_AUTH_PASSWORD=secret
ARG BASIC_AUTH_HOST=project-b.local
ARG BASIC_AUTH_HOST2=app.project-b.local

RUN if [ ${BASIC_AUTH} = true ]; then set -ex; \
    mkdir -p "/etc/nginx/htpasswd"; \
    echo -n "$BASIC_AUTH_USERNAME:" >> "/etc/nginx/htpasswd/$BASIC_AUTH_HOST"; \
    echo "$BASIC_AUTH_PASSWORD" | openssl passwd -apr1 -stdin >> "/etc/nginx/htpasswd/$BASIC_AUTH_HOST"; \
    echo -n "$BASIC_AUTH_USERNAME:" >> "/etc/nginx/htpasswd/$BASIC_AUTH_HOST2"; \
    echo "$BASIC_AUTH_PASSWORD" | openssl passwd -apr1 -stdin >> "/etc/nginx/htpasswd/$BASIC_AUTH_HOST2"; \
fi
