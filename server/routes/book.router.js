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
        pool.query(queryText, queryValues).then((result) => {           
            console.log('responseDate', result.rows[0].id);                                  
            dataIds.push(result.rows[0].id)      
        
            const newBook = req.body;
            const queryText = `INSERT INTO "books" ("title")
                                 VALUES ($1) RETURNING id`;
            const queryValues = [
                newBook.title,
            ];
            pool.query(queryText, queryValues).then((result) => {
                console.log('responseBook', result.rows[0].id);
                dataIds.push(result.rows[0].id)
                console.log('dataIds:', dataIds);
                const newBook = req.body;
                const queryText = `INSERT INTO "relationship" ("date_id","book_id","initial", "student_id")
                                VALUES ($1,$2,$3,$4) RETURNING id`;
                const queryValues = [
                    dataIds[dataIds.length-2],
                    dataIds[dataIds.length - 1],
                    newBook.initial,
                    newBook.user,
                ];
                pool.query(queryText, queryValues).then(() => {
                    res.sendStatus(201);
                })                            
            })
        })    
        .catch((err) => {
            console.log('Error completing POST book query', err);
            res.sendStatus(500);
        });
});// end post router

router.get('/', (req, res) => {
    const queryText = (`SELECT  "title", "date_completed","initial", "date"."id" AS "date_completed_id", "books"."id" AS "book_id_id" FROM "date"
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


router.delete('/:id', (req,res)=>{
    console.log('THESE ARE MY REQ.PARAMS', req.params);
    
    const queryText = ` DELETE FROM "relationship" WHERE "book_id"=$1 ; `
    const queryValues = [
        req.params.id
    ];
    console.log('req.params.id:relationship', req.params.id);
    pool.query(queryText,queryValues)
    .then(() => {
        const queryText = ` DELETE FROM "books" WHERE "id"=$2,  `
        const queryValues = [
            req.params.id
        ];
        console.log('req.params.id.date', req.params.id);
        pool.query(queryText, queryValues)
    })
    .then(() => {
    //     const queryText = (` DELETE FROM "date" WHERE "id"=$1; `)
    //     const queryValues = [
    //         req.params.id
    //     ];
    //     console.log('req.params.id:books', req.params.id);
    //     pool.query(queryText, queryValues)

        res.sendStatus(200);
    }).catch((err) => {
        console.log('Error completing delete book query', err);
        res.sendStatus(500);
    });
    


});
module.exports = router;