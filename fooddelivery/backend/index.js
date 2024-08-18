const mongoose = require('mongoose')
const express = require('express');
const cors = require('cors');
const FoodItem = require("./models/User.js");
const app = express();
const port =5000;

app.use(express.json());
app.use(cors());

async function fetchData() {
  try {
      const foodItems = await mongoose.connection.db.collection('fooditems').find({}).toArray();
      const foodCategory = await mongoose.connection.db.collection('foodcategory').find({}).toArray();
      global.fooditems = foodItems;
      global.foodcategory = foodCategory;
  } catch (err) {
      console.error('Error fetching data:', err);
  }
}


mongoose.connect('mongodb://localhost:27017/FoodData', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    fetchData();
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });


app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use(express.json());
app.use('/api',require("./routes/CreateUser.js"));
app.use('/api',require("./routes/DisplayData.js"));
app.use('/api',require("./routes/AdminRoute.js"));
app.use('/api', require("./routes/OrderRoute.js"));


app.get('/about', (req, res) => {
    res.send('Hello World! in about');
  });


app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});


module.exports = mongoose;