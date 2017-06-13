interface Person {
    name: string;
    age: number;
}

function birthday(someone : Person) : Person {
    return {name: someone.name, age: someone.age+1};
}

console.dir(birthday({name:"Judy",age:39}));

import express = require('express');
let app = express();

app.get('/', function (request, response) {
    response.send('Hello World');
});


app.get('/api/sayhello/:name', (request, response) => {
    let name = request.params.name;

    if (!isNaN(name)) {
        response
            .status(400)
            .send('No string as name');
    } else {
        response.json({
            "message": name
        });
    }
});

app.get('/api/sayhello/', (request, response) => {
    let name = request.query.name;

    let result = {
        message: name
    };

    if (!isNaN(name)) {
        response
            .status(400)
            .send('No string as name');
    } else {
        response.json(result);
    }
});

// For POST-Support
let bodyParser = require('body-parser');
let multer = require('multer');
let upload = multer();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/api/sayHello', upload.array(), (request, response) => {
    let name = request.body.name;

    if (!isNaN(name)) {
        response
            .status(400)
            .send('No string as name');
    } else {
        console.log('Hello ' + name);
    }

    response.send('POST request to homepage');
});


app.listen(3000);