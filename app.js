let navButtons = document.getElementsByClassName("nav-link");
let buttonPressed = (e) => {
    for (i of navButtons) {
        i.classList.remove("active");
    }
    e.target.classList.add("active");
};

for (i of navButtons) {
    i.addEventListener("click", buttonPressed);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

const observerLeft = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show-left");
        }
    });
});

const hiddenElementsLeft = document.querySelectorAll(".hidden-left");
hiddenElementsLeft.forEach((el) => observerLeft.observe(el));

const observerRight = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show-right");
        }
    });
});

const hiddenElementsRight = document.querySelectorAll(".hidden-right");
hiddenElementsRight.forEach((el) => observerRight.observe(el));

const reviewText = document.querySelectorAll(".review-text");

async function GetReviewText(id) {
    let res = await fetch(`https://dummyjson.com/comments/${id}`);
    let data = await res.json();
    return data;
}

async function ShowReviewText(id, index) {
    let data = await GetReviewText(id);
    reviewText[index].innerHTML = `"${data.body}"`;
}

for (let i = 1; i <= 3; i++) {
    ShowReviewText(Math.floor(Math.random() * 30 + 1), i - 1);
}

const profileName = document.querySelectorAll(".username");
const profileEmail = document.querySelectorAll(".review-email");
const profileImage = document.querySelectorAll(".review-image");
async function GetProfile() {
    let res = await fetch("https://randomuser.me/api/?results=3");
    let data = await res.json();
    data = data.results;
    return data;
}

async function ShowProfile() {
    let data = await GetProfile();
    for (let i = 0; i < 3; i++) {
        profileName[i].innerHTML = `${data[i].name.first} ${data[i].name.last}`;
        profileEmail[i].innerHTML = `${data[i].email}`;
        profileImage[i].src = `${data[i].picture.medium}`;
    }
}

ShowProfile();

async function GetQuote() {
    let res = await fetch("https://api.api-ninjas.com/v1/quotes", {
        method: "GET",
        headers: {
            "X-Api-Key": config.MY_KEY,
        },
    });
    let data = await res.json();
    return data;
}

const quoteText = document.querySelectorAll(".quote-text");
const quoteAuthor = document.querySelectorAll(".quote-author");
async function ShowQuote() {
    let data = await GetQuote();
    quoteText[0].innerHTML = `"${data[0].quote}"`;
    quoteAuthor[0].innerHTML = `${data[0].author}`;
}

ShowQuote();

window.onbeforeunload = () => {
    window.scrollTo(0, 0);
};
