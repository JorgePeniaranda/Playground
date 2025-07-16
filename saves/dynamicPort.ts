import express, { type Application } from 'express';

const app = express();
const port = 3000;

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

function findAvailablePort(app: Application, port: number): Promise<number> {
  return new Promise((resolve, reject) => {
    app.listen(port, (error) => {
      if (error == null) {
        resolve(port);

        return;
      }

      if (error instanceof Error && 'code' in error && error.code === 'EADDRINUSE') {
        console.log(`⚠️ Port ${port} is in use. Trying ${port + 1}...`);
        resolve(findAvailablePort(app, port + 1));

        return;
      } else {
        reject(error);
      }
    });
  });
}

findAvailablePort(app, port)
  .then((port) => {
    console.log('Server is running on ' + port);
  })
  .catch((error) => {
    console.log('Error: ', error);
  });
