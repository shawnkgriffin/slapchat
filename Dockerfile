FROM curlyboy/node-vim-nginx
# Remove the default nginx index.html
RUN rm -rf /var/www/html/index.nginx-debian.html
# Copy the contents of the dist directory over to the nginx web root
COPY /build/ /var/www/html/

#Copy the content of server dir into container
COPY /server/ /usr/express-server

#COPY entrypoint script into root
COPY entrypoint.sh /

# Expose the public http port
EXPOSE 80

# Start server
CMD ["bash", "entrypoint.sh"]
