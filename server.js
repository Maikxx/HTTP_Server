const fs = require('fs');
const path = require('path');
const http = require('http');
const mimeTypesLookup = require('mime-types').lookup;

const server = http.createServer(handleRequest);
const exportDirName = 'public';

const supportedMimeTypes = ['text/html', 'text/css', 'image/x-icon', 'image/jpeg', 'image/png'];

function handleNotFounds (routeURL, response) {
    fs.readFile(path.join(exportDirName, '/not_found.html'), (error, buffer) => {
        if (error) {
            throw new Error(error);
        }

        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html');
        response.end(buffer);
    });
}

function handleRequest (request, response) {
    let route = request.url;
    const type = mimeTypesLookup(route);

    if (route === '/') {
        route = '/index.html';
    }

    const joinedPath = path.join(exportDirName, route);

    fs.readFile(joinedPath, (error, buffer) => {
        // If the route url given does not correspond with the supported mime types, give back a access restriction error.
        if (error) {
            handleNotFounds(route, response);
        } else {
            response.statusCode = 200;
            response.setHeader('Content-Type', type);
            response.end(buffer);
        }
    });
}

server.on('listening', () => {
    console.log('Ok. Server is running!');
});

server.listen(8000);

// Events for closing the server.
process.on('uncaughtException', () => {
    server.close();
});

// // Events for closing the server.
process.on('SIGTERM', () => {
    server.close();
});
