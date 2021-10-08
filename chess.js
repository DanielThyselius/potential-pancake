
//#region Global variables
let squares = [];
let focusedSquare = {};
let score = 0;
let isAnimating = false;

//#endregion

function newGame() {
  clearBoard();
  createBoard();
  colorBoard();
  placePieces();
  addEventListeners();
}

function clearBoard() {
  $("#chess-board").empty();
}

function createBoard() {
  let count = 0;
  while (count < 64) {
    $("#chess-board").append('<div class="square"></div>');
    count++;
  }
  squares = $(".square");
}

function colorBoard() {
  squares.each(function () {

    let index = $(this).index();

    if (shouldBeLightSquare(index)) {
      jQuery(this).addClass("lightSquare");
    }
    else {
      $(this).addClass("darkSquare");
    }
  })
}

function shouldBeLightSquare(index) {
  // check if end of odd numbered row
  if (Math.floor(index / 8) % 2 === 1) {
    index++;
  }

  if (index % 2 === 0) {
    return true;
  }

  return false;
}

function placePieces() {
  // Place black piece
  let blackIndex = Math.floor(Math.random() * squares.length);
  spawnBlackPiece(blackIndex);

  // Place white piece
  let whiteIndex = blackIndex;

  // make sure pieces don't spawn on the same square
  while (blackIndex === whiteIndex) {
    whiteIndex = Math.floor(Math.random() * squares.length);
  }
  spawnWhitePiece(whiteIndex);
}

function spawnBlackPiece(blackIndex) {
  squares.eq(blackIndex).html('<img src="./pieces/king_b.png" id="b" class="piece">');
}

function spawnWhitePiece(whiteIndex) {
  let pieces =
    ["bishop_w.png",
      "king_w.png",
      "knight_w.png",
      "pawn_w.png",
      "queen_w.png",
      "tower_w.png"
    ]
  let randomIndex = Math.floor(Math.random() * pieces.length);
  squares.eq(whiteIndex).html(`<img src="./pieces/${pieces[randomIndex]}" id="w" class="piece">`);
}

function addEventListeners() {
  $(document).on("keydown", playerControl)
  squares.on("click", onClick);
}

function playerControl(event) {
  if (isAnimating) {
    return;
  }
  isAnimating = true;
  let blackPiece = $("#b");
  let key = event.key.toLowerCase();
  let oldIndex = getIndexOfPiece(blackPiece);
  let newIndex = 0;
  // Animate moving
  blackPiece.addClass("pieceClicked");
  console.log('key :>> ', key);

  // Get new Index based on direction
  switch (key) {
    case "arrowup":
    case "w":
      newIndex = getNewIndexStepUp(oldIndex);
      break;
    case "arrowdown":
    case "s":
      newIndex = getNewIndexStepDown(oldIndex);
      break;
    case "arrowleft":
    case "a":
      newIndex = getNewIndexStepLeft(oldIndex);
      break;
    case "arrowright":
    case "d":
      newIndex = getNewIndexStepRight(oldIndex);
      break;

    default:
      newIndex = oldIndex;
      break;
  }

  movePieceToIndex(blackPiece, newIndex);
}

function getNewIndexStepRight(index) {
  // Adjust i to represent a step left
  // If pice is against left wall, move to right wall
  if (index % 8 === 7) {
    index -= 7;
  }
  else {
    index++;
  }
  return index;
}

function getNewIndexStepLeft(index) {
  // Adjust i to represent a step left
  // If pice is against left wall, move to right wall
  if (index % 8 === 0) {
    index += 7;
  }
  else {
    index--;
  }
  return index;
}

function getNewIndexStepDown(index) {
  // if on bottomline, get top line index
  if (index >= 56) {
    index -= 56;
  }
  // else get index of square below
  else {
    index += 8;
  }
  return index;
}

function getNewIndexStepUp(index) {
  // If on top line, get bottom line index
  if (index <= 7) {
    index += 56;
  }
  // Else, get index of square above
  else {
    index -= 8;
  }
  return index;
}

function getIndexOfPiece(piece) {
  return piece.parent().index();
}

function movePieceToIndex(piece, i) {
  // vänta en liten stund sedan ta bort .clicked
  setTimeout(function () {
    piece.remove();

    // If stepped on white piece, spawn that pice in new random square
    if (squares.eq(i).html() !== "") {
      // We stepped on a piece
      let newIndexforWhite = i
      while (newIndexforWhite === i) {
        newIndexforWhite = Math.floor(Math.random() * squares.length);
      }
      spawnWhitePiece(newIndexforWhite);
    }
    // Put the piece back to square on the left
    spawnBlackPiece(i);
    isAnimating = false;
  }, 500);
}

function onClick(event) {
  $(event.target).addClass("clicked");
  // vänta en liten stund sedan ta bort .clicked
  setTimeout(function () {
    $(event.target).removeClass("clicked");
  }, 300);
}
