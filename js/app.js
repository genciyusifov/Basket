const product = [
    {
        id : 1,
        name : "Iphone",
        image : "https://www.cnet.com/a/img/resize/4dfd428ca182e0b90a2262b2df6cdb0ceb0355ae/hub/2020/10/30/067bd108-d594-41a2-a390-2a73f9f1ad41/apple-iphone-12-confetti-9923.jpg?auto=webp&fit=crop&height=1200&width=1200",
        description : "2021 ci il istehsali bir mehsuldu",
        price : 900
    },
    {
        id: 2,
        name: "Samsung Galaxy S21",
        image: "https://images.samsung.com/sg/smartphones/galaxy-s21/buy/s21_ultra_basicgroup_kv_mo_img.jpg",
        description: "2021 ilinin secilmis mehsulu",
        price: 1000 ,
    },
    {
        id: 3,
        name: "Google Pixel 6",
        image: "https://www.cnet.com/a/img/resize/200ee8cfb78f060d23bbc01001290502c05cf13e/hub/2021/10/19/ea2bc445-7ece-4bef-b58c-e278309903e7/pixel-6-pro-8.jpg?auto=webp&fit=crop&height=675&width=1200",
        description: "Yeni nesil bir Android telefon",
        price: 800
    },
    {
        id: 4,
        name: "Huawei P40 Pro",
        image: "https://www.digitaltrends.com/wp-content/uploads/2020/05/huawei-p40-pro-rear-jacket.jpg?fit=1500%2C1000&p=1",
        description: "Guclu kamera",
        price: 950
    },
    {
        id: 5,
        name: "Xiaomi Mi 11",
        image: "https://strgimgr.umico.az/sized/840/177836-37991b34aa13196f3c22cdabdb3ba46a.jpg",
        description: "Güclu bir performansa malik ",
        price: 850
    },
    {
        id: 6,
        name: "OnePlus 9 Pro",
        image: "https://cdn.shopify.com/s/files/1/0077/5513/7083/products/29f79eb7-eda9-4e69-813a-d97acd3a67e5_1200x.jpg?v=1626428822",
        description: "OnePlus'ın en yeni numunesi",
        price: 950,
    },
    {
        id: 7,
        name: "Sony Xperia 1 III",
        image: "https://www.trustedreviews.com/wp-content/uploads/sites/54/2020/06/DSCF8810-scaled.jpg",
        description: "Profesyonel kamera",
        price: 1100
    },
    {
        id: 8,
        name: "LG Velvet",
        image: "https://www.lg.com/us/images/mobile-accessories/md07513924/gallery/desktop-01-v1.jpg",
        description: "Mükəmməl görünüş",
        price: 700
    }
]
const cards = document.querySelector("#cards")
const onBasket = document.querySelector(".basket")
const basket = JSON.parse(localStorage.getItem("basket")) || []
// console.log(basket);
product.forEach(item => {
    cards.innerHTML += `
        <div class="card">
            <img src="${item.image}" alt="Ürün Resmi">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p style="font-weight:650">${item.price}$</p>
            <button class="but" onclick="addToBasket(${item.id},this)">Add to basket</button>
        </div>
    `;
    
});
// function Salam(){
//     if(basket.length < 1){
//         onBasket.style.display = "none"
//     }
// }

function addToBasket(itemId,button) {
    const selectedProduct = product.find(item => item.id === itemId);
    const existingItem = basket.find(item => item.id === itemId);
    // console.log(existingItem);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        basket.push({
            id: selectedProduct.id,
            name: selectedProduct.name,
            image: selectedProduct.image,
            price: selectedProduct.price,
            quantity: 1

        });
    }

    saveBasketToLocalStorage();
    renderBasket(); 
    button.style.backgroundColor = "green"
    button.style.color = "white"
}

function saveBasketToLocalStorage() {
    localStorage.setItem("basket", JSON.stringify(basket));
}

function renderBasket() {
    onBasket.innerHTML = "";

    basket.forEach(item => {
        onBasket.innerHTML += `
            <div class="product">
                <img src="${item.image}" alt="sle">
                <div style="width:100px" >${item.name}</div>
                <div>${item.price} $</div>
                <div>
                    <button onclick="azalt(${item.id})">-</button>
                    <input type="number" value="${item.quantity}" >
                    <button onclick="artir(${item.id})">+</button>
                    </div>
                    <div onclick="remove(${item.id})"> <i class="fa-regular fa-trash-can"></i></div>
            </div>
        `;
    });
}

function azalt(itemId) {
    const selectedItem = basket.find(item => item.id === itemId);
    if (selectedItem) {
        if (selectedItem.quantity > 0) {
            selectedItem.quantity -= 1;
            if (selectedItem.quantity === 0) {
                removeItem(itemId);
            } else {
                saveBasketToLocalStorage();
                renderBasket();
                // Salam()
            }
        }
    }
}

function artir(itemId) {
    const selectedItem = basket.find(item => item.id === itemId);
    if (selectedItem) {
        selectedItem.quantity += 1;
        saveBasketToLocalStorage();
        renderBasket();
    }
}

function removeItem(itemId) {
    const itemIndex = basket.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
        basket.splice(itemIndex, 1);
        saveBasketToLocalStorage();
        renderBasket();
    }
}
function remove(itemId) {
    const itemIndex = basket.find(item => item.id === itemId)
    basket.splice(itemIndex , 1)
    saveBasketToLocalStorage()
    renderBasket()
}


function basketOn() {
    if (basket.length > 0) {        
        onBasket.classList.toggle('d-block');
    }else {
        alert("Səbətiniz boşdur")
    }
}


renderBasket();
