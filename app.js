const menuBtn = document.getElementById("menu-btn");
const mobileMenuEl = document.getElementById("mobileMenu");
const selectedSeatEl = document.getElementById("selected-seat");
const totalBookedEL = document.getElementById("total-booked");
const availableSeatEl = document.getElementById("available-seat");
const inputCouponEl = document.getElementById("input-coupon");
const btnCouponEl = document.getElementById("btn-coupon");
const defaultTextEl = document.getElementById("default-text");
const passengerNameEl = document.getElementById("passenger-name");
const phoneNumberEl = document.getElementById("phone-number");
const emailEl = document.getElementById("email");
const btnNextEl = document.getElementById("btn-next");
const btnContinue = document.getElementById("btn-continue");

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
        event.classList.add("bg-primary", "text-white");

        // booked seat
        selectedSeat.push(event.innerText);
        totalBookedEL.innerText = selectedSeat.length;

        // decrease available seat
        const availableSeatValue = parseFloat(availableSeatEl.innerText);
        availableSeatEl.innerText = availableSeatValue - 1;

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
btnCouponEl.addEventListener('click', function () {
    const couponInputValue = inputCouponEl.value;
    let couponSave = 0;

    // Check if the coupon is valid
    if (couponInputValue === "NEW15") {

        couponSave = totalPrice * 0.15;

        const couponFormEL = document.getElementById("coupon-form");
        couponFormEL.innerHTML =
            `<div class="flex justify-between text-lg font-semibold my-4">
                <p>Discount</p>
                <p>
                    <span>-BDT: </span>
                    <span>${couponSave.toFixed(2)}</span>
                </p>
            </div>`;

        totalPrice = totalPrice - couponSave;
        grandPriceEl.innerText = totalPrice.toFixed(2);
    }

    else if (couponInputValue === "Couple 20") {

        couponSave = totalPrice * 0.20;

        // Hide coupon form 
        const couponFormEL = document.getElementById("coupon-form");
        couponFormEL.innerHTML =
            `<div class="flex justify-between text-lg font-semibold my-4">
                <p>Discount</p>
                <p>
                    <span>-BDT: </span>
                    <span>${couponSave.toFixed(2)}</span>
                </p>
            </div>`;

        totalPrice = totalPrice - couponSave;
        grandPriceEl.innerText = totalPrice.toFixed(2);
    }
    else {
        return alert('You entered wrong coupon');
    }
})

// Function to enable input fields
function enableInputFields() {
    passengerNameEl.removeAttribute("disabled");
    phoneNumberEl.removeAttribute("disabled");
    emailEl.removeAttribute("disabled");
}

function incrementBooked() {
    const currentValue = parseInt(totalBookedEL.innerText);
    totalBookedEL.innerText = currentValue; // Update total booked
    if (parseInt(totalBookedEL.innerText) > 0) {
        enableInputFields(); // Enable input fields when totalBookedEL > 0
    }
}

// enabled next button
phoneNumberEl.addEventListener('input', function (event) {
    const inputValue = event.target.value;
    if (inputValue.length >= 11) {
        btnNextEl.removeAttribute('disabled');
    }
})

// reload the page
btnContinue.addEventListener('click', function () {
    window.location.reload();
})

