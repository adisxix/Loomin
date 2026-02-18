const form = document.getElementById("userForm");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const age = Number(document.getElementById("age").value.trim());
    const gender = document.querySelector('input[name="gender"]:checked');

    if (firstName === "" || lastName === "" || isNaN(age) || !gender) {
        popup.style.display = "flex";
    } else {
        localStorage.setItem("firstname", firstName);
        localStorage.setItem("lastname", lastName);
        localStorage.setItem("age", age);
        localStorage.setItem("gender", gender.value);

        window.location.href = "loading.html";
    }
});

closePopup.addEventListener("click", function () {
    popup.style.display = "none";
});
