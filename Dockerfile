FROM ubuntu:latest

EXPOSE 5900
EXPOSE 22

# Install dependencies
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y iputils-ping x11vnc xvfb openssh-server git vim sudo xfce4 xfce4-goodies software-properties-common npm zlib1g zlib1g-dev curl libfuse2
RUN add-apt-repository ppa:mozillateam/ppa
RUN apt-get -y install firefox
RUN npm install -g n && n lts
RUN npm install -g yarn

# Create a new user and add it to sudo
RUN adduser test
RUN echo 'test:test' | chpasswd
RUN usermod -aG sudo test
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# Run the sshd server
COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

# Install staq_gui
WORKDIR /home/test
USER test
RUN git clone https://github.com/softwareqinc/staq_gui
WORKDIR /home/test/staq_gui
RUN yarn install --network-timeout 1000000
RUN yarn electron-pack
RUN yarn build-installer

# Start the vnc server
RUN echo "xfce4-terminal &" > ~/.xinitrc
RUN echo "exec startxfce4" >> ~/.xinitrc && chmod +x ~/.xinitrc
CMD ["/usr/bin/x11vnc", "-geometry", "1280x800", "-clip", "1280x800", "-create", "-forever"]
