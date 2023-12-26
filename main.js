/* Copyright (C) 2023 Alhussien Ahmed */

let board = document.getElementById('Board');
let default_grid_size = 16;
let current_mode = "black";


function clear_board() {
	//Remove all active class from all cells
	let cells = document.querySelectorAll('.cell');
	cells.forEach((cell) => {
		cell.style.backgroundColor = 'white';
	});

	if(current_mode == "grey"){
		grey_colorize();
	}

}

// Variable to track mouse button state
let isMouseDown = false;

function change_grid_size() {
	let notvalid = true;
	grid = prompt('Enter the new grid size: ');
	default_grid_size = grid;
	while(notvalid){
		(grid == null || grid =="") || (grid < 1 || grid > 100) ? notvalid = true : notvalid = false;
		(notvalid) ? grid = prompt('Please enter a valid grid size between 1 and 100') : grid = grid;
	}
	//Clear the grid then create a new one
	destroy_grid();
	switch(current_mode){
		case "black":
		create_grid(default_grid_size);
		break;
		case "random":
		random_colorize();
		break;
		case "grey":
		grey_colorize();
		break;
	}
}

function create_grid(grid_size){

	current_mode = "black";
	destroy_grid();
	// Create the 16x16 grid of divs:
	for (let row = 0; row < grid_size; row++) {
		let rowDiv = document.createElement('div');
		board.appendChild(rowDiv);
		rowDiv.classList.add('row'); // Assign a class for styling

		for (let col = 0; col < grid_size; col++) {
			let cellDiv = document.createElement('div');
			cellDiv.classList.add('cell'); // Assign a class for styling

			// Prevent BUG of dragging cells 
			cellDiv.addEventListener('dragstart', function (event) {
				event.preventDefault(); // Prevent the default drag-and-drop behavior
			});
			// Prevent the browser context menu from appearing on right-click
			cellDiv.addEventListener('contextmenu', function (event) {
				event.preventDefault();
			});

			// Add event listeners for mouseover and mousedown
			cellDiv.addEventListener('mouseover', function (event) {
				if (event.buttons == 1) 
				{
					//Generate a random color and assign it to the cell
					cellDiv.style.backgroundColor = "black";
				}
			});

			// Add event listeners for mousedown and mouseover
			cellDiv.addEventListener('mousedown', function () {
				// Generate a random color and assign it to the cell
				cellDiv.style.backgroundColor = "black";
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

function random_colorize() {
	/*    Create grid
		* Add event listener to each cell
		* When mouseover && mouse pressed , change the background color to a random color
	*/

	current_mode = "random";
	destroy_grid();
	
	//TODO : Refactor this code to avoid duplication
	//This is a copy of create_grid() funcrtion with a random color added
	for (let row = 0; row < default_grid_size; row++) {
		let rowDiv = document.createElement('div');
		board.appendChild(rowDiv);
		rowDiv.classList.add('row'); // Assign a class for styling

		for (let col = 0; col < default_grid_size; col++) {
			let cellDiv = document.createElement('div');
			cellDiv.classList.add('cell'); // Assign a class for styling

			// Prevent BUG of dragging cells 
			cellDiv.addEventListener('dragstart', function (event) {
				event.preventDefault(); // Prevent the default drag-and-drop behavior
			});
			// Prevent the browser context menu from appearing on right-click
			cellDiv.addEventListener('contextmenu', function (event) {
				event.preventDefault();
			});

			// Add event listeners for mouseover and mousedown
			cellDiv.addEventListener('mouseover', function (event) {
				if (event.buttons == 1) 
				{
					//Generate a random color and assign it to the cell
					let random_color = Math.floor(Math.random()*16777215).toString(16);
					cellDiv.style.backgroundColor = "#" + random_color;
				}
			});
			// Add event listeners for mousedown and mouseover
			cellDiv.addEventListener('mousedown', function () {
					//Generate a random color and assign it to the cell
					let random_color = Math.floor(Math.random()*16777215).toString(16);
					cellDiv.style.backgroundColor = "#" + random_color;
			});


			//Add the cell to the row
			rowDiv.appendChild(cellDiv);
		}
	}

}

function grey_colorize(){

	current_mode = "grey";
	destroy_grid();
	
	//TODO : Refactor this code to avoid duplication
	//This is a copy of create_grid() funcrtion with a random color added
	for (let row = 0; row < default_grid_size; row++) {
		let rowDiv = document.createElement('div');
		board.appendChild(rowDiv);
		rowDiv.classList.add('row'); // Assign a class for styling

		for (let col = 0; col < default_grid_size; col++) {
			let cellDiv = document.createElement('div');
			cellDiv.classList.add('cell'); // Assign a class for styling

			// Prevent BUG of dragging cells 
			cellDiv.addEventListener('dragstart', function (event) {
				event.preventDefault(); // Prevent the default drag-and-drop behavior
			});
			// Prevent the browser context menu from appearing on right-click
			cellDiv.addEventListener('contextmenu', function (event) {
				event.preventDefault();
			});

			cellDiv.addEventListener('mousedown', function () {
				//DO STUFF
					setOpacity(cellDiv, +0.1);
			});

			cellDiv.addEventListener('mouseover', function (event) {
				if (event.buttons == 1) {
					//Do stuff
					setOpacity(cellDiv, +0.1);
				}
			});

			//Add the cell to the row
			rowDiv.appendChild(cellDiv);
		}
	}
}

function setOpacity(element, increment) {
	const computedStyle = window.getComputedStyle(element);
	const currentColor = computedStyle.getPropertyValue("background-color");
	if (currentColor.startsWith("rgba")) {
    const rgbaValues = currentColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),\s*(\d+(?:\.\d+)?)\)/);
    const currentOpacity = parseFloat(rgbaValues[4]);
    const newOpacity = Math.min(Math.max(currentOpacity + increment, 0), 1); // Ensure opacity stays within 0-1 range
    element.style.backgroundColor = `rgba(0, 0, 0, ${newOpacity})`;
	}
}
