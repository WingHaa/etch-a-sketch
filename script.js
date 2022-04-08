function createPad (cols) {
  const container = document.querySelector('.container');
  container.style.setProperty('--grid-columns', cols);
  container.style.setProperty('--grid-rows', cols);
  for (i = 0; i < (cols * cols); i++) {
    let grid = document.createElement('div');
    container.appendChild(grid).id = 'grid-item';
  }
}

document.querySelector('.grid-size').oninput = function() {
  document.querySelectorAll('#grid-item').forEach((div) => {
    div.remove();
  });
  document.querySelector('.slider-value').textContent = 
    `Grid Size: ${this.value} x ${this.value}`;
  createPad(this.value);
  paint();
}

const colorPicker = document.querySelectorAll('.color-pad');

colorPicker.forEach(element => {
  element.addEventListener('click', getColor)
});

let color;

function getColor (e) {
  color = e.target.className;
}

// function getColor() {
//   const colorPicker = document.querySelectorAll('.color-pad');
//   colorPicker.forEach(element => {
//     element.addEventListener('click', (e) => paint(e.target.className))
//     console.log(e.target.className)
//   });
// }

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
    item.addEventListener('mousemove', (e) => {
      if (mouseDown) e.target.setAttribute('class', color);
    })
  });
}

createPad(16); //draw default pad
paint(); //start event listener for paint logic

