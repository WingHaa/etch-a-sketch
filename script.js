function setUpGrid() {
  const container = document.querySelector('.container');
  const colorPicker = document.querySelectorAll('.color-pad');
  let mouseDown = false; 
  createPad(16, 16);
  const grid = document.querySelectorAll('.grid-item');

  function createPad (cols, rows) {
    container.style.setProperty('--grid-columns', cols);
    container.style.setProperty('--grid-rows', rows);
    for (i = 0; i < (cols * rows); i++) {
      let grid = document.createElement('div');
      container.appendChild(grid).className = 'grid-item';
    }
  }
  
  colorPicker.forEach(element => {
    element.addEventListener('click', getColor)
  });
  
  let color;
  
  function getColor (e) {
    color = e.target.id;
  }
  
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
    item.addEventListener('mousemove', paint)
  });
  
  function paint(e) {
    if (mouseDown) {
      e.target.setAttribute('id', color);
    }
  }
}

setUpGrid();