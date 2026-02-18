const loadMsg = document.getElementById("loadmsg");
const loadMsg2 = document.getElementById("loadmsg2");

const age = Number(localStorage.getItem("age"));
const gender = localStorage.getItem("gender");

if (isNaN(age) || !gender) {
    window.location.href = "form.html";
}

if (age < 18) {

    loadMsg.textContent = "alright kiddo hold up for a sec 😌";
    setTimeout(() => {
        typeEffect(loadMsg2, "you still in tutorial mode fr 😂", 100);
    }, 2000);

} else if (age >= 18 && gender === "male") {

    loadMsg.textContent = "aight my g hold up for a sec 😎";
    setTimeout(() => {
        typeEffect(loadMsg2, "hadda break it to you boy but you unc mate 😭", 100);
    }, 2000);

} else if (age >= 18 && gender === "female") {

    loadMsg.textContent = "aight hold up for a sec slay queen 💅🏻";
    setTimeout(() => {
        typeEffect(loadMsg2, "hadda break it to you but girl soon you’ll be an aunty 😭", 100);
    }, 2000);

} else if (age >= 18 && gender === "others") {

    loadMsg.textContent = "aight hold up for a sec champ 🏳️‍🌈";
    setTimeout(() => {
        typeEffect(loadMsg2, "don't forget to be yourself and stay true to your values ✨", 100);
    }, 2000);
}

setTimeout(() => {
    window.location.href = "home.html";
}, 10000);

function typeEffect(element, text, speed) {
    element.textContent = ""; 
    let i = 0;
    const interval = setInterval(() => {
        element.textContent += text[i];
        i++;

        if (i === text.length) {
            clearInterval(interval);
        }
    }, speed);
}
