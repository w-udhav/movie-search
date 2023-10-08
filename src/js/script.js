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
// Display selected movie on the page

async function display(id) {
  console.log(id);
  noMovieDiv.style.display = "none";
  movieDiv.style.display = "flex";
  try {
    let movieData = await fetch(`${BASE_URL}/?apikey=${API_KEY}&i=${id}`);
    let movie = await movieData.json();
    movieDiv.innerHTML = "Loading...";
    const title = `
    <div class="flex flex-col gap-3 text-[17px] transition-all ease-linear">
      <h1
        id="movie-heading"
        class="font-medium text-4xl md:text-5xl text-center md:text-left"
      >
        ${movie.Title}
      </h1>
      <div class="flex flex-wrap justify-center items-center gap-3">
        <!-- Rating -->
        <p
          class="border border-white bg-primHead bg-opacity-20 text-[14px] rounded-md px-2"
        >
          ${movie.Rated}
        </p>
        &#8226;
        <!-- Type -->
        <p class="text-primHead font-medium capitalize">${movie.Type}</p>
        &#8226;
        <!-- Year -->
        <p>${movie.Year}</p>
        &#8226;
        <!-- Runtime -->
        <p>${movie.Runtime}</p>
        &#8226;
        <!-- Genre -->
        <p>${movie.Genre}</p>
      </div>
    </div>
    `
    let img=""
    if(movie.Poster === "N/A") {
      img = `
      <div
          style="box-shadow: 0px 4px 15px 8px rgba(0, 0, 0, 0.25)"
          class="w-[300px] h-[444px] bg-[#303134] rounded-[15px] flex justify-center items-center text-center p-3"
        >
          No Poster Available
      </div>
      `
    } else {
      img=`
      <img
          class="rounded-[15px]"
          style="box-shadow: 0px 4px 15px 8px rgba(0, 0, 0, 0.25)"
          src="${movie.Poster}"
          alt="Movie Poster"
      />`
    }
    let ratings="";
    if(movie.Ratings.length > 0) {
      movie.Ratings.forEach((rating) => {
        ratings += `
        <div class="flex flex-col items-center justify-center">
          <p>${rating.Value}</p>
          <p class="font-medium text-primHead text-center">
            ${rating.Source}
          </p>
        </div>

        ${rating !== movie.Ratings[movie.Ratings.length - 1] ? '<div class="border-r border-zinc-600"></div>' : ''}
        `
      })
    }

    const others = `
    <div
      class="flex flex-col items-center lg:items-start lg:flex-row gap-10"
    >
      <!-- Poster -->
      <div class="min-w-[40%]">
        ${img}
      </div>

      <!-- All Details -->
      <div class="flex-1 flex flex-col gap-5 text-[17px]">
        <!-- Country -->
        <div class="flex gap-2">
          <p class="font-semibold">Country:</p>
          <p>${movie.Country}</p>
        </div>

        <!-- Plot -->
        <p class="">
          ${movie.Plot}
        </p>

        <div class="border-t border-zinc-600"></div>

        <!-- Little Details -->
        <div class="">
          <div class="flex gap-2">
            <p class="font-semibold">Released:</p>
            <p>${movie.Released}</p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Director:</p>
            <p>${movie.Director}</p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Writer:</p>
            <p>${movie.Writer}</p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Actors:</p>
            <p>
              ${movie.Actors}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="font-semibold">Box Office:</p>
            <p>${movie.BoxOffice}</p>
          </div>
        </div>

        <div class="border-t border-zinc-600"></div>

        <!-- Ratings -->
        <div class="flex flex-wrap flex-col md:flex-row gap-5">
          <div class="flex flex-col items-center justify-center">
            <p>${movie.imdbRating}</p>
            <p class="font-medium text-primHead text-center">IMDb</p>
          </div>

          <div class="border-r border-zinc-600"></div>
          ${ratings}
        </div>
      </div>
    </div>
    `;

    movieDiv.innerHTML = title + others;
    cls()
  } catch (error) {
    console.error(error);
  }
}

// ======================== Movie Section - End ========================

// ======================== Search Functions - Start ========================
let timer;
const waitTime = 500;

const movieListContainer = document.getElementById("movie-list-container");
const movieList = document.getElementById("movie-list-main");
const clearBtn = document.getElementById("clear-btn");
let searchInput = document.getElementById("searchInput");

const createMovieButton = (movie) => {
  const button = document.createElement("button");
  button.classList.add(
    "w-full",
    "p-2",
    "flex",
    "gap-3",
    "items-center",
    "hover:bg-primHead",
    "hover:bg-opacity-10",
    "border-b-1",
    "border-primary"
  );
  button.innerHTML = `
    <img
      src="${
        movie.Poster !== "N/A"
          ? movie.Poster
          : "https://via.placeholder.com/300x450?text=No+Poster+Available"
      }"
      alt="image poster"
      class="w-12 rounded-sm"
    />
    <div class="flex flex-col items-start gap-3">
      <h2 class="font-medium text-lg text-left">${movie.Title}</h2>
      <p class="text-zinc-400">${movie.Year}</p>
    </div>
  `;
  button.addEventListener("click", () => {
    display(movie.imdbID);
  });
  return button;
};

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
      movieList.innerHTML = "";
      data.Search.forEach((movie) => {
        const button = createMovieButton(movie);
        movieList.appendChild(button);
      });
    } else {
      // Hide clear button
      clearBtn.style.display = "none";
      movieListContainer.style.display = "none";
      movieList.innerHTML = "";
    }
  }, waitTime);
});

// Clear input field
clearBtn.addEventListener("click", cls);

function cls(){
  searchInput.value = "";
  movieListContainer.style.display = "none";
}

// ======================== Search Functions - End ========================
