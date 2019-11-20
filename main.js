$(document).ready(function () {

  const DOM = {};

  function cacheDom() {
    DOM.$main = $('.main');
    DOM.$userMinRange = $('#min-range');
    DOM.$userMaxRange = $('#max-range');
    DOM.$updateRangeButton = $('#update-button');
    DOM.$minRangeDisplay = $('#range-min-display');
    DOM.$maxRangeDisplay = $('#range-max-display');
  }

  cacheDom();

  const rangeInputs = ['min-range', 'max-range'];
  const guessInputs = ['challenger-1-guess', 'challenger-2-guess'];
  const invalidNumberInputChars = ['e', 'E', '-', ',', '.', '=', '+'];

  // module for helper functions

  // module to render things, errors, latest scores

  //module to render cards
  // the render error method can use template literals to construct the needed error message
  // another method can append the message to the correct element
  // another method can remove the error element when it is no longer necessary

  /* =================== module - helper functions =================== */
  const helperModule = (function () {
    /* =================== public methods ================== */
    function isBlank(...inputs) {
       return inputs.some(input => {
        return input.val() === '';
      })
    }

    function isLessThan(input1, input2) {
      return input1 < input2;
    }

    function isNegative(...inputs) {
      return inputs.every(input => {
        return !(input > 0);
      });
    }

    /* =============== export public methods =============== */
    return {
      isBlank: isBlank,
      isLessThan: isLessThan,
      isNegative: isNegative
    };
  })();


  // Blank name
  // name fields should disable and persist name once submit guess is clicked first time
  // Blank guess
  // Challenger names must be letters (no symbols or numbers)
  // Challenger names must be <= 15 chars

  // Render errors
  // Clear errors


  /* =================== module - range, rand num state =================== */
  const rangeModule = (function () {
    let range = {
      min: 1,
      max: 100
    };
    let randomNumber = setRandomNumber();

    /* =================== private methods ================= */
    function bindEvents() {
      DOM.$updateRangeButton.on('click', handleClick);
      DOM.$main.on('keydown keyup', handleKeydown);
    }

    function handleClick() {
      setRange();
      randomNumber = setRandomNumber();
      resetRangeInputs();
      renderRangeDisplay();
      console.log(randomNumber);
      console.log(range);
    }

    function handleKeydown(e) {
      if (rangeInputs.includes(e.target.id) && invalidNumberInputChars.includes(e.key)) {
        e.preventDefault();
      }

      toggleUpdateButton()
    }

    function resetRangeInputs() {
      DOM.$userMinRange.val('');
      DOM.$userMaxRange.val('');
    }

    // update should be disabled unless inputs are filled
    function toggleUpdateButton() {
      DOM.$updateRangeButton.attr('disabled',
          helperModule.isBlank(DOM.$userMinRange, DOM.$userMaxRange))
    }


    // Min range and max range can't be blank and click submit
    // Min range, max range, guesses must be number (no symbols)
    // Min must be less than max
    // Min, max cannot be negative

    /* =================== public methods ================== */
    function getRandomNumber() {
      return randomNumber;
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
  // Program starts with default range 1-100
  // Program starts with random number between default 1-100
  rangeModule.init();
});
