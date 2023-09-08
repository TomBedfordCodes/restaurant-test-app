import { menuArray } from "./data.js"


const menuContainerEl = document.getElementById("menu-container")
const totalContainerEl = document.getElementById("total-container")
const orderListEl = document.getElementById("order-list")
const totalPriceEl = document.getElementById("total-price")
const orderButton = document.getElementById("order-button")
const overlayModal = document.getElementById("overlay")
const paymentModal = document.getElementById("payment-modal")
const paymentForm = document.getElementById("payment-form")
const submittedMessage = document.getElementById("submitted-message")


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
    if (!paymentModal.hidden && !paymentModal.contains(e.target)){
        overlayModal.hidden = true
        paymentModal.hidden = true
    }
    else if (e.target === orderButton){
        overlayModal.hidden = false
        paymentModal.hidden = false
    }
    else if (e.target.dataset.itemid) {
        totalContainerEl.hidden = false
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
            totalContainerEl.hidden = true
        }
    }
})


function getMenuItemById(itemid){
    return menuArray.filter(item => item.id.toString() === itemid)[0]
}


function updateTotalPrice(){
    totalPriceEl.textContent = `£${currTotalPrice}`
}


paymentForm.addEventListener("submit", function(e){
    e.preventDefault()
    const paymentFormData = new FormData(paymentForm)
    submittedMessage.innerText = `Thanks ${paymentFormData.get("customerName")}, your order is on its way!`
    submittedMessage.hidden = false
    overlayModal.hidden = true
    paymentModal.hidden = true
    totalContainerEl.hidden = true
    orderListEl.innerHTML = ""
    currTotalPrice = 0
    setTimeout(function(){
        submittedMessage.hidden = true
    }, 5000)
})


renderMenuItems()










