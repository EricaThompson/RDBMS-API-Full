const express = require('express');
const knex = require('knex');

const server = express();

server.use(express.json());



const dbConfig = require('./knexfile.js');

const db = knex(dbConfig.development);


server.get('/', (req, res) => {
res.send('API Running...');
});

// endpoints here


server.get('/cohort', (req, res) => {
    db('cohort').then(item => {
        res.status(200).json(item)
    })
})


server.post('/cohort', (req, res) => {
    const item = req.body;

    db('cohort').insert(item)
        .then((ids)=> { 
          res.status(201).json(ids);
        })
                .catch((fail) => {
                    console.log(fail);
                    res.status(500).json({ error: "There was an error while saving the cohort to the database." });
                });
        })


server.delete('/cohort/:id', (req, res) => {

    db('cohort').where({ id:req.params.id }).delete()
        .then((item) => {
            res.status(201).json(item);
            })
        .catch((fail) => {
            console.log(fail);
            res.status(404).json({ message: "The zoo with the specified ID didn't delete."});
            });
            
    });






// server.put(`/cohort/:id`, (req, res) => {
//     db('cohort').where({ id:req.params.id }).update(req.body).then((item) => {
//         res.status(201).json(item);
//     })
//     .catch((fail) => {
//         console.log(fail);
//         res.status(400).json({ message: "The cohort didn't add"})
//     })
// })







const port = 2000;
server.listen(port, function() {
console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});