import sqlite3 from 'sqlite3'
import { open } from'sqlite'

export async function connectToDB() {
    return await open({
        filename: './data/movies.sqlite',
        driver: sqlite3.Database
    })
}

export async function setUp() {
    const db = await connectToDB()

    await db.exec("DROP TABLE IF EXISTS movies;")
    await db.exec("CREATE TABLE IF NOT EXISTS movies(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, release_date DATE);")
    await db.exec("INSERT INTO movies(name, release_date) VALUES ('Fight Club', '1999-10-15'),('The Godfather', '1972-03-24'),('Her', '2013-12-18');")

    await db.close()
    console.log("DB set up")
}

export async function getMovies() {
    const db = await connectToDB()
    let movies = await db.all("SELECT * FROM movies;")
    await db.close()
    return movies
}

export async function getMovie(id) {
    id = parseInt(id)

    const db = await connectToDB()
    let movie = await db.get(`SELECT * FROM movies WHERE id = ?;`, id)
    return movie
}

export async function createMovie(movie) {
    const db = await connectToDB()
    let result = await db.run(`INSERT INTO movies(name, release_date) VALUES (?, ?);`, movie.name, movie.releaseDate)
    return result.lastId
}