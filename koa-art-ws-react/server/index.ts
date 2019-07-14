import 'reflect-metadata';
import app from './app';
// import './socket';
import http from 'http';

/**
 * Get port from environment and store in Express.
 */
const PORT = parseInt(process.env.PORT as string) || 3000;

/**
 * Create HTTP server.
 */
const server = http.createServer(app.callback());

server.listen(PORT);
server.on('error', (err: Error) => {
  console.error(`server error: ${err}`);
});
server.on('listening', () => {
  console.log(`start server on http://localhost:${PORT}`);
});
