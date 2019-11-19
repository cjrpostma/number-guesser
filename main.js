$(document).ready(function () {

  // Module to set state of range, random number
  const rangeModule = (function () {
    const DOM = {};
    let range = {
      min: 1,
      max: 100
    };

    /* =================== private methods ================= */
    function cacheDom() {
      DOM.$userMinRange = $('#min-range');
      DOM.$userMaxRange = $('#max-range');
      DOM.$updateRangeButton = $('#update-button');
      DOM.$minRangeDisplay = $('#range-min-display');
      DOM.$maxRangeDisplay = $('#range-max-display');
    }

    function bindEvents() {
      DOM.$updateRangeButton.on('click', handleClick);
    }

    function handleClick() {
      setRange();
      resetRangeInputs();
      setRandomNumber();
      renderRangeDisplay();
    }

    function resetRangeInputs() {
      DOM.$userMinRange.val('');
      DOM.$userMaxRange.val('');
    }

    /* =================== public methods ================== */
    function setRange() {
      range = {
        min: parseInt(DOM.$userMinRange.val()),
        max: parseInt(DOM.$userMaxRange.val())
      };
    }

    function resetRange() {
      range = {
        min: 1,
        max: 100
      };
    }

    function setRandomNumber() {
      return Math.floor(Math.random() * (range.max - range.min + 1) + range.min);
    }

    function renderRangeDisplay() {
      DOM.$minRangeDisplay.text(range.min);
      DOM.$maxRangeDisplay.text(range.max);
    }

    function init() {
      cacheDom();
      bindEvents();
    }

    /* =============== export public methods =============== */
    return {
      init: init,
      range: range,
      renderRangeDisplay: renderRangeDisplay,
      setRandomNumber: setRandomNumber
    };
  })();





  /* =============== export public methods =============== */
  rangeModule.init();
  // Program starts with default range 1-100
  // Program starts with random number between default 1-100
  rangeModule.setRandomNumber();
  rangeModule.renderRangeDisplay();




  const $main = $('.main');

  let numberInputs = ['min-range', 'max-range', 'challenger-1-guess', 'challenger-2-guess'];
  let invalidNumberInputChars = ['e', 'E', '-', ',', '.', '=', '+'];

  // As a user, the game selects a random number between the minRange and maxRange


  $main.on('keydown', (e) => {
    if (numberInputs.includes(e.target.id) && invalidNumberInputChars.includes(e.key)) {
      e.preventDefault();
    }
  });

});
