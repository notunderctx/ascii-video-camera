# ASCII Art Video Capture

This project uses p5.js to capture video from your webcam and convert it into ASCII art in real-time.

## Setup

1. Ensure you have [p5.js](https://p5js.org/) included in your project.
2. Copy the provided JavaScript code into your project.
3. Run your project on a local server to see the ASCII art in action.

## Usage

- The video feed is captured using the `createCapture(VIDEO)` function from p5.js.
- The captured pixels are processed to generate ASCII characters based on their brightness.
- The generated ASCII art is displayed on the webpage using a `<div>` element.

## Code Overview

```javascript
const density = "N@#$98543210?!abc;:+=.....      ";
let video;
let asciiDiv;

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.size(48, 48);
  asciiDiv = createDiv();
}

function draw() {
  video.loadPixels();
  const asciiImage = generateAsciiArt(video);
  asciiDiv.html(asciiImage);
}

function generateAsciiArt(video) {
  let asciiArt = '';

  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      const pixelIndex = (x + y * video.width) * 4;
      const [r, g, b] = getRGB(video.pixels, pixelIndex);
      const avgBrightness = (r + g + b) / 3;
      const char = getCharFromBrightness(avgBrightness);
      asciiArt += char === " " ? "&nbsp;" : char;
    }
    asciiArt += "<br/>";
  }

  return asciiArt;
}

function getRGB(pixels, index) {
  return [pixels[index], pixels[index + 1], pixels[index + 2]];
}

function getCharFromBrightness(brightness) {
  const charIndex = floor(map(brightness, 0, 255, density.length, 0));
  return density.charAt(charIndex);
}
```
