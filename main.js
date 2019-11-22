'use strict';

$(document).ready(function () {

  // cache dom
  // ----------------------------------------------------------------
  const $chal1Name = $('#challenger-1-name');
  const $chal2Name = $('#challenger-2-name');
  const $chal1Guess = $('#challenger-1-guess');
  const $chal2Guess = $('#challenger-2-guess');
  const $main = $('.main');
  const $maxRangeDisplay = $('#range-max-display');
  const $minRangeDisplay = $('#range-min-display');
  const $scoreChal1Feedback = $('#score-c1-feedback');
  const $scoreChal2Feedback = $('#score-c2-feedback');
  const $scoreChal1Guess = $('#score-c1-guess');
  const $scoreChal2Guess = $('#score-c2-guess');
  const $scoreChal1Name = $('#score-c1-name');
  const $scoreChal2Name = $('#score-c2-name');
  const $submitGuessButton = $('#submit-guess-button');
  const $updateRangeButton = $('#update-button');
  const $userMinRange = $('#min-range');
  const $userMaxRange = $('#max-range');

  // globals
  // ----------------------------------------------------------------
  let range = {min: 1, max: 100};
  let randomNumber = setRandomNumber();
  let feedback = {low: `that's too low`, high: `that's too high`, correct: `correct!`};

  // helpers
  // ----------------------------------------------------------------
  function isBlank(...inputs) {
    return inputs.some(input => {
      return input.val() === '';
    });
  }

  function isLessThanOrEqual(max, min) {
    return max.val() <= min.val();
  }

  function isNegative(...inputs) {
    return inputs.some(input => {
      return input.val() < 0;
    });
  }

  function whichIsBlank(...inputs) {
    return inputs.filter(input => input.val() === '');
  }

  function whichIsNegative(...inputs) {
    return inputs.filter(input => input.val() < 0);
  }

  // range, update button
  // ----------------------------------------------------------------
  function resetRangeInputs() {
    $userMinRange.val('');
    $userMaxRange.val('');
  }

  function toggleUpdateButton() {
    let blank = isBlank($userMinRange, $userMaxRange);
    let negative = isNegative($userMinRange, $userMaxRange);
    let ltOrEq = isLessThanOrEqual($userMaxRange, $userMinRange);

    $updateRangeButton.attr('disabled', (blank || negative || ltOrEq));
  }

  function renderRangeDisplay() {
    $minRangeDisplay.text(range.min);
    $maxRangeDisplay.text(range.max);
  }

  function resetRange() {
    range = {min: 1, max: 100};
  }

  function setRandomNumber() {
    return Math.floor(Math.random() * (range.max - range.min + 1) + range.min);
  }

  function setRange() {
    range = {
      min: parseInt($userMinRange.val()),
      max: parseInt($userMaxRange.val())
    };
  }

  // name, guess, submit, reset, clear
  // ----------------------------------------------------------------
  function disableNameInputs() {
    $chal1Name.attr('disabled', true);
    $chal2Name.attr('disabled', true);
  }

  function enableNameInputs() {
    $chal1Name.attr('disabled', false);
    $chal2Name.attr('disabled', false);
  }

  function resetGuessInputs() {
    $chal1Guess.val('');
    $chal2Guess.val('');
  }

  // latest score
  // ----------------------------------------------------------------
  function renderChallengerNames() {
    $scoreChal1Name.text($chal1Name.val());
    $scoreChal2Name.text($chal2Name.val());
  }

  function renderChallengerFeedback() {
    $scoreChal1Feedback.text(parseChallengerFeedback($chal1Guess.val()));
    $scoreChal2Feedback.text(parseChallengerFeedback($chal2Guess.val()));
  }

  function parseChallengerFeedback(guess) {
    switch (true) {
      case (guess < randomNumber):
        return feedback.low;
      case (guess > randomNumber):
        return feedback.high;
      default:
        return feedback.correct;
    }
  }

  function renderChallengerGuesses() {
    $scoreChal1Guess.text($chal1Guess.val());
    $scoreChal2Guess.text($chal2Guess.val());
  }

  // errors
  // ----------------------------------------------------------------
  function appendErrorNode(input, message) {
    let errorNode = renderErrorNode(message);

    input.parent().append(errorNode);
  }

  function addErrorBorder(...inputs) {
    inputs.map(input => input.addClass('error--border'));
  }

  function removeErrorBorder(...inputs) {
    inputs.map(input => input.removeClass('error--border'));
  }

  function removeErrorNode(input) {
    input.parent().find('.error').remove();
  }

  function renderErrorNode(message) {
    return `<div class="error">
              <i class="fas fa-exclamation-triangle error__icon"></i>
              <p class="error__text">${message}</p>
            </div>`;
  }

  // event listeners
  // ----------------------------------------------------------------
  $main.on('keydown keyup', '#challenger-1-name, #challenger-2-name', handleNameKeydown);
  $main.on('keydown keyup', '#min-range, #max-range, #challenger-1-guess, #challenger-2-guess', handleNumberKeydown);
  $updateRangeButton.on('click', handleUpdateClick);
  $submitGuessButton.on('click', handleSubmitClick);

  // event handlers
  // ----------------------------------------------------------------
  function handleNameKeydown(e) {
    if (!e.key.match(/^([a-zA-Z]+\s)*[a-zA-Z\s]+$/)) {
      e.preventDefault();
    }

    if (e.target.value !== '') {
      removeErrorBorder($(e.target));
      removeErrorNode($(e.target));
    }
  }

  function handleNumberKeydown(e) {
    if (['e', 'E', '-', ',', '.', '=', '+'].includes(e.key)) {
      e.preventDefault();
    }

    if (e.target.value < 0 && (e.target.parentNode.children.length < 3)) {
      addErrorBorder($(e.target));
      appendErrorNode($(e.target), 'Number must be positive.');
    }

    if (e.target.value >= 0) {
      removeErrorBorder($(e.target));
      removeErrorNode($(e.target));
    }

    if (e.target.id === 'max-range') {
      if (e.target.value <= parseInt($userMinRange.val())) {
        appendErrorNode($(e.target), 'Min must be less than max.');
      }
    }

    toggleUpdateButton();
  }

  function handleSubmitClick() {
    if (isBlank($chal1Name, $chal2Name, $chal1Guess, $chal2Guess)) {
      let blankInputs = whichIsBlank($chal1Name, $chal2Name, $chal1Guess, $chal2Guess);
      blankInputs.map(input => {
        addErrorBorder(input);
        appendErrorNode(input, 'Field required.');
      });
      return;
    }

    if (isNegative($chal1Guess, $chal2Guess)) {
      return
    }

    disableNameInputs();
    renderChallengerNames();
    renderChallengerGuesses();
    renderChallengerFeedback();
    resetGuessInputs();
  }

  function handleUpdateClick() {
    if (isNegative($userMinRange, $userMaxRange)) {
      return;
    } else if (isLessThanOrEqual($userMaxRange, $userMinRange)) {
      return;
    } else {
      setRange();
      randomNumber = setRandomNumber();
      resetRangeInputs();
      renderRangeDisplay();
      toggleUpdateButton();
    }
  }

  // start game
  // ----------------------------------------------------------------
  function startGame() {
    setRandomNumber();
    console.log(range);
    console.log(randomNumber);
    renderRangeDisplay();
  }

  startGame();
});

// TODO add responsive design
// TODO add timer
// TODO add game class to render cards
// TODO add rendering of game cards
// TODO add close button listener on right side of page
// TODO add guess counter
// TODO add reset game functionality
// TODO add clear game functionality
