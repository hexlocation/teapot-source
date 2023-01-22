# Teapot, the cat-centered discord bot.

## Install:

Run `npm i`

## Usage

**Step 1.**  
Put your bot token and Cat API (https://thecatapi.com/) api key in settings.json

**Step 2.**  
Run the command `node index.js`

Enjoy!

## Making the bot run on startup (linux)

To make the bot run on startup, do the following:  
**Step 1.**  
Move the bot.service file to /etc/systemd/system  
(`sudo mv bot.service /etc/systemd/system`)

**Step 2**
Run `sudo systemctl daemon-reload` to reload the systemd daemon

**Step 3**
Run `systemctl enable --now bot` to enable the bot on boot and start it now.
