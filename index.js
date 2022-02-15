//for some reason this is empty 
// maybe the adress document is wrong since i cant gett anything
// maybe something in the html
// mistake was that the js file was link in the header not the body of html 
const cards = document.querySelectorAll('.memory-card');

// makes the node list an array
cardsArray=Array.from(cards);

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
// cards is an empty array ? 
function flipCard() {
    if (lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard=this;
        
    }else{
        // second click 
        hasFlippedCard = false;
        secondCard=this;

        // do cards match (this is what the data sets are for in the html )
        checkForMatch(); 

    }
    
    
};

function checkForMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        // match
        disableCards();
    } else {
        //not a match
        unflipCards();
        
    }
            
}

function disableCards() {
    firstCard.removeEventListener('click',flipCard); 
        secondCard.removeEventListener('click',flipCard); 

        resetBoard();
        
}
function unflipCards() {
   lockBoard = true;

    setTimeout(()=>{
        firstCard.classList.remove('flip'); 
        secondCard.classList.remove('flip'); 

        resetBoard();
    }, 1000)
}


// problem : forEach not a function
cards.forEach(function (card) {
    // problem : not a function
    card.addEventListener('click',flipCard);
    
});

function resetBoard() {
    [hasFlippedCard,lockBoard]=[false,false];
    [firstCard, secondCard]=[null, null];
}

//shuffle
// in paranthases so it happens when we refresh
(function shuffle () {
    cards.forEach(card =>{
let randomPos = Math.floor(Math.random()* 12);
card.style.order = randomPos ;
    }
        );
})();
