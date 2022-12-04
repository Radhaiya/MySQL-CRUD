const { Router } = require('express');
const express = require('express');
const route = express.Router();
const db = require('../database')
const jwt = require('jsonwebtoken')

route.get('/students/get', (req, res) => {

    const sqlGet = 'SELECT * FROM contact';
    db.query(sqlGet, (error, result) => {
        res.send(result)
    })
});


route.get('/students/get/protected', verifyToken, (req, res) => {
    jwt.verify(req.token, 'ANY_KEY', (err, AuthData) => {
        if (err) {
            res.json({ error: 'Invalid Credentials' })
        }

        else {
            const sqlGet = 'SELECT * FROM contact';
            db.query(sqlGet, (error, result) => {
                res.send(result)
            })
        }
    })

});

route.get('/students/get/:ids', (req, res) => {

    const { ids } = req.params
    const sqlGet = 'SELECT * FROM contact where id = ?';
    db.query(sqlGet, ids, (error, result) => {
        res.send(result)
    })
});

route.post('/students/post', (req, res) => {
    const User = {
        id: 1,
        username: 'Radhe',
        password: 'Radhe'
    }

    jwt.sign({ User }, 'ANY_KEY', { expiresIn: '300s' }, (error, token) => {
        console.log(token);
    })


    const { ids, name, email, contact } = req.body
    const sqlPost = `Insert into contact values(?,?,?,?)`;

    try {
        db.query(sqlPost, [ids, name, email, contact], (error, result) => {
            if (error) {
                console.log(error);
            }
            res.status(201).json({ message: 'Success' })
        })
    } catch (error) {
        console.log(Error);
    }


});


route.delete('/students/delete/:ids', (req, res) => {
    const { ids } = req.params
    const sqlDelete = 'DElETE from contact where id = ?'
    db.query(sqlDelete, ids, (error, result) => {
        if (error) {
            console.log(error);
            res.json({ error: 'Error' })
        } else {
            res.json({ message: 'Deleted Successfully' })
            console.log('Data Deleted');
        }
    })
});



route.put('/students/put/:ids', (req, res) => {
    const { ids } = req.params;
    const { name, email, contact } = req.body
    const sqlUpdate = 'Update contact SET name= ?,email= ?,contact= ? where id = ?';
    db.query(sqlUpdate, [name, email, contact, ids], (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);

    })
});


function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const token = bearer[1];
        req.token = token;
        console.log(req.token);
        next();
    }
    else {
        res.json({ error: 'Not Authorized' }
        )
    }

}

module.exports = route