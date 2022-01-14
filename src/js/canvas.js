import platform from "../img/platform.png";
import hills from "../img/hills.png";
import background from "../img/background.png";
import platformSmallTall from '../img/platformSmallTall.png'
let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");

canvas.height = 567;
canvas.width = 1024;

let gravity = 1;
let leftWinScenario = 0;

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 30;
    this.height = 30;
  }
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity;
    // else {
    //   this.velocity.y = 0;
    // }
  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.width = image.width;
    this.height = image.height;
    this.image = image;
  }
  draw() {
    // c.fillStyle = "blue";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y,
    };
    this.width = image.width;
    this.height = image.height;
    this.image = image;
  }
  draw() {
    // c.fillStyle = "blue";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}

function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
}

function init() {
  platformImage = createImage(platform);
  player = new Player();
  platforms = [new Platform({ x: 0, y: 470, image: platformImage }),
    new Platform({ x: platformImage.width, y: 470, image: platformImage }),
    new Platform({
      x: platformImage.width * 2 + 100,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 3 + 300,
      y: 470,
      image: platformImage,
    }),
  
    new Platform({
      x: platformImage.width * 4 + 400,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 4 + 100,
      y: 170,
      image: platformImage,
    }),
  
  
    new Platform({
      x: platformImage.width * 5,
      y: 470,
      image: platformImage,
    }),
  
     new Platform({
       x: platformImage.width * 3 + 300 + platformImage.width - platformSmallTallImage.width,
       y: 270,
       image: platformSmallTallImage,
    }),
    
  ];

  genericObjects = [
    new GenericObject({
      x: 0,
      y: 0,
      image: createImage(background),
    }),
    new GenericObject({
      x: 0,
      y: 0,
      image: createImage(hills),
    }),
  ];
  keys = {
    right: {
      pressed: false,
    },
    left: {
      pressed: false,
    },
  };
}

let platformImage = createImage(platform);
let platformSmallTallImage =  createImage(platformSmallTall)
let player = new Player();
let platforms = [
  
];

let genericObjects = [
];
let keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  genericObjects.forEach((genericObject) => {
    genericObject.draw();
  });

  platforms.forEach((platform) => {
    platform.draw();
  });
  player.update();
  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5;
  } else if ((keys.left.pressed && player.position.x > 100) || keys.left.pressed == 0 && player.position.x >0) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;
    if (keys.right.pressed) {
      leftWinScenario += 5;
      platforms.forEach((platform) => {
        platform.position.x -= 5;
      });
      genericObjects.forEach((genericObject) => {
        genericObject.position.x -= 2;
      });
    } else if (keys.left.pressed && leftWinScenario >0) {
      leftWinScenario -= 5;
      platforms.forEach((platform) => {
        platform.position.x += 5;
      });

      genericObjects.forEach((genericObject) => {
        genericObject.position.x += 2;
      });
    }
  }

  //this is for platform detection
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });

  //win condition
  if (leftWinScenario >  platformImage.width * 5 + 300) {
    console.log(leftWinScenario);
    console.log("you win");
  }

  //loss condition
  if (player.position.y > canvas.height) {
    console.log("you lose");
    init();
  }
}
init()
animate();
addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = true;
      break;
    case 83:
      console.log("down");
      break;
    case 68:
      console.log("right");
      keys.right.pressed = true;
      break;
    case 87:
      console.log("up");
      player.velocity.y -= 20;
      break;
  }
});

addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = false;
      break;
    case 83:
      console.log("down");
      break;
    case 68:
      console.log("right");
      keys.right.pressed = false;
      break;
    case 87:
      console.log("up");
      break;
  }
});
