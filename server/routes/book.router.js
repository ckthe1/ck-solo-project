const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.post('/',(req,res)=>{
    console.log('for Tj', req.body);
    
    const newBook = req.body;
    const queryText = `INSERT INTO "books" ("title") 
                        VALUES ($1)`;
    const queryValues = [
        newBook.title,
    ];
    pool.query(queryText, queryValues)

        .then(() => {
            const newBook = req.body;
            const queryText = `INSERT INTO "date" ("date_completed") 
                                VALUES ($1)`;
            const queryValues = [
                newBook.date_completed,
            ];
            pool.query(queryText, queryValues)})

        .then(() => {
            const newBook = req.body;
            const queryText = `INSERT INTO "relationship" ("initial") 
                                VALUES ($1)`;
            const queryValues = [
                newBook.initial,
            ];
            pool.query(queryText, queryValues)
        })

        .then(() => { res.sendStatus(201); })
        .catch((err) => {
            console.log('Error completing SELECT book query', err);
            res.sendStatus(500);
        });
});// end post router
module.exports = router;