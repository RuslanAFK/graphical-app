import { Component, OnInit } from '@angular/core';
import { rotate } from './algorithms/rotations';
import { initCanvas } from './algorithms/painter';

@Component({
  selector: 'app-transformation',
  templateUrl: './transformation.component.html',
  styleUrls: ['./transformation.component.css']
})
export class TransformationComponent implements OnInit {

  canvas: HTMLCanvasElement | null = null;

  x1: number = 0;
  y1: number = 0;
  x2: number = 100;
  y2: number = 100;
  x3: number = 250;
  y3: number = -90;

  sliderVal = 0;
  rotatedTimes = 0;

  constructor() { }

  validateData = () => {
    if (!this.canvas) {
      alert(`Canvas is not defined.`)
      return false;
    }
    const maxX = this.canvas.width / 2, maxY = this.canvas.height / 2;

    if (this.x1 > maxX || this.x1 < -maxX || this.x2 > maxX || this.x2 < -maxX || this.x3 > maxX || this.x3 < -maxX
      || this.y1 > maxY || this.y1 < -maxY || this.y2 > maxY || this.y2 < -maxY || this.y3 > maxY || this.y3 < -maxY) {
      alert(`Max and min value for x is ${maxX} and for y is ${maxY}.`)
      return false;
    }
    if (this.x1 === this.x2 || this.x1 === this.x3 || this.x2 === this.x3 ||
      this.y1 === this.y2 || this.y1 === this.y3 || this.y2 === this.y3) {
      alert(`Points can not be on one line.`)
      return false;
    }
    return true;
  }



  drawTriangle = () => {
    initCanvas(this.canvas);
    if (!this.validateData()) {
      return;
    }
    const ctx = this.canvas?.getContext('2d');
    if (!ctx || !this.canvas) {
      alert('Canvas is not defined!')
      return
    }

    ctx.fillStyle = 'blue'
    const centerX = this.canvas.width / 2, centerY = this.canvas.height / 2;
    this.sliderVal = 0;
    this.rotatedTimes = 0;

    ctx.beginPath();
    ctx.moveTo(centerX + this.x1, centerY + this.y1);
    ctx.lineTo(centerX + this.x2, centerY + this.y2);
    ctx.lineTo(centerX + this.x3, centerY + this.y3);
    ctx.fill();
  }


  ngOnInit(): void {
    this.canvas = document.querySelector('canvas');
    initCanvas(this.canvas);
    this.drawTriangle();
  }

  maxValSlider = () => {
    if (!this.canvas) return false;
    const maxX = this.canvas.width / 2, maxY = this.canvas.height / 2;
    const qv = maxX * maxX + maxY * maxY;
    return Math.sqrt(qv);
  }


  onSliderChange = () => {
    initCanvas(this.canvas);
    const valToMove = this.sliderVal / Math.SQRT2;
    const ctx = this.canvas?.getContext('2d');
    if (!ctx || !this.canvas) {
      alert('Canvas is not defined!')
      return
    }
    ctx.fillStyle = 'blue'
    const centerX = this.canvas.width / 2, centerY = this.canvas.height / 2;

    ctx.beginPath();
    ctx.moveTo(centerX + this.x1 + valToMove, centerY + this.y1 - valToMove);
    ctx.lineTo(centerX + this.x2 + valToMove, centerY + this.y2 - valToMove);
    ctx.lineTo(centerX + this.x3 + valToMove, centerY + this.y3 + - valToMove);
    ctx.fill();
  }

  rotate30 = () => {
    initCanvas(this.canvas);
    const ctx = this.canvas?.getContext('2d');
    if (!ctx || !this.canvas) {
      alert('Canvas is not defined!')
      return
    }
    this.rotatedTimes++;
    const centerX = this.canvas.width / 2, centerY = this.canvas.height / 2;
    const valToMove = this.sliderVal / Math.SQRT2;

    const [newX1, newY1] = rotate(centerX, centerY, this.x1 + centerX + valToMove, this.y1 + centerY + valToMove,
      -30 * this.rotatedTimes);
    const [newX2, newY2] = rotate(centerX, centerY, this.x2 + centerX + valToMove, this.y2 + centerY + valToMove,
      -30 * this.rotatedTimes);
    const [newX3, newY3] = rotate(centerX, centerY, this.x3 + centerX + valToMove, this.y3 + centerY + valToMove,
      -30 * this.rotatedTimes);

    ctx.fillStyle = 'blue'



    ctx.beginPath();
    ctx.moveTo(newX1, newY1);
    ctx.lineTo(newX2, newY2);
    ctx.lineTo(newX3, newY3);
    ctx.fill();

  }

  onSlider2Change = () => {
    initCanvas(this.canvas);
    const valToMove = this.sliderVal / Math.SQRT2;
    const ctx = this.canvas?.getContext('2d');
    if (!ctx || !this.canvas) {
      alert('Canvas is not defined!')
      return
    }
    this.rotatedTimes++;
    const centerX = this.canvas.width / 2, centerY = this.canvas.height / 2;

    const [newX1, newY1] = rotate(centerX, centerY, this.x1 + centerX + valToMove, this.y1 + centerY + valToMove,
      -30 * this.rotatedTimes);
    const [newX2, newY2] = rotate(centerX, centerY, this.x2 + centerX + valToMove, this.y2 + centerY + valToMove,
      -30 * this.rotatedTimes);
    const [newX3, newY3] = rotate(centerX, centerY, this.x3 + centerX + valToMove, this.y3 + centerY + valToMove,
      -30 * this.rotatedTimes);

    ctx.fillStyle = 'blue'

    ctx.beginPath();
    ctx.moveTo(newX1, newY1);
    ctx.lineTo(newX2, newY2);
    ctx.lineTo(newX3, newY3);
    ctx.fill();
  }

}
