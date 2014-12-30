(function () {
    var bugDiv = document.createElement("div"),
        playerDiv = document.createElement("div"),
        mainWrapper = document.createElement("div"),
        bugScore = document.createElement("span"),
        playerScore = document.createElement("span")
        ;
    bugDiv.setAttribute("style","float:left;position:relative;left:0;background:red;color:yellow;font-weight:bold;border:1px solid yellow;display:inline-block");
    bugDiv.innerText = "Bug Score:";
    bugDiv.appendChild(bugScore);
    playerDiv.setAttribute("style","float:right;position:relative;right:0;background:blue;color:white;font-weight:bold;border:1px solid white;display:inline-block");
    playerDiv.innerText = "Player Score:";
    playerDiv.appendChild(playerScore);
    mainWrapper.appendChild(bugDiv);
    mainWrapper.appendChild(playerDiv);

    document.body.appendChild(mainWrapper);

    window.score = {};
    window.score.bug = bugScore;
    window.score.player = playerScore;
    initializeScore();
})();

// Enemies our player must avoid
var Enemy = function(y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.x = -101;
    this.y  = y*73;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (typeof dt !== 'undefined') {
        this.x = this.x + dt*this.speed;
        this.x = (this.x >=505)? 0: this.x;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    checkCollisions();
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (y, speed) {
    Enemy.call(this, y, speed);
    this.x = 202;
    this.life = 2;
    this.sprite = "images/char-boy.png";
    this.handleInput = function (key) {
        switch(key){
            case 'left':this.x = (this.x <=404 && this.x > 0)? (this.x- 101): this.x;
                break;
            case 'up':this.y = (this.y <=365 && this.y > 0)? (this.y - 83): this.y;
                        if(this.y < 0){
                            this.y = 365;
                            score.player.innerHTML= parseInt(score.player.innerHTML) + 10;
                        }
                break;
            case 'right':this.x = (this.x <404 && this.x >= 0)? (this.x+ 101): this.x;
                break;
            case 'down':this.y = (this.y <365 && this.y > 0)? (this.y + 83): this.y;
                break;
        }
        console.log("x:" + this.x);
        console.log("y:" + this.y);
    };
}
Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
createPlayer();
createEnemies();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function checkCollisions() {
    var playerX = player.x,
        playerY = player.y;
        height = 53,
        width = 101,
        playerCoveredX = player.x + width,
        playerCoveredY = player.y + height;

    allEnemies.forEach(function (enemy) {
        if(playerX > enemy.x && playerX < (enemy.x + width) && playerY > enemy.y && playerY < (enemy.y + height)){
            console.log("collision 1st check");
            score.bug.innerHTML=parseInt(score.bug.innerHTML) + 5;
            score.player.innerHTML=parseInt(score.player.innerHTML) - 5;
            createPlayer();
            createEnemies();
        } else if(playerX < enemy.x && (playerCoveredX > enemy.x) && playerY < enemy.y && playerCoveredY > enemy.y){
            console.log("collision 2nd check");
            score.bug.innerHTML=parseInt(score.bug.innerHTML) + 5;
            score.player.innerHTML=parseInt(score.player.innerHTML) - 5;
            createPlayer();
            createEnemies();
        }
    });
}

function createPlayer(){
    if(typeof window.player !== 'undefined' && window.player.life >0){
        window.player.life--;
        window.player.y = 5*73;
        window.player.x = 202;
    } else {
        var status = "Game Over ";
        if(parseInt(score.player.innerHTML) > parseInt(score.bug.innerHTML)) {
            status +="You Won!!!";
        } else {
            status += "You looser!!";
        }
        status += ", click Yes to restart";
        if (confirm(status)) {
            window.player =  new Player(5, 0);
            initializeScore();
        }
    }
}
function createEnemies(){
    window.allEnemies = [new Enemy(1,100), new Enemy(2,200), new Enemy(3,150)];
}

function initializeScore(){
    score.bug.innerHTML = 0;
    score.player.innerHTML = 0;
}