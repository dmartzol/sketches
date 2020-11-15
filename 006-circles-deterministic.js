/**
 * 
 * @author Daniel Martinez (@dmartzol)
 */

const createSketch = require('canvas-sketch');
// random docs: https://github.com/mattdesl/canvas-sketch-util/blob/master/docs/random.md
const random = require('canvas-sketch-util/random');

// Create a seeded random generator
random.setSeed(random.getRandomSeed());
// random.setSeed('28872');
console.log("Seed: ", random.getSeed());



const settings = {
  // Measurements of artwork
  dimensions: [5, 5],
  // Use a higher density for print resolution
  // (this defaults to 72, which is good for web)
  pixelsPerInch: 500,
  units: 'in',
  // When exporting, use the seed as the suffix 
  // This way we can reproduce it more easily later 
  suffix: random.getSeed()
};

const sketch = ({ width, height }) => {
  // Utility to draw a circle
  const drawCircle = (context, x, y, radius, fill, color) => {
    context.strokeStyle = color;
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    if (fill) context.fill();
    context.stroke();
  };
  // Utility to draw a line
  // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap
  const drawLine = (context, x0, y0, x1, y1, thickness, color) => {
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineWidth = thickness;
    context.lineTo(x1, y1);
    context.stroke();
  };

  // color configuration
  const pallete1 = { background: '#E8DAB2', linesColor: '#29335C', primaries: ['#DB324D', '#584D3D', '#25CED1'] };
  const pallete2 = { background: '#F0F8EA', linesColor: '#9D9C62', primaries: ['#F6D927', '#EF9D00', '#EE5508'] };
  const pallete3 = { background: '#E8DAB2', linesColor: '#29335C', primaries: ['#F0F66E', '#E4572E', '#A8C686'] };
  const pallete4 = { background: '#FFFFFC', linesColor: '#222222', primaries: ['#222222', '#222222', '#222222'] };
  const pallete5 = { background: '#222222', linesColor: '#FFFFFC', primaries: ['#FFFFFC', '#FFFFFC', '#FFFFFC'] };

  const pallete = pallete5
  const minCircles = 1 // minimum number of circles in every point
  const maxCircles = 5
  const lineWidth = 0.01
  const rows = 5
  const cols = 5
  const probabilityFill = 0.1
  const radiusSlot = 0.01


  // creating grid of points
  points = []
  for (let i = 1; i <= cols; i++) {
    for (let j = 1; j <= rows; j++) {
      xCoord = (width / (cols + 1)) * i;
      yCoord = (height / (rows + 1)) * j;
      points.push({ x: xCoord, y: yCoord });
    }
  }

  circles = []
  points.forEach(point => {
    numOfCircles = random.rangeFloor(minCircles, maxCircles)
    for (let n = 0; n < numOfCircles; n++) {
      circles.push({
        x: point.x,
        y: point.y,
        radius: radiusSlot * random.range(1, 15),
        fill: random.chance(probability = probabilityFill),
        color: random.pick(pallete.primaries)
      })
    }
  })


  lines = []
  // creating lines between random points
  for (let i = 0; i < 10; i++) {
    a = random.pick(points)
    b = random.pick(points)
    lines.push({ x0: a.x, y0: a.y, x1: b.x, y1: b.y, thickness: lineWidth, color: pallete.linesColor })
  }


  return ({ context }) => {
    // backgroundColor
    context.fillStyle = pallete.background;
    context.fillRect(0, 0, width, height)
    context.lineWidth = lineWidth;
    circles.forEach(circle => {
      drawCircle(context, circle.x, circle.y, circle.radius, circle.fill, circle.color)
    });
    lines.forEach(line => {
      drawLine(context, line.x0, line.y0, line.x1, line.y1, line.thickness, line.color)
    });
  };
};

createSketch(sketch, settings);