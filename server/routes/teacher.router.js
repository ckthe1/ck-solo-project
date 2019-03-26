const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', (req, res) => {
    console.log('TEACHER.ROUTER req.user', req.user);

    const queryText = (`SELECT "student_id","username", COUNT ("book_id") AS "total_books_read" ,"clearance_level"  FROM "user"
                        LEFT OUTER JOIN "relationship" ON "user"."id" = "relationship"."student_id"
                        LEFT OUTER JOIN "books" ON "books"."id" = "relationship"."book_id"
                        WHERE "clearance_level" = 0
                        GROUP BY "student_id", "username","clearance_level";`
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

// router.delete('/:id', (req, res) => {

//     console.log('REQ.PARAMS TJ', req.params);
//     const queryText = ` DELETE FROM "relationship" WHERE "student_id"= $1 RETURNING id; `
//     const queryValues = [
//         req.params.id
//     ];
//     pool.query(queryText, queryValues)
//         .then((result) => {
//             console.log('result:', result);
//             const queryText = ` DELETE FROM "user"."username" WHERE "id"= $1 RETURNING id; `
//             const queryValues = [
//                 req.params.id
//             ];
//             console.log('req.params.id.book', req.params.id);
//             pool.query(queryText, queryValues)
//         })
    //     .then((result) => {
    //         console.log('result:', result);
    //         const queryText = (` DELETE FROM "date" WHERE "id"=$1 RETURNING id; `)
    //         const queryValues = [
    //             req.params.id
    //         ];
    //         console.log('req.params.id:date', req.params.id);
    //         pool.query(queryText, queryValues)
    //         res.sendStatus(200);
    //     }).catch((err) => {
    //         console.log('Error completing delete book query', err);
    //         res.sendStatus(500);
    //     });
// });

module.exports = router;