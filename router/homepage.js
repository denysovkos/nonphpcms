const homepageController = require('../controllers/pages/homepage')

module.exports = async (req, res) => {
    const { db } = req;
    const html = await homepageController(db);
    res.type('text/html').send(html) 
}