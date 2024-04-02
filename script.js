const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("#mm");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdown) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name == "from" && currCode == "USD") {
            newOption.selected = "selected";;
        }
        if (select.name == "to" && currCode == "BDT") {
            newOption.selected = "selected";;
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);

    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    console.log(currCode);
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}
window.addEventListener("load", () => {
    update();
})
const update = async () => {
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    console.log(amtValue);
    if (amtValue == "" || amtValue < 1) {
        alert("You have entered a negative amount");
        amount.value=1;
        amtValue = 1;
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);


    let data = await response.json();
    //console.log(data);
    let rat = data[fromCurr.value.toLowerCase()];
    let rate = rat[toCurr.value.toLowerCase()];
    console.log(rate);
    let finalAmount = amtValue * rate;
    msg.innerText = ` ${finalAmount} ${toCurr.value}`;
}
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    // Adjust the delay time as needed
    update();
    //ss;
});
btn.addEventListener("click", () => {
    btn.classList.add("button-clicked");

  // Remove the 'button-clicked' class after a short delay to revert back to original state
    const ss=setTimeout(() => {
        btn.classList.remove("button-clicked");
        console.log("why");
    }, 250); 
});