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


const content = document.getElementById("content");
list.forEach(img => {
  let image = document.createElement("img");
  image.setAttribute("src", img);
  content.appendChild(image);
});
