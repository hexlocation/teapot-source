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
Move the bot.service file to /etc/systemd/system  
Run `systemctl daemon-reload` to reload the systemd daemon  
Then run `systemctl enable --now bot` to enable the bot on boot and start it now.
