const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const news = require('./app/news');
const comments = require('./app/comments');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'mysql',
    password: 'mysql',
    database: 'exam10'
});

app.use('/news', news(connection));
app.use('/comments', comments(connection));

const port = 8000;

connection.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);

    app.listen(port, () => {
        console.log(`Server started on ${port} port`);
    });
});