# HTTP_Server

A standard HTTP server with Node.js

## Installing and starting the server

```bash
git clone git@github.com:Maikxx/HTTP_Server.git
cd HTTP_SERVER
npm start
```

## Features

* 200 OK and contents if valid HTML files are asked ('index.html' & 'about.html').
* Image handling.
* Handle 404 routes.
* Handle nested request to '/assets' and convert them to '/assets/index.html'.
* Handle request to '/images', when there is no index.html serve the files.