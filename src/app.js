import express from 'express';
import routes from './routes/index.js';
import db from './data-access/models/index.js';

const port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.listen(port, async () => {
  console.log(`Server listening at http://localhost:${port}`);
  try {
    await db.sequelize.authenticate();
    console.log('Database connection has been established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
});
