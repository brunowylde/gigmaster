# GIG Master

`GIG Master` is a mini app for setlist management. It's for cover bands that wants to generate automatically their setlists in a perfect order, since from the beginning, to the end of the presentation.

## Installation

To install the `GIGMaster`, go inside the `app` folder and run the command:

```bash
npm install
```

Do the same inside the `api` folder
```bash
npm install
```

To use this application, you need to connect with Spotify's API. It's important, because we list and organize the songs using some information like danceability, energy, bpm, and others.

To do this, you need to go to `/api/.env` and insert your credentials.

You get your credentials, you can read the documentation and  follow the instructions here: https://developer.spotify.com/

```bash
CLIENT_ID=put here your client id
CLIENT_SECRETput here your client secret
```

## Usage
To run the application, to `npm run dev` inside the `/app` folder, and `npm run start` inside `/api` folder
