// robot class
var Robot = function(x,y,speed,canvas) 
{
    this.x = x;
    this.y = y;
    this.lastX = x;
    this.lastY = y;
    this.speed = speed;
    this.canvas = canvas;
    
    //this.canvas.strokeStyle = "rgba("+ Math.floor(Math.random()*255) +","+ Math.floor(Math.random()*255) +","+ Math.floor(Math.random()*255) +",0.5)";
    this.canvas.strokeStyle = "rgba(0,0,0,0.1)";
    this.canvas.lineWidth = 1;

    this.draw = function()
    {
        // CLEAR CANVAS
        //this.canvas.clearRect ( 0 , 0 , $('header.main').width() , $('header.main').height() );
        
        this.x += Math.floor(Math.random() * (this.speed - -this.speed + 1)) + -this.speed;// makes random movement
        this.y += Math.floor(Math.random() * (this.speed - -this.speed + 1)) + -this.speed;
        
        // define canvas limits for the robot
        if(this.x < speed)
            this.x += speed;
        else if(this.x > parseInt($('header.main').css('width'))-speed)
            this.x -= speed;
        if(this.y < speed)
            this.y += speed;
        else if(this.y > parseInt($('header.main').css('height'))-speed)
            this.y -= speed;
        
        //console.log(this.x);

        // DRAW LINE
        this.canvas.beginPath();
        this.canvas.moveTo(this.lastX,this.lastY); // where the line starts to draw
        this.canvas.lineTo(this.x,this.y);
        this.canvas.stroke();
        this.canvas.closePath();
        
        this.lastX = this.x;
        this.lastY = this.y;
    
    }
}


Meteor.startup(function() {
    
    Meteor.setTimeout(function(){

        // program
        var canvas = document.getElementById('canvas');
        var fps = 20;
        var speed = 100;
        var initSpeed = 0.001;
        var maxRobots = 100;
        var robots = new Array();
        
        if(canvas != null) {
            
            // vars
            var ctx = canvas.getContext('2d');
            
            // set size
            canvas.width = $('header.main').width();
            canvas.height = $('header.main').height();                    
            
            // START SETUP
    
            
            // add robots
            for(var i = 1; i <= maxRobots; i++)
                robots.push(new Robot($('header.main').width()/2, $('header.main').height()/2,initSpeed,ctx));
            
            run = function() {
                // slowly increase the speed
                if (initSpeed < speed) {
                    initSpeed += 0.2;
                }
                
                for(var i = 0; i < maxRobots; i++) {

                    robots[i].speed = initSpeed;

                    // robots[i].speed = Math.random() * 10;
                    robots[i].draw();
                }
            }
            
            // Start the game loop
            _intervalId = setInterval(run, 1000 / fps);
                
        }
    }, 1000);
});