const canvasSketch = require('canvas-sketch');
const p5 = require('p5');
const Random = require('canvas-sketch-util/random');
Random.setSeed(Random.getRandomSeed());

// Optional preloader
const preload = p5 => {
    // Can p5.loadImage() here and so forth
};

const settings = {
    // Use p5 in instance mode, passing the preloader
    // Can also just pass { p5 } setting if you don't need preloader
    p5: { p5, preload },
    // Measurements of artwork
    dimensions: [5, 5],
    // Use a higher density for print resolution
    // (this defaults to 72, which is good for web)
    pixelsPerInch: 500,
    // All our units are inches
    units: 'in',
    // When exporting, use the seed as the suffix 
    // This way we can reproduce it more easily later 
    suffix: Random.getSeed(),
    // Turn on a render loop
    animate: true
};


const sketch = props => {
    return ({ p5, time, width, height }) => {
        // Draw with p5.js things
        p5.background('#222');
        p5.fill(255);
        p5.noStroke();

        const anim = p5.sin(time - p5.PI / 2) * 0.5 + 0.5;
        p5.rect(0, 0, width * anim, height);
    };
};

canvasSketch(sketch, settings);