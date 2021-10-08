//#region Click handlers
function testForm() {
  hideAllPages();
  $("#form-page").slideDown();
}

function play() {
  hideAllPages();
  newGame();
  $("#chess-page").slideDown();
}

function flexExample(){
  hideAllPages();
  $("#flex-page").slideDown();
}

function blank(){
  hideAllPages();
}

function addTag(event){
  event.preventDefault();
  let tag = $("#new-tag").val();
  $("#tags").append(`<div>${tag}</div>`);
  $("#new-tag").val("");
}

//#region Other stuff
function hideAllPages() {
  $(".page").slideUp();
}


