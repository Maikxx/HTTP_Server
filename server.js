const fs = require('fs');
const path = require('path');
const http = require('http');
const serve = require('serve');
const mimeTypesLookup = require('mime-types').lookup;

const server = http.createServer(handleRequest);
const exportDirName = 'public';

const supportedMimeTypes = ['text/html', 'text/css', 'image/jpeg', 'image/png'];

function handleNotFounds (response) {
    fs.readFile(path.join(exportDirName, '/not_found.html'), (error, buffer) => {
        if (error) {
            throw new Error(error);
        }

        response.statusCode = 404;
        response.setHeader('Content-Type', 'text/html');
        response.end(buffer);
    });
}

function decideIfRouteHasIndex(joinedPath, response) {
    fs.lstat(`${joinedPath}/index.html`, (error, stats) => {
        if (joinedPath.includes('/assets')) {
            if (error) {
                handleNotFounds(response);
            } else {
                fs.readFile(`${joinedPath}/index.html`, (error, buffer) => {
                    response.statusCode = 200;
                    response.end(buffer);
                });
            }
        } else if (joinedPath.includes('/images')) {
            if (error) {
                response.statusCode = 200;
                response.end(serve(joinedPath, {
                    local: true,
                    open: joinedPath,
                    clipless: true,
                    port: 8000
                }));
            } else {
                fs.readFile(`${joinedPath}/index.html`, (error, buffer) => {
                    response.statusCode = 200;
                    response.end(buffer);
                });
            }
        }
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
        response.setHeader('Content-Type', type);

        if (error) {
            if (route === '/images') {
                decideIfRouteHasIndex(joinedPath, response);
            } else if (route === '/assets') {
                decideIfRouteHasIndex(joinedPath, response);
            } else {
                handleNotFounds(response);
            }
        } else {
            response.statusCode = 200;
            response.end(buffer);
        }
    });
}

// If the server is listening, print a welcome message to the console.
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
