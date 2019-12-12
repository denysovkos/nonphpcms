const homepage = require('./homepage');
const about = require('./about');

module.exports = async (app) => {
    const requireDB = (req, res, next) => {
        req.db = app.db;
        next();
    }

    // ROUTES
    app.get('/', requireDB, homepage);
    app.get('/about', about);
}