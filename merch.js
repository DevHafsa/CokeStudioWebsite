if (document.readyState == "loading") {
	document.addEventListener("DOMContentLoaded", ready);
} else {
	ready();
}
/*For each function to make sure they are ready also to get the elements I used by there class name*/
function ready() {
	var removeCartIconButton = document.getElementsByClassName("btn-danger");
	for (var i = 0; i < removeCartIconButton.length; i++) {
		var button = removeCartIconButton[i];
		button.addEventListener("click", removeCartItem);
	}
	var quantityInput = document.getElementsByClassName("cart-quantity-input");
	for (var i = 0; i < quantityInput.length; i++) {
		var input = quantityInput[i];
		input.addEventListener("change", quantityChanged);
	}

	var addToCartButton = document.getElementsByClassName("shop-item-btn");
	for (var i = 0; i < addToCartButton.length; i++) {
		var button = addToCartButton[i];
		button.addEventListener("click", addToCartClicked);
	}

	document
		.getElementsByClassName("btn-purchase")[0]
		.addEventListener("click", purchaseClicked);
}
/* clear out cart after purchase is made */
function purchaseClicked() {
	alert("Thank you for your purchase");
	var cartItems = document.getElementsByClassName("cart-items")[0];
	while (cartItems.hasChildNodes()) {
		cartItems.removeChild(cartItems.firstChild);
	}
	updateCartTotal();
}
/*remove an item and the price changing accourding to that */
function removeCartItem(event) {
	var buttonClicked = event.target;
	buttonClicked.parentElement.parentElement.remove();
	updateCartTotal();
}

function quantityChanged(event) {
	var input = event.target;
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1;
	}
	updateCartTotal();
}
/*add items to cart */
function addToCartClicked(event) {
	var button = event.target;
	var merchItem = button.parentElement.parentElement;
	var title = merchItem.getElementsByClassName("merch-item-title")[0].innerText;
	var price = merchItem.getElementsByClassName("merch-item-price")[0].innerText;
	var imageSrc = merchItem.getElementsByClassName("merch-item-img")[0].src;
	addItemToCart(title, price, imageSrc);
	updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
	var cartRow = document.createElement("div");
	cartRow.classList.add("cart-row");
	var cartItems = document.getElementsByClassName("cart-items")[0];
	var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
	for (var i = 0; i < cartItemNames.length; i++) {
		if (cartItemNames[i].innerText == title) {
			alert("This item is already added to the cart");
			return;
		}
	}
	var cartRowContents = `
    <div class="cart-item cart-column">
		<img class="cart-item-img" src="${imageSrc}" width="103"
		height="100" />
		<span class="cart-item-title">${title}</span>
</div>
<span class="cart-price cart-column">${price}</span>
<div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1" />
    <button class="btn btn-danger" type="button">Remove</button>
</div>`;
	cartRow.innerHTML = cartRowContents;
	cartItems.append(cartRow);
	cartRow
		.getElementsByClassName("btn-danger")[0]
		.addEventListener("click", removeCartItem);
	cartRow
		.getElementsByClassName("cart-quantity-input")[0]
		.addEventListener("change", quantityChanged);
}

/*Code for the update of price when the quantity goes up or down also changes when you add an item*/
function updateCartTotal() {
	var cartItemContainer = document.getElementsByClassName("cart-items")[0];
	var cartRows = cartItemContainer.getElementsByClassName("cart-row");
	var total = 0;
	for (var i = 0; i < cartRows.length; i++) {
		var cartRow = cartRows[i];
		var priceElement = cartRow.getElementsByClassName("cart-price")[0];
		var quantityElement = cartRow.getElementsByClassName(
			"cart-quantity-input"
		)[0];
		var price = parseFloat(priceElement.innerText.replace("$", ""));
		var quantity = quantityElement.value;
		total = total + price * quantity;
	}
	total = Math.round(total * 100) / 100;
	document.getElementsByClassName("cart-total-price")[0].innerText =
		"$" + total;
}
