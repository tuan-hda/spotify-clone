# spotify-clone
## Head to the site
https://spotify-zen.onrender.com/

This app is in development mode since Spotify won't grant extension access for this personal project. To access above URL you must have premium account and you need direct me your Spotify email address so I can add you to allow authentication list. 
## Update
Spotify has updated their UI, so this clone might be quite different from the current version of Spotify Web Player.
## Introduction
This is a clone version of Spotify clone using ReactJS, TypeScript, TailwindCSS for frontend, NodeJS for backend (manage tokens) and take advantage of Spotify Api (https://developer.spotify.com/documentation/web-api).

Some features:
- Login using Spotify account
- Search for songs, albums, artists, ...
- Play songs, next, previous, seek
- Enable repeat, shuffle, adjust volume
- Like a song (available at search screen only)
- Manage your playlists: including update detail, add/remove songs, delete playlist
## Installation
- First go to this repository and clone it: https://github.com/tuan-hda/spotify-server
- Run `npm install` to install above project
- Then execute `npm start` to start server
- Clone this repository
- Run `yarn install --frozen-lockfile` to install dependencies (Try `yarn install` if it doesn't work)
- Execute `yarn dev` to run this project. For the first time you run it might ask you for password to create a local certificate onto your system (vite-plugin-mkcert package, since we need https protocol to access Spotify Api and Services)
## Technologies
- Frontend: ReactJS, TypeScript, TailwindCSS, Vite, Zustand, swr, ...
- Backend: NodeJS
- Other: Spotify Web Api Node (https://github.com/thelinmichael/spotify-web-api-node)
## Example
![Demo](https://github.com/tuan-hda/spotify-clone/blob/master/assets/img/Screenshot%20from%202023-05-14%2008-48-34.png)
