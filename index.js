const express = require(`express`);
const mongoose = require(`mongoose`);
const htmlEngine = require(`express-handlebars`);
const todoRoutes = require(`./routes/todos`);
const bodyParser = require(`body-parser`);
const path = require(`path`);

const PORT = process.env.PORT || 3000;

const app = express();
const engine = htmlEngine.create({
  defaultLayout: `main`,
  extname: "hbs",
});

app.engine(`hbs`, engine.engine);
app.set(`view engine`, `hbs`);
app.set(`views`, `pages`);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser());

app.use(express.static(path.join(__dirname, `public`)));

app.use(todoRoutes);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://kolilia:q123456@cluster0.5tovw.mongodb.net`,
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );

    app.listen(PORT, () => {
      console.log(`Server has been started`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
