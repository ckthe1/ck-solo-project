const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/', (req, res) => {
    console.log('TEACHER.ROUTER req.user', req.user);

    const queryText = (`SELECT "username", COUNT ("book_id") AS "total_books_read" ,"clearance_level"  FROM "user"
                        LEFT OUTER JOIN "relationship" ON "user"."id" = "relationship"."student_id"
                        LEFT OUTER JOIN "books" ON "books"."id" = "relationship"."book_id"
                        WHERE "clearance_level" = 0
                        GROUP BY "username","clearance_level";`
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