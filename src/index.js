const density = "N@#$bcaos210?!abc,~+*........      ";
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
  let asciiArt = "";

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
