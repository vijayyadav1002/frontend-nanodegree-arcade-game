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
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (y, speed) {
    Enemy.call(this, y, speed);
    this.x = 202;
    this.sprite = "images/char-boy.png";
    this.handleInput = function (key) {
        switch(key){
            case 'left':this.x = (this.x <=404 && this.x > 0)? (this.x- 101): this.x;
                break;
            case 'up':this.y = (this.y <=365 && this.y > 0)? (this.y - 83): this.y;
                        if(this.y < 0){
                            this.y = 365;
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
var player = new Player(5, 0);
var allEnemies = [new Enemy(1,100), new Enemy(2,200), new Enemy(3,150)];


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

}
