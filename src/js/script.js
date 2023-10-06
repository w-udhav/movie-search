// ======================== Search Functions - Start ========================
let searchInput = document.getElementById("searchInput");

searchInput.addEventListener("enter", (e) => {
  if (e.keyCode === 13) {
    search();
  }
});

function search() {
  console.log("searching...");
}

// Clear input field
function cls() {
  searchInput.value = "";
  searchInput.focus();
}

// ======================== Search Functions - End ========================
