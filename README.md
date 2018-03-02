# HTTP_Server

A standard HTTP server with Node.js

## Installing and starting the server

```bash
git clone git@github.com:Maikxx/HTTP_Server.git
cd HTTP_SERVER
npm start
```

If you have done this, you can surf to [localhost:8000](localhost:8000/) and enjoy.

## Features

1. 200 OK and contents if valid HTML files are asked ('index.html' & 'about.html').
2. Image handling.
3. Handle 404 routes.
4. Handle nested request to '/assets' and convert them to '/assets/index.html'.
5. Handle request to '/images', when there is no index.html serve the files.

## Testability

* You can test point 1 by going to routes are accessed correctly, which contain for example an index.html file, like [localhost:8000/](localhost:8000/index.html).
* You can test point 2 by going to, for example, [localhost:8000/images/cat.jpg](localhost:8000/images/cat.jpg).
* You can test point 3 by going to a non existing route, like [localhost:8000/foobar.html](localhost:8000/foobar.html).
* You can test points 4 and 5 by adding and deleting **index.html** files from their corresponding folders (*/assets* and */images*) inside of the public folder.