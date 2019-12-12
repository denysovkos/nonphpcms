module.exports = (db) => ({
    select: async (query, props = []) => {
        return new Promise((resolve, reject) => {
            db.all(query, props, (err, rows) => {
                if (err) {
                    reject (err);
                }

                resolve(rows);
            })
        })
    }
})