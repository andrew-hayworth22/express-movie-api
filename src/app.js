import {getMovies, getMovie, createMovie} from "./database.js"
import express from "express"
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import cors from 'cors'

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
    try {
        let movies = await getMovies()
        res.json({
            movies: movies,
            responseCode: 200
        })
    } catch(error) {
        res.json({
            movie: null,
            responseCode: 500
        })
    }
})

app.get('/api/movies/:id', async (req, res) => {
    try {
        let movie = await getMovie(req.params.id)
        res.json({
            movie: movie,
            responseCode: 200
        })
    } catch(error) {
        res.json({
            movie: null,
            responseCode: 500
        })
    }
})

app.post('/api/movies', async (req, res) => {
    if(req.body.name == undefined || req.body.releaseDate == undefined) {
        res.json({
            movieId: null,
            responseCode: 400
        })
    }
    
    try {
        let id = await createMovie(req.body)
        res.json({
            movieId: id,
            responseCode: 400
        })
    } catch(error) {
        res.json({
            movieId: null,
            responseCode: 500
        })
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})