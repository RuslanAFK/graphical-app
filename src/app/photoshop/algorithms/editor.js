import { getRgb, rgb2hex } from "./color_transactions";

export default class Editor {
  constructor() {
    this.image = document.getElementById('sourceImage');
    this.canvas = document.getElementById('canvas');
    this.context = canvas.getContext('2d');
  }

  drawPixel(x, y, color) {
    var roundedX = Math.round(x);
    var roundedY = Math.round(y);
    this.context.fillStyle = color || '#000';
    this.context.fillRect(roundedX, roundedY, 1, 1);
  }


  redrawColor(rgbOld, rgbNew) {
    for (let i = 0; i < this.canvas.width; ++i) {
      for (let j = 0; j < this.canvas.height; ++j) {
        let rgbAtPoint = getRgb(null, this.canvas, { x: i, y: j });
        if (rgbOld.r === rgbAtPoint.r &&
          rgbOld.g === rgbAtPoint.g &&
          rgbOld.b === rgbAtPoint.b) {
          this.drawPixel(i, j, rgb2hex(rgbNew));
        }
      }
    }
  }

  uploadImage(event) {
    // Set the source of the image from the uploaded file
    this.image.src = URL.createObjectURL(event.target.files[0]);
    const thisEl = this;
    this.image.onload = function () {
      // Set the canvas the same width and height of the image
      thisEl.canvas.width = this.width;
      thisEl.canvas.height = this.height;
      thisEl.canvas.crossOrigin = "anonymous";
      thisEl.applyFilter();
    };
  };


  applyFilter() {

    // Draw the edited image to canvas
    this.context.drawImage(this.image, 0, 0);
  }


  // Reset all the slider values to there default values
  resetImage() {
    this.applyFilter();
  }

  saveImage() {
    // Select the temporary element we have created for
    // helping to save the image
    let linkElement = document.getElementById('link');
    linkElement.setAttribute(
      'download', 'edited_image.png'
    );

    // Convert the canvas data to a image data URL
    let canvasData = this.canvas.toDataURL("image/png")

    // Replace it with a stream so that
    // it starts downloading
    canvasData.replace(
      "image/png", "image/octet-stream"
    )

    // Set the location href to the canvas data
    linkElement.setAttribute('href', canvasData);
  }


}



