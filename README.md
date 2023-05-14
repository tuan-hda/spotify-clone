# spotify-clone
## Update
Spotify has updated their UI, so shis clone is quite different from the current version of Spotify Web Player
## Introduction
This is a clone version of Spotify clone using ReactJS, TypeScript, TailwindCSS for frontend, NodeJS for backend (manage and refresh tokens) and take advantage of Spotify Api (https://developer.spotify.com/documentation/web-api) 
Some features:
- Login using Spotify account
- Search for songs, albums, artists, ...
- Play songs, next, previous, seek
- Enable repeat, shuffle, adjust volume
- Like a song (available at search screen only)
## Installation
- First go to this repository and clone it: https://github.com/tuan-hda/spotify-server
- Run `npm install` to install above project
- Then execute `npm start` to start server
- Clone this repository
- Run `yarn install --frozen-lockfile` to install dependencies (Try `yarn install` if it doesn't work)
- Execute `yarn dev` to run this project. For the first time you run it might ask you for password to create a local certificate onto your system (vite-plugin-mkcert package, since we need https protocal to access Spotify Api and Services)
