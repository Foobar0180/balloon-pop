function Game() {
    this.isPaused = null;
    this.score = null;
    this.speed = null;
    this.density = null;
    this.densityStep = null;
    this.canvas = document.getElementById('canvas');
    this.playButton = document.getElementById('play-btn');
    this.pauseButton = document.getElementById('pause-btn');
    this.scoreLabel = document.getElementById('score-label');
    this.scoreCount = document.getElementById('score-count');
    this.timer = null;
    this.startedTime = null;
    this.intervalId = null;
    this.updateTime = null;
    this.balloonsArray = null;
    var me = this;
    this.updater = function() {
        me.updateGame();
    }
}

Game.prototype.startGame = function() {
    this.playButton.style.display = "none";
    this.intervalId = setInterval(this.updater, this.updateTime);
    console.log("Game started");
}

Game.prototype.pauseGame = function(){
    clearInterval(this.intervalId);
};

Game.prototype.updateScore = function(score) {
    this.scoreCount.innerHTML = score;
    console.log("Score updated");
}

Game.prototype.updateGame = function() {
    this.densityStep += this.density;
    if (this.densityStep >= 1 && this.balloonsArray.length < 30) {
        for (var i = 0; i < parseFloat(this.densityStep, 10); i++) {
            var tempBalloon = new Balloon(0, -53, 'green', 'normal', 100);
            tempBalloon.xpos = tempBalloon.getRandomXPos();
            console.log(tempBalloon.xpos);

            var el = document.createElement('div');
            el.className = 'balloon ' + tempBalloon.color;
            el.style.left = tempBalloon.xpos + 'px';
            el.style.bottom = tempBalloon.ypos + 'px';
            // console.log(el);

            var me = this;
            var index = this.balloonsArray.length;
            el.onclick = function() {
                me.score += me.balloonsArray[index].points;
                me.updateScore(me.score);
                this.parentNode.removeChild(el);
            };
            this.canvas.appendChild(el);

            var tempObj = {};
            tempObj.el = el;
            tempObj.speed = tempBalloon.getRandomSpeed();
            tempObj.points = tempBalloon.points;
            this.balloonsArray.push(tempObj);
            console.log(tempObj.speed);
        }
        this.densityStep = 0;
    }

    for (var i = 0; i < this.balloonsArray.length; i++) {
        var position = (parseInt(this.balloonsArray[i].el.style.bottom, 10) + (3 + this.balloonsArray[i].speed)) + 'px';
        this.balloonsArray[i].el.style.bottom = position;
    }
}

Game.prototype.init = function() {
    this.isPaused = true;
    this.score = 0;
    this.speed = 0.01;
    this.density = 1000/4000;
    this.densityStep = 1;
    this.updateTime = 50;
    this.balloonsArray = [];
    console.log("Game initialized");
}

function Balloon(xpos, ypos, color, type, points) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.color = color;
    this.type = type;
    this.points = points;
}

Balloon.prototype.getRandomSpeed = function() {
    var speed = Math.floor(Math.random() * 201)/100;
    return speed;
}

Balloon.prototype.getRandomXPos = function() {
    var xpos = Math.floor(Math.random() * 760);
    return xpos;
}

window.addEventListener("load", function() {
    var game = new Game();
    game.init();

    document.getElementById('play-btn').onclick = function() {
        game.startGame();
    };
});