
class Wave {

    constructor() {
        this.registerDOM();
        this.elts.canvas.height = window.innerHeight;
        this.elts.canvas.width = window.innerWidth;
        this.simplex = new SimplexNoise();
        this.countFi = 0;
        this.countTw = 0;
        this.countTh = 0;

        //Variables circle
        this.radius = 200;
        this.point_size = 1;
        this.center_x = 150;
        this.center_y = 150;

        //Smooth circle
        this.smoothRadius = 200;
        this.smoothAmplitude = 15;

        this.stop = 0;

    }

    registerDOM(){
        this.elt = wrapper[0];
        this.elts = {};
        this.elts.canvas = this.elt.querySelector('#myCanvas');
    }

    // Get Mouse position affect to this.target
    registerEvents(){
    }
    actualise() {
        
    }

    update(dataSound) { // Recup dataSound
        //console.log(dataSound[0])
        this.actualise();
        if(dataSound[0]<180) {
            for (var i = 0; i < this.elts.canvas.width; i++) {
                this.countFi += 0.00001; //0.0001; speed
                this.countTw += 0.00002;
                this.countTh += 0.00003;
            }
        } else {
            for (var i = 0; i < this.elts.canvas.width; i++) {
                this.countFi += 0.0001;
                this.countTw += 0.00015;
                this.countTh += 0.0002;
            }
        }
        for(var i=0;i<360;i++) {
            this.drawPoint(i,this.countFi,dataSound[0],0, 'cyan',15);
            this.drawPoint(i,this.countTw,dataSound[0],1, 'yellow',15);
            this.drawPoint(i,this.countTh,dataSound[0],1, '#ff00a0',15);
        }
        this.registerEvents();
    }

    drawPoint(angle,count,waveRadius,rotate,color,smoothAmplitude){
        if (waveRadius< 100) {
            waveRadius = 90
        }
        let ctx = this.elts.canvas.getContext("2d");
        let distance = this.simplex.noise2D((angle/100)+count, (angle/100)+count) * smoothAmplitude + 100; // Circle noise
        let x = this.center_x + waveRadius * Math.cos(-angle*Math.PI/180)* distance/90;
        let y = this.center_y + waveRadius * Math.sin(-angle*Math.PI/180)* distance/90;


        ctx.save();
        ctx.translate(this.elts.canvas.width/2-150,this.elts.canvas.height/2-150)
        ctx.rotate(rotate * Math.PI / 180)
        ctx.beginPath();
        ctx.arc(x, y, this.point_size, 0, 2 * Math.PI);
        ctx.strokeStyle = color
        ctx.stroke();
        ctx.fillStyle = color
        ctx.fill();
        ctx.restore();
    }
}
