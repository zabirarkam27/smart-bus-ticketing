const menuBtn = document.getElementById("menu-btn");
const mobileMenuEl = document.getElementById("mobileMenu");
const selectedSeatEl = document.getElementById("selected-seat");
const totalBookedEL = document.getElementById("total-booked");
const availableSeatEl = document.getElementById("available-seat");
const inputCouponEl = document.getElementById("input-coupon");
const btnCouponEl = document.getElementById("btn-coupon");
const defaultTextEl = document.getElementById("default-text");
let totalPriceEl = document.getElementById("total-price");
let grandPriceEl = document.getElementById("grand-price");

let selectedSeat = [];
let totalPrice = 0;

// menu icons
// menuBtn.addEventListener('click', function () {
//     menuBtn.children[0].classList.toggle("hidden");
//     const menuCloseBtn = document.getElementById("close-icon");
//     menuCloseBtn.classList.toggle("hidden");
//     mobileMenuEl.classList.toggle("hidden");
//     mobileMenuEl.classList.toggle("flex");
// })

function handleSelectSeat(event) {
    const value = event.innerText;

    if (selectedSeat.includes(value)) {
        return alert('This Seat is already booked');
    } else if (selectedSeat.length < 4) {
        event.classList.add("bg-primary");
        event.classList.add("text-white");

        // booked seat
        selectedSeat.push(event.innerText);
        totalBookedEL.innerText = selectedSeat.length;

        // decrease available seat
        const availableSeatValue = parseFloat(availableSeatEl.innerText);
        const newAvailableSeatValue = availableSeatValue - 1;
        availableSeatEl.innerText = newAvailableSeatValue;

        // remove default text
        defaultTextEl.classList.add('hidden');

        // add seats
        selectedSeatEl.innerHTML += `<li class="text-base font-normal flex justify-between">
            <span>${event.innerText}</span>
            <span>Economy</span>
            <span>550</span>
        </li>`

        // update total price
        totalPrice += 550;
        totalPriceEl.innerText = totalPrice.toFixed(2);

        // active coupon button
        if (selectedSeat.length > 3) {
            inputCouponEl.removeAttribute('disabled');
            btnCouponEl.removeAttribute('disabled');
        }
    } else {
        return alert('You added maximum seats');
    }
}

// coupon button function
document.getElementById('btn-coupon').addEventListener('click', function() {
    const couponInputValue = inputCouponEl.value;

    if(couponInputValue === "NEW15"){
        totalPrice *= 0.85;
        grandPriceEl.innerText = totalPrice;
    } else if(couponInputValue === "Couple 20"){
        totalPrice *= 0.80;
        grandPriceEl.innerText = totalPrice;
    }

    else{
        return alert('You entered wrong coupon');
    }
})