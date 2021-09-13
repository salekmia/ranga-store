const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.images;
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
      <div class="card">
        <img src=${product.image} class="card-img-top img-fluid w-50" style="margin-left: 25%" alt="...">
        <div class="card-body">
          <h4 class="card-title text-center">${product.title}</h4>
          <p class="text-center">Category: ${product.category}</p>
          <div class="d-flex justify-content-between mx-4 my-2">
            <small class="text-success">Ratings: <span class="fw-bold">${product.rating.count}</span></small>
            <small class="text-success">Rating rate: <span class="fw-bold">${product.rating.rate}</span></small>
          </div>
          <h2 class="text-center">Price: $ ${product.price}</h2>
          <div class="d-flex justify-content-between mt-3 mx-4">
            <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-outline-primary">add to cart</button>
            <button onclick="showDetails(${product.id})" id="details-btn" class="btn btn-outline-info">Details</button></div>
          </div>
        </div>
      </div>
    `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal()
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2)
};
updateTotal()

// Buy Now button handler
const buyNow = () => {
  alert('Thanks, your order has been taken.')
}

// Show Details
const showDetails = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`
  fetch(url)
  .then(res => res.json())
  .then(data => displayDetails(data))
}

const displayDetails = (data) => {
  const productDetails = document.getElementById('product-details')
  const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
      <div class="card">
      <button class="btn btn-sm mt-1 fs-2 ms-auto me-4 close-button" id='close' onclick='this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode); return false;'>x</button>
        <img src=${data.image} class="card-img-top img-fluid w-50" style="margin-left: 25%" alt="...">
        <div class="card-body">
          <h4 class="card-title">${data.title}</h4>
          <p>Category: ${data.category}</p>
          <div class="d-flex justify-content-start my-2">
            <small class="text-success me-2">Ratings: <span class="fw-bold">${data.rating.count}</span></small>
            <small class="text-success ms-2">Rating rate: <span class="fw-bold">${data.rating.rate}</span></small>
          </div>
          <p>${data.description}</p>
          <h2>Price: $ ${data.price}</h2>
          <div class="d-flex justify-content-start mt-3">
            <button onclick="addToCart(${data.id},${data.price})" id="addToCart-btn" class="btn btn-outline-primary">add to cart</button>
          </div>
        </div>
      </div>
    `;
    productDetails.innerHTML = ''
    productDetails.appendChild(div)
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
