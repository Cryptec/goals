var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE Tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task text UNIQUE, 
            stichtag text,
            timeframe text,
            done text
            )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    
                    console.log("table created")
            
                    }
                });
            }
            });



module.exports = db