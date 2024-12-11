const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors({
    origin:'http://127.0.0.1:5500'
}));

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bus_booking'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to bus_booking .');
});

app.post('/add-booking', (req, res) => {
    const { username, route, date, time, phone, seats } = req.body;
    const query = 'INSERT INTO bookings (username, route, date, time, phone, seats) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [username, route, date, time, phone, seats], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Booking added successfully!' });
    });
});

app.get('/get-bookings', (req, res) => {
    db.query('SELECT * FROM bookings', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.delete('/delete-booking/:id', (req, res) => {
    const bookingId = req.params.id;
    db.query('DELETE FROM bookings WHERE id = ?', [bookingId], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Booking deleted successfully!' });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
