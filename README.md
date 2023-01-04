# Audio Streaming Web Application
This is a [Nest](https://github.com/nestjs/nest) web API, and is a part of [Audio Streaming](https://github.com/oluaptarso/audio-streaming-nestjs-react-redux).

## Tech
- [Nest](https://github.com/nestjs/nest) (TypeScript).

## Requirements
- Node.js - 16.18.1;
- npm - 8.19.2.

## Getting Started
First, install the dependencies:
```bash
npm install
# or
yarn
```
Then, run the development server:

```bash
# development
npm run start
# or
yarn start

# watch mode
npm run start:dev
# or
yarn start:dev

# production mode
npm run start:prod
# or
yarn start:prod
```
Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Run with docker

First, build the container:
```bash
docker build -t audio-streaming-api .
```

Then, run your container:
```bash
docker run -p 3001:3001 audio-streaming-api
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.