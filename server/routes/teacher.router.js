const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', (req, res) => {
    console.log('TEACHER.ROUTER req.user', req.user);

    const queryText = (`SELECT "student_id", "username", "book_id", "title" FROM "user" 
                        JOIN "relationship" ON "user"."id" = "relationship"."student_id"
                        JOIN "books" ON "books"."id" = "relationship"."book_id";`
    )
    pool.query(queryText ).then((result) => {
        res.send(result.rows)
        console.log('books get result.rows:', result.rows);
    })
        .catch((error) => {
            console.log('in GET teacher request error');
            res.sendStatus(500);
        })
});


module.exports = router;