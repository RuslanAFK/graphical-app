export const initCanvas = (canvas: HTMLCanvasElement | null) => {
  const ctx = canvas?.getContext('2d');
  if (!ctx || !canvas) {
    alert('Canvas is not defined!')
    return
  }
  canvas.width = 500;
  canvas.height = 500;
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'black'
  ctx.moveTo(canvas.width/2 - 5, canvas.height/2 - 10)
  ctx.lineTo(canvas.width/2 + 5, canvas.height/2 - 10)
  ctx.stroke()
  ctx.fillText("10px", canvas.width/2 - 30, canvas.height/2 - 8)

  drawLines(canvas);
}

export const drawLines = (canvas: HTMLCanvasElement | null) => {
  const ctx = canvas?.getContext('2d');
  if (!ctx || !canvas) {
    alert('Canvas is not defined!')
    return
  }
  ctx.fillStyle = 'black'
  const centerX = canvas.width / 2, centerY = canvas.height / 2;
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
