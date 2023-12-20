/* Copyright (C) 2023 Alhussien Ahmed */

let board = document.getElementById('Board');
let default_grid_size = 16;


function clear_board() {
	//Remove all active class from all cells
	let cells = document.querySelectorAll('.cell');
	cells.forEach((cell) => {
		cell.classList.remove('active');
	});
}

// Variable to track mouse button state
let isMouseDown = false;

function change_grid_size() {
	let notvalid = true;
	grid = prompt('Enter the new grid size: ');
	while(notvalid){
		(grid == null || grid =="") || (grid < 1 || grid > 100) ? notvalid = true : notvalid = false;
		(notvalid) ? grid = prompt('Please enter a valid grid size between 1 and 100') : grid = grid;
	}
	//Clear the grid then create a new one
	destroy_grid();
	create_grid(grid);
}

function create_grid(grid_size){
	// Create the 16x16 grid of divs:
	for (let row = 0; row < grid_size; row++) {
		let rowDiv = document.createElement('div');
		board.appendChild(rowDiv);
		rowDiv.classList.add('row'); // Assign a class for styling

		for (let col = 0; col < grid_size; col++) {
			let cellDiv = document.createElement('div');
			cellDiv.classList.add('cell'); // Assign a class for styling

			// Add event listeners for mouseover and mousedown
			cellDiv.addEventListener('mouseover', function () {
				if (isMouseDown) {
					cellDiv.classList.add('active');
				}
			});
			cellDiv.addEventListener('mousedown', function () {
				isMouseDown = true;
				cellDiv.classList.add('active');
			});

			cellDiv.addEventListener('dragstart', function (event) {
				event.preventDefault(); // Prevent the default drag-and-drop behavior
			});
			cellDiv.addEventListener('mouseup', function () {
				isMouseDown = false;
			});
			// Prevent the browser context menu from appearing on right-click
			cellDiv.addEventListener('contextmenu', function (event) {
				event.preventDefault();
			});

			//Add the cell to the row
			rowDiv.appendChild(cellDiv);
		}
	}
}

create_grid(default_grid_size);

function destroy_grid(){
	// Remove all child nodes of the board
	while (board.firstChild) {
		board.removeChild(board.firstChild);
	}
}
