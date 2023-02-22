FROM ubuntu:latest
EXPOSE 5900
EXPOSE 22
# Install dependencies
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y firefox x11vnc xvfb openssh-server vim sudo xfce4 xfce4-goodies
# Create a new user and add it to sudo
RUN adduser test
RUN echo 'test:test' | chpasswd
RUN usermod -aG sudo test
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

#Node
RUN apt-get update && apt-get install -y \
    software-properties-common \
    npm
RUN npm install -g n && \
    n lts
RUN npm install -g yarn
WORKDIR /usr/local
COPY package.json package.json
#COPY yarn.lock yarn.lock
RUN yarn config delete proxy
RUN npm config rm proxy
RUN npm config rm https-proxy
RUN npm config set registry "http://registry.npmjs.org"
COPY . .
#--network-timeout 1000000
RUN yarn install --network-timeout 1000000
RUN yarn electron-pack
RUN yarn build-installer

#WORKDIR /home/test
USER test
RUN echo "xfce4-terminal &" > ~/.xinitrc
RUN echo "exec startxfce4" >> ~/.xinitrc && chmod +x ~/.xinitrc
CMD ["/usr/bin/x11vnc", "-geometry", "1280x800", "-clip", "1280x800", "-create", "-forever"]
