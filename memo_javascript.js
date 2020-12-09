/*Källa till hur jag gjorde mitt basen till mitt Memory: https://medium.freecodecamp.org/vanilla-javascript-tutorial-build-a-memory-game-in-30-minutes-e542c4447eae

Jag använde mig av den koden som bas men sedan fixade jag till så att den passade det jag ville göra. Jag har även förklarat per rad vad det är som händer för att visa att jag förstår koden jag har använt mig av.*/


const cards = document.querySelectorAll('.memory_card');
//Läser in alla korten

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let numberOfMatches = 0;
let numberOfCards = 12;
let numberOfTries = 0;
//Globala variabler


function flipCard()
//detta är den div-taggen (kortet) som man har klickat på. FlipCard funktionen triggar resten av koden
{
    if (lockBoard) return;
    //kollar om korten är låsta
    if (this === firstCard) return;
    //firstCard är det första kortet man klickar på av paret

    this.classList.add('flip');
    //här läggs flip till på attributlistan av div-taggen

    if (!hasFlippedCard) {
        // detta är första klickningen
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;
    // Detta är klick nummer två
    numberOfTries++;
    //hur många försök man har använt för att matcha två kort
    checkForMatch();
    //Dags att se om korten matchar varandra
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    //här jämförs korten. framework fungerar ungefär som variabler. Om man klickar på en cykel då ser den om den andra klickningen (kortet) också är en cykel

    isMatch ? disableCards() : unflipCards();
    //antingen är isMatch sant eller falskt, om den är sann så gör dne den första delen dvs. disableCards() och om den är falsk gör den det som står efter kolon unflipCards(). Detta funkar som en if/else-sats.
    //En sådan här jämförelse kallas ternary operator
}

function disableCards()
//denna funktionen tar bort klickfunktionen på korten då de var likadana (de man vänt på)
{
    firstCard.removeEventListener('click', flipCard);
    //tar bort klickfunktionen 
    secondCard.removeEventListener('click', flipCard);
    //tar bort klickfunktionen 

    numberOfMatches++;
    //hur många par man har hittat
    noMoreFlips();
    //Ser efter om alla korten är uppvända och visar ett vinstmeddelande
    resetBoard();
    //Denna funktionen gör att variablerna återställs till ursprungsläget
}

function unflipCards()
//Detta är när den vänder tillbaka korten
{
    lockBoard = true;
    //låser så man inte kna vända på fler kort (än 2 i detta fallet)

    setTimeout(() => {
        firstCard.classList.remove('flip');
        //här tas flip-attributet bort från div-taggen
        secondCard.classList.remove('flip');
        //här tas flip-attributet bort från div-taggen
        resetBoard();
        //Denna funktionen gör att variablerna återställs till ursprungsläget
    }, 700);
    //700 millisekunder är tiden det tar för korten att vända tillbaka
}

function resetBoard()
//Denna funktionen gör att variablerna återställs till ursprungsläget
{
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}


function noMoreFlips() {
    //Ser efter om alla korten är uppvända och visar ett vinstmeddelande

    if (numberOfMatches == (numberOfCards / 2))
    //test med popup
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
    //funktionen för nollställning av korten

    var choosePairs = document.forms[0].elements["nrPairs"];
    //får in värdet från radio button

    for (i = 0; choosePairs.length; i++)
    //går igenom valen
    {
        if (choosePairs[i].checked)
        //kollar vilken som är vald. För att kunna lista ut hur jag skulle göra för att checka i radiobutton boxen använde jag mig av följande källor: https://www.w3schools.com/jsref/prop_radio_checked.asp
        //https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_radio_checked4
        {
            if (choosePairs[i].value == 6)
            //Om man har valt 6 par från radio button-listan
            {
                numberOfCards = 12;
                //då är antalet kort 12st
                const styleMemoGame = document.querySelectorAll(".memory_game");
                styleMemoGame[0].style.width="800px";
                styleMemoGame[0].style.height="800px";
                
                for (j = 0; j < cards.length; j++) {
                    /*istället för att använda mig av en väldigt lång och klumpig if-sats valde jag att prova något nytt. Jag använde mig av Switch och case, vilket jag hittade på denna källan: https://www.tjvantoll.com/2013/03/14/better-ways-of-comparing-a-javascript-string-to-multiple-values/ 
                    Genom att använda mig av denna typen ser de tlite mer samlat ut och är lättare att läsa och förstå.*/

                    setMemoStyle(cards[j]);
                    switch (cards[j].dataset.framework)
                    //Vilket gör att vi behöver gömma 6st av paren
                    {
                        case 'bike':
                        case 'fire':
                        case 'pin':
                        case 'puzzle':
                        case 'snowflake':
                        case 'umbrella':
                            cards[j].style.display = "none";
                            //Det är dessa par som ska gömmas
                    }
                }

            } else if (choosePairs[i].value == 8)
            //Om man däremot har valt 8 st par i radio button-listan
            {
                numberOfCards = 16;
                //då är antalet kort 16
                
                const styleMemoGame = document.querySelectorAll(".memory_game");
                styleMemoGame[0].style.width="2000px";
                styleMemoGame[0].style.height="700px";
               

                for (j = 0; j < cards.length; j++) {
                    setMemoStyle(cards[j]);
                    switch (cards[j].dataset.framework)
                    //Vilket betyder att 4st av paren måste gömmas
                    {
                        case 'pin':
                        case 'puzzle':
                        case 'snowflake':
                        case 'umbrella':
                            cards[j].style.display = "none";
                            //Det är dessa par som ska gömmas
                    }

                }
            } else
            //annars är det 12 par och då ska alla paren synas
            {

                numberOfCards = 24;
                //då är antalet kort 24
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
//Denna funktionen sätter stilen på spelplanen beroende på hur många kort man valt att spela med
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
// nollställer visning av alla korten så att alla syns
{
    for (i = 0; i < cards.length; i++)
    //går igenom alla kort och gör dem synliga
    {

        cards[i].style.display = "block";
    }
}

(function shuffle()
    //körs först gången när sidan laddas 
    {

        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * numberOfCards);
            card.style.order = randomPos;
            //lägger till ordningen på korten (random)
        });

    })();

cards.forEach(card => card.addEventListener('click', flipCard));
//Varje div-tagg som har klassen memory_card får ett click-event där den ska anropa funktionen flipCard
