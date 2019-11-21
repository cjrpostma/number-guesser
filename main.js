'use strict';

$(document).ready(function () {

  // cache dom
  // ----------------------------------------------------------------
  const $main = $('.main');
  const $maxRangeDisplay = $('#range-max-display');
  const $minRangeDisplay = $('#range-min-display');
  const $updateRangeButton = $('#update-button');
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
    return max <= min;
  }

  function isNegative(...inputs) {
    return inputs.some(input => {
      return input < 0;
    });
  }

  // range, update button
  // ----------------------------------------------------------------
  function resetRangeInputs() {
    $userMinRange.val('');
    $userMaxRange.val('');
  }

  function toggleUpdateButton() {
    $updateRangeButton.attr('disabled',
        isBlank($userMinRange, $userMaxRange));
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


  // event listeners
  // ----------------------------------------------------------------
  $main.on('keydown', '#challenger-1-name, #challenger-2-name', handleNameKeydown);
  $main.on('keydown keyup', '#min-range, #max-range, #challenger-1-guess, #challenger-2-guess', handleNumberKeydown);
  $updateRangeButton.on('click', handleUpdateClick);

  // event handlers
  // ----------------------------------------------------------------
  function handleUpdateClick() {
    if (isNegative($userMaxRange.val(), $userMinRange.val())) {
      console.log('negative input error');
    } else if (isLessThanOrEqual($userMaxRange.val(), $userMinRange.val())) {
      console.log('less than error');
    } else {
      setRange();
      randomNumber = setRandomNumber();
      resetRangeInputs();
      renderRangeDisplay();
      toggleUpdateButton();
    }
  }

  function handleNumberKeydown(e) {
    if (['e', 'E', '-', ',', '.', '=', '+'].includes(e.key)) {
      e.preventDefault();
    }

    toggleUpdateButton();
  }

  function handleNameKeydown(e) {
    if (!e.key.match(/^([a-zA-Z]+\s)*[a-zA-Z\s]+$/)) {
      e.preventDefault();
    }
  }


  // start game
  // ----------------------------------------------------------------
  function startGame() {
    setRandomNumber()
    console.log(range);
    console.log(randomNumber);
    renderRangeDisplay()
  }

  startGame()
});
