const express = require('express');
const exprsBars = require('express-handlebars');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

express.static(path.join(__dirname, 'views'));

app.engine('.hbs', exprsBars({
    defaultLayout: false,
    extname: '.hbs'
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

const users = [
    {
        name: "Oleg@gmail.com",
        pass: 12345
    },
    {
        name: "Jhony@ukr.net",
        pass: 'helloworld'
    },
];



app.get('/', (req, res) => {
    res.render('alluserspage', {users})
});


app.get('/loginpage', (req, res) => {
    res.render('loginpage')
});


app.get('/register', (req, res) => {
    res.render('register')
});

app.post('/login', (req, res) => {
    const {name, pass} = req.body;
    console.log(req.body);
    if (users.find(user => user.name === name && user.pass === pass)) {
        res.write('You are logged in')
        console.log('Logged in')
        res.end()
        return
    }
    res.write('You entered wrong email or password')
    console.log('Not logged in')
    res.end()
});

app.post('/reg', (req, res) => {
    const {name, pass} = req.body;
    console.log(req.body);
    if (users.find(user => user.name === name)) {
        res.write('Sorry, but You are already registred')
        console.log('not ok')
        res.end()
        return
    }
        res.write('You are succesfully registred')
        users.push({name, pass})
        console.log('ok')
        res.end()
});

app.listen(5000, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Listen 5000...');
    }
});
