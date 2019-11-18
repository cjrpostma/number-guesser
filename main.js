(() => {
  let userMinRange = document.querySelector('#min-range')
  let userMaxRange = document.querySelector('#max-range')
  let minRange = 1;
  let maxRange = 100;
  let randomNumber;
  const main = document.querySelector('.main')
  const minRangeDisplay = document.querySelector('#range-min-display')
  const maxRangeDisplay = document.querySelector('#range-max-display')

  // As a user, the game selects a random number between the minRange and maxRange
  const generateRandom = () => {
    randomNumber = Math.floor(Math.random() * (maxRange - minRange + 1) + minRange)
  }

  // As a user, I can see the range displayed
  const updatesRangeDisplay = () => {
    minRangeDisplay.textContent = minRange
    maxRangeDisplay.textContent = maxRange
  }

  // As a user, I can set a custom range
  const setRange = () => {
    minRange = parseInt(userMinRange.value)
    maxRange = parseInt(userMaxRange.value)
  };

  const clearRangeInputs = () => {
    userMinRange.value = ''
    userMaxRange.value = ''
  }

  // Program starts with default range displayed
  updatesRangeDisplay()
  // Program starts with random number between default 1-100
  generateRandom()

  // Event listeners
  main.addEventListener('click', (e)=>{
    if(e.target.id === 'update-button') {
      setRange()
      clearRangeInputs()
      generateRandom()
      updatesRangeDisplay()
      console.log(randomNumber);
    }
  })

})();
