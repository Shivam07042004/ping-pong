var rod1=document.getElementById('rod1');
var rod2=document.getElementById('rod2');
var ball=document.getElementById('ball');

const storeName= "PPName";
const storeScore= "PPMaxScore";
const rod1Name= "Rod1";
const rod2Name= "Rod2";

let score=0;
let movement,rod,ballSpeedX=2,ballSpeedY=2;
let gameOn= false;
let MaxHeight= window.innerHeight, MaxWidth= window.innerWidth;

rod1.style.left= (MaxWidth )/2 + 'px';
rod2.style.left= (MaxWidth )/2 + 'px';
ball.style.left= (MaxWidth + 200 )/2 + 'px';
ball.style.top= (MaxHeight - 300 )/2 + 'px';

function resetBoard() {
    rod1.style.left= (MaxWidth )/2 + 'px';
    rod2.style.left= (MaxWidth )/2 + 'px';
    ball.style.left= (MaxWidth + 200 )/2 + 'px';
    ball.style.top= (MaxHeight - 300 )/2 + 'px';

    score=0;
    gameOn=false;
}

function storeWin(rod,score){
    alert( rod + 'wins with a score of ' + (score*100) + '.');

    score=0;
    gameOn=false;
    clearInterval(movement);

    resetBoard();
}

window.addEventListener('keypress', function () {
    let rodSpeed=20;
    let rodReact= rod1.getBoundingClientRect();

    if(event.code === 'KeyD' && (rodReact.x + rodReact.width)< MaxWidth){
        rod1.style.left= rodReact.x + rodSpeed + 'px';
        rod2.style.left= rodReact.x + rodSpeed + 'px';
    }
    else if(event.code === 'KeyA' && (rodReact.x)> 0){
        rod1.style.left= rodReact.x - rodSpeed + 'px';
        rod2.style.left= rodReact.x - rodSpeed + 'px';
    }

    if(event.code === 'Enter'){
        if(gameOn === false){
            resetBoard();
           gameOn= true;

            let ballReact= ball.getBoundingClientRect();
            let ballX= ballReact.x;
            let ballY= ballReact.y;
            let ballDia = ballReact.width;

            let rod1Height= rod1.offsetHeight;
            let rod2Height= rod2.offsetHeight;
            let rod1Width= rod1.offsetWidth;
            let rod2Width= rod2.offsetWidth;

            movement= this.setInterval( function(){
                // move ball
                ballX= ballX + ballSpeedX;
                ballY= ballY + ballSpeedY;

                let rod1X= rod1.getBoundingClientRect().x;
                let rod2X= rod2.getBoundingClientRect().x;

                ball.style.left= ballX + 'px';
                ball.style.top= ballY + 'px';

                if(ballX + ballDia > MaxWidth || ballX<0){
                   ballSpeedX= - ballSpeedX; // reverse ball speed
                }

                let ballPos= ballX + ballDia/2;

                // for rod1 
                if(ballY <= rod1Height){
                    ballSpeedY= - ballSpeedY;
                    score++;

                // game ends or not
                    if(ballPos< rod1X || ballPos > rod1X + rod1Width){
                        storeWin(rod2Name,score);
                    }
                }
                // for rod2
                else if(ballY + ballDia >= MaxHeight - rod2Height){
                    ballSpeedY= - ballSpeedY;
                    score++;

                    // game ends or not
                    if(ballPos< rod2X || ballPos > rod2X + rod2Width){
                        storeWin(rod1Name,score);
                    }
                }
            },10);
        }
    }
});