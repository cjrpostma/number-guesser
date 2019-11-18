$(document).ready(() => {

  let $userMinRange = $('#min-range')
  let $userMaxRange = $('#max-range')
  let minRange = 1;
  let maxRange = 100;
  let randomNumber;
  const $main = $('.main')
  const $minRangeDisplay = $('#range-min-display')
  const $maxRangeDisplay = $('#range-max-display')
  let numberInputs = ['min-range', 'max-range', 'challenger-1-guess', 'challenger-2-guess']
  let invalidNumberInputChars = ['e', 'E', '-', ',', '.', '=', '+']

  // As a user, the game selects a random number between the minRange and maxRange
  const generateRandom = () => {
    randomNumber = Math.floor(Math.random() * (maxRange - minRange + 1) + minRange)
  }

  // As a user, I can see the range displayed
  const updatesRangeDisplay = () => {
    $minRangeDisplay.text(minRange)
    $maxRangeDisplay.text(maxRange)
  }

  // As a user, I can set a custom range
  const setRange = () => {
    minRange = parseInt($userMinRange.val())
    maxRange = parseInt($userMaxRange.val())
  };

  const clearRangeInputs = () => {
    $userMinRange.val('')
    $userMaxRange.val('')
  }

  // Program starts with default range displayed
  updatesRangeDisplay()
  // Program starts with random number between default 1-100
  generateRandom()

  // Event listeners
  $main.on('click', (e)=>{
    if(e.target.id === 'update-button') {
      setRange()
      clearRangeInputs()
      generateRandom()
      updatesRangeDisplay()
      console.log(randomNumber);
    }
  })

  $main.on('keydown', (e)=>{
    if(numberInputs.includes(e.target.id) && invalidNumberInputChars.includes(e.key)) {
        e.preventDefault()
    }
  })

});
