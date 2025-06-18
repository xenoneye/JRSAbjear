console.log("Hello")
let board;
let score = 0;
let rows = 4;
let columns = 4;




function setGame() {

	board = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	]


	for(let r = 0; r <rows; r++) {
		for (let c = 0; c <columns; c++) {
			let tile = document.createElement("div");

			tile.id = r.toString() + "-" + c.toString();

			let num = board[r][c];

			updateTile(tile, num);

			document.getElementById("board").append(tile);


		}
	}

setTwo();
setTwo();


};


function updateTile(tile, num) {
	tile.innerText = "";

	tile.classList.value = "";


	tile.classList.add("tile");

	if(num > 0) {
		tile.innerText = num.toString();

		if (num <= 4096) {
			tile.classList.add("x"+num.toString());
		} else {
			tile.classList.add("x8192");
		}
	}
};

window.onload = function() {
	setGame();
}


function handleSlide(e) {
	console.log(e.code);

	if(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.code)) {

		e.preventDefault();

		if(e.code == "ArrowLeft" && canMoveLeft()) {
			slideLeft();
			setTwo();
		} else if (e.code == "ArrowRight" && canMoveRight()) {
			slideRight();
			setTwo();
		}else if(e.code == "ArrowDown" && canMoveDown()) {
			slideDown();
			setTwo();
		}else if(e.code == "ArrowUp" && canMoveUp()) {
			slideUp();
			setTwo();
		}

	}

	document.getElementById("score").innerText = score;

	setTimeout(() => {
		if(hasLost()) {
			alert("Game Over! You have lost the game. The game will restart.")
			restartGame();

			alert("Click any arrow key to restart");
		} else {
			checkWin();
		}

	}, 100 );


};

document.addEventListener("keydown", handleSlide);

function slideLeft() {
	console.log("You pressed left");
	for(let r = 0; r < rows; r++) {
		let row = board[r] // r0: 0, 2, 2, 2

		row = slide(row);

		board[r] = row;

		for (let c = 0; c < columns; c++) {
			let tile = document.getElementById(r.toString() + "-" + c.toString())
			let num = board[r][c];

			updateTile(tile, num);
		}

	}

};

function slideRight() {
	console.log("You pressed right");

	for(let r = 0; r < rows; r++) {
		let row = board[r]

		row.reverse() ; // [0, 2, 2, 2] -> [2, 2, 2, 0]

		row = slide(row) // [4, 2, 0, 0]

		row.reverse(); // [0, 0, 2, 4]

		board[r] = row;

		for(let c = 0; c < columns; c++) {
			let tile = document.getElementById(r.toString() + "-" + c.toString())
			let num = board[r][c];
			updateTile(tile, num)
		}

	}
}

function slideUp() {
	console.log("You pressed up");

	for(let c = 0; c < columns; c++) {
		let col = [board[0][c], board[1][c], board[2][c], board[3][c]]

		col = slide(col) // [2, 2, 0, 0] -> [4, 0,] -> [4, 0, 0, 0]

		for(let r = 0; r < rows; r ++) {
			board[r][c] = col[r]
			/*
				[
					4,
					0,
					0,
					0
					]

			*/

			let tile = document.getElementById(r.toString() + "-" + c.toString())
			let num = board[r][c];

			updateTile(tile, num); 
		}
	}
}

function slideDown() {
	console.log("You pressed down");

	for(let c = 0; c < columns; c++) {
		let col = [board[0][c], board[1][c], board[2][c], board[3][c]]
	
		col.reverse(); //[0, 2, 0, 2]
		col = slide(col); // [2,2] -> [4,0] -> [4, 0, 0, 0]
		col.reverse(); // [0, 0, 0, 4]

		for(let r = 0; r < rows; r ++) {
			board[r][c] = col[r]
			/*
				[
					0,
					0,
					0,
					4
					]

			*/

			let tile = document.getElementById(r.toString() + "-" + c.toString())
			let num = board[r][c];

			updateTile(tile, num);
	}
}
}

function filterZero(row) {
	return row.filter(num => num != 0);
}

function slide(row) {
	row = filterZero(row);

	for(let i = 0; i < row.length - 1; i ++) {
		if(row[i] == row[i + 1]) {
			row[i] *=2;
			row[i + 1] = 0;
			score += row[i]; 
		}
	}

	row = filterZero(row);// [4, 2]

	while(row.length < columns) {
		row.push(0); // [4, 2, 0, 0]
	}
	return row;
}


function hasEmptyTile() {
	for(let r = 0; r < rows; r++) {
		for (let c = 0; c < columns; c++) {
			if(board[r][c] ==0) {
				return true;
			}
		}

	}
};


function setTwo() {
	if(!hasEmptyTile()) {
		return;

	}

	let found = false;

	while(!found) {

		let r = Math.floor(Math.random() * rows);
		let c = Math.floor(Math.random() * columns);

		if(board[r][c] == 0) {

			board[r][c] = 2;
			let tile = document.getElementById(r.toString() + "-" + c.toString());
			console.log(tile);

			tile.innerText = "2";
			tile.classList.add("x2")

			found = true;
		}

	}

};


function canMoveLeft() {
	for(let r = 0; r < rows; r++) {
		for(let c = 0; c < columns; c++) {

			if (board[r][c] !==0 ) {
				if(board[r][c - 1] === 0 || board[r][c - 1] === board[r][c]) {
					return true; 

				}
			}

		}
	}
	return false;
};


function canMoveRight() {
	for(let r = 0; r < rows; r++) {
		for(let c = columns - 2; c >=0 ; c--) {

			if (board[r][c] !==0 ) {
				if(board[r][c + 1] === 0 || board[r][c + 1] === board[r][c]) {
					return true; 

				}
			}

		}
	}
	return false;
};


function canMoveUp() {
	for(let c = 0; c < columns; c++) {
		for(let r = 1; r < rows; r++) {
			if(board[r][c] !== 0) {
				if(board[r-1][c] === 0 || board[r-1][c] === board [r][c]) {
					return true;
				}
			}

		}
	}
	return false;
};


function canMoveDown() {
	for(let c = 0; c < columns; c++) {
		for(let r = rows -2; r >=0; r--) {
			if(board[r][c] !== 0) {
				if(board[r+1][c] === 0 || board[r+1][c] === board [r][c]) {
					return true;

				}
			}

		}
	}
	return false;
};


function checkWin() {

	for(let r = 0; r < rows; r++) {
		for (let c =0; c < columns; c++) {
			if(board [r][c] == 2048 && is2024Exist == false) {
				alert("You are unstoppable and you got the tile 2048!")
				is2024Exist = true;
			} else if (board[r][c] == 4096 && is4096Exist == false) {
				alert("You're a star! You got 4096! Awesome!")
				is4096Exist = true;
			} else if (board[r][c] == 8192 && is8192Exist == false) {
				alert("Triple Kill! You got an 8192 tile! Victory");
				is8192Exist = true;
			}

		}
	}
};


function hasLost() {
	for(let r = 0; r < rows; r++) {
		for(let c = 0; c < columns; c++) {
			if(board[r][c] === 0) {
				//player has not lost yet.
				return false;
			}

			const currentTile = board[r][c];

			if(
				r > 0 && board[r-1][c] === currentTile ||// compares currentTile and adjacent above.
				r < rows - 1 && board[r+1][c] === currentTile || // compares currentTile and tile below
				c > 0 && board[r][c-1] === currentTile || // compares currentTile to the adjacent tile to the left
				c < columns - 1 && board[r][c+1] === currentTile // compares currentTile to the right
			)
			{
				return false;
			}

		}
	}
	//no possible moves, player has lost
	return true;

};


function restartGame() {
	board = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	]


	score = 0; 

	setTwo();

}