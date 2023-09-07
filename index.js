import { menuArray } from "./data.js"


const menuContainerEl = document.getElementById("menu-container")
const totalContainerEl = document.getElementById("total-container")
const orderListEl = document.getElementById("order-list")
const totalPriceEl = document.getElementById("total-price")

let currTotalPrice = 0


function renderMenuItems(){
    menuContainerEl.innerHTML = getMenuItemsHTML()
}


function getMenuItemsHTML(){
    let htmlText = ""
    menuArray.forEach(item => 
        htmlText += `
        <div class="menu-item">
            <div class="emoji">
                ${item.emoji}
            </div>
            <div class="middle-menu">
                <h2>${item.name}</h2>
                <p class="light-grey thin-margin">${item.ingredients.join(", ")}</p>
                <h4>£${item.price}</h4>
            </div>
            <div>
                <button class="additem-btn pointer-cursor" data-itemid=${item.id}>
                    +
                </button>
            </div>
        </div>
        `)
    return htmlText
}


document.addEventListener("click", function(e){
    if (e.target.dataset.itemid) {
        totalContainerEl.style.display = "block"
        const menuObj = getMenuItemById(e.target.dataset.itemid)
        currTotalPrice += menuObj.price
        updateTotalPrice()
        orderListEl.innerHTML += `
        <div class="total-item">
            <h2>${menuObj.name}</h2>
            <p class="light-grey pointer-cursor middle-menu" data-removeprice="${menuObj.price}">Remove</p>
            <h4>£${menuObj.price}</h4>
        </div>`
    }
    else if (e.target.dataset.removeprice){
        currTotalPrice -= Number(e.target.dataset.removeprice)
        updateTotalPrice()
        e.target.parentNode.parentNode.removeChild(e.target.parentNode)
        if (orderListEl.children.length < 1){
            totalContainerEl.style.display = "none"
        }
    }
})


function getMenuItemById(itemid){
    return menuArray.filter(item => item.id.toString() === itemid)[0]
}


function updateTotalPrice(){
    totalPriceEl.textContent = `£${currTotalPrice}`
}



renderMenuItems()










