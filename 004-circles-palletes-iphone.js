/**
 * 
 * @author Daniel Martinez (@dmartzol)
 */

const createSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

// Create a seeded random generator
// const seeded = random.createRandom(986895);
const seeded = random.createRandom(random.getRandomSeed());
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


  const pallete1 = { background: '#E8DAB2', linesColor: '#29335C', primaries: ['#DB324D', '#584D3D', '#25CED1'] };
  const pallete2 = { background: '#F0F8EA', linesColor: '#9D9C62', primaries: ['#F6D927', '#EF9D00', '#EE5508'] };
  const pallete3 = { background: '#E8DAB2', linesColor: '#29335C', primaries: ['#F0F66E', '#E4572E', '#A8C686'] };

  return ({ context, width, height }) => {
    // color configuration
    pallete = pallete2;

    // backgroundColor
    context.fillStyle = pallete.background;
    context.fillRect(0, 0, width, height)

    context.lineWidth = 0.01;
    rows = 10
    cols = 5
    probabilityFill = 0.5
    bigRadius = 0.05
    radiusSlot = 0.01
    linesCount = 5
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
        color = seeded.pick(pallete.primaries);
        context.strokeStyle = color;
        context.fillStyle = color;
        radius = radiusSlot * seeded.range(15);
        circle(context, points[i][0], points[i][1], radius, fill)
      }
    }
    // creating linesColor between random points
    for (let i = 0; i < linesCount; i++) {
      a = seeded.pick(points)
      b = seeded.pick(points)
      line(context, a[0], a[1], b[0], b[1], 0.01, pallete.linesColor)
    }
  };
};

createSketch(sketch, settings);