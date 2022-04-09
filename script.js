function makePad (cols) {
  const container = document.querySelector('.container');
  container.style.setProperty('--grid-columns', cols);
  container.style.setProperty('--grid-rows', cols);
  for (i = 0; i < (cols * cols); i++) {
    let grid = document.createElement('div');
    container.appendChild(grid).id = 'grid-item';
  }
}

function makeRainbowColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  let a = 1;
//convert to gray scale then sum to get luminance
  let luminance = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
//luminance value closer to 0 mean color more on black spectrum
  if (luminance < 64) a = 0.1;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function paint () {
  const grid = document.querySelectorAll('#grid-item');
  let mouseDown = false; 

  grid.forEach(item => {
    item.addEventListener('mousedown', () => {
      mouseDown = true
    })
  });

  grid.forEach(item => {
    item.addEventListener('mouseup', () => {
      mouseDown = false
    })
  });

  grid.forEach(item => {
    item.addEventListener('mouseenter', (e) => { 
     color = colorPicker.value;
      if (mouseDown) e.target.style.setProperty('--bg-color', color);
    })
  });
}

function paintRainbow () {
  const grid = document.querySelectorAll('#grid-item');
  let mouseDown = false;

  grid.forEach(item => {
    item.addEventListener('mousedown', () => {
      mouseDown = true
    })
  });

  grid.forEach(item => {
    item.addEventListener('mouseup', () => {
      mouseDown = false
    })
  });

  grid.forEach(item => {
    item.addEventListener('mouseenter', (e) => {
      color = makeRainbowColor();
      if (mouseDown) {
        e.target.style.setProperty('--bg-color', color);
      }
    })
  });
}

document.querySelector('.grid-size').oninput = function() {
  document.querySelectorAll('#grid-item').forEach((div) => div.remove());
  document.querySelector('.slider-value').innerHTML = 
    `Grid Size:<br> ${this.value} x ${this.value}`;
  makePad(this.value);
}

const colorPicker = document.querySelector('.color-picker');
let color = colorPicker.value;
colorPicker.addEventListener('input', paint)

const lgbtButton = document.querySelector('.rainbow');
lgbtButton.addEventListener('click', paintRainbow);

makePad(16); //draw default pad
paint(); //start event listener for default color
