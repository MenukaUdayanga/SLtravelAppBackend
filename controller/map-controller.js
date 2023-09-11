const express = require('express');
const connection = require('../db/db-connection');

//save map

const saveMap = (req, res) => {
    const {latitude, longitude} = req.body;
  
    const query = 'INSERT INTO locations  (latitude, longitude) VALUES (?, ?)';
    const values = [latitude, longitude];
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error("Error saving map:", err);
        res.status(500).json({ error: "An error occurred while saving the map." });
      } else {
        res.status(200).json({ message: "Map saved successfully.", id: result.insertId });
      }
    });
  };

  //get map

  const getMap = (req,res) =>{
    connection.query('select* from locations', (err, rows) => {
        if (err) throw err
  
       res.send(rows)
    })

  }


  //update map

  const updateMap = (req, res) => {
    const id = req.params.id; 
    const { latitude, longitude } = req.body;
    
  
    const query = 'UPDATE locations SET latitude=?,longitude=? WHERE id=?';
    const values = [latitude, longitude,id]; 
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error("Error updating map:", err);
        res.status(500).json({ error: "An error occurred while updating the map." });
      } else {
        res.status(200).json({ message: "Map updated successfully." });
      }
    });
  };

//delete map

const deleteMap = (req, res) => {
    const query = "DELETE FROM locations WHERE id=?";
    const id = req.params.id; 
  
    connection.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error deleting note:", err);
        res.status(500).json({ error: "An error occurred when deleting the map." });
      } else {
        res.status(200).json({ message: "Map deleted successfully." });
      }
    });
  };


module.exports={saveMap,getMap,updateMap,deleteMap}