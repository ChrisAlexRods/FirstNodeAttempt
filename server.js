const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { StarRail } = require("starrail.js");
const client = new StarRail();
const cors = require('cors');

app.use(cors());

// Connect to MongoDB Database
mongoose.connect('mongodb://127.0.0.1/starRail', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB successfully...'))
.catch(err => console.log(err));

app.get('/api/characters', (req, res) => {
    const characters = client.getAllCharacters();
    res.json(characters.map(c => c.name.get("en")));
});

app.get('/api/lightCones', (req, res) => {
    const lightCones = client.getAllLightCones();
    res.json(lightCones.map(w => w.name.get("jp")));
});

app.get('/api/user/:uid', async (req, res) => {
    const user = await client.fetchUser(req.params.uid);

    // Create a new object with only the properties you need
    const simpleUser = {
        uid: user.uid,
        name: user.name,
        // Add other properties as needed
        // ...
    };

    res.json(simpleUser);
});

app.listen(5000, () => console.log('Server is running on port 5000...'));
