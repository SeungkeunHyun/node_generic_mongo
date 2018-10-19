module.exports = (app, passport) => {
    app.get('/', (req, res) => {
        res.send('Welcome');
    });
    app.get('/signup', (req, res) => {

    });
    app.get('/logout', (req, res) => {
        req.logout();
    });
}

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
