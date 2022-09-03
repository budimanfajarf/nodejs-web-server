const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200;

    const { method, url } = request;

    if (url === '/') {
        if (method === 'GET') {
            return response.end('<h1>Ini adalah homepage</h1>');
        }

        return response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`);
    }

    if (url === '/about') {
        if (method === 'GET') {
            return response.end('<h1>Halo! Ini adalah halaman about</h1>')
        }

        if (method === 'POST') {
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            });

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
            });

            return;
        }

        return response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`);
    }

    response.end('<h1>Halaman tidak ditemukan!</h1>');
}

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}`);
});