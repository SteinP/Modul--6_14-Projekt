const numDivs = 36;
const maxHits = 10;

let hits = 1;
let firstHitTime = 0;
let divSelector

function startProgramm() {
  round();
  firstHitTime = getTimestamp();
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
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {

  // * FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $(divSelector).html("");
    $(divSelector).removeClass("target");
    round();
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке

  $("#button-reload").hide();
  $(".game-field").click(handleClick);
  $("#button-start").click(startProgramm);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
