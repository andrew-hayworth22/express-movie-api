import { connectToDB } from './database.js'

console.log("Setting up database...")

try {
    const db = await connectToDB()

    await db.exec("DROP TABLE IF EXISTS movies;")
    await db.exec("CREATE TABLE IF NOT EXISTS movies(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, release_date DATE);")
    await db.exec("INSERT INTO movies(name, release_date) VALUES ('Fight Club', '1999-10-15'),('The Godfather', '1972-03-24'),('Her', '2013-12-18');")

    await db.close()
}
catch(error) {
    console.log("Database setup failed with error:")
    console.log({error})
}

console.log("Database successfully set up...")