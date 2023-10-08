const BASE_URL = "http://www.omdbapi.com";
const API_KEY = "f57139b0";

// ======================== Search Functions - Start ========================
let timer;
const waitTime = 500;

let searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", async (e) => {
  const value = e.target.value;
  clearTimeout(timer);
  timer = setTimeout(async () => {
    const res = await search(value);
    console.log(res);
  }, waitTime);
});

// Clear input field
function cls() {
  searchInput.value = "";
  searchInput.focus();
}

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
