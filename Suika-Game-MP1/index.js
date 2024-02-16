// In order to make it more simply to reference these things from matterJS according to their examples
var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Runner = Matter.Runner,
  Body = Matter.Body,
  Events = Matter.Events,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint,
  collision = Matter.Collision;

// creating my engine
const engine = Engine.create();
// create a renderer with important square information for my specific layout
const render = Render.create({
  engine,
  element: document.body,
  options: {
    // without wireframes false I could load the color of box?
    wireframes: false,
    background: "#c27802",
    width: 620,
    height: 850,
  },
});
// referencing the "world" creation only after defining engine earlier.
const world = engine.world;
// setting up the play arena
// rectangle params (x, y, width, height, options) will edit later
// is static keeps everything in place
const rightWall = Bodies.rectangle(605, 395, 30, 790, {
  isStatic: true,
  render: { fillStyle: "#f79900 " },
});
const leftwall = Bodies.rectangle(15, 395, 30, 790, {
  isStatic: true,
  render: { fillStyle: "#f79900 " },
});
const floor = Bodies.rectangle(310, 820, 620, 60, {
  isStatic: true,
  render: { fillStyle: "#f79900 " },

});
const endGame = Bodies.rectangle(310, 150, 620, 2, {
  name: "endGame",
  isStatic: true,
  // sensor allows for passthrough
  isSensor: true,
  render: { fillStyle: "red" },
});
// adding created walls to the world
World.add(world, [rightWall, leftwall, floor, endGame]);

// creating runner
var runner = Runner.create();
Runner.run(runner, engine);
Render.run(render);

// for manipulating placement
let thisBody = null;
let thisFruit = null;
// to make moving the fruit around faster
let interval = null;

// associating fruit images with different sizes to act somewhat like a switch case
const Fruits = [
  // fruit sizes from youtube video suika gameplay tips and tricks at 1:20
  // and from 빵형의 개발도상국 but are changable depending on box size
  {
    id: 0,
    name: "./Fruits/SuikaCherry.png",
    radius: 33 / 2,
    // unattainable bc nothing combines to become a cherry
    points: 1,
  },
  {
    id: 1,
    name: "./Fruits/SuikaStrawberry.png",
    radius: 48 / 2,
    points: 3,
  },
  {
    id: 2,
    name: "./Fruits/SuikaGrape.png",
    radius: 61 / 2,
    points: 6,
  },
  {
    id: 3,
    name: "./Fruits/SuikaDekopon.png",
    radius: 69 / 2,
    points: 10,
  },
  {
    id: 4,
    name: "./Fruits/SuikaOrange.png",
    radius: 89 / 2,
    points: 15,
  },
  {
    id: 5,
    name: "./Fruits/SuikaApple.png",
    radius: 114 / 2,
    points: 21,
  },
  {
    id: 6,
    name: "./Fruits/SuikaPear.png",
    radius: 129 / 2,
    points: 28,
  },
  {
    id: 7,
    name: "./Fruits/SuikaPeach.png",
    radius: 156 / 2,
    points: 36,
  },
  {
    id: 8,
    name: "./Fruits/SuikaPineapple.png",
    radius: 177 / 2,
    points: 45,
  },
  {
    id: 9,
    name: "./Fruits/SuikaMelon.png",
    radius: 220 / 2,
    points: 55,
  },
  {
    id: 10,
    name: "./Fruits/SuikaWatermelon.png",
    radius: 259 / 2,
    points: 66,
  },
];

function spawnFruit() {
  const index = Math.floor(Math.random() * 5);
  const fruit = Fruits[index];

  // used to create the circle body depending on image and radius of the fruit
  const body = Bodies.circle(300, 50, fruit.radius, {
    // according to stackOverflow this is what I was missing when trying to collide with only bodies of the same index
    index: index,
    // makes sure that the fruit don't fall right away. They need to be woken up by something.
    isSleeping: true,
    // allows circle to be any fruit image depending on my "Fruits" section
    render: {
      sprite: {
        texture: `${fruit.name}`,
      },
    },
    // defines the elasticity of the body and bounces depending on "value"% of its kinetic energy. Possibly depermined by the radius
    restitution: 0.3,
  });

  thisBody = body;
  thisFruit = fruit;

  // add bodies to the world
  World.add(world, [body]);
}

// for manipulating a timeout
let disableSpawn = false;

// allowing the controlling of where to drop the fruit
window.onkeydown = (event) => {
  // turns off the ability to activate an event and in this case it is spawning fruit
  if (disableSpawn) {
    return;
  }
  // chaning keyCode to just Code would allow inputs like "keyA" instead of "37"
  switch (event.keyCode) {
    case 37:
      // when the button is pressed set interval goes off so that the function will be executed every 15 milliseconds. I had it lower before but it felt too fast and hard to control the placement of the fruit
      if (interval) return;
      interval = setInterval(() => {
        // to ensure that you cant drop fruit outside of the walls. 30 because this is the width of the left wall
        if (thisBody.position.x - thisFruit.radius > 30)
          Body.setPosition(thisBody, {
            x: thisBody.position.x - 10,
            y: thisBody.position.y,
          });
        // 15 is the milliseconds between each input of the function if the button is held down
      }, 15);
      break;
    case 39:
      // when the button is pressed set interval goes off so that the function will be executed every 15 milliseconds. I had it lower before but it felt too fast and hard to control the placement of the fruit
      if (interval) return;
      interval = setInterval(() => {
        // ensure you cant drop fruit outside of the walls but isntead of 30 it is 590 because that is the total length - width of the wall since it the right wall and the position in x pixels would be high towards the rightside.
        if (thisBody.position.x + thisFruit.radius < 590)
          Body.setPosition(thisBody, {
            x: thisBody.position.x + 10,
            y: thisBody.position.y,
          });
      }, 15);
      break;
    // drops fruit and spawns another one
    case 40:
      thisBody.isSleeping = false;
      // creates a delay between when fruit can be dropped in case someone accidentally holds down the spawn key
      disableSpawn = true;
      setTimeout(() => {
        spawnFruit();
        disableSpawn = false;
      }, 500);

      break;
  }
};

// stops the fruit from sliding around on the page
window.onkeyup = (event) => {
  switch (event.keyCode) {
    case 37:
    case 39:
      clearInterval(interval);
      interval = null;
  }
};

// hides the refresh button
refreshbtn.style.display = "none";

// makes a pop sound
let beat = new Audio("./Audio/happy-pop-2-185287.mp3");
// starts score at 0
var score = 0;
// making collision effect that allows the game to be played
Events.on(engine, "collisionStart", (event) => {
  event.pairs.forEach((collision) => {
    // only pair with fruits of the same kind
    if (collision.bodyA.index === collision.bodyB.index) {
      // reads the fruit index that is colliding
      const index = collision.bodyA.index;
      // stops at watermelon and doesnt repeat the cycle again
      if (index === Fruits.length - 1) {
        return;
      }
      // makes a pop play whenever fruits combine
      beat.play();
      World.remove(world, [collision.bodyA, collision.bodyB]);

      // allows the function to know which fruit image comes next
      const nextFruit = Fruits[index + 1];
      // creates the new circle size based on which fruit is spawned from the collision
      const newBody = Bodies.circle(
        collision.collision.supports[0].x,
        collision.collision.supports[0].y,
        nextFruit.radius,
        {
          // because nextfruit is defined as the next fruit in the index, the sprite changes to the next image along with the radius
          render: { sprite: { texture: `${nextFruit.name}` } },
          // the new fruit now identifies as the next item in the array
          index: index + 1,
        }
      );

      // this part displays the score in the scoreboard bubble
      const scoreboard = document.getElementById("Print");

      // calculates score
      function updateScore() {
        score += nextFruit.points;
        scoreboard.innerHTML = score;
      }
      updateScore();
      // add the new fruit to the world because the two fruits from the collision were removed already
      World.add(world, newBody);
    }
    // this collision ends the game because there are too many fruit in the container so they would collide with the top bar which is "endGame"
    if (
      !disableSpawn &&
      (collision.bodyA.name === "endGame" || collision.bodyB.name === "endGame")
    ) {
      disableSpawn = true;
      // Display game over message
      GG();
      refreshbtn.style.display = "initial";
    }
  });
});

// fucntion for making the game over screen pop up
function GG() {
  const gameOverMessage = document.createElement("div");
  gameOverMessage.innerHTML = "~Game Over!~";
  gameOverMessage.style.position = "absolute";
  gameOverMessage.style.top = "30%";
  gameOverMessage.style.left = "50%";
  gameOverMessage.style.transform = "translate(-50%, -50%)";
  gameOverMessage.style.zoom = 10;
  gameOverMessage.style.background = "red";
  gameOverMessage.style.border = "black";
  gameOverMessage.style.fontFamily = "Protest Riot";
  gameOverMessage.style.boxShadow = "7px 5px 5px black";
  gameOverMessage.style.borderRadius = "10%";
  document.body.appendChild(gameOverMessage);
}

spawnFruit();
