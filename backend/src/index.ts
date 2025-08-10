import app from './app.js';

const PORT = Number(process.env.PORT ?? 4000);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend server listening on http://localhost:${PORT}`);
});