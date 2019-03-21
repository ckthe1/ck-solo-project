const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

let dataIds = [];
router.post('/',(req,res)=>{
    console.log('req.body:', req.body);
    
    const newBook = req.body;
            const queryText = `INSERT INTO "date" ("date_completed")
                                VALUES ($1) RETURNING id`;                               
            const queryValues = [
                newBook.date_completed,
            ];
            pool.query(queryText, queryValues) 
        .then((res) => {           
            console.log('responseDate', res.rows[0].id);                                  
            dataIds.push(res.rows[0].id)      
                   
        //     let queryText = `INSERT INTO "relationship" ("date_id") 
        //                         VALUES ($1)`;
        //     let queryValues = [
        //         dataIds[0],
        //     ];
        //     pool.query(queryText, queryValues)
        })

        .then(() => {
            const newBook = req.body;
            const queryText = `INSERT INTO "books" ("title")
                                 VALUES ($1) RETURNING id`;
            const queryValues = [
                newBook.title,
            ];
            pool.query(queryText, queryValues)
                .then((res) => {
                
                    console.log('responseBook', res.rows[0].id);
                    dataIds.push(res.rows[0].id)

                //     let queryText = `INSERT INTO "relationship" ("book_id") 
                //                         VALUES ($1)`;
                //     let queryValues = [
                //         dataIds[1],
                //     ];
                //     pool.query(queryText, queryValues)
                // })
            })
            .then(() => {
                const newBook = req.body;
                const queryText = `INSERT INTO "relationship" ("date_id","book_id","initial", "student_id")
                                VALUES ($1,$2,$3,$4) RETURNING id`;
                const queryValues = [
                    dataIds[0],
                    dataIds[1],
                    newBook.initial,
                    newBook.user,
                ];
                pool.query(queryText, queryValues)
                    // .then((res) => {
                    //     // let dataIds = [];
                    //     console.log('response', res.rows[0].id);
                    //     dataIds.push(res.rows[0].id)

                    //     let queryText = `INSERT INTO "relationship" ("book_id") 
                    //                 VALUES ($1)`;
                    //     let queryValues = [
                    //         dataIds[2],
                    //     ];
                    //     pool.query(queryText, queryValues)
                    })
            })


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