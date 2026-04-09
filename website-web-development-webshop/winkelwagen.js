
document.addEventListener('DOMContentLoaded', function() {
    displayCart();
    updateTotal();
});


function displayCart() {
    const cartContainer = document.getElementById('cartItems');
    const cart = getCart();
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<div class="empty-cart"><p>Uw winkelwagen is leeg</p><a href="Asortiment.html">Terug naar assortiment</a></div>';
        return;
    }
    
    cartContainer.innerHTML = '';
    cart.forEach((item, index) => {
        const itemDiv = createCartItemElement(item, index);
        cartContainer.appendChild(itemDiv);
    });
}


    
    var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    
    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    
    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }

    
    document.getElementsByClassName('btn-purchase')[0]
        .addEventListener('click', purchaseClicked);
}


function addToCart(name, price, image) {
    const cart = getCart();
    
  
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    saveCart(cart);
}


function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    displayCart();
    updateTotal();
}


function updateQuantity(index, quantity) {
    const cart = getCart();
    quantity = parseInt(quantity);
    
    if (isNaN(quantity) || quantity < 1) {
        quantity = 1;
    }
    
    cart[index].quantity = quantity;
    saveCart(cart);
    displayCart();
    updateTotal();
}


function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}


function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}


function updateTotal() {
    const cart = getCart();
    let total = 0;
    
    cart.forEach(item => {
        const priceText = item.price.replace('€', '').replace(',-', '').replace('van af ', '').trim();
        const priceNum = parseFloat(priceText.split(' ')[0]) || 0;
        total += priceNum * item.quantity;
    });
    
    document.getElementById('totalPrice').innerText = '€' + total.toFixed(2);
}


function purchaseClicked() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('Uw winkelwagen is leeg');
        return;
    }
    
    alert('Bedankt voor uw aankoop!');
    localStorage.removeItem('cart');
    displayCart();
    updateTotal();
}
