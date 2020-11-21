<h1 align="center">💿 what to listen?</h1>

> Get the name of a random album you've listened with your Last.fm account!

This project is possible thanks to the amazing [last.fm](www.last.fm) API and [this](https://github.com/rattletone/lastfm-node-client) great client to consume it from node. This is nothing more than a hobby project to explore some technologies and development methodologies while providing a useful service to people like me, who use this social network and sometimes need a little help to choose what to listen.

## Setup

The service is composed of two components: the client, which is a [svelte](www.svelte.dev) app and the server, which is an [express](express.js) app which acts like an API for the client, handles all communication with the last.fm API and serves the svelte app.

If you want to host it from your computer or a server, you just have to build the svelte app:

```sh
$ npm run client-build
```

and start the server:

```sh
$ npm run server-start
```

The server will be running at the port specified in the `.env` file (`5000` by default).

### Environment variables

Variable | Type | Default | Description
-----------|------|---------|-------------|----
`PORT` | number | 5000 | The port on which the app will be running
`API_KEY` | string | undefined | Last.fm API Key. You can get one [here](https://www.last.fm/api/account/create).


## Contributing

This is my second publicly available open-source project, so I don't have any guidelines for this. Feel free to create issues with bugs you encounter or improvements that you think should be made. Pull requests are welcome and comments about the code that makes up the project are encouraged, I'm making this to learn!

## License

MIT
