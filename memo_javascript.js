const cards = document.querySelectorAll('.memory_card');
//Takes in all the cards

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let numberOfMatches = 0;
let numberOfCards = 12;
let numberOfTries = 0;

function flipCard()
//Connected to the div tag or card that you clicked on. FlipCard function starts the rest of the code
{
    if (lockBoard) return;
    //Check if the cards are locked
    if (this === firstCard) return;
    //firstCard is the first card of the pair you click
    this.classList.add('flip');
    //flip is added to the attribute list of the div tag

    if (!hasFlippedCard) {
        //First click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    numberOfTries++; //The number of tries to match two cards
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
    //isMatch is either true or false, if true do the first part disableCards(), if false do the second part unflipCards(). 
    //This comparison is called ternary operation
}

function disableCards()
//Remove click function if the cards match
{
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    numberOfMatches++;
    noMoreFlips(); //If all cards are turned up, show winning message
    resetBoard();
}

function unflipCards()
//Detta är när den vänder tillbaka korten
{
    lockBoard = true;
    //lock so you can't flip more cards (2 in this case)

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 700);
    //The time it takes for the cards to flip back
}

function resetBoard()
{
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}


function noMoreFlips() {
    if (numberOfMatches == (numberOfCards / 2))
    {
        setTimeout(() => {
            var modal = document.getElementById('myModal');
            // Get the modal
            
            document.getElementById("nrTries").innerHTML = numberOfTries;
            modal.style.display = "block";

            var span = document.getElementsByClassName("close")[0];
            // Get the <span> element that closes the modal

            span.onclick = function () {
                modal.style.display = "none";
                // When the user clicks on <span> (x), close the modal
            }
        }, 700);
    }
}

function numberOfPairs() {
    resetCards();
    var choosePairs = document.forms[0].elements["nrPairs"];
    for (i = 0; choosePairs.length; i++)
    {
        if (choosePairs[i].checked)
        {
            if (choosePairs[i].value == 6)
            {
                numberOfCards = 12;
                const styleMemoGame = document.querySelectorAll(".memory_game");
                styleMemoGame[0].style.width="800px";
                styleMemoGame[0].style.height="800px";
                
                for (j = 0; j < cards.length; j++) {
                    setMemoStyle(cards[j]);
                    switch (cards[j].dataset.framework)
                    {
                        case 'bike':
                        case 'fire':
                        case 'pin':
                        case 'puzzle':
                        case 'snowflake':
                        case 'umbrella':
                        cards[j].style.display = "none";
                    }
                }
            } 
            else if (choosePairs[i].value == 8)
            {
                numberOfCards = 16;             
                const styleMemoGame = document.querySelectorAll(".memory_game");
                styleMemoGame[0].style.width="2000px";
                styleMemoGame[0].style.height="700px";
           
                for (j = 0; j < cards.length; j++) {
                    setMemoStyle(cards[j]);
                    switch (cards[j].dataset.framework)
                    {
                        case 'pin':
                        case 'puzzle':
                        case 'snowflake':
                        case 'umbrella':
                            cards[j].style.display = "none";
                    }
                }
            } 
            else
            {
                numberOfCards = 24;
                const styleMemoGame = document.querySelectorAll(".memory_game");
                styleMemoGame[0].style.width="2000px";
                styleMemoGame[0].style.height="700px";
                
                for (j = 0; j < cards.length; j++) {
                    setMemoStyle(cards[j]);
                }
            }
        }
    }
}


function setMemoStyle(card)
{
    switch (numberOfCards) {
        case 12:
            card.style.width = "calc(25% - 10px)";
            card.style.height = "calc(33.333% - 10px)";
            break;
        case 16:
            card.style.width = "calc(12.5% - 10px)";
            card.style.height = "calc(50% - 10px)";
            break;
        case 24:
            card.style.width = "calc(12.5% - 10px)";
            card.style.height = "calc(50% - 10px)";
            break;
    }
}

function resetCards()
{
    for (i = 0; i < cards.length; i++)
    {
        cards[i].style.display = "block";
    }
}

(function shuffle()
    {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * numberOfCards);
            card.style.order = randomPos;
        });
    })();

cards.forEach(card => card.addEventListener('click', flipCard));

