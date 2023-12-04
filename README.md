# Turn Based Tactis

Turn Based Tactics Game


## Preparation
```
- npm install
- copy .env.sample to .env and adjust credentials in .env accordingly OR just copy .env.local-sample to .env
- npm install -g nodemon
- docker run --name=mongo-devel --publish=27017:27017 --hostname=mongo --restart=on-failure --detach mongo:latest
- docker run --name=redis-devel --publish=6379:6379 --hostname=redis --restart=on-failure --detach redis:latest
```

## Quick start
```
- node server.js
- open http://localhost:4444
```

## Development
```
- npm run dev
- npm run watch
- /frontend npm run watch
```

## Todos

- save/load games on Server (Serialization)
- unit tests
- User/Account Management

## Fixes/Bugs

- None that I know of currently :D

## License

Copyright Victor Lingenthal
