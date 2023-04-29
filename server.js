const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const port = process.env.PORT || 5000


app.get('/price', async (req, res) =>{
    try {
        const htmlResponse = await axios.get('https://www.metal.com/Lithium-ion-Battery/202303240001');
        const requiredData = cheerio.load(htmlResponse.data);
        const price = requiredData('span.strong___1JlBD').text().trim();
        console.log(price);
        res.json({price});

        
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal server error'})
    }
})

app.use((req, res) =>{
    res.json({"error" : "404 Not Found"});
})

app.listen(port, () =>{
    console.log(`Server is running successfully on port ${port}`);
});