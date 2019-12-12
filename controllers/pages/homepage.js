const { promisify } = require('util');
const readFile = promisify(require('fs').readFile);

const Handlebars = require('handlebars');

const db = require('../../core/db/module');

module.exports = async (dbInstance) => {
    try {
        const { select } = db(dbInstance);

        const data = await select('SELECT * FROM PRODUCTS');
        const template = (await readFile('./templates/homepage.handlebars')).toString();
        let htmlCompiled = Handlebars.compile(template);
        const html = htmlCompiled({
            data
        });

        return html;
    } catch (err) {
        console.log(err)
        return '<h1>Something went wrong</h1>'
    }
}