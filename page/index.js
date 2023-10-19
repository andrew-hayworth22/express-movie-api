const MOVIES_URL = new URL("http://localhost:5000/api/movies")

function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

function refreshMovies() {
    fetch(MOVIES_URL)
        .then(response => response.json())
        .then(data => buildMovieList(data.movies))
}

function buildMovieList(movies) {
    let list = document.getElementById("movie-list")
    list.textContent = ""

    movies.forEach(movie => {
        let listItem = document.createElement("li")
        listItem.innerHTML = `<span id="${movie.name}-id" style="display: none">${movie.id}</span>${movie.name} (${movie.release_date})`
        list.appendChild(listItem)
    });
}

function createMovie(name, releaseDate) {
    console.log(name)
    console.log(releaseDate)
    if(isEmptyOrSpaces(name), releaseDate == "") {
        alert("Please fill in required fields to add a movie")
        return
    }

    fetch(MOVIES_URL, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        mode: "cors",
        body: JSON.stringify({
            name: name,
            releaseDate: releaseDate,
            headers: {
              "Content-type": "application/json"
            }
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.responseCode != 200) {
            alert(`Error retrieving data with status code: ${data.responseCode}`)
            return
        }

        refreshMovies()
    })
}

window.addEventListener("DOMContentLoaded", function() {
    const movieForm = document.getElementById("movie-form")

    movieForm.addEventListener("submit", (event) => {
        event.preventDefault()

        let name = document.getElementById("name-input")
        let releaseDate = document.getElementById("releaseDate-input")

        createMovie(name.value, releaseDate.value)
        
        name.value = ""
        releaseDate.value = ""

        refreshMovies()
    }, false)
})


refreshMovies();