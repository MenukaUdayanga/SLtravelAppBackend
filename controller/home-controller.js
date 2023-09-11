const express = require('express');
const connection = require('../db/db-connection');

//get data

getData = (req,res) =>{
    connection.query('select* from travel_data', (err, rows) => {
        if (err) throw err
  
       res.send(rows)
    })
  
  
  }

  //save data

  const saveData = (req, res) => {
    const { country, place, des,latitude,longitude } = req.body;
  
    const query = 'INSERT INTO travel_data (travel_date, travel_time, am_pm, country, place, des,latitude,longitude) VALUES (NOW(), NOW(), DATE_FORMAT(NOW(), \'%p\'), ?, ?, ?,?,?)';
    const values = [country, place, des,latitude,longitude];
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error("Error saving data:", err);
        res.status(500).json({ error: "An error occurred while saving the data." });
      } else {
        res.status(200).json({ message: "Data saved successfully.", t_id: result.insertId });
      }
    });
  };


  //delete data

  const dataDelete = (req, res) => {
    const query = "DELETE FROM travel_data WHERE t_id=?";
    const t_id = req.params.t_id; 
  
    connection.query(query, [t_id], (err, result) => {
      if (err) {
        console.error("Error deleting note:", err);
        res.status(500).json({ error: "An error occurred when deleting the data." });
      } else {
        res.status(200).json({ message: "Data deleted successfully." });
      }
    });
  };


  //update data

  const dataUpdate = (req, res) => {
    const t_id = req.params.t_id; 
    const { country, place, des } = req.body;
    
  
    const query = 'UPDATE travel_data SET travel_date = NOW(), travel_time = NOW(), am_pm = DATE_FORMAT(NOW(), \'%p\'), country = ?, place = ?, des = ? WHERE t_id = ?';
    const values = [country, place, des,t_id]; 
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error("Error updating note:", err);
        res.status(500).json({ error: "An error occurred while updating the data." });
      } else {
        res.status(200).json({ message: "Data updated successfully." });
      }
    });
  };

  //get data by id

  const getDataById =(req,res) =>{

    const t_id = req.params.t_id;
    const query ='select*from travel_data where t_id=?';
  
    connection.query(query,[t_id],(err,rows) =>{
      if(err)throw err
  
      res.send(rows)
    })
  }

//Search Result

const searchResult = (req, res) => {
  const searchText = req.params.searchText;
  const query = `SELECT * FROM travel_data WHERE country LIKE '%${searchText}%' OR travel_date LIKE '%${searchText}%' OR travel_time LIKE '%${searchText}%' 
  OR am_pm LIKE '%${searchText}%' OR place LIKE '%${searchText}%' OR des LIKE '%${searchText}%' `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'An error occurred' });
      return;
    }
    res.json(results);
  });
};

  
  
module.exports={getData,saveData,dataDelete,dataUpdate,getDataById,searchResult}