const { Router } = require('express');
const express = require('express');
const route = express.Router();
const db = require('../database')

route.get('/students/get', (req, res) => {
    const sqlGet = 'SELECT * FROM contact';
    db.query(sqlGet, (error, result) => {
        res.send(result)
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
            res.json({error:'Error'})
        } else {
            res.json({message:'Deleted Successfully'})
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

module.exports = route