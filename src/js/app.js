let durationButton = document.getElementById("durationSortBtn");
let durationOptions = document.getElementsByClassName("sortOptions")[0];

durationButton.addEventListener("click", ()=>{
    durationOptions.classList.toggle("sortOptions_active")
})

let newUploads = document.getElementById("newest");
let allProducts = document.getElementById("allProducts");
let lowestPrice = document.getElementById("lowPrice");
let highestPrice = document.getElementById("trendy");

let url = "mainProducts.json";
let productsArea = document.getElementsByClassName("mainProArea")[0];

fetch(url).then((Response => Response.json())).then((data) => {
    const allProductsArray = [...data];
    const newProductsArray = [...data].splice(8, 12);
    const lowestPriceProductsArray = [...data];
    const highestPriceArray = [...data];

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

    lowestPrice.addEventListener("click", () => {
        productsArea.innerHTML = "";
        durationButton.innerHTML = `
        <h5>Sort By: Lowest Prices</h5>
        <ion-icon name="chevron-down-outline"></ion-icon>
        `;
        durationOptions.classList.toggle("sortOptions_active");

        lowestPriceProductsArray.sort((a, b) => a.fields.price - b.fields.price);
        
        lowestPriceProductsArray.forEach((item, index) => {
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


    highestPrice.addEventListener("click", () => {
        productsArea.innerHTML = "";
        durationButton.innerHTML = `
        <h5>Sort By: Highest Prices</h5>
        <ion-icon name="chevron-down-outline"></ion-icon>
        `;
        durationOptions.classList.toggle("sortOptions_active");

        highestPriceArray.sort((a, b) => b.fields.price - a.fields.price);
        
        highestPriceArray.forEach((item, index) => {
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


    //clothing only
    let clothingProducts = allProductsArray.filter((item)=>{
        return item.sys.id === "clothes"
    })

    let AllFilteredProducts = [];
    let clothesOnly = document.getElementById("clothes");
    
    clothesOnly.addEventListener("click", () => {
        if (clothesOnly.title === "clothesOn"){
            productsArea.innerHTML = "";
            clothesOnly.classList.toggle("i_active");
            clothesOnly.classList.toggle("bi-toggle2-off");
            clothesOnly.classList.toggle("bi-toggle2-on");
            clothesOnly.title = "clothesOff";
            AllFilteredProducts = AllFilteredProducts.concat(clothingProducts);

            AllFilteredProducts.forEach((item, index) => {
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
        } else{
            productsArea.innerHTML = "";
            clothesOnly.classList.toggle("i_active");
            clothesOnly.classList.toggle("bi-toggle2-off");
            clothesOnly.classList.toggle("bi-toggle2-on");
            clothesOnly.title = "clothesOn";
            AllFilteredProducts = AllFilteredProducts.filter((item) =>{
                return clothingProducts.indexOf(item) < 0;
            })
            AllFilteredProducts.forEach((item, index) => {
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
        }
    })

    //accessories only
    let accessoriesProducts = allProductsArray.filter((item)=>{
        return item.sys.id === "accessories"
    })

  
    let accessoriesOnly = document.getElementById("accessories");
    
    accessoriesOnly.addEventListener("click", () => {
        if (accessoriesOnly.title === "accessoriesOn"){
            productsArea.innerHTML = "";
            accessoriesOnly.classList.toggle("i_active");
            accessoriesOnly.classList.toggle("bi-toggle2-off");
            accessoriesOnly.classList.toggle("bi-toggle2-on");
            accessoriesOnly.title = "accessoriesOff";
            AllFilteredProducts = AllFilteredProducts.concat(accessoriesProducts);

            AllFilteredProducts.forEach((item, index) => {
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
        } else{
            productsArea.innerHTML = "";
            accessoriesOnly.classList.toggle("i_active");
            accessoriesOnly.classList.toggle("bi-toggle2-off");
            accessoriesOnly.classList.toggle("bi-toggle2-on");
            accessoriesOnly.title = "accessoriesOn";
            AllFilteredProducts = AllFilteredProducts.filter((item) =>{
                return accessoriesProducts.indexOf(item) < 0;
            })
            AllFilteredProducts.forEach((item, index) => {
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
        }
    });


    //sports only
    let sportsProducts = allProductsArray.filter((item)=>{
        return item.sys.id === "sportwear"
    })

  
    let sportsOnly = document.getElementById("sports");
    
    sportsOnly.addEventListener("click", () => {
        if (sportsOnly.title === "sportsOn"){
            productsArea.innerHTML = "";
            sportsOnly.classList.toggle("i_active");
            sportsOnly.classList.toggle("bi-toggle2-off");
            sportsOnly.classList.toggle("bi-toggle2-on");
            sportsOnly.title = "sportsOff";
            AllFilteredProducts = AllFilteredProducts.concat(sportsProducts);

            AllFilteredProducts.forEach((item, index) => {
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
        } else{
            productsArea.innerHTML = "";
            sportsOnly.classList.toggle("i_active");
            sportsOnly.classList.toggle("bi-toggle2-off");
            sportsOnly.classList.toggle("bi-toggle2-on");
            sportsOnly.title = "sportsOn";
            AllFilteredProducts = AllFilteredProducts.filter((item) =>{
                return sportsProducts.indexOf(item) < 0;
            })
            AllFilteredProducts.forEach((item, index) => {
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
        }
    });

    //lingerie only
    let lingerieProducts = allProductsArray.filter((item)=>{
        return item.sys.id === "lingerie"
    })

  
    let lingerieOnly = document.getElementById("lingerie");
    
    lingerieOnly.addEventListener("click", () => {
        if (lingerieOnly.title === "lingerieOn"){
            productsArea.innerHTML = "";
            lingerieOnly.classList.toggle("i_active");
            lingerieOnly.classList.toggle("bi-toggle2-off");
            lingerieOnly.classList.toggle("bi-toggle2-on");
            lingerieOnly.title = "lingerieOff";
            AllFilteredProducts = AllFilteredProducts.concat(lingerieProducts);

            AllFilteredProducts.forEach((item, index) => {
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
        } else{
            productsArea.innerHTML = "";
            lingerieOnly.classList.toggle("i_active");
            lingerieOnly.classList.toggle("bi-toggle2-off");
            lingerieOnly.classList.toggle("bi-toggle2-on");
            lingerieOnly.title = "lingerieOn";
            AllFilteredProducts = AllFilteredProducts.filter((item) =>{
                return lingerieProducts.indexOf(item) < 0;
            })
            AllFilteredProducts.forEach((item, index) => {
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
        }
    });

    //pillow cases only
    let pillowProducts = allProductsArray.filter((item)=>{
        return item.sys.id === "pillow"
    })

  
    let pillowOnly = document.getElementById("pillowcases");
    
    pillowOnly.addEventListener("click", () => {
        if (pillowOnly.title === "pillowOn"){
            productsArea.innerHTML = "";
            pillowOnly.classList.toggle("i_active");
            pillowOnly.classList.toggle("bi-toggle2-off");
            pillowOnly.classList.toggle("bi-toggle2-on");
            pillowOnly.title = "pillowOff";
            AllFilteredProducts = AllFilteredProducts.concat(pillowProducts);

            AllFilteredProducts.forEach((item, index) => {
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
        } else{
            productsArea.innerHTML = "";
            pillowOnly.classList.toggle("i_active");
            pillowOnly.classList.toggle("bi-toggle2-off");
            pillowOnly.classList.toggle("bi-toggle2-on");
            pillowOnly.title = "pillowOn";
            AllFilteredProducts = AllFilteredProducts.filter((item) =>{
                return pillowProducts.indexOf(item) < 0;
            })
            AllFilteredProducts.forEach((item, index) => {
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
        }
    });
})