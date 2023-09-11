const express = require('express');
const connection = require('../db/db-connection');

const loginUser = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const queryStr = 'SELECT * FROM user WHERE email = ? AND password = ?';
    const queryParams = [email, password];

    connection.query(queryStr, queryParams, (err, rows, fields) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (rows.length > 0) {
            return res.status(200).json({ message: 'Login successful', user: rows[0] });
        } else {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    });
};

module.exports = { loginUser };

