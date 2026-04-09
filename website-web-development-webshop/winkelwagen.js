
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {

    
    loadCart();

    var purchaseButton = document.getElementsByClassName('btn-purchase')[0];
    if (purchaseButton) {
        purchaseButton.addEventListener('click', purchaseClicked);
    }
}

function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement;

    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;

    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    var existing = cart.find(item => item.title === title);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            title: title,
            price: price,
            image: imageSrc,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));


    window.location.href = "winkelwagen.html";
}
function loadCart() {
    var cartItems = document.getElementsByClassName('cart-items')[0];
    if (!cartItems) return;

    cartItems.innerHTML = "";

    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.forEach(item => {
        addItemToCart(item.title, item.price, item.image, item.quantity);
    });

    updateCartTotal();
}


function addItemToCart(title, price, imageSrc, quantity = 1) {

    var cartItems = document.getElementsByClassName('cart-items')[0];
    if (!cartItems) return;

    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');

    var cartRowContents = `
        <div class="cart-item">
            <img src="${imageSrc}" width="80">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price">${price}</span>
        <div class="cart-quantity">
            <input class="cart-quantity-input" type="number" value="${quantity}">
            <button class="btn-danger">Verwijder</button>
        </div>
    `;

    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);

    cartRow.getElementsByClassName('btn-danger')[0]
        .addEventListener('click', function () {
            removeCartItem(title);
        });

   
    cartRow.getElementsByClassName('cart-quantity-input')[0]
        .addEventListener('change', function (event) {
            quantityChanged(event, title);
        });
}


function removeCartItem(title) {

    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.filter(item => item.title !== title);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
}


function quantityChanged(event, title) {

    var input = event.target;

    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }

    var cart = JSON.parse(localStorage.getItem("cart")) || [];

    var item = cart.find(i => i.title === title);
    if (item) {
        item.quantity = parseInt(input.value);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartTotal();
}


function updateCartTotal() {

    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    if (!cartItemContainer) return;

    var cartRows = cartItemContainer.getElementsByClassName('cart-row');

    var total = 0;

    for (var i = 0; i < cartRows.length; i++) {

        var cartRow = cartRows[i];

        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];

        var priceText = priceElement.innerText;

        
        var price = priceText
            .replace('€', '')
            .replace(',', '.')
            .replace('vanaf', '')
            .replace('per bos', '')
            .replace('per pot', '')
            .replace('-', '')
            .trim();

        price = parseFloat(price) || 0;

        var quantity = quantityElement.value;

        total += price * quantity;
    }

    total = Math.round(total * 100) / 100;

    var totalElement = document.getElementsByClassName('cart-total-price')[0];
    if (totalElement) {
        totalElement.innerText = '€' + total.toFixed(2);
    }
}


function purchaseClicked() {

    alert('Bedankt voor je aankoop! 🌸');

    localStorage.removeItem("cart");

    loadCart();
}