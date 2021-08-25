class Stone{
    constructor(x, y, w, h){
        var options = {
            isStatic: false,
            restitution: 0.8
        }
        this.width = w;
        this.height = h;
        this.image = loadImage("./assets/stone.png");
        this.body = Bodies.rectangle(x, y, w, h, options);
        World.add(world, this.body);
    }
    display(){
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0,  this.width, this.height);
        pop();
    }
}