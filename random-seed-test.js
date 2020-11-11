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
  pixelsPerInch: 300,
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
    context.fillStyle = '#E8DAB2';
    context.fillRect(0, 0, width, height)

    // colors
    red = '#DB324D'
    brown = '#584D3D'
    light_blue = '#25CED1'
    dark_blue = '#29335C'

    context.lineWidth = 0.01;
    rows = 5
    cols = 5
    radiusSlot = 0.01
    
    // creating array of points
    points = []
    for (let x = 1; x <= cols; x++) {
      for (let y = 1; y <= rows; y++) {
        points.push([(width / (cols + 1)) * x, (height / (rows + 1)) * y])
      }
    }
    pallete = [light_blue, brown, dark_blue, red]
    color = pallete[getRandomInt(0, pallete.length - 1)];
    point = getRandomInt(0, points.length - 1)
    context.strokeStyle = color;
    context.fillStyle = color;
    radius = radiusSlot * getRandomInt(0, 15);
    circle(context, points[point][0], points[point][1], radius, true)
  };
};

createSketch(sketch, settings);