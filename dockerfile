FROM node:18.17.1-buster-slim

# Installing dependencies needed for Puppeteer and Chromium
RUN apt-get update && apt-get install -y \
    wget unzip fontconfig locales gconf-service libgbm-dev libasound2 libatk1.0-0 libc6 libcairo2 libcups2 \
    libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 \
    libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
    libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
    ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils chromium --no-install-recommends \
    && apt-get clean \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/*

# Setting Puppeteer env to use system installed Chrome, rather than downloading its own.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

WORKDIR /app

COPY package.json .
RUN npm install

# Note: If you switch to puppeteer-core in package.json, you'd want to set the executable path for Chrome:
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

COPY . .
EXPOSE 3000

CMD ["npm", "start"]
