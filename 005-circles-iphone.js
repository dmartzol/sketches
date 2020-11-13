/**
 * 
 * @author Daniel Martinez (@dmartzol)
 */

const createSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const seeded = random.createRandom(random.getRandomSeed());
// const seeded = random.createRandom(165058);
console.log("Seed: ", seeded.getSeed());


const settings = {
  // Measurements of artwork
  dimensions: [5 * 1125 / 2436, 5],
  // Use a higher density for print resolution
  // (this defaults to 72, which is good for web)
  pixelsPerInch: 500,
  units: 'in',
  // When exporting, use the seed as the suffix 
  // This way we can reproduce it more easily later 
  suffix: seeded.getSeed()
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
  const line = (context, x0, y0, x1, y1, thickness, color) => {
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineWidth = thickness;
    context.lineTo(x1, y1);
    context.stroke();
  };

  const pallete1 = { background: '#222222', linesColor: '#FFFFFC' };

  return ({ context, width, height }) => {
    pallete = pallete1;
    // background
    context.fillStyle = pallete.background;
    context.fillRect(0, 0, width, height)

    context.strokeStyle = pallete.linesColor;
    context.fillStyle = pallete.linesColor;
    context.lineWidth = 0.01;
    rows = 10
    cols = 5
    probabilityFill = 0.1
    probabilityBigCircle = 0.5
    bigRadius = 0.05
    smallRadius = 0.01
    linesCount = 9
    points = []
    // creating array of points
    for (let x = 1; x <= cols; x++) {
      for (let y = 1; y <= rows; y++) {
        points.push([(width / (cols + 1)) * x, (height / (rows + 1)) * y])
      }
    }
    // iterating over points to add circles
    for (let i = 0; i < points.length; i++) {
      numOfCircles = seeded.range(5)
      for (let n = 0; n < numOfCircles; n++) {
        fill = seeded.chance(probability = probabilityFill);
        radius = fill ? smallRadius : bigRadius * seeded.range(3);
        circle(context, points[i][0], points[i][1], radius, fill)
      }
    }
    // creating lines between random points
    for (let i = 0; i < linesCount; i++) {
      a = seeded.pick(points)
      b = seeded.pick(points)
      line(context, a[0], a[1], b[0], b[1], 0.01, '#FFFFFC')
    }
  };
};

createSketch(sketch, settings);