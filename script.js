var cart = []; // holds all the items in the cart

var Item = function(name, price, quantity) {  // object: set of info for each item
    this.name = name,
    this.price = price, 
    this.quantity = quantity
}

function addItemToCart(name, price, quantity) {
    for ( var i in cart ) {
        if ( cart[i].name === name ) {
            cart[i].quantity += quantity;
            return;
        }
    }
    var item = new Item(name, price, quantity);
    cart.push(item);
};

function clearCart() {
    cart = [];
    var zero = 0;
    document.getElementById("c0").textContent = zero;
    document.getElementById("d0").textContent = zero;
    document.getElementById("c1").textContent = zero;
    document.getElementById("d1").textContent = zero;
    document.getElementById("c2").textContent = zero;
    document.getElementById("d2").textContent = zero;
    document.getElementById("total").textContent = zero;
};

$(document).ready(function(){
    $("button").click(function(){
      var postData = {
        'cart' : cart,
        'url' : window.location.hostname
      };
        $.ajax({
            type:'post',
            url:'../PHP/Checkout.php',
            data: JSON.stringify(postData),
            fail: function() {
                // If the request failed to send to the server.
            },
            success : function(response) {
                // do something with the response.
            }
      });
    })
});  

function displayInCart() {
  var totalCost = 0;
  for (var i = 0; i < cart.length; i++) {
    var name = cart[i].name;
    var price = cart[i].price;
    var quantity = cart[i].quantity;
    var subCost = price * quantity;
    var subCostFixed = subCost.toFixed(2)
    var subCostFixedParsed = parseFloat(subCostFixed);
    totalCost += subCostFixedParsed;
    if(i == 0){
      document.getElementById("a0").textContent = name;
      document.getElementById("b0").textContent = price;
      document.getElementById("c0").textContent = quantity;
      document.getElementById("d0").textContent = subCostFixed;
    } else if (i == 1) {
      document.getElementById("a1").textContent = name;
      document.getElementById("b1").textContent = price;
      document.getElementById("c1").textContent = quantity;
      document.getElementById("d1").textContent = subCostFixed;
    } else if (i == 2) {
      document.getElementById("a2").textContent = name;
      document.getElementById("b2").textContent = price;
      document.getElementById("c2").textContent = quantity;
      document.getElementById("d2").textContent = subCostFixed;
    }
    document.getElementById("total").textContent = ("$" + totalCost.toFixed(2)); 
  }
};
