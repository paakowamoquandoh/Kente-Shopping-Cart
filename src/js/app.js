let durationButton = document.getElementById("durationSortBtn");
let durationOptions = document.getElementsByClassName("sortOptions")[0];

durationButton.addEventListener("click", ()=>{
    durationOptions.classList.toggle("sortOptions_active")
})

let newUploads = document.getElementById("newest");
let allProducts = document.getElementById("allProducts");
let lowPrice = document.getElementById("lowPrice");
let trendy = document.getElementById("trendy");
