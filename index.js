"use strict";
//array of our cards
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
//double our cards in the array
list = list.concat(list);

const GAME_BOARD = document.getElementById("content");
const WINNER_STRING = "OK, dude. You are the winner. ";
const TIME_OF_BACK_FLIP = 1200;
const TIME_OF_HIDDING = 800;
let remainingCards,
  secondClick,
  performNextMoveFlag,
  previousFlipper,
  currentFlipper,
  currentImage,
  previousImage;

//funtcion to flip one or more fliper containers
const flip = (...args) => {
  args.forEach(flipper => {
    flipper.classList.toggle("flip");
  });
};

//function that starts next move and handle game over situation
const performNextMove = () => {
  if (remainingCards) {
    secondClick = false;
    previousFlipper = null;
    performNextMoveFlag = true;
  } else {
    GAME_BOARD.textContent = WINNER_STRING;
    let newGameButton = document.createElement("button");
    newGameButton.textContent = "New Game";
    newGameButton.addEventListener("click", newGame);
    GAME_BOARD.appendChild(newGameButton);
  }
};

// hide matches from page, and count how many cards are left in the game
const removeMatches = () => {
  currentFlipper.classList.add("hidden");
  previousFlipper.classList.add("hidden");
  remainingCards -= 2;
  performNextMove();
};

//function that handle moves(clicks on the cards)
const move = event => {
  if (performNextMoveFlag) {
    currentFlipper = event.currentTarget;
    // prettier-ignore
    currentImage = currentFlipper.querySelector("img").getAttribute("src");
  } else return;
  //check the click on the same card, click on not hidden element and possibility of opening cards
  if (
    currentFlipper != previousFlipper &&
    !currentFlipper.classList.contains("hidden") &&
    performNextMoveFlag
  ) {
    flip(currentFlipper);
    if (secondClick) {
      performNextMoveFlag = false;
      if (currentImage != previousImage) {
        setTimeout(() => {
          flip(previousFlipper, currentFlipper);
          performNextMove();
        }, TIME_OF_BACK_FLIP);
      } else {
        setTimeout(() => {
          removeMatches();
        }, TIME_OF_HIDDING);
      }
    } else {
      previousFlipper = currentFlipper;
      previousImage = currentImage;
      secondClick = true;
    }
  }
};

const newGame = () => {
  //shuffle array of cards
  list.sort(() => {
    return 0.5 - Math.random();
  });

  //set game's variables to the start values
  GAME_BOARD.textContent = "";
  remainingCards = list.length;
  secondClick = false;
  performNextMoveFlag = true;

  //render our cards on the page(back sides)
  list.forEach(img => {
    //create blank side of the card
    const blank = document.createElement("div");
    blank.classList.add("front");

    //create our flipper container
    let flipper = document.createElement("div");
    flipper.classList.add("flipper");

    //add event listnee to our flipper container
    flipper.addEventListener("mousedown", move);

    //create image on back side of our card
    let image = document.createElement("img");
    image.setAttribute("src", img);
    image.classList.add("back");

    //add back and front of our card to the flipper
    flipper.append(image, blank);

    //add aour flipper to the page
    GAME_BOARD.appendChild(flipper);
  });
};

newGame();
