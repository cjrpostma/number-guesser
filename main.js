
$(document).ready(function () {
'use strict';

  const DOM = {};

  function cacheDom() {
    DOM.$challenger1Guess = $('#challenger-1-guess')
    DOM.$challenger2Guess = $('#challenger-2-guess')
    DOM.$challenger1Name = $('#challenger-1-name')
    DOM.$challenger2Name = $('#challenger-2-name')
    DOM.$main = $('.main');
    DOM.$maxRangeDisplay = $('#range-max-display');
    DOM.$minRangeDisplay = $('#range-min-display');
    DOM.$updateRangeButton = $('#update-button');
    DOM.$userMinRange = $('#min-range');
    DOM.$userMaxRange = $('#max-range');
  }

  cacheDom();

  const invalidNumberInputChars = ['e', 'E', '-', ',', '.', '=', '+'];
  const rangeInputs = ['min-range', 'max-range'];

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

    /* =============== export public methods =============== */
    return {
      isBlank: isBlank,
      isLessThanOrEqual: isLessThanOrEqual,
      isNegative: isNegative
    };
  })();

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
      DOM.$main.on('keydown keyup', '#min-range, #max-range', handleKeydown);
    }

    function handleClick() {
      if (helperModule.isNegative(DOM.$userMaxRange.val(), DOM.$userMinRange.val())) {
        console.log('negative input error');
      } else if (helperModule.isLessThanOrEqual(DOM.$userMaxRange.val(), DOM.$userMinRange.val       ())) {
        console.log('less than error');
      } else {
        setRange();
        randomNumber = setRandomNumber();
        resetRangeInputs();
        renderRangeDisplay();
        toggleUpdateButton();
        console.log(randomNumber);
        console.log(range);
      }
    }

    function handleKeydown(e) {
      if (invalidNumberInputChars.includes(e.key)) {
        e.preventDefault();
      }

      toggleUpdateButton();
    }

    function resetRangeInputs() {
      DOM.$userMinRange.val('');
      DOM.$userMaxRange.val('');
    }

    function toggleUpdateButton() {
      DOM.$updateRangeButton.attr('disabled',
          helperModule.isBlank(DOM.$userMinRange, DOM.$userMaxRange));
    }

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


  /* =================== module - name state =================== */
  const nameModule = (function () {

    /* =================== private methods ================= */
    function bindEvents() {
      DOM.$main.on('keydown', '#challenger-1-name, #challenger-2-name', handleKeydown)
    }

    function handleKeydown(e) {
      if (!e.key.match(/^([a-zA-Z]+\s)*[a-zA-Z\s]+$/)) {
        e.preventDefault();
      }
    }

    /* =================== public methods ================== */
    function init() {
      bindEvents();
    }

    /* =============== export public methods =============== */
    return {
      init: init,
    };
  })();


  /* =================== module - name state =================== */
  const guessModule = (function () {

    /* =================== private methods ================= */
    function bindEvents() {
      DOM.$main.on('keydown', '#challenger-1-name, #challenger-2-name', handleKeydown)
    }

    function handleKeydown(e) {
      if (!e.key.match(/^([a-zA-Z]+\s)*[a-zA-Z\s]+$/)) {
        e.preventDefault();
      }
    }

    /* =================== public methods ================== */
    function init() {
      bindEvents();
    }

    /* =============== export public methods =============== */
    return {
      init: init,
    };
  })();




  // Blank name
  // name fields should disable and persist name once submit guess is clicked first time

  // Blank guess

  // Render errors
  // Clear errors




  /* =============== program execution =============== */
  // Program starts with default range 1-100
  // Program starts with random number between default 1-100
  rangeModule.init();
  nameModule.init()
});
