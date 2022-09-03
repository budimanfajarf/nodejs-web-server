const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json'); // Example standard property on header response
    response.setHeader('X-Powered-By', 'NodeJS'); // Example NOT standard property on header response, recommend to add "X" before the property name, example: X-Custom-Property
    response.statusCode = 200;

    const { method, url } = request;

    if (url === '/') {
        if (method === 'GET') {
            response.statusCode = 200;
            return response.end(JSON.stringify({
                message: 'Ini adalah homepage',
            }));
        }

        response.statusCode = 400;
        return response.end(JSON.stringify({
            message: `Halaman tidak dapat diakses dengan ${method} request`,
        }));
    }

    if (url === '/about') {
        if (method === 'GET') {
            response.statusCode = 200;
            return response.end(JSON.stringify({
                message: 'Halo! Ini adalah halaman about',
            }));
        }

        if (method === 'POST') {
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.statusCode = 200;
                response.end(JSON.stringify({
                    message: `Halo, ${name}! Ini adalah halaman about`,
                }));
            });

            return;
        }

        response.statusCode = 400;
        return response.end(JSON.stringify({
            message: `Halaman tidak dapat diakses dengan ${method} request`,
        }));
    }

    response.statusCode = 404;
    response.end(JSON.stringify({
        message: 'Halaman tidak ditemukan!',
    }));
}

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}`);
});