const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const dbOptions = {
  user: "root",
  host: "localhost",
  password: "root",
  database: "vet",
};

const db = mysql.createConnection(dbOptions);

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});

// ---------------------- CRUD for Owner ----------------------
// Create Owner
app.post("/owners", (req, res) => {
    const { Owner_Name, Address, Phone } = req.query;
  const sql = "INSERT INTO Owner (Owner_Name, Address, Phone) VALUES (?, ?, ?)";
  db.query(sql, [Owner_Name, Address, Phone], (err, result) => {
    if (err) res.status(500).send(err);
    else res.send("Owner added successfully.");
  });
});

// Read Owners
app.get("/owners", (req, res) => {
  const sql = "SELECT * FROM Owner";
  db.query(sql, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
});

// Update Owner
app.put("/owners/:id", (req, res) => {
  const { id } = req.params;
  const { Owner_Name, Address, Phone } = req.body;
  const sql = "UPDATE Owner SET Owner_Name = ?, Address = ?, Phone = ? WHERE Owner_ID = ?";
  db.query(sql, [Owner_Name, Address, Phone, id], (err, result) => {
    if (err) res.status(500).send(err);
    else res.send("Owner updated successfully.");
  });
});

// Delete Owner
app.delete("/owners/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Owner WHERE Owner_ID = ?";
  db.query(sql, [id], (err, result) => {
    if (err) res.status(500).send(err);
    else res.send("Owner deleted successfully.");
  });
});

// ---------------------- CRUD for Pet ----------------------
// Create Pet
app.post("/pets", (req, res) => {
  const { Pet_Name, Species, Breed, Age, Owner_ID } = req.body;
  const sql = "INSERT INTO Pet (Pet_Name, Species, Breed, Age, Owner_ID) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [Pet_Name, Species, Breed, Age, Owner_ID], (err, result) => {
    if (err) res.status(500).send(err);
    else res.send("Pet added successfully.");
  });
});

// Read Pets
app.get("/pets", (req, res) => {
  const sql = "SELECT * FROM Pet";
  db.query(sql, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
});

// Update Pet
app.put("/pets/:id", (req, res) => {
  const { id } = req.params;
  const { Pet_Name, Species, Breed, Age, Owner_ID } = req.body;
  const sql = "UPDATE Pet SET Pet_Name = ?, Species = ?, Breed = ?, Age = ?, Owner_ID = ? WHERE Pet_ID = ?";
  db.query(sql, [Pet_Name, Species, Breed, Age, Owner_ID, id], (err, result) => {
    if (err) res.status(500).send(err);
    else res.send("Pet updated successfully.");
  });
});

// Delete Pet
app.delete("/pets/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Pet WHERE Pet_ID = ?";
  db.query(sql, [id], (err, result) => {
    if (err) res.status(500).send(err);
    else res.send("Pet deleted successfully.");
  });
});

// ---------------------- CRUD for Vaccine ----------------------
// Create Vaccine
app.post("/vaccines", (req, res) => {
  const { Vaccine_Name, Price, Promotion, Side_Effects } = req.body;
  const sql = "INSERT INTO Vaccine (Vaccine_Name, Price, Promotion, Side_Effects) VALUES (?, ?, ?, ?)";
  db.query(sql, [Vaccine_Name, Price, Promotion, Side_Effects], (err, result) => {
    if (err) res.status(500).send(err);
    else res.send("Vaccine added successfully.");
  });
});

// Read Vaccines
app.get("/vaccines", (req, res) => {
  const sql = "SELECT * FROM Vaccine";
  db.query(sql, (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
});

// Update Vaccine
app.put("/vaccines/:id", (req, res) => {
  const { id } = req.params;
  const { Vaccine_Name, Price, Promotion, Side_Effects } = req.body;
  const sql = "UPDATE Vaccine SET Vaccine_Name = ?, Price = ?, Promotion = ?, Side_Effects = ? WHERE Vaccine_ID = ?";
  db.query(sql, [Vaccine_Name, Price, Promotion, Side_Effects, id], (err, result) => {
    if (err) res.status(500).send(err);
    else res.send("Vaccine updated successfully.");
  });
});

// Delete Vaccine
app.delete("/vaccines/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Vaccine WHERE Vaccine_ID = ?";
  db.query(sql, [id], (err, result) => {
    if (err) res.status(500).send(err);
    else res.send("Vaccine deleted successfully.");
  });
});

// ---------------------- CRUD for Veterinarian ----------------------
// Add similar CRUD operations for Veterinarian and Appointment...

// ---------------------- Start Server ----------------------
app.listen(3002, () => {
  console.log("Server is running at port 3002");
});
