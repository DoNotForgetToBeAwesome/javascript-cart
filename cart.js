let data,
    products = document.querySelector('.products aside'),
    itemsInCart = document.querySelector('.itemsInCart'),
    price,
    cartItems = [],
    quantity = 0,
    total_price = 0,
    buttons,
    remove;
let getData = new Promise((resolve, reject) => {
    resolve(async () => {
        let temp = await fetch('https://fakestoreapi.com/products')
        data = await temp.json();
        showData();

    })
    reject('Error while fetching')
})

getData.then(
    result => result(),
    error => console.log('error')
)
getData.catch(
    error => console.log(error))


function showData() {
    data.forEach(e => {
        let article = document.createElement('article');
        article.innerHTML = `<img src="${e.image}"/>
        <section>
        <h2>${e.title.slice(0, 10)}</h2>
        <h4>${e.category}</h4>
            <h3>${e.description.slice(0, 150)}</h3>
            <p><strong>Starting at:</strong>${e.price}</span></p>
            <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight">ADD</button> </section>`;
        products.appendChild(article);


    });
    buttons = document.querySelectorAll('.products button');
    addItemsToCart();

}
let multipleQuantity = 1;
function addItemsToCart() {
    buttons.forEach((e, i) => {

        e.addEventListener('click', () => {
            if (cartItems.some((x, y) => data[i] == x)) {
                cartItems.forEach((a, b) => {
                    if (data[i] == a) {
                        a.quantity++;
                        a.price = a.price * a.quantity;
                    }
                })
            }
            else {
                data[i].quantity = 1;
                cartItems.push(data[i]);
                multipleQuantity = 1;

            }

            showCartData();
            buttons[i].innerHTML = 'Added';
        })
    })
}

function showCartData() {
    itemsInCart.innerHTML = '';
    cartItems.forEach((e, i) => {
        let article = document.createElement('article');
        article.innerHTML = `<img src="${e.image}"/>
    <section>
    <h5>${e.title.slice(0, 10)}</h5>
    <h6>${e.category}</h6>
    <h6>Quantity: <strong><span>${e.quantity}</span></strong></h6>

    <p>Total price:<strong>${e.price}</strong></p>
     </section> <button>REMOVE</button>`;
        itemsInCart.appendChild(article);
    })
    remove = document.querySelectorAll('.itemsInCart article button');
    removeItems();
}


function removeItems() {

    remove.forEach((e, i) => {
        e.addEventListener('click', () => {
            data.forEach((x, y) => {
                if (x == cartItems[i]) {
                    buttons[y].innerHTML = 'ADD';
                }
            })
            cartItems.splice(i, 1);
            showCartData();

            if (cartItems.length == 0) {
                itemsInCart.innerHTML = `  <img src="./125469-meditating-panda.gif" alt="">
                                        <h3>YOUR CART IS EMPTY...!</h3>`
            }
        })

    })
}


