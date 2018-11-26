let list = [
  "./img/sad.png",
  "./img/dad.png",
  "./img/indiffirent.png",
  "./img/pfff.png",
  "./img/troll.png",
  "./img/rage.png",
  "./img/yellow.png",
  "./img/scream.png"
];
list = list.concat(list);
list.sort(function() {
  return 0.5 - Math.random();
});
let secondClick = false;
let previousElement;
const flip = e => {
  e.currentTarget.classList.toggle("flip");
};

const move = e => {
  flip(e);
  if (secondClick) {
    let currentCard = e.currentTarget.querySelector("img");
    if (currentCard.getAttribute("src") === previousCard.getAttribute("src")) {
      currentCard.classList.add("hidden");
      previousCard.classList.add("hidden");
      second = false;
    }
  } else {
    previousCard = e.currentTarget.querySelector("img");
    secondClick = true;
  }
};
const content = document.getElementById("content");

list.forEach(img => {
  const blank = document.createElement("div");
  blank.classList.add("front");
  let flipper = document.createElement("div");
  flipper.classList.add("flipper");
  flipper.addEventListener("click", e => {
    move(e);
  });
  //  flipper.classList.toggle("move");
  //});
  let image = document.createElement("img");
  image.setAttribute("src", img);

  image.classList.add("back");
  flipper.appendChild(image);
  flipper.appendChild(blank);
  content.appendChild(flipper);
});
