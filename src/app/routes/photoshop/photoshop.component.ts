import { Component, OnInit } from '@angular/core';
import { getRgb, hsl2rgb, rgb2cmyk, rgb2hsl, rgb2hsv } from './algorithms/color_transactions';
import { Cmyk, Hsl, Hsv, Rgb } from './algorithms/color_types';
import Editor from './algorithms/editor';

@Component({
  selector: 'app-photoshop',
  templateUrl: './photoshop.component.html',
  styleUrls: ['./photoshop.component.css']
})
export class PhotoshopComponent implements OnInit {

  editor: Editor | undefined;
  hsl: Hsl = { h: 0, s: 0, l: 0 };
  hsv: Hsv = { h: 0, s: 0, v: 0 };
  cmyk: Cmyk = { c: 0, m: 0, y: 0, k: 0 };
  rgb: Rgb = { r: 0, g: 0, b: 0 };


  uploadImage = (event: Event) => {
    this.editor?.uploadImage(event);
  }

  saveImage = () => {
    this.editor?.saveImage();
  }

  resetImage = () => {
    this.editor?.resetImage();
  }

  onMouseUpCanvas(event: MouseEvent) {
    if (!this.editor || !(this.editor.canvas instanceof HTMLCanvasElement)) return
    let rgb = getRgb(this.editor.canvas, event);
    if (!rgb) return;
    this.rgb = rgb;
    this.hsv = rgb2hsv(this.rgb);
    let cmyk = rgb2cmyk(this.rgb);
    if (cmyk) this.cmyk = cmyk;
    this.hsl = rgb2hsl(this.rgb);
  }

  onLightnessChange() {
    let newRgb = hsl2rgb(this.hsl);
    console.log(newRgb);

    this.editor?.redrawColor(this.rgb, newRgb);


  }

  constructor() { }

  ngOnInit(): void {
    this.editor = new Editor();
  }

}
