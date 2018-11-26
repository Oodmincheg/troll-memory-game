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
let previousFlipper, previousImage;

//funtcion to flip one or more fliper containers
const flip = function() {
  [...arguments].forEach(flipper => {
    flipper.classList.toggle("flip");
  });
};

const move = event => {
  const currentFlipper = event.currentTarget;
  const currentImage = event.currentTarget
    .querySelector("img")
    .getAttribute("src");
  //check the click on the same card
  if (currentFlipper != previousFlipper) {
    flip(currentFlipper);
    if (secondClick) {
      if (currentImage != previousImage) {
        setTimeout(() => {
          flip(previousFlipper, currentFlipper);
        }, 1500);
        secondClick = false;
      } else {
        currentFlipper.classList.add("hidden");
        previousFlipper.classList.add("hidden");
      }
    } else {
      console.clear();
      previousFlipper = currentFlipper;
      previousImage = currentImage;
      secondClick = true;
    }
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
