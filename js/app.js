// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 50;
    this.height = 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed*dt;

    //resetting each bug
    if(this.x > 606) {
        this.x = -100;
        this.speed = Math.floor((Math.random() * 300)+ 100);
        var yArray = [55,135,215];
        var randomY = Math.floor(Math.random() * yArray.length);
        this.y = yArray[randomY];
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 400;
    this.width = 50;
    this.height = 50;
    this.reset = function() {
        this.x = 202;
        this.y = 400;
    }
};

Player.prototype.update = function(dt) {
    //reset player once he reaches river
    if(this.y < 68) {
        this.reset();
        score += 10;
        console.log(score);
    }
    //reset player once he collides bug
    for (var i = 0; i < allEnemies.length; i++) {
        if(player.x < allEnemies[i].x + allEnemies[i].width && player.x + allEnemies[i].width > allEnemies[i].x && player.y < allEnemies[i].y + allEnemies[i].height && player.height + allEnemies[i].y > allEnemies[i].y) {
            console.log("collision");
            player.reset();
            score -= 10;
            console.log(score);
        }
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    if(key === 'left' && this.x > 0) {
        this.x -= 101;
    }else if (key === 'right' && this.x < 404) {
        this.x += 101;
    }else if (key === 'up' && this.y > 67) {
        this.y -= 83;
    }else if (key === 'down' && this.y < 400) {
        this.y += 83;
    }
};

//x = 101, y = 83
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
//allEnemies.push(new Enemy(1,1));
var allEnemies = [];
player = new Player(202,415);
var createEnemy = function(number) {
    for(var i = 0; i < number; i++) {
        var speed = Math.floor((Math.random() * 300)+ 100);
        var x = -10000 * Math.floor(Math.random());
        var yArray = [55,135,215];
        var randomY = Math.floor(Math.random() * yArray.length);
        var y = yArray[randomY];
        setTimeout(function(){allEnemies.push(new Enemy(x,y,speed));},1000)
    }
};
var score = 0;

//creates numbers of enemy per input
createEnemy(3);
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
