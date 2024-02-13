// In order to make it more simply to reference these things from matterJS according to their examples
var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Runner = Matter.Runner;

// creating my engine
const engine = Engine.create();
// create a renderer with important square information for my specific layout
const render = Render.create({
  engine,
  element: document.body,
  options: {
    // without wireframes false I could load the color of box?
    wireframes: false,
    background: "tan",
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
  render: { fillStyle: "orange" },
});
const leftwall = Bodies.rectangle(15, 395, 30, 790, {
  isStatic: true,
  render: { fillStyle: "orange" },
});
const floor = Bodies.rectangle(310, 820, 620, 60, {
  isStatic: true,
  render: { fillStyle: "orange" },
});
const endGame = Bodies.rectangle(310, 150, 620, 2, {
  isStatic: true,
  // sensor allows for passthrough
  isSensor: true,
  render: { fillStyle: "pink" },
});
// adding created walls to the world
World.add(world, [rightWall, leftwall, floor, endGame]);

// creating runner
var runner = Runner.create();
Runner.run(runner, engine);
Render.run(render);

// associating fruit images with different sizes to act somewhat like a switch case
const Fruits = [
  // fruit sizes from youtube video suika gameplay tips and tricks at 1:20
  // and from 빵형의 개발도상국 but are changable depending on box size
  {
    id: 0,
    name: "./Fruits/SuikaCherry.png",
    radius: 33 / 2,
  },
  {
    id: 1,
    name: "./Fruits/SuikaStrawberry.png",
    radius: 48 / 2,
  },
  {
    id: 2,
    name: "./Fruits/SuikaGrape.png",
    radius: 61 / 2,
  },
  {
    id: 3,
    name: "./Fruits/SuikaDekopon.png",
    radius: 69 / 2,
  },
  {
    id: 4,
    name: "./Fruits/SuikaOrange.png",
    radius: 89 / 2,
  },
  {
    id: 5,
    name: "./Fruits/SuikaApple.png",
    radius: 114 / 2,
  },
  {
    id: 6,
    name: "./Fruits/SuikaPear.png",
    radius: 129 / 2,
  },
  {
    id: 7,
    name: "./Fruits/SuikaPeach",
    radius: 156 / 2,
  },
  {
    id: 8,
    name: "./Fruits/SuikaPineapple.png",
    radius: 177 / 2,
  },
  {
    id: 9,
    name: "./Fruits/SuikaMelon.png",
    radius: 220 / 2,
  },
  {
    id: 10,
    name: "./Fruits/SuikaWatermelon.png",
    radius: 259 / 2,
  },
];

function spawnFruit() {
  const index = 10;
  const fruit = Fruits[index];

  // used to create the circle body depending on image and radius of the fruit
  const body = Bodies.circle(300, 50, fruit.radius, {
    index: index,
    // allows circle to be any fruit image depending on my "Fruits" section
    render: {
      sprite: {
        texture: `${fruit.name}`,
      },
    },
    // defines the elasticity of the body and bounces depending on "value"% of its kinetic energy. Possibly depermined by the radius
    restitution: 1,
  });

  // add bodies to the world
  World.add(world, [body]);
}

spawnFruit();
