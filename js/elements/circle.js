
class Circle {

    constructor() {
        this.registerDOM();
        this.elts.canvas.height = window.innerHeight;
        this.elts.canvas.width = window.innerWidth;
        this.simplex = new SimplexNoise();
        this.count = 0;

        //Variables circle
        this.radius = 200;
        this.point_size = 1;
        this.center_x = 150;
        this.center_y = 150;

        //Point circle
        this.amplitudeFi = 10;
        this.amplitudeTw = 10;
        this.variableScale = 100;
        this.baseScale = 100;
    }

    registerDOM(){
        this.elt = wrapper[0];
        this.elts = {};
        this.elts.canvas = this.elt.querySelector('#myCanvas');
        this.elts.smile = this.elt.querySelector('.smile');
        this.elts.smileBack = this.elt.querySelector('.smile-back');
    }

    // Get Mouse position affect to this.target
    registerEvents(){
    }
    actualise() {
    }

    update(dataSound) { // Recup dataSound
        //console.log(dataSound[70])
        this.actualise();

        if(dataSound[70]<160) {
            for (var i = 0; i < this.elts.canvas.width; i++) {
                this.count += 0.00001; //0.0001; speed
                this.amplitudeFi = 10;
                this.amplitudeTw = 40;
            }
        } else {
            for (var i = 0; i < this.elts.canvas.width; i++) {
                this.count += 0.0001; //0.0001; speed
                this.amplitudeFi = 20;
                this.amplitudeTw = 60;
            }
        }

        for(var i=0;i<this.elts.canvas.width;i++) {
            this.count +=0.00001;
        }
        for(var i=0;i<360;i++) {
            this.drawPoint(i,this.count,dataSound[70],this.amplitudeFi,'yellow');
            this.drawPoint(i,this.count,dataSound[70],this.amplitudeTw,'rgba(255,255,255,1)');
        }
        this.elts.smile.style.fontSize = 15 + (dataSound[0]/20) + 'px';
        this.elts.smileBack.style.fontSize = 15 + (dataSound[0]/45) + 'px';
        this.registerEvents();
    }

    drawPoint(angle,count,circleRadius,amplitude,color){
        let ctx = this.elts.canvas.getContext("2d");
        //let distance = this.simplex.noise2D((angle/100)+count, (angle/100)+count) * this.smoothAmplitude + 100; // Circle noise
        let distance = this.simplex.noise2D(count,angle)* amplitude + this.variableScale; // Point bounce
        let scale = this.simplex.noise2D(count,count);
        this.variableScale = (10 * scale) + this.baseScale;
        let x = this.center_x + (circleRadius+100) * Math.cos(-angle*Math.PI/180)* distance/90;
        let y = this.center_y + (circleRadius+100) * Math.sin(-angle*Math.PI/180)* distance/90;

        ctx.save();
        ctx.translate(this.elts.canvas.width/2-150,this.elts.canvas.height/2-150)
        ctx.beginPath();
        ctx.arc(x, y, this.point_size, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    }
}
