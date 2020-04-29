const numDivs = 36;
const maxHits = 11;

let hits;
let fails;
let firstHitTime;
let divSelector;

function startProgramm() {
  hits = 1;
  fails = 0;
  firstHitTime = 0;
  $(".Feld").show();
  $("#button-start").hide();
  round();
  // firstHitTime = getTimestamp();
};

function round() {
  // *FIXME: надо бы убрать "target" прежде чем искать новый

  divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).html(hits);

  // *FIXME: тут надо определять при первом клике firstHitTime

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // *FIXME: спрятать игровое поле сначала
  $(".Feld").hide();
  $("#button-start").hide();
  $("#button-reload").show();
  $(divSelector).html("");
  $(divSelector).removeClass("target");
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  if (hits == 1){
    firstHitTime = getTimestamp();
  }
  // * FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $(divSelector).html("");
    $(divSelector).removeClass("target");
    round();
  } //else {
  //   fails += 1
  //   $(event.target).addClass('miss');
  //}

  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке

  $("#button-reload").hide();
  $(".Feld").hide();
  $("#button-start").click(startProgramm);
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    // location.reload();
    $("#button-reload").hide();
    $("#button-start").show();
    $("#win-message").addClass("d-none");
  });
}

$(document).ready(init);
