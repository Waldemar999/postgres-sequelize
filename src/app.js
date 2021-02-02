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
    (async function doStuff() {
      console.log(db.sequelize.models.User);
      // const instance = await db.sequelize.User.findByPk(1, {
      //     rejectOnEmpty: true,
      // });
      const instance = await db.sequelize.models.User.findAndCountAll();
      console.log(instance);
    }());
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
});
