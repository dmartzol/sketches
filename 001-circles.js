/**
 * 
 * @author Daniel Martinez (@dmartzol)
 */

const createSketch = require('canvas-sketch');
const Random = require('canvas-sketch-util/random');

Random.setSeed(Random.getRandomSeed());
// Random.setSeed(856785);
console.log(Random.getSeed());


const settings = {
  // Measurements of artwork
  dimensions: [5, 5],
  // Use a higher density for print resolution
  // (this defaults to 72, which is good for web)
  pixelsPerInch: 500,
  // All our units are inches
  units: 'in',
  // When exporting, use the seed as the suffix 
  // This way we can reproduce it more easily later 
  suffix: Random.getSeed()
};

const sketch = props => {
  // Utility to draw a circle
  const circle = (context, x, y, radius, fill) => {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fill) context.fill();
    context.stroke();
  };
  // Utility to draw a line
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap
  const line = (context, x0, y0, x1, y1, thickness) => {
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineWidth = thickness;
    context.lineTo(x1, y1);
    context.stroke();
  };
  // Returns a random number between min (inclusive) and max (exclusive)
  function getRandBetween(min, max) {
    return Random.value() * (max - min) + min;
  }
  // Returns a random integer between min (inclusive) and max (inclusive).
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Random.value() * (max - min + 1)) + min;
  }

  return ({ context, width, height }) => {
    // background
    context.fillStyle = '#222';
    context.fillRect(0, 0, width, height)

    context.strokeStyle = '#FFFFFC';
    context.fillStyle = '#FFFFFC';
    context.lineWidth = 0.01;
    rows = 5
    cols = 5
    probabilityFill = 0.1
    probabilityBigCircle = 0.5
    bigRadius = 0.05
    smallRadius = 0.01
    points = []
    // creating array of points
    for (let x = 1; x <= cols; x++) {
      for (let y = 1; y <= rows; y++) {
        points.push([(width / (cols + 1)) * x, (height / (rows + 1)) * y])
      }
    }
    // iterating over points to add circles
    for (let i = 0; i < points.length; i++) {
      numOfCircles = getRandBetween(0, 5)
      for (let n = 0; n < numOfCircles; n++) {
        const randomNumber = Random.value();
        fill = randomNumber < probabilityFill;
        radius = fill ? smallRadius : bigRadius * getRandBetween(0, 3);
        circle(context, points[i][0], points[i][1], radius, fill)
      }
    }
    // creating lines between random points
    for (let i = 0; i < 10; i++) {
      a = points[getRandomInt(0, points.length-1)]
      b = points[getRandomInt(0, points.length-1)]
      line(context, a[0], b[0], a[1], b[1], 0.01)
    }
  };
};

createSketch(sketch, settings);