let durationButton = document.getElementById("durationSortBtn");
let durationOptions = document.getElementsByClassName("sortOptions")[0];

durationButton.addEventListener("click", ()=>{
    durationOptions.classList.toggle("sortOptions_active")
})

let newUploads = document.getElementById("newest");
let allProducts = document.getElementById("allProducts");
let lowPrice = document.getElementById("lowPrice");
let trendy = document.getElementById("trendy");

let url = "mainProducts.json";
let productsArea = document.getElementsByClassName("mainProArea")[0];

fetch(url).then((Response => Response.json())).then((data) => {
    const allProductsArray = [...data];
    const newProductsArray = [...data].splice(8, 12);
    const lowPriceProductsArray = [...data];
    const trendy_array = [...data];

    data.forEach((item, index) => {
        const {title, price, description, category} = item.fields;
        const {id} = item.sys;
        const image = item.fields.image.fields.file.url;
     
        let card = document.createElement("a");
        card.classList.add("itemCard")
        card.innerHTML = `
        <img src=${image} alt="">
      <h5 class="cardTitle" title="African Print Dress">${title}</h5>
      <p>${description}</p>
      <div class="itemPrice">
          <h5>$${price}</h5>
      </div>
      <div class="colorTag">
      <div class="stars">
      <ion-icon name="star"></ion-icon>
      <ion-icon name="star"></ion-icon>
      <ion-icon name="star"></ion-icon>
      <ion-icon name="star"></ion-icon>
      <ion-icon name="star"></ion-icon>
    </div>
          <button class="proCart" data-id = ${id}>Buy</button>
      </div>
        `;
        productsArea.appendChild(card);
    });

    newUploads.addEventListener("click", () => {
        productsArea.innerHTML = "";
        durationButton.innerHTML = `
        <h5>Sort By: Newest</h5>
        <ion-icon name="chevron-down-outline"></ion-icon>
        `;
        durationOptions.classList.toggle("sortOptions_active");
        
        newProductsArray.forEach((item, index) => {
            const {title, price, description, category} = item.fields;
            const {id} = item.sys;
            const image = item.fields.image.fields.file.url;
         
            let card = document.createElement("a");
            card.classList.add("itemCard")
            card.innerHTML = `
            <img src=${image} alt="">
          <h5 class="cardTitle" title="African Print Dress">${title}</h5>
          <p>${description}</p>
          <div class="itemPrice">
              <h5>$${price}</h5>
          </div>
          <div class="colorTag">
          <div class="stars">
          <ion-icon name="star"></ion-icon>
          <ion-icon name="star"></ion-icon>
          <ion-icon name="star"></ion-icon>
          <ion-icon name="star"></ion-icon>
          <ion-icon name="star"></ion-icon>
        </div>
              <button class="proCart" data-id = ${id}>Buy</button>
          </div>
            `;
            productsArea.appendChild(card);
        });
        
    })

    allProducts.addEventListener("click", () => {
        productsArea.innerHTML = "";
        durationButton.innerHTML = `
        <h5>Sort By: All Products</h5>
        <ion-icon name="chevron-down-outline"></ion-icon>
        `;
        durationOptions.classList.toggle("sortOptions_active");
        
        allProductsArray.forEach((item, index) => {
            const {title, price, description, category} = item.fields;
            const {id} = item.sys;
            const image = item.fields.image.fields.file.url;
         
            let card = document.createElement("a");
            card.classList.add("itemCard")
            card.innerHTML = `
            <img src=${image} alt="">
          <h5 class="cardTitle" title="African Print Dress">${title}</h5>
          <p>${description}</p>
          <div class="itemPrice">
              <h5>$${price}</h5>
          </div>
          <div class="colorTag">
          <div class="stars">
          <ion-icon name="star"></ion-icon>
          <ion-icon name="star"></ion-icon>
          <ion-icon name="star"></ion-icon>
          <ion-icon name="star"></ion-icon>
          <ion-icon name="star"></ion-icon>
        </div>
              <button class="proCart" data-id = ${id}>Buy</button>
          </div>
            `;
            productsArea.appendChild(card);
        });
        
    });

    lowPrice.addEventListener("click", () => {
        productsArea.innerHTML = "";
        durationButton.innerHTML = `
        <h5>Sort By: All Products</h5>
        <ion-icon name="chevron-down-outline"></ion-icon>
        `;
        durationOptions.classList.toggle("sortOptions_active");

        lowPriceProductsArray.sort(({price:a}, {price:b}) => a-b);
        
        lowPriceProductsArray.forEach((item, index) => {
            const {title, price, description, category} = item.fields;
            const {id} = item.sys;
            const image = item.fields.image.fields.file.url;
         
            let card = document.createElement("a");
            card.classList.add("itemCard")
            card.innerHTML = `
            <img src=${image} alt="">
          <h5 class="cardTitle" title="African Print Dress">${title}</h5>
          <p>${description}</p>
          <div class="itemPrice">
              <h5>$${price}</h5>
          </div>
          <div class="colorTag">
          <div class="stars">
          <ion-icon name="star"></ion-icon>
          <ion-icon name="star"></ion-icon>
          <ion-icon name="star"></ion-icon>
          <ion-icon name="star"></ion-icon>
          <ion-icon name="star"></ion-icon>
        </div>
              <button class="proCart" data-id = ${id}>Buy</button>
          </div>
            `;
            productsArea.appendChild(card);
        });
        
    })
    
})