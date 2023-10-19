import {getMovies, getMovie, createMovie} from "./database.js"
import express from "express"
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import cors from 'cors'
import isEmptyOrSpaces from "./utility.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const port = 5000

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../page")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../page/index.html'))
})

app.get('/api/movies', async (req, res) => {
    let movies;
    let code = 200;
    try {
        movies = await getMovies()
    } catch(error) {
        code = 500
    }

    res.json({
        movies: movies,
        responseCode: code
    })
})

app.get('/api/movies/:id', async (req, res) => {
    let movie;
    let code = 200;
    try {
        let movie = await getMovie(req.params.id)
        code = movie == null ? 404 : 200
    } catch(error) {
        code = 500
    }

    res.json({
        movie: movie,
        responseCode: code
    })
})

app.post('/api/movies', async (req, res) => {
    if(isEmptyOrSpaces(req.body.name) || isEmptyOrSpaces(req.body.releaseDate)) {
        res.json({
            movieId: null,
            responseCode: 400
        })
        return
    }

    let id
    let code = 200
    
    try {
        id = await createMovie(req.body)
    } catch(error) {
        code = 500
    }

    res.json({
        movieId: id,
        responseCode: code
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})