import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import * as p5 from 'p5';

enum FRACTAL_TYPES {
  brown = 'broun',
  plasma = 'plasma'
}

import { drawFbm, setupFbm } from './algorithms/fbm.js';
import { drawPlasma } from './algorithms/plasma';

@Component({
  selector: 'app-fractal',
  templateUrl: './fractal.component.html',
  styleUrls: ['./fractal.component.css']
})
export class FractalComponent implements OnInit {

  fractalForm = new FormGroup({
    fractType: new FormControl(FRACTAL_TYPES.brown),
    iter: new FormControl(1),
  })

  canvas: p5 | null | HTMLCanvasElement = null;

  onSubmit() {
    const iter = this.fractalForm.get('iter')?.value;
    const type = this.fractalForm.get('fractType')?.value;
    if (!type || !iter) {
      return;
    }
    try {
      if (this.canvas) this.canvas.remove();

      if (type === FRACTAL_TYPES.plasma) {
        this.canvas = document.createElement('canvas');
        document.getElementById('for-canvas')?.appendChild(this.canvas);
        drawPlasma(iter, this.canvas);
      }
      else {
        const sketch = (s: any) => {
          s.setup = () => { setupFbm(s) }
          s.draw = () => { drawFbm(s, iter) }
        }
        const sketch_div: any = document.getElementById('for-canvas');
        this.canvas = new p5(sketch, sketch_div);
      }
    } catch (error) {
      if (error instanceof Error) alert(error.message)
      else console.log(error);
    }

  }

  constructor() { }

  ngOnInit(): void {
  }

}
