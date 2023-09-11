const express = require('express')
const connection = require('../db/db-connection')

usRegister = (req,res) =>{
    connection.query('insert into user values(?,?,?,?,?)',
    [req.body.u_id,req.body.email,req.body.phone,req.body.username,req.body.password],(err, rows) => {
        if (err) throw err

       res.send(rows)
    })

    
}


const checkUserName = (req, res) => {
    const username  = req.body.username ;
    const queryStr = 'SELECT * FROM user WHERE username=?';
    const queryParams = [username];

    connection.query(queryStr, queryParams, (err, rows, fields) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (rows.length > 0) {
            return res.status(200).json({ message: 'Enter another username', user: rows[0] });
        } else {
            return res.status(401).json({ error: 'Can Register' });
        }
    });
};


module.exports={usRegister,checkUserName}