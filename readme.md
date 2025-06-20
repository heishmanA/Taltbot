# Under Construction

## A simple bot with simple commands for Tree Of Savior Discords

## How to install (windows)
- Requires Node.js and Node Package Manager -> https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
- Use the included package.json and package-lock.json or alternatively create your own with $npm init -y (generates default template)
- Install the following dependencies
    - Discord.js - npm i discord.js
    - prettier - npm i prettier
    - tslint - npm i tslint (optional)
    - Note that the only dependency really required is Discord.js, but you will need to modify the start script in package.json
- Make sure to create your own config.json under data/config.json. Follow the configtemplate.json in here.
## How to run
- $npm run build will create a build folder (I use it for debugging)
- $npm run clean will delete the build folder
- $npm run start will clean, build and then run the bot

## Credits
- Most of the base template for this bot was created thanks to SpikeThatMike (https://www.youtube.com/@spikethatmike)