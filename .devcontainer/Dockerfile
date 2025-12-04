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

# Install pnpm globally and other packages
RUN npm install -g pnpm@latest tsx@4.6.2 typescript@5.3.3

# Create docker group and non-root user
RUN groupadd docker \
    && useradd --create-home --shell /bin/bash vscode \
    && usermod -aG docker vscode \
    && echo 'vscode ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# Set up pnpm environment
ENV PNPM_HOME="/usr/local/bin"
ENV PATH="$PNPM_HOME:$PATH"

# Create cache directories with proper permissions
RUN mkdir -p /workspaces/.pnpm-store /workspaces/.npm-cache \
    && chown -R vscode:vscode /workspaces

USER vscode

# Set pnpm configurations for the user
RUN pnpm config set store-dir /workspaces/.pnpm-store \
    && pnpm config set cache-dir /workspaces/.npm-cache
