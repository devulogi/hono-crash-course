FROM node:20-bullseye

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    openjdk-17-jre-headless \
    graphviz \
    build-essential \
    sudo \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /workspaces

# Install global npm packages
RUN npm install -g tsx@4.6.2 typescript@5.3.3

# Create docker group and non-root user
RUN groupadd docker \
    && useradd --create-home --shell /bin/bash vscode \
    && usermod -aG docker vscode \
    && echo 'vscode ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

USER vscode
