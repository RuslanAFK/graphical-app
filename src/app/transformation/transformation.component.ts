import { Component, OnInit } from '@angular/core';
import { rotate } from './algorithms/rotations';

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
    if (!this.canvas) return false;
    const maxX = this.canvas.width / 2, maxY = this.canvas.height / 2;

    if (this.x1 > maxX || this.x1 < -maxX || this.x2 > maxX || this.x2 < -maxX || this.x3 > maxX || this.x3 < -maxX)
      return false;
    if (this.y1 > maxY || this.y1 < -maxY || this.y2 > maxY || this.y2 < -maxY || this.y3 > maxY || this.y3 < -maxY)
      return false;
    return true;
  }

  initCanvas = () => {
    const ctx = this.canvas?.getContext('2d');
    if (!ctx || !this.canvas) {
      alert('Canvas is not defined!')
      return
    }
    this.canvas.width = 500;
    this.canvas.height = 500;
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawLines();
  }


  drawLines = () => {
    const ctx = this.canvas?.getContext('2d');
    if (!ctx || !this.canvas) {
      alert('Canvas is not defined!')
      return
    }
    ctx.fillStyle = 'black'
    const centerX = this.canvas.width / 2, centerY = this.canvas.height / 2;
    ctx.beginPath();
    ctx.moveTo(0, centerY)
    ctx.lineTo(2 * centerX, centerY)
    ctx.stroke()
    ctx.beginPath();
    ctx.moveTo(centerX, 0)
    ctx.lineTo(centerX, 2 * centerY)
    ctx.stroke()
    ctx.beginPath();
    ctx.moveTo(2 * centerX, 0)
    ctx.lineTo(0, 2 * centerY)
    ctx.stroke()
  }

  drawTriangle = () => {
    this.initCanvas();
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

    ctx.beginPath();
    ctx.moveTo(centerX + this.x1, centerY + this.y1);
    ctx.lineTo(centerX + this.x2, centerY + this.y2);
    ctx.lineTo(centerX + this.x3, centerY + this.y3);
    ctx.fill();
  }


  ngOnInit(): void {
    this.canvas = document.querySelector('canvas');
    this.initCanvas();
    this.drawTriangle();
  }

  maxValSlider = () => {
    if (!this.canvas) return false;
    const maxX = this.canvas.width / 2, maxY = this.canvas.height / 2;
    const qv = maxX * maxX + maxY * maxY;
    return Math.sqrt(qv);
  }


  onSliderChange = () => {
    this.initCanvas();
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
    this.initCanvas();
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
    this.initCanvas();
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
