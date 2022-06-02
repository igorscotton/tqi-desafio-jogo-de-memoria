import { database } from "./database.js";

const containerCard = document.querySelector('.wrapper');

const button = document.querySelector('.modal button');
button.addEventListener('click', () => location.reload());

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let winGame = 0;

function randomArray(database){
    
    for(let i = database.length - 1; i> 0; i--){

        const randomNumber = Math.floor(Math.random()*(i+1));

        [database[i], database[randomNumber]] = [database[randomNumber], database[i]]; 
    }

    return database
}

function createCards(){
    let randomDataBase = [...randomArray(database), ...randomArray(database)]
    

    for(let i = 0; i < randomDataBase.length; i++){
        const id = randomDataBase[i].image.replace('../image/', '').replace('.jpg', '').replace('.png', '')

        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-card', id)

        const cardFront = document.createElement('img');
        cardFront.classList.add('card-front');

        const cardBack = document.createElement('img');
        cardBack.classList.add('card-back');

        cardFront.src = randomDataBase[i].image;
        cardBack.src = '../image/card-image.jpg';

        card.append(cardFront, cardBack);
        containerCard.appendChild(card);
    }
}

createCards();

function flipCard(){    
    if(lockBoard){
        return;
    }
    if(this === firstCard){
        return;
    }

    this.classList.add('flip')

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    hasFlippedCard = false;
    secondCard = this;
    checkForMatch()
}

function checkForMatch(){
    if(firstCard.dataset.card === secondCard.dataset.card){
        winGame++;
        disableCards();

        if(winGame === 6){
            const containerModal = document.querySelector('.container-modal');
            containerModal.classList.remove('hidden');
        }

        return;
    }

    unFlipCards();
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unFlipCards(){
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        
        resetBoard();
    }, 1500)
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}



const cards = document.querySelectorAll('.card');

cards.forEach((card) => card.addEventListener('click', flipCard));





