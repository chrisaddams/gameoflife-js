function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let grid;
let cols;
let rows;
let res = 8;

function setup() {
  createCanvas(800, 800);
  cols = width / res;
  rows = height / res;
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * res;
      let y = j * res;
      if (grid[i][j] == 1) {
        fill(255);
        rect(x, y, res, res);
      }
    }
  }
  let next = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];

      //count live neighbours

      let neighbors = countNeighbors(grid, i, j);

      //if dead and 3 neighbours alive - then alive.
      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      }
      //if alive and neighbours are less than 2 or greater than 3 - then dead.
      else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      }
      //else state is current state;
      else {
        next[i][j] = state;
      }
    }
  }
  grid = next;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}
