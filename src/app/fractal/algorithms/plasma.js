const N = 8;
const RANDOM_INITIAL_RANGE = 10;
const MATRIX_LENGTH = Math.pow(2, N) + 1;
const CANVAS_HEIGHT = MATRIX_LENGTH * 2;
const CANVAS_WIDTH = MATRIX_LENGTH * 2;
const MATRIX_DIMENSIONS = {
  pixelHeight: CANVAS_HEIGHT / MATRIX_LENGTH,
  pixelWidth: CANVAS_WIDTH / MATRIX_LENGTH
};

function getColor(percentage) {
  return landscapeColors(percentage);
}

function landscapeColors(percentage) {
  const hue = percentage >= 0.66 ? 240 : percentage >= 0.33 ? 120 : 0;
  const lightness = 50;
  const saturation = 100;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function draw(terrain_matrix, canvas) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, CANVAS_HEIGHT, CANVAS_WIDTH);
  ctx.beginPath();
  terrain_matrix.forEach((pixelsRow, rowIndex) => {
    const y = rowIndex * MATRIX_DIMENSIONS.pixelHeight;
    pixelsRow.forEach((pixel, pixelIndex) => {
      const x = pixelIndex * MATRIX_DIMENSIONS.pixelWidth;
      ctx.fillStyle = getColor(pixel);
      ctx.fillRect(
        x,
        y,
        MATRIX_DIMENSIONS.pixelWidth,
        MATRIX_DIMENSIONS.pixelHeight
      );
    });
  });
  ctx.closePath();
}

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateMatrix() {
  const matrix = new Array(MATRIX_LENGTH)
    .fill(0)
    .map(() => new Array(MATRIX_LENGTH).fill(null));

  matrix[0][MATRIX_LENGTH - 1] = randomInRange(0, RANDOM_INITIAL_RANGE);
  matrix[MATRIX_LENGTH - 1][0] = randomInRange(0, RANDOM_INITIAL_RANGE);
  matrix[0][0] = randomInRange(0, RANDOM_INITIAL_RANGE);
  matrix[MATRIX_LENGTH - 1][MATRIX_LENGTH - 1] = randomInRange(
    0,
    RANDOM_INITIAL_RANGE
  );

  return matrix;
}

function calculateSquare(matrix, chunkSize, randomFactor) {
  let sumComponents = 0;
  let sum = 0;
  for (let i = 0; i < matrix.length - 1; i += chunkSize) {
    for (let j = 0; j < matrix.length - 1; j += chunkSize) {
      const BOTTOM_RIGHT = matrix[j + chunkSize]
        ? matrix[j + chunkSize][i + chunkSize]
        : null;
      const BOTTOM_LEFT = matrix[j + chunkSize]
        ? matrix[j + chunkSize][i]
        : null;
      const TOP_LEFT = matrix[j][i];
      const TOP_RIGHT = matrix[j][i + chunkSize];
      const { count, sum } = [
        BOTTOM_RIGHT,
        BOTTOM_LEFT,
        TOP_LEFT,
        TOP_RIGHT
      ].reduce(
        (result, value) => {
          if (isFinite(value) && value != null) {
            result.sum += value;
            result.count += 1;
          }
          return result;
        },
        { sum: 0, count: 0 }
      );
      matrix[j + chunkSize / 2][i + chunkSize / 2] =
        sum / count + randomInRange(-randomFactor, randomFactor);
    }
  }
}

function calculateDiamond(matrix, chunkSize, randomFactor) {
  const half = chunkSize / 2;
  for (let y = 0; y < matrix.length; y += half) {
    for (let x = (y + half) % chunkSize; x < matrix.length; x += chunkSize) {
      const BOTTOM = matrix[y + half] ? matrix[y + half][x] : null;
      const LEFT = matrix[y][x - half];
      const TOP = matrix[y - half] ? matrix[y - half][x] : null;
      const RIGHT = matrix[y][x + half];
      const { count, sum } = [BOTTOM, LEFT, TOP, RIGHT].reduce(
        (result, value) => {
          if (isFinite(value) && value != null) {
            result.sum += value;
            result.count += 1;
          }
          return result;
        },
        { sum: 0, count: 0 }
      );
      matrix[y][x] = sum / count + randomInRange(-randomFactor, randomFactor);
    }
  }
  return matrix;
}

function diamondSquare(matrix, iter) {
  let chunkSize = MATRIX_LENGTH - 1;
  let randomFactor = RANDOM_INITIAL_RANGE;

  for (let i = 0; i < iter; ++i) {
    calculateSquare(matrix, chunkSize, randomFactor);
    calculateDiamond(matrix, chunkSize, randomFactor);
    chunkSize /= 2;
    randomFactor /= 2;
  }

  return matrix;
}

function normalizeMatrix(matrix) {
  const maxValue = matrix.reduce((max, row) => {
    return row.reduce((max, value) => Math.max(value, max));
  }, -Infinity);

  return matrix.map((row) => {
    return row.map((val) => val / maxValue);
  });
}

export function drawPlasma(iter, canvas) {
  canvas.height = CANVAS_HEIGHT;
  canvas.width = CANVAS_WIDTH;
  const matrix = diamondSquare(generateMatrix(), iter);
  const normalizedMatrix = normalizeMatrix(matrix);
  draw(normalizedMatrix, canvas);
}

