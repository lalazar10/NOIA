const products = {
    1: {
        name: "Classic Crochet Handbag",
        price: 299,
        image: "images/product1.png",
        description: "Handcrafted with premium materials, this classic handbag features intricate crochet patterns and gold hardware details. Perfect for both casual and formal occasions.",
        customizable: true
    },
    2: {
        name: "Elegant Wool Scarf",
        price: 199,
        image: "images/product2.png",
        description: "A luxurious wool scarf featuring delicate crochet patterns. Soft to touch and perfectly warm for chilly days.",
        customizable: true
    },
    3: {
        name: "Summer Crop Top",
        price: 249,
        image: "images/product3.png",
        description: "A sophisticated crochet crop top perfect for summer. Features a delicate pattern and comfortable fit.",
        customizable: false
    }
};

const charms = {
    1: {
        name: "Butterfly Charm",
        price: 29,
        image: "images/charm1.png"
    },
    2: {
        name: "Heart Charm",
        price: 25,
        image: "images/charm2.png"
    },
    3: {
        name: "Star Charm",
        price: 25,
        image: "images/charm3.png"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    let totalPrice = 0;
    let selectedCharms = new Set();
    
    if (productId && products[productId]) {
        const product = products[productId];
        totalPrice = product.price;
        
        document.title = `${product.name} | NOIA`;
        document.getElementById('product-img').src = product.image;
        document.getElementById('product-img').alt = product.name;
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = `$${totalPrice}`;
        document.querySelector('.product-description').textContent = product.description;

        // Show customization section if product is customizable
        if (product.customizable) {
            const customSection = document.querySelector('.customization-section');
            customSection.style.display = 'block';
            
            // Create charm options
            const charmContainer = document.querySelector('.charm-options');
            Object.entries(charms).forEach(([id, charm]) => {
                const charmDiv = document.createElement('div');
                charmDiv.className = 'charm-option';
                charmDiv.innerHTML = `
                    <img src="${charm.image}" alt="${charm.name}">
                    <p>${charm.name}</p>
                    <p>$${charm.price}</p>
                    <button class="charm-toggle" data-id="${id}">Add</button> 
                `; // Attach Id to button for later use
                charmContainer.appendChild(charmDiv);
            });

            // Handle charm selection
            // If A charm is already selected, remove it from the set and move on. If not, add it and calculate the final price
            document.querySelectorAll('.charm-toggle').forEach(button => {
                button.addEventListener('click', () => {
                    const charmId = button.dataset.id;
                    if (selectedCharms.has(charmId)) {
                        selectedCharms.delete(charmId);
                        button.textContent = 'Add';
                        button.classList.remove('selected');
                        totalPrice -= charms[charmId].price;
                    } else {
                        selectedCharms.add(charmId);
                        button.textContent = 'Remove';
                        button.classList.add('selected');
                        totalPrice += charms[charmId].price;
                    }
                    document.getElementById('product-price').textContent = `$${totalPrice}`;
                });
            });
        }
    } else {
        // If product id doesn't exist then return to products page
        window.location.href = 'products.html';
    }
});