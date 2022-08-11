import express from 'express';
import path from 'path';

const buildDir = path.join(process.cwd() + '/build');
const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(buildDir));

app.get('/', (req, res) => {
  res.sendFile(path.join(buildDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`running on port: ${port}.`);
});
