// Search button
let searchBtn = document.querySelector(".search-icon");

searchBtn.onclick = function () {
    alert("Search clicked!");
};

// Cart
let cart = document.querySelector(".nav-cart");

cart.onclick = function () {
    alert("Cart is empty.");
};

// Back to Top
let topBtn = document.querySelector(".foot-panel1");

topBtn.onclick = function () {
    window.scrollTo(0, 0);
};