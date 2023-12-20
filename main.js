/* Copyright (C) 2023 Alhussien Ahmed */

let board = document.getElementById('Board');

// Create the 16x16 grid of divs:
for (let row = 0; row < 16; row++) {
	let rowDiv = document.createElement('div');
	board.appendChild(rowDiv);
	rowDiv.classList.add('row'); // Assign a class for styling

	for (let col = 0; col < 16; col++) {
		let cellDiv = document.createElement('div');
		cellDiv.classList.add('cell'); // Assign a class for styling
		rowDiv.appendChild(cellDiv);
	}
}
