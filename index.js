const express = require('express');
const bodyParser = require('body-parser');
const {logger} = require('./components/logger');


const cors = require('cors');
const app = express();


require("./components/mongo");
logger.info("APP START ----------");


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false, limit: '1mb'}));
app.use(express.urlencoded({extended: true})); 

const userController = require('./controllers/user');
app.post('/api/user', userController.addUser);
app.get('/api/user',userController.getUser);
app.delete('/api/user/:id', userController.deleteUser);

app.listen(3000, () => {
    console.log('server has benn started');
})