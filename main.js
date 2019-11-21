'use strict';

$(document).ready(function () {

  // cache dom
  // ----------------------------------------------------------------
  const $main = $('.main');
  const $maxRangeDisplay = $('#range-max-display');
  const $minRangeDisplay = $('#range-min-display');
  const $updateRangeButton = $('#update-button');
  const $submitGuessButton = $('#submit-guess-button');
  const $userMinRange = $('#min-range');
  const $userMaxRange = $('#max-range');

  // globals
  // ----------------------------------------------------------------
  let range = {min: 1, max: 100};
  let randomNumber = setRandomNumber();

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
    input.parent().find('.error').remove()
  }

  function renderErrorNode(message) {
    return `<div class="error">
              <i class="fas fa-exclamation-triangle error__icon"></i>
              <p class="error__text">${message}</p>
            </div>`;
  }

  // event listeners
  // ----------------------------------------------------------------
  $main.on('keydown', '#challenger-1-name, #challenger-2-name', handleNameKeydown);
  $main.on('keydown keyup', '#min-range, #max-range, #challenger-1-guess, #challenger-2-guess', handleNumberKeydown);
  $updateRangeButton.on('click', handleUpdateClick);
  $submitGuessButton.on('click', handleSubmitClick);

  // event handlers
  // ----------------------------------------------------------------
  function handleNameKeydown(e) {
    if (!e.key.match(/^([a-zA-Z]+\s)*[a-zA-Z\s]+$/)) {
      e.preventDefault();
    }

    removeErrorBorder(e);
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

    toggleUpdateButton();
  }

  function handleSubmitClick() {

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
