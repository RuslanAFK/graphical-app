import { getRgb, rgb2hex } from "./color_transactions";
import { Rgb } from "./color_types";

export default class Editor {
  image: HTMLImageElement;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  constructor() {
    let image = document.getElementById('sourceImage');
    let canvas = document.getElementById('canvas');
    if (!(image instanceof HTMLImageElement) ||
      !(canvas instanceof HTMLCanvasElement)
    ) throw new Error("Editor cannot be defined.")
    this.image = image;
    this.canvas = canvas;
    let context = canvas.getContext('2d');
    if (!context) throw new Error("Editor cannot be defined.")
    this.context = context;
  }

  drawPixel(x: number, y: number, color: string) {
    var roundedX = Math.round(x);
    var roundedY = Math.round(y);
    this.context.fillStyle = color || '#000';
    this.context.fillRect(roundedX, roundedY, 1, 1);
  }


  redrawColor(rgbOld: Rgb, rgbNew: Rgb) {
    //if(!rgbOld || !rgbNew) return;
    for (let i = 0; i < this.canvas.width; ++i) {
      for (let j = 0; j < this.canvas.height; ++j) {
        let rgbAtPoint = getRgb(this.canvas, undefined, { x: i, y: j });
        if (!rgbAtPoint) return;
        if (rgbOld.r === rgbAtPoint.r &&
          rgbOld.g === rgbAtPoint.g &&
          rgbOld.b === rgbAtPoint.b) {
          this.drawPixel(i, j, rgb2hex(rgbNew));
        }
      }
    }
  }

  uploadImage(event: Event) {
    // Set the source of the image from the uploaded file
    if (!(event.target instanceof HTMLInputElement) || !event.target.files) return;
    this.image.src = URL.createObjectURL(event.target.files[0]);
    const thisEl = this;
    this.image.addEventListener('load', function () {
      // Set the canvas the same width and height of the image
      thisEl.canvas.width = this.width;
      thisEl.canvas.height = this.height;
      thisEl.applyFilter();
    })
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
    if (!linkElement) return;
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



