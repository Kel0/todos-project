const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const web = require('./routes/web');

const app = express();
const PORT = process.env.PORT || 3000;
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});
const connectionString = require('./database/db').connectionString;

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(web);


async function start() {
    try {
        await mongoose.connect(connectionString.url, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        app.listen(PORT, () => {
            console.log(`We live in ${PORT} port`);
        });
    } catch(e) {
        console.log(e);
    }
}


start()