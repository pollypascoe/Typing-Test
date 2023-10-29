// define the time limit
let TIME_LIMIT = 60;

// define quotes to be used
let quotes_array = [
  "By the time she was three, Matilda had taught herself to read by studying newspapers and magazines that lay around the house. At the age of four, she could read fast and well and she naturally began hankering after books.",
  "The only book in the whole of this enlightened household was something called Easy Cooking belonging to her mother, and when she had read this from cover to cover and had learnt all the recipes by heart, she decided she wanted something more interesting.",
  "‘Daddy,’ she said, ‘do you think you could buy me a book?’ ‘A BOOK?’ he said. ‘What d’you want a flaming book for?’ ‘To read, Daddy.’",
  "‘What’s wrong with the telly, for heaven’s sake? We’ve got a lovely telly with a twelve-inch screen and now you come asking for a book! You’re getting spoiled, my girl!’",
];

// selecting required elements
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");
let intro_text = document.querySelector(".introText");
let counter_div = document.querySelector(".header");
let start_button = document.querySelector(".startGame");
let excerpt_reference = document.querySelector(".reference");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;


function showQuote() {
  
  quote_text.textContent = null;
  current_quote = quotes_array[quoteNo];
  
  // separate each character and make an element 
  // out of each of them to individually style them
  current_quote.split('').forEach(char => {
    const charSpan = document.createElement('span')
    charSpan.innerText = char
    quote_text.appendChild(charSpan)
  })

  // roll over to the first quote
  if (quoteNo < quotes_array.length - 1)
    quoteNo++;
  else
    quoteNo = 0;

    quote_text.style.display = "block";
    input_area.style.display="flex";
    counter_div.style.display="flex";
    counter_div.style.flexwrap="wrap";
    intro_text.style.display="none";
    start_button.style.display="none";
    restart_btn.style.display="block";
    excerpt_reference.style.display="block";
}

function updateQuote() { 
  quote_text.textContent = null; 
  current_quote = quotes_array[quoteNo]; 
  
  // separate each character and make an element  
  // out of each of them to individually style them 
  current_quote.split('').forEach(char => { 
    const charSpan = document.createElement('span') 
    charSpan.innerText = char 
    quote_text.appendChild(charSpan) 
  }) 
  
  // roll over to the first quote 
  if (quoteNo < quotes_array.length - 1) 
    quoteNo++; 
  else
    quoteNo = 0; 
} 

function processCurrentText() {

  // get current input text and split it
  curr_input = input_area.value;
  curr_input_array = curr_input.split('');

  // increment total characters typed
  characterTyped++;

  errors = 0;

  quoteSpanArray = quote_text.querySelectorAll('span');
  quoteSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index]

    // characters not currently typed
    if (typedChar == null) {
      char.classList.remove('correct_char');
      char.classList.remove('incorrect_char');

      // correct characters
    } else if (typedChar === char.innerText) {
      char.classList.add('correct_char');
      char.classList.remove('incorrect_char');

      // incorrect characters
    } else {
      char.classList.add('incorrect_char');
      char.classList.remove('correct_char');

      // increment number of errors
      errors++;
    }
  });

  // display the number of errors
  error_text.textContent = total_errors + errors;

  // update accuracy text
  let correctCharacters = (characterTyped - (total_errors + errors));
  let accuracyVal = ((correctCharacters / characterTyped) * 100);
  accuracy_text.textContent = Math.round(accuracyVal);

  // if current text is completely typed
  // irrespective of errors
  if (curr_input.length == current_quote.length) {
    updateQuote();

    // update total errors
    total_errors += errors;

    // clear the input area
    input_area.value = "";
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    // decrease the current time left
    timeLeft--;

    // increase the time elapsed
    timeElapsed++;

    // update the timer text
    timer_text.textContent = timeLeft + "s";
  }
  else {
    // finish the game
    finishGame();
  }
}

function finishGame() {
  // stop the timer
  clearInterval(timer);

  // disable the input area
  input_area.disabled = true;

  // show finishing text
  quote_text.textContent = "Well done, you have completed the type test. Click on restart button below to start a new game.";

  // display restart button
  restart_btn.style.display = "block";

  // calculate cpm and wpm
  cpm = Math.round(((characterTyped / timeElapsed) * 60));
  wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));

  // update cpm and wpm text
  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;

  // display the cpm and wpm
  cpm_group.style.display = "block";
  wpm_group.style.display = "block";


}


function startGame() {

  resetValues();
  updateQuote();

  // clear old and start a new timer
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function resetValues() {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  quoteNo = 0;
  input_area.disabled = false;
  input_area.value = "";
  accuracy_text.textContent = "-";
  timer_text.textContent = timeLeft + "s";
  error_text.textContent = 0;
  cpm_group.style.display = "none";
  wpm_group.style.display = "none";
}

