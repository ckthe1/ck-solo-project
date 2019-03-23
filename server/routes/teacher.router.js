const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// router.get('/', rejectUnauthenticated, (req, res) => {
//     console.log('req.user:', req.user);
//     // pool.query('SELECT * FROM "secret";')
//     const queryText = ' SELECT * FROM "secret" WHERE "clearance_level" = 1;';
//     pool.query(queryText, [req.user.clearance_level])

//         .then(results => res.send(results.rows))
//         .catch(error => {
//             console.log('Error making SELECT for secrets:', error);
//             res.sendStatus(500);
//         });
// });


module.exports = router;