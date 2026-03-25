const express = require('express');
const session = require('express-session');
const app = express();


const MASTER_PASSWORD = "Oasis_infobyte"; // THE SECRET KEY

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));


app.use(session({
    secret: 'lifelink_secret_session_key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 } 
}));


app.get('/', (req, res) => {
   
    if (req.session.isAuthorized) {
        return res.redirect('/dashboard');
    }
    res.render('login', { error: null });
});

app.post('/login', (req, res) => {
    const { password } = req.body;

    if (password === MASTER_PASSWORD) {
        req.session.isAuthorized = true; 
        res.redirect('/dashboard');
    } else {
        res.render('login', { error: "ACCESS DENIED: INVALID SECURITY KEY" });
    }
});

app.get('/dashboard', (req, res) => {
    
    if (!req.session.isAuthorized) {
        return res.redirect('/'); 
    }
    res.render('dashboard');
});


app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`LifeLink OS running at http://localhost:${PORT}`));