const BASE_URL = "http://www.omdbapi.com";
const API_KEY = "f57139b0";

const sample = [
  {
    Title: "Även om vi faller",
    Year: "2014",
    imdbID: "tt4300958",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BOTA4MzMzOWYtYzlhNC00NzU1LWJjMTgtMzZkYzBkNjAyN2UxXkEyXkFqcGdeQXVyMTEzMzkwMDc1._V1_SX300.jpg",
  },
  {
    Title: "Frida: Även en blomma",
    Year: "1996",
    imdbID: "tt11802606",
    Type: "movie",
    Poster: "N/A",
  },
  {
    Title: "Även clowner gråter",
    Year: "2011",
    imdbID: "tt14608290",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BN2Q2OTdiYzctOWJiMy00ZWYzLTkwNjQtYzRlZTE3YWE4ODE0XkEyXkFqcGdeQXVyMTMyNTk2ODU@._V1_SX300.jpg",
  },
  {
    Title: "La copiste de Pont-Aven",
    Year: "2011",
    imdbID: "tt2246805",
    Type: "movie",
    Poster: "N/A",
  },
];

// ======================== Search Functions - Start ========================
let timer;
const waitTime = 500;

const movieListContainer = document.getElementById("movie-list-container");
const movieList = document.getElementById("movie-list-main");
const clearBtn = document.getElementById("clear-btn");
let searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", async (e) => {
  const value = e.target.value;
  clearTimeout(timer);
  var data;
  timer = setTimeout(async () => {
    data = await search(value);
    if (value.length > 0) {
      // Show clear button
      clearBtn.style.display = "block";
      movieListContainer.style.display = "block";
      movieList.innerHTML = data.Search.map((movie) => {
        if (movie.Poster === "N/A") {
          var poster =
            "https://via.placeholder.com/300x450?text=No+Poster+Available";
        }

        return `
        <button
          class="w-full p-2 flex gap-3 items-center hover:bg-primHead hover:bg-opacity-10 border-b-1 border-primary"
        >
          <img
            src=${poster || movie.Poster}
            alt="image poster"
            class="w-12 rounded-sm"
          />
          <div class="flex flex-col items-start gap-3">
            <h2 class="font-medium text-lg">${movie.Title}</h2>
            <p class="text-zinc-400">${movie.Year}</p>
          </div>
        </button>
        `;
      }).join(" ");
    } else {
      // Hide clear button
      clearBtn.style.display = "none";
      movieListContainer.style.display = "none";
      movieList.innerHTML = "";
    }
  }, waitTime);
});

// Clear input field
clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
});

// ======================== Search Functions - End ========================

// ======================== Movie Section - Start ========================
let noMovieDiv = document.getElementById("no-movie-div");
let movieDiv = document.getElementById("yes-movie-div");

async function search(search) {
  try {
    const response = await fetch(`${BASE_URL}/?apikey=${API_KEY}&s=${search}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
