import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import * as p5 from 'p5';

enum FRACTAL_TYPES {
  brown = 'broun',
  plasma = 'plasma'
}

import { drawFbm, setupFbm } from './algorithms/fbm';
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
  loading = false;

  buildPlasma = (iter: number) => {
    return new Promise(resolve => {
      this.canvas = document.createElement('canvas');
      document.getElementById('for-canvas')?.appendChild(this.canvas);
      drawPlasma(iter, this.canvas);
      resolve("Resolved");
    })
  }

  buildBroun = (iter: number) => {
    return new Promise(resolve => {
      const sketch = (s: any) => {
        s.setup = () => { setupFbm(s) }
        s.draw = () => { drawFbm(s, iter) }
      }
      const sketch_div: any = document.getElementById('for-canvas');
      this.canvas = new p5(sketch, sketch_div);
      resolve("Resolved");
    })
  }

  catchError = (error: any) => {
    if (error instanceof Error) alert(error.message)
    else console.log(error);
  }

  onSubmit() {
    const iter = this.fractalForm.get('iter')?.value;
    const type = this.fractalForm.get('fractType')?.value;
    if (!type || !iter) {
      return;
    }
    if (this.canvas) this.canvas.remove();

    this.loading = true;
    if (type === FRACTAL_TYPES.plasma) {
      this.buildPlasma(iter)
        .catch(error => this.catchError(error))
        .finally(() => this.loading = false)
    }
    else {
      this.buildBroun(iter)
        .catch(error => this.catchError(error))
        .finally(() => this.loading = false)
    }

  }

  constructor() { }

  ngOnInit(): void {
  }

}
