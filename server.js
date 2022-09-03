const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200;

    const { method } = request;

    if (method === 'POST') {
        return response.end('<h1>Hai!</h1>');
    }

    if (method === 'PUT') {
        return response.end('<h1>Bonjour!</h1>');
    }

    if (method === 'DELETE') {
        return response.end('<h1>Salam!</h1>');
    }

    response.end('<h1>Hello!</h1>');
}

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}`);
});