let jar = document.querySelector(".jar");
let minVelocity = 0.75;
let maxVelocity = 2;
// keep fireflies within the jar
let xMin = 25;
let xMax = 375;
let yMin = 150;
let yMax = 550;

// range of values for random yellow colors
function generateRandomYellow() {
  const r = Math.floor(55 * (Math.random() + 200));
  const g = Math.floor(80 * Math.random() + 175);
  const b = Math.floor(50 * Math.random());

  return `rgb(${r},${g},${b})`;
}

function moveBall(ball, state) {
  // horizontal movement
  if (state.xReverse) {
    state.xPosition -= state.xVelocity;
  } else {
    state.xPosition += state.xVelocity;
  }
  // trigger horizontal reverse
  if (state.xPosition >= xMax || state.xPosition <= xMin) {
    state.xReverse = !state.xReverse;
    // set the background of the fireflies to a random yellow
    ball.style.background = generateRandomYellow();
  }

  // set horizontal position
  ball.style.left = state.xPosition + "px";

  // vertical movement
  if (state.yReverse) {
    state.yPosition -= state.yVelocity;
  } else {
    state.yPosition += state.yVelocity;
  }
  // trigger vertical reverse
  if (state.yPosition >= yMax || state.yPosition <= yMin) {
    state.yReverse = !state.yReverse;
    ball.style.background = generateRandomYellow();
  }

  // set vertical position
  ball.style.top = state.yPosition + "px";
}

// function for fireflies to "flicker" (sets opacity to 0 and back to 1)
// the time between flickers is randomized
const randomlyFlicker = (ball) => {
  setTimeout(() => {
    ball.style.opacity = 0;

    setTimeout(() => {
      ball.style.opacity = 1;

      randomlyFlicker(ball);
    }, 4000);
  }, getNumberInRange(5000, 15000));
};

function getNumberInRange(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
}

function startMovingBall(ball) {
  // randomize velocities so fireflies don't move exactly the same
  const xVelocity = getNumberInRange(minVelocity, maxVelocity);
  const yVelocity = getNumberInRange(minVelocity, maxVelocity);
  // each firefly will keep track of a few values
  const state = {
    xVelocity,
    yVelocity,
    xPosition: getNumberInRange(xMin, xMax),
    xReverse: false,
    yPosition: getNumberInRange(yMin, yMax),
    yReverse: false,
  };

  // move the firefly every 10ms
  setInterval(() => {
    moveBall(ball, state);
  }, 10);

  randomlyFlicker(ball);
}

// create a new firefly with a randomized size and add it to the jar
function createFirefly() {
  const newBall = document.createElement("div");
  newBall.classList = "ball";

  const size = getNumberInRange(5, 17);
  newBall.style.height = `${size}px`;
  newBall.style.width = `${size}px`;
  // glow effect
  newBall.style.boxShadow = `0 0 1px 1px lightyellow, 0 0 ${size / 2}px ${size / 2}px yellow`;

  jar.appendChild(newBall);
  startMovingBall(newBall);
}

// create a bunch of fireflies 
for (let i = 0; i < 23; i++) {
  createFirefly();
}
