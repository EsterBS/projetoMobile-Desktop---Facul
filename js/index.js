const showStart = document.querySelector('.start');
const player = document.querySelector('.player');
const stone = document.querySelector('.stone');
const showScore = document.querySelector('.score');
const showExit = document.querySelector('.exit');


let score = 0;
let gameArea = document.querySelector('.gameContainer');
let sizeMobile = window.matchMedia("(max-width: 991px)");
let firstMenu = document.querySelector('.firstMenu');
let finalMenu = document.querySelector('.secundMenu');




const start = (() => { // inicio do jogo

    screenOrientation();
    openFullScreen();
  
    showStart.style.display = 'none'; 
    showScore.style.display = 'block';
    player.style.display = 'block';
    stone.style.display = 'block';
    firstMenu.style.display = 'none';
    
        
});


function screenOrientation(e){
    let screenOrientation = window.matchMedia("(orientation:portrait)");
    if (screenOrientation.matches && sizeMobile.matches) {
      alert('Coloque a tela na horizontal!');
      e.preventDefault();
           
    }
}

window.addEventListener("orientationchange", screenOrientation);



const jump = () => { 
    
    openFullScreen();
    screenOrientation();

    player.classList.add('jump-animation');

    setTimeout(() => {

        player.classList.remove('jump-animation');        
        
    }, 500);
    
} 

document.addEventListener('click', jump);


const collision = setInterval(() => { 
    
    const stonePosition = stone.offsetLeft; //deslocamento esquerdo 
    const playerPosition = +window.getComputedStyle(player).bottom.replace('px', ''); //posição do player em numero inves de string

    if (stonePosition <= 120 && stonePosition > 0 && playerPosition < 80) {

        stone.style.animation = 'none';
        stone.style.left = `${stonePosition}px`;

        player.style.animation = 'none';
        player.style.left = `${playerPosition}px`;

        player.src = "imgs/animacao-caindo1 (1).gif";
        player.style.width = '150px';
        player.style.marginBottom = '-35px';
        player.style.zIndex = '1';

        clearInterval(collision);
        restart();

    } else {
    
    openFullScreen();

    if (playerPosition === 180 && stonePosition <= 120 ) 
    score++;    
    showScore.innerHTML = `Pontuação: ${score}`; 
        
        };

    });
    
const openFullScreen = (() => { // sair da tela cheia

    if (gameArea.requestFullscreen && sizeMobile.matches){
        gameArea.requestFullscreen();
    }
    else if (gameArea.mozRequestFullScreen && sizeMobile.matches){
        gameArea.mozRequestFullScreen();
    }
    else if (gameArea.webkitRequestFullscreen && sizeMobile.matches){ //safari
        gameArea.webkitRequestFullscreen();
    }
    else if (gameArea.msRequestFullscreen && sizeMobile.matches){ 
        gameArea.msRequestFullscreen();
    }
            
});



const closeFullScreen = (() => { // sair da tela cheia


        if (document.exitFullscreen){
            document.exitFullscreen();
        }
        else if (document.webkitExitFullscreen ){
            document.webkitExitFullscreen();
        }
        else if (document.mozCancelFullScreen){ 
            document.mozCancelFullScreen();
        }
        else if (gameArea.msExitFullscreen){ 
            document.msExitFullscreen();
        }
            
});
    
    
const restart = (() => {

    let showRestart = document.querySelector('.restart')
    showRestart.style.display = 'block';
    finalMenu.style.display = 'flex';
    if (sizeMobile.matches) {
    showExit.style.display = 'block';
    }

});

const exit = (() => {
    closeFullScreen();
})

   
document.querySelector('.restart').addEventListener('click', function(){
    window.location.reload();
    closeFullScreen();
    return false;
});


      

