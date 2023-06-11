const express = require('express');
const app = express();
const routes = require('./routes/routes')
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(cors());
app.use(express.json());
//app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',routes  )

app.get('/', (req, res) => {
    res.send('Home Page')
})


app.listen(5000, () => {
    console.log(`Server is Running on 5000`  );
})

const a = 3;
console.log(a);