# Turn Based Tactis

Turn Based Tactics Game


## Preparation
`
- npm install
- copy .env.sample to .env and adjust credentials in .env accordingly.
- npm install -g nodemon
- docker run --name=mongo-devel --publish=27017:27107 --hostname=mongo --restart=on-failure --detach mongo:latest
- docker run --name=redis-devel --publish=6379:6379 --hostname=redis --restart=on-failure --detach redis:latest
`

## Development
`
- npm run dev
- npm run watch
- /frontend npm run watch
`

## Todos

- save/load games on Server (Serialization)
- unit tests
- User/Account Management

## Fixes

- BUG: If login clicked twice because of delay with mongoDB

## License

Copyright Victor Lingenthal
