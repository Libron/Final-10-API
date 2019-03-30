const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const path = require('path');
const config = require('../config');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const createRouter = connection => {
    const router = express.Router();

    router.get('/', (req, res) => {
        connection.query('SELECT * FROM `news`', (error, results) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }
            res.send(results);
        });
    });

    router.get('/:id', (req, res) => {
        connection.query('SELECT * FROM `news` WHERE `id` = ?', req.params.id, (error, results) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }

            if (results[0]) {
                res.send(results[0]);
            } else {
                res.status(404).send({error: 'News not found'});
            }
        });
    });

    router.delete('/:id', (req, res) => {
        connection.query('DELETE FROM `news` WHERE `id` = ?', req.params.id, (error) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }
            res.send({message: 'OK'});
        });
    });
    return router;
};

module.exports = createRouter;