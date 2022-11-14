
let num = 3000;
let range = 15;

let ax = [];
let ay = [];

/* Setting up canvas */
export function setupFbm(s) {
  s.createCanvas(500, 500);
  for (let i = 0; i < num; i++) {
    ax[i] = s.width / 2;
    ay[i] = s.height / 2;
  }
  s.frameRate(30);
  s.background(51);
  s.noLoop();
}

/* One iteration */
function fbmIteration(s) {
  // Shift all elements 1 place to the left
  for (let i = 1; i < num; i++) {
    ax[i - 1] = ax[i];
    ay[i - 1] = ay[i];
  }

  // Put a new value at the end of the array
  ax[num - 1] += s.random(-range, range);
  ay[num - 1] += s.random(-range, range);

  // Constrain all points to the screen
  ax[num - 1] = s.constrain(ax[num - 1], 0, s.width);
  ay[num - 1] = s.constrain(ay[num - 1], 0, s.height);

  // Draw a line connecting the points
  for (let j = 1; j < num; j++) {
    let val = j / num * 204.0 + 51;
    s.stroke(val);
    s.line(ax[j - 1], ay[j - 1], ax[j], ay[j]);
  }
}

/* N Iterations */
export function drawFbm(s, iter) {
  return new Promise(resolve => {
    for (var i = 0; i < iter; i++) {
      fbmIteration(s);
    }
    return resolve(null)
  })
}

