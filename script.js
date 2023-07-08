var rod1= document.getElementById('rod1');
var rod2= document.getElementById('rod2');
var ball= document.getElementById('ball');


const storeName = "PPName";
const storeScore = "PPMaxScore";
const rod1Name= "Rod1";
const rod2Name= "Rod2";

let score, maxScore, movement, rod, ballSpeedX=2, ballSpeedY=2;

let MaxHeight= window.innerHeight,
    MaxWidth= window.innerWidth;
console.log(MaxHeight,MaxWidth);

let gameOn=false;

function resetBoard(rodName)
{
    rod1.style.left= (MaxWidth - rod1.offsetWidth)/2 + 'px';
    rod2.style.left= (MaxWidth- rod2.offsetWidth)/2 + 'px';
    ball.style.left= (MaxWidth - ball.offsetWidth)/2 + 'px';

   
}


window.addEventListener('keypress',function() {
    let rodSpeed=20;
    let rodReact= rod1.getBoundingClientRect();

    if(event.code=== 'KeyD' && (rodReact.x + rodReact.width)< MaxWidth){
        rod1.style.left= (rodReact.x) + rodSpeed + 'px';
        rod2.style.left= (rodReact.x) + rodSpeed + 'px';
    }
    else if(event.code=== 'KeyA' && (rodReact.x)>0){
        rod1.style.left= (rodReact.x) - rodSpeed + 'px';
        rod2.style.left= rod1.style.left;
    }

    if(event.code=== "Enter")
    {
        if(gameOn=== false){
           gameOn=true;
           let ballReact= ball.getBoundingClientRect();
           let ballX= ballReact.x;
           let ballY= ballReact.y;
           let ballDia= ballReact.width;

           let rod1Height= rod1.offsetHeight;
           let rod2Height= rod2.offsetHeight;
           let rod1Width= rod1.offsetWidth;
           let rod2Width= rod2.offsetWidth;

           movement= setInterval( function() {
            // move ball
            ballX = ballX + ballSpeedX;
            ballY= ballY  + ballSpeedY;

            let rod1X=rod1.getBoundingClientRect().x;
            let rod2X=rod2.getBoundingClientRect().x;

            ball.style.left=  ballX + 'px';
            ball.style.top=   ballY + 'px';

            if((ballX + ballDia) > MaxWidth || ballX<0){
                ballSpeedX = - ballSpeedX; // reverse the ball direction
            }

            let ballPos = ballX + ballDia/2;
            // for rod1
            if(ballY<= rod1Height){
                ballSpeedY = - ballSpeedY;
                scores++;

                // game ends or not 
                if(ballPos < rod1X || ballPos> (rod1+rod1Width))
                   storeWin(rod2Name,score);
            }
            // for rod2
            else if(ballY + ballDia >= MaxHeight- rod2Height)
            {
                ballSpeedY= -ballSpeedY;
                scores;

                // game ends or not
                if(ballPos< rod2X || ballPos> (rod2X + rod2Width))
                   storeWin(rod1Name,score);
            }
           },10);
        }
    }
})