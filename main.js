$(document).ready(function () {

/* =================== module - validates inputs =================== */
  const validateModule = (function () {
    const DOM = {};
    let numberInputs = ['min-range', 'max-range', 'challenger-1-guess', 'challenger-2-guess'];
    let invalidNumberInputChars = ['e', 'E', '-', ',', '.', '=', '+'];

    /* =================== private methods ================= */
    function cacheDom() {
      DOM.$main = $('.main');
    }

    function bindEvents() {
      DOM.$main.on('keydown', handleKeydown);
    }

    function handleKeydown(e) {
      if (numberInputs.includes(e.target.id) && invalidNumberInputChars.includes(e.key)) {
        e.preventDefault();
      }
    }

    // Min range and max range can't be blank and click submit
    // Min range, max range, guesses must be number (no symbols)
    // Min must be less than max
    // Min, max cannot be negative
    // Max cannot be greater than 1000
    // Blank name
    // Blank guess
    // Challenger names must be letters (no symbols or numbers)
    // Challenger names must be <= 15 chars

    // Render errors
    // Clear errors

    /* =================== public methods ================== */
    function init() {
      cacheDom();
      bindEvents();
    }

    /* =============== export public methods =============== */
    return {
      init: init
    };
  })();


/* =================== module - range, rand num state =================== */
    const rangeModule = (function () {
      const DOM = {};
      let range = {
        min: 1,
        max: 100
      };
      let randomNumber = setRandomNumber()

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
      randomNumber = setRandomNumber();
      renderRangeDisplay();
      console.log(randomNumber);
    }

    function resetRangeInputs() {
      DOM.$userMinRange.val('');
      DOM.$userMaxRange.val('');
    }

    /* =================== public methods ================== */
    function getRandomNumber() {
      return randomNumber
    }

    function renderRangeDisplay() {
      DOM.$minRangeDisplay.text(range.min);
      DOM.$maxRangeDisplay.text(range.max);
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

    function setRange() {
      range = {
        min: parseInt(DOM.$userMinRange.val()),
        max: parseInt(DOM.$userMaxRange.val())
      };
    }

    function init() {
      cacheDom();
      bindEvents();
      setRandomNumber();
      renderRangeDisplay();
    }

    /* =============== export public methods =============== */
    return {
      init: init,
      getRandomNumber: getRandomNumber,
      range: range,
      renderRangeDisplay: renderRangeDisplay,
      setRandomNumber: setRandomNumber
    };
  })();


/* =============== program execution =============== */
  validateModule.init();
  // Program starts with default range 1-100
  // Program starts with random number between default 1-100
  rangeModule.init();

});
