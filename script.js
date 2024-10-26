// Fetch the cart data from API
fetch('https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889')
    .then(response => response.json())
    .then(data => {
        const cartItems = data.items;
        const cartItemsList = document.getElementById('cart-items-list');
        let subtotal = 0;

        cartItems.forEach(item => {
            // Create the HTML for each cart item
            const cartItemHTML = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="cart-item-details">
                        <h4>${item.title}</h4>
                        <p>Price: ₹${(item.price / 100).toFixed(2)}</p>
                        <p>Subtotal: ₹<span class="item-subtotal">${(item.line_price / 100).toFixed(2)}</span></p>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1">
                        <button class="remove-item-btn">Remove</button>
                    </div>
                </div>
            `;

            // Insert cart item into the list
            cartItemsList.innerHTML += cartItemHTML;
            subtotal += item.line_price / 100;
        });

        // Update subtotal and total
        document.getElementById('subtotal').innerText = `₹${subtotal.toFixed(2)}`;
        document.getElementById('total').innerText = `₹${subtotal.toFixed(2)}`;

        // Add event listeners for quantity changes and item removal
        const quantityInputs = document.querySelectorAll('.quantity-input');
        const removeButtons = document.querySelectorAll('.remove-item-btn');

        quantityInputs.forEach((input, index) => {
            input.addEventListener('change', () => {
                const newQuantity = parseInt(input.value);
                const itemSubtotal = document.querySelectorAll('.item-subtotal')[index];
                const itemPrice = cartItems[index].price / 100;

                // Update the subtotal for that item
                itemSubtotal.innerText = (newQuantity * itemPrice).toFixed(2);

                // Update the overall total
                updateTotals();
            });
        });

        removeButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                // Remove the item
                cartItemsList.children[index].remove();
                cartItems.splice(index, 1);

                // Update the totals
                updateTotals();
            });
        });

        function updateTotals() {
            let newSubtotal = 0;

            document.querySelectorAll('.item-subtotal').forEach(sub => {
                newSubtotal += parseFloat(sub.innerText);
            });

            document.getElementById('subtotal').innerText = `₹${newSubtotal.toFixed(2)}`;
            document.getElementById('total').innerText = `₹${newSubtotal.toFixed(2)}`;
        }
    });
