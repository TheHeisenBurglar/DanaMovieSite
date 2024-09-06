let movieList = [];

const movieDiv = document.getElementById("movie-div")

const titleEl = document.getElementById("title");
const yearEl = document.getElementById("year");
const directorEl = document.getElementById("director");
const statusEl = document.getElementById("status");

const checkBtn = document.getElementById("checkBtn");
const randomBtn = document.getElementById("randomBtn");

checkBtn.addEventListener("mousedown", () => {
    console.log("check button hit")
    
})
randomBtn.addEventListener("mousedown", () => {
    UpdatePage(getRandomMovie(4, movieList.length))
})

fetch('./Database/movies.csv')
    .then(response => response.text())
    .then(text => {
        let newText = text.split("\n")
        for (line of newText) {
            // console.log(`Line: ${line}`)
            const newLine = line.split(",")
            const newMovie = new MovieItem(newLine[0], newLine[1], newLine[2], newLine[3], newLine[4])
            movieList.push(newMovie)
        }
    })
    .finally(() => {
        // console.log(getRandomMovie(4, movieList.length))
        UpdatePage(getRandomMovie(4, movieList.length))
    })


function MovieItem(id, year, title, director, status){
    this.id = id;
    this.year = year;
    this.title = title;
    this.director = director;
    this.status = status.replace("\r", "");
}

function getRandomMovie(min, max) {
    const rNum = Math.random() * (max - min) + min;
    return movieList[Math.round(rNum)];
}

function UpdatePage(movie) {
    movieDiv.setAttribute("data", movie.id)
    titleEl.textContent = movie.title;
    yearEl.textContent = movie.year;
    directorEl.textContent = movie.director;
    statusEl.textContent = movie.status;
}
  
