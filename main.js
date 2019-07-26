//Setting up canvas
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

//Generate random number
function random(min, max) {
    var num = Math.floor(Math.random()*(max - min)) + min;
    return num;
}

//Creating our Ball object constructor
function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
};

//Next the methods...
//First draw the ball
Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

//Next a function that can cause movement...
Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
};

//Function for collision detection
Ball.prototype.collisionDetect = function() {
    for (var j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx*dx + dy*dy);

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')';
            }
        }
    }
}

//Animation Stage 1: Get 25 balls randomly
var balls = [];

while (balls.length < 25) {
    var size = random(10,20);
    var ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-10, 10),
        random(-10,10),
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')',
        size
    );

    balls.push(ball);
};

//Animation Stage 2: Loop function for automatically drawing and updating balls
function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (var i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }

    requestAnimationFrame(loop);
}

loop();