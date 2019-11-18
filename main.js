(() => {
  let userMinRange = document.querySelector('#min-range')
  let userMaxRange = document.querySelector('#max-range')
  let minRange = 1;
  let maxRange = 100;
  let randomNumber;
  const main = document.querySelector('.main')

  // As a user, the game selects a random number between the minRange and maxRange
  const generateRandom = () => {
    randomNumber = Math.floor(Math.random() * (maxRange - minRange + 1) + minRange)
  }

  // As a user, I can set a custom range
  const setRange = () => {
    minRange = parseInt(userMinRange.value)
    maxRange = parseInt(userMaxRange.value)
  };

  // Program starts with random number between default 1-100
  generateRandom()

  // Event listeners
  main.addEventListener('click', (e)=>{
    if(e.target.id === 'update-button') {
      setRange()
      generateRandom()
      console.log(randomNumber);
    }
  })

})();
