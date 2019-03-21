const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.post('/',(req,res)=>{
    console.log('1111post route:', req.body);
    
    const newBook = req.body;
    const queryText = 
    // `WITH "date" AS (
    //     INSERT INTO "date"  ("date_completed") 
    //     VALUES ($1))
        `INSERT INTO "books" ("title")
        VALUES ($1) RETURNING id; `;
    const queryValues = [
        // newBook.date_completed,
        newBook.title   
    ];
    pool.query(queryText, queryValues)
   
        .then((res) => {
            console.log('response2', res.rows[0].id);
            const bookId = res.rows[0].id;
            const queryText = `INSERT INTO "relationship" ("book_id") 
                                VALUES ($1)`;
            const queryValues = [
                bookId,
            ];
            pool.query(queryText, queryValues)
        })

        .then(() => {
            console.log('response1', res.rows);// id of title inserted
            const newId = res.rows[0].id; 

            const newBook = req.body;
            const queryText = `INSERT INTO "date" ("date_completed") 
                                VALUES ($1) RETURNING id`;
            const queryValues = [
                newBook.date_completed,
            ];
            pool.query(queryText, queryValues)
        })
        .then((res) => {
            console.log('response3', res.rows[0].id);
            const dateId = res.rows[0].id;
            const queryText = `INSERT INTO "relationship" ("date_id") 
                                VALUES ($1)`;
            const queryValues = [
                dateId,
            ];
            pool.query(queryText, queryValues)
        })
        // .then((res) => {
        //     console.log('response2', res.rows);
           
            
        //     const newBook = req.body;
        //     const queryText = `INSERT INTO "relationship" ("initial") 
        //                         VALUES ($1)`;
        //     const queryValues = [
        //         newBook.initial,
        //     ];
        //     pool.query(queryText, queryValues)
        // })

        // .then(() => { 
        //     res.sendStatus(201); })       
        .catch((err) => {
            console.log('Error completing POST book query', err);
            res.sendStatus(500);
        });
});// end post router

router.get('/', (req, res) => {
    const queryText = (`SELECT  "title", "date_completed","initial", "date"."id" AS "date_completed_id" FROM "date"
                JOIN "relationship" ON "date"."id" = "relationship"."date_id"
                JOIN "user" ON "user"."id" = "relationship"."student_id"
                JOIN "books" ON "books"."id" = "relationship"."book_id";`)
    pool.query(queryText).then((result) => {
        res.send(result.rows)
        console.log('books get result.rows:', result.rows);
    }).catch((error) => {
        console.log('GET book request error');
        res.sendStatus(500);
    })
});

module.exports = router;