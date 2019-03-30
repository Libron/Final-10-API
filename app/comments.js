const express = require('express');

const createRouter = connection => {
    const router = express.Router();

    router.get('/', (req, res) => {
        connection.query('SELECT * FROM `comments`', (error, results) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }
            res.send(results);
        });
    });

    router.get('/:id', (req, res) => {
        connection.query('SELECT * FROM `comments` WHERE `news_id` = ?', req.params.id, (error, results) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }

            if (results) {
                res.send(results);
            } else {
                res.status(404).send({error: 'Comment not found'});
            }
        });
    });

    router.post('/', (req, res) => {
        const comment = req.body;

        if (!comment.message) {
            res.status(400).send('Missing required fields, please check');
        } else {
            if (!comment.author) {
                comment.author = 'Anonymous';
            }
            connection.query('INSERT INTO `comments` (`news_id`, `author`, `message`) VALUES (?, ?, ?)',
                [comment.news_id, comment.author, comment.message],
                (error) => {
                    if (error) {
                        res.status(500).send({error: 'Database error'});
                    }
                    res.send({message: 'OK'});
                }
            );
        }
    });

    router.delete('/:id', (req, res) => {
        connection.query('DELETE FROM `comments` WHERE `id` = ?', req.params.id, (error) => {
            if (error) {
                res.status(500).send({error: 'Database error'});
            }

            res.send({message: 'OK'});
        });
    });

    return router;
};

module.exports = createRouter;