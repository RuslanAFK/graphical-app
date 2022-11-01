export function getElementPosition(obj) {
  var curleft = 0, curtop = 0;
  if (obj.offsetParent) {
    do {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);
    return { x: curleft, y: curtop };
  }
  return undefined;
}
export function getEventLocation(element, event) {
  var pos = getElementPosition(element);
    return {
      x: (event.pageX - pos.x),
      y: (event.pageY - pos.y)
    }
}

export function rgb2cmyk(rgbObj) {
  var computedC = 0;
  var computedM = 0;
  var computedY = 0;
  var computedK = 0;

  const { r, g, b } = rgbObj;

  if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
    alert('RGB values must be in the range 0 to 255.');
    return;
  }

  // BLACK
  if (r == 0 && g == 0 && b == 0) {
    computedK = 1;
    return {
      c: 0,
      m: 0,
      y: 0,
      k: 1
    };;
  }

  computedC = 1 - (r / 255);
  computedM = 1 - (g / 255);
  computedY = 1 - (b / 255);

  var minCMY = Math.min(computedC, Math.min(computedM, computedY));

  computedC = (computedC - minCMY) / (1 - minCMY);
  computedM = (computedM - minCMY) / (1 - minCMY);
  computedY = (computedY - minCMY) / (1 - minCMY);
  computedK = minCMY;

  return {
    c: computedC,
    m: computedM,
    y: computedY,
    k: computedK
  }
}

export function rgb2hsv(rgbObj) {
  const { r, g, b } = rgbObj;
  let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
  rabs = r / 255;
  gabs = g / 255;
  babs = b / 255;
  v = Math.max(rabs, gabs, babs),
    diff = v - Math.min(rabs, gabs, babs);
  diffc = c => (v - c) / 6 / diff + 1 / 2;
  percentRoundFn = num => Math.round(num * 100) / 100;
  if (diff == 0) {
    h = s = 0;
  } else {
    s = diff / v;
    rr = diffc(rabs);
    gg = diffc(gabs);
    bb = diffc(babs);

    if (rabs === v) {
      h = bb - gg;
    } else if (gabs === v) {
      h = (1 / 3) + rr - bb;
    } else if (babs === v) {
      h = (2 / 3) + gg - rr;
    }
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }
  return {
    h: Math.round(h * 360),
    s: percentRoundFn(s * 100),
    v: percentRoundFn(v * 100)
  };
}

export function rgb2hsl(rgbObj) {
  let { r, g, b } = rgbObj;
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
    : 0;
  return {
    h: 60 * h < 0 ? 60 * h + 360 : 60 * h,
    s: 100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    l: (100 * (2 * l - s)) / 2,
  }
};

export function getRgb(e, canvas, xyObj) {
  let eventLocation;
  if(e) {
    eventLocation = getEventLocation(canvas, e, xyObj);
  }
  else {
    eventLocation = xyObj;
  }
  let context = canvas.getContext('2d');

  let pixelData = context.getImageData(eventLocation.x, eventLocation.y, 1, 1).data;
  return {
    r: pixelData[0],
    g: pixelData[1],
    b: pixelData[2],
    a: pixelData[3]
  }
}

export const hsl2rgb = (hslObj) => {
  let { h, s, l } = hslObj;
  s /= 100;
  l /= 100;
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return {
    r: 255 * f(0),
    g: 255 * f(8),
    b: 255 * f(4)
  };
};

export const rgb2hex = ({ r, g, b }) => '#' + [r, g, b]
  .map(x => x.toString(16).padStart(2, '0')).join('')
