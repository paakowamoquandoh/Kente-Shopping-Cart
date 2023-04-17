let durationButton = document.getElementById("durationSortBtn");
let durationOptions = document.getElementsByClassName("sortOptions")[0];

durationButton.addEventListener("click", ()=>{
    durationOptions.classList.toggle("sortOptions_active")
})


// let rightPriceButton = document.getElementById("rightPriceBtn");
// let leftPriceButton = document.getElementById("leftPriceBtn");
// let rightPriceInput = document.getElementById("rightPriceInput");
// let leftPriceInput = document.getElementById("leftPriceInput");

// let array1000to50000 = allProducts.filter((item) => {
//     return item.price <= 50000
// })
