const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const initializer = require('./core/init')

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

(async () => {
    await initializer(app);

    app.listen(3000, () => {
        console.log('App started on port 3000!');
    });
})();
