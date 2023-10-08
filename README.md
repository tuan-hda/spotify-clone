# spotify-clone
## Head to the site

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
- Like a song
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
## Preview
![Demo](https://github.com/tuan-hda/spotify-clone/blob/master/assets/img/Screenshot%20from%202023-05-14%2008-48-34.png)

![Demo Search](https://github.com/tuan-hda/spotify-clone/assets/93902080/1a29e431-340a-4e69-bbf5-943b6296300b)

![Demo Playlist](https://github.com/tuan-hda/spotify-clone/assets/93902080/01e31f9c-42b0-4bf9-bdc5-5e9f0904a897)
