// shop variables
const productArea = document.getElementById("mainProArea");
const cartButton = document.querySelector(".cartTransBtn");
const closeCartBtn = document.querySelector(".closeCart");
const ClearCartBtn = document.querySelector(".cartFooterButton");
const cartArea =  document.querySelector(".cart");
const cartOverlay = document.querySelector(".cartOverlay");
const cartItemsQuantity = document.getElementById("itemsUpdate");
// const mobileItemsQuantity = document.getElementById("mobileItemsUpdate");
const cartTotal = document.querySelector(".ItemsTotal");
const overlayCartContent = document.querySelector(".overlayCartContent");

//cart
let cartBasket = [];

//add Buttons
let addButtons = [];

function displayCartOverlay(){
  cartOverlay.classList.toggle("transparentBack");
  cartArea.classList.toggle("showCart");
}

// getting products implementation below
class Products {
  async getProducts(){
    try {
      let result = await fetch("products.json");
      let data = await result.json();
      let products = data.items;
      products = products.map(item => {
        const {title, price, description, category} = item.fields;
        const {id} = item.sys;
        const image = item.fields.image.fields.file.url;
        return {title, price, description, id, image};
      })
      return products;
    } catch (error) {
      console.log(error);      
    }
  }
}

// display products implementation
class UI {
  loadAllproducts(products){
    let itemResult = "";
    products.forEach(product => {
      itemResult += `
      <!-- single Product -->

      <a class="itemCard">
      <img src=${product.image} alt="">
      <h5 class="cardTitle" title="African Print Dress">${product.title}</h5>
      <p>${product.description}</p>
      <div class="itemPrice">
          <h5>$${product.price}</h5>
      </div>
      <div class="colorTag">
      <div class="stars">
      <ion-icon name="star"></ion-icon>
      <ion-icon name="star"></ion-icon>
      <ion-icon name="star"></ion-icon>
      <ion-icon name="star"></ion-icon>
      <ion-icon name="star"></ion-icon>
    </div>
          <button class="proCart" data-id = ${product.id}>Buy</button>
      </div>
      </a>

      <!-- single product ends here -->
      `      
    });
    productArea.innerHTML = itemResult;
  }
  getAddToCartBtns(){
    const addToCartButtons = [...document.querySelectorAll(".proCart")];
    addButtons = addToCartButtons;
    addToCartButtons.forEach(button => {
      let id = button.dataset.id;
      let alreadySelectedItem = cartBasket.find(item => item.id === id);
      if (alreadySelectedItem) {
        button.innerText = "In Cart";
        button.disabled = true;
        // button.parentElement.parentElement.firstElementChild.innerText = "In Cart";       
      } 
        button.addEventListener("click", (event) => {
          event.target.innerText = "In Cart"
          event.target.disabled = true;
          // event.target.parentElement.parentElement.firstElementChild.innerText = "In Cart"
          //get item from products
          let selectedItem = {...Storage.getProduct(id), amount: 1};
         
          //add item to cart
          cartBasket = [...cartBasket, selectedItem];
          
          //save in local storage
          Storage.saveCart(cartBasket);

          //set cart values
          this.setCartItemValues(cartBasket);

          //display cart item 
           this.addCartItemToCart(selectedItem);
           
          //show the cart overlay
          // this.displayCartOverlay();
        })
       
    });
  }
  setCartItemValues(cartBasket){
    let itemTotal = 0;
    let itemsTotal = 0;
    cartBasket.map(item => {
      itemTotal += item.price * item.amount;
      itemsTotal += item.amount;
    })
    cartTotal.innerText = parseFloat(itemTotal.toFixed(2));
    cartItemsQuantity.innerText = itemsTotal; 
    // mobileItemsQuantity.innerText = itemsTotal;  
  }
  addCartItemToCart(item){
     const itemDiv = document.createElement("div");
     itemDiv.classList.add("cartItem");
     itemDiv.innerHTML = `
     <img src=${item.image} alt="">          
     <div>
      <h4>${item.title}</h4>
      <h5>$${item.price}</h5>
        <ion-icon class="removeItem" data-id = ${item.id} name="trash-outline"></ion-icon>
        <div class="stars">
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
              <ion-icon name="star"></ion-icon>
            </div>
     </div>
     <div>
      <ion-icon class="upBtn" name="caret-up-outline" data-id = ${item.id}></ion-icon>
      <p class="itemAmount">${item.amount}</p>
      <ion-icon class="downBtn" name="caret-down-outline" data-id = ${item.id}></ion-icon>
     </div>
     `;
     overlayCartContent.appendChild(itemDiv);
  }

  displayCartOverlay(){
     cartOverlay.classList.add("transparentBack");
     cartArea.classList.add("showCart");
  }
  setApplication(){
      cartBasket = Storage.getItemsFromCart(); 
      this.setCartItemValues(cartBasket);
      this.populateCart(cartBasket);
      closeCartBtn.addEventListener("click", this.hideCart)
  }
  populateCart(cartBasket){
    cartBasket.forEach(item => this.addCartItemToCart(item));

  }
  hideCart(){
    cartOverlay.classList.remove("transparentBack");
     cartArea.classList.remove("showCart");
  }
  cartLogic(){
    ClearCartBtn.addEventListener("click", () => {
      this.clearCartBasket();
    })
    // cart functionality
    overlayCartContent.addEventListener("click", event => {
      if (event.target.classList.contains("removeItem")) {        
        let removeFromBasket = event.target;
        let id = removeFromBasket.dataset.id;
        overlayCartContent.removeChild(removeFromBasket.parentElement.parentElement);
        this.removeItem(id);        
      } else if (event.target.classList.contains("upBtn")){
         let addUpToBasket = event.target;
         let id = addUpToBasket.dataset.id;
         let itemTotal = cartBasket.find(item => item.id === id);
         itemTotal.amount = itemTotal.amount + 1;
         Storage.saveCart(cartBasket);
         this.setCartItemValues(cartBasket);
         addUpToBasket.nextElementSibling.innerText = itemTotal.amount;
      } else if (event.target.classList.contains("downBtn")) {
         let takeOutOfBasket = event.target;
         let id = takeOutOfBasket.dataset.id; 
         let itemTotal = cartBasket.find(item => item.id === id); 
         itemTotal.amount = itemTotal.amount - 1; 
         if (itemTotal.amount > 0) {
           Storage.saveCart(cartBasket);
           this.setCartItemValues(cartBasket);
           takeOutOfBasket.previousElementSibling.innerText = itemTotal.amount;
         }else{
          overlayCartContent.removeChild(takeOutOfBasket.parentElement.parentElement)
          this.removeItem(id); 
         }    
      }
    });
  }
 
  clearCartBasket(){
    let selectedItems = cartBasket.map(item => item.id);
    selectedItems.forEach(id => this.removeItem(id));

    while (overlayCartContent.children.length > 0) {
      overlayCartContent.removeChild(overlayCartContent.children[0])      
    }
    this.hideCart();
  } 
  removeItem(id){
    cartBasket = cartBasket.filter(item => item.id !== id);
    this.setCartItemValues(cartBasket);
    Storage.saveCart(cartBasket)
    let button = this.getOneButton(id);
    button.disabled = false;
    button.innerHTML = `Buy`;
  }
  getOneButton(id){
    return addButtons.find(button => button.dataset.id === id);
  }

  
  
}


//saving cart items to local storage
class Storage{
   static saveCartItems (products){
    localStorage.setItem("products", JSON.stringify(products));
   }

   static getProduct(id){
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find(product => product.id === id);
   }

   static saveCart(cartBasket){
    localStorage.setItem("cartBasket", JSON.stringify(cartBasket))
   }

   static getItemsFromCart (){
    return localStorage.getItem("cartBasket") ? JSON.parse(localStorage.getItem("cartBasket")) : [];
   }
}


// DOM load event 
document.addEventListener("DOMContentLoaded", ()=>{
  const ui = new UI();
  const products = new Products();
  // application setup
  ui.setApplication();
  //get product items
  products.getProducts().then(products => {
    ui.loadAllproducts(products);
    Storage.saveCartItems(products);
  }).then( () => {
    ui.getAddToCartBtns();
    ui.cartLogic();
  });
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

    // data.forEach((item, index) => {
    //     const {title, price, description, category} = item.fields;
    //     const {id} = item.sys;
    //     const image = item.fields.image.fields.file.url;
     
    //     let card = document.createElement("a");
    //     card.classList.add("itemCard")
    //     card.innerHTML = `
    //     <img src=${image} alt="">
    //   <h5 class="cardTitle" title="African Print Dress">${title}</h5>
    //   <p>${description}</p>
    //   <div class="itemPrice">
    //       <h5>$${price}</h5>
    //   </div>
    //   <div class="colorTag">
    //   <div class="stars">
    //   <ion-icon name="star"></ion-icon>
    //   <ion-icon name="star"></ion-icon>
    //   <ion-icon name="star"></ion-icon>
    //   <ion-icon name="star"></ion-icon>
    //   <ion-icon name="star"></ion-icon>
    // </div>
    //       <button class="proCart" data-id = ${id}>Buy</button>
    //   </div>
    //     `;
    //     productsArea.appendChild(card);
    // });

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

























































