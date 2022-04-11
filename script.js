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
//reroll to get less whitey color
  if ((Math.abs(r-g) < 20) && 
    (Math.abs(r-b) < 20) && 
    (Math.abs(b-g) < 20)) makeRainbowColor();
//convert to gray scale then sum to get luminance
  let luminance = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
//luminance value closer to 0 mean color more on black spectrum
  if (luminance < 64) a = 0.1;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function paint (mode) {
  //store what mode is in use to pass to remakePad function
  document.querySelector('.grid-size').mode = mode;
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
      switch(mode) {
        case 'color':
          color = colorPicker.value;
          break;
        case 'rainbow':
          color = makeRainbowColor();
          break;
        case 'erase':
          color = '#ffffff';
          break;  
        default:
          color = colorPicker.value;
      }
      if (mouseDown) e.target.style.setProperty('--bg-color', color);
    })
  });
}

function remakePad (event) {
  document.querySelectorAll('#grid-item').forEach((div) => div.remove());
  document.querySelector('.slider-value').innerHTML = 
    `Grid Size:<br> ${this.value} x ${this.value}`;
  makePad(this.value);
  paint(event.currentTarget.mode);
}

function cleanPad () {
  document.querySelectorAll('#grid-item').forEach((div) => 
    div.style.removeProperty('--bg-color'));
}

document.querySelector('.footer').innerHTML = 
  `<p>Copyright © ${new Date().getFullYear()} WingHaa. All Rights Reserved</p>`;

document.querySelector('.grid-size').addEventListener('input', remakePad);

const colorPicker = document.querySelector('.color-picker');
colorPicker.addEventListener('change', () => paint('color'));

const lgbtButton = document.querySelector('.rainbow');
lgbtButton.addEventListener('click', () => paint('rainbow'));

const eraseButton = document.querySelector('.eraser');
eraseButton.addEventListener('click', () => paint('erase'));

const cleanButton = document.querySelector('.clean');
cleanButton.addEventListener('click', cleanPad);

makePad(16); //draw default pad
paint(); //start event listener for default color