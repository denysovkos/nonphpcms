module.exports = async (app) => {
    app.db.serialize(() => {
        app.db.run("CREATE TABLE IF NOT EXISTS PRODUCTS (name TEXT, price INTEGER);");

        app.db.all('SELECT * FROM PRODUCTS', [], (err, rows) => {
            if (err) {
                throw err;
            }

            if (rows.length < 1) {
                for (let i = 1; i < 11; i++) {
                    let query = `
                        INSERT INTO PRODUCTS (name, price)
                        VALUES ("Product ${i}", ${(Math.random() * 1000).toFixed(0)});`;

                    app.db.run(query);
                }
            }
        });
    });
}