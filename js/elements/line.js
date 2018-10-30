
class Line {

    constructor() {
        this.registerDOM();
        this.elts.canvas.height = window.innerHeight;
        this.elts.canvas.width = window.innerWidth;
        this.simplex = new SimplexNoise();
        this.count = 0;
        this.update();
    }

    registerDOM(){
        this.elt = wrapper[0];
        this.elts = {};
        this.elts.canvas = this.elt.querySelector('#myCanvas');
    }

    actualise() {
    }

    update() {
        requestAnimationFrame(this.update.bind(this))
        let ctx = this.elts.canvas.getContext("2d");
        ctx.clearRect(0,0,this.elts.canvas.width,this.elts.canvas.height);
        for(var i=0;i<this.elts.canvas.width;i++) {
            if(i>150 && this.elts.canvas.width-i>200){
                this.drawLine(i,this.count,10);
            } else {
                this.drawLine(i,this.count,100);
            }
            this.count +=0.00001;
        }
        this.actualise();
    }

    drawLine(i,count,ampli) {
        let y = this.simplex.noise2D((i/100)+count, (i/100)+count) * ampli + 100;
        //this.simplex.noise2D[ x = (position/100+time), y = (position/100+time)]* height + center;
        let ctx = this.elts.canvas.getContext("2d");
        ctx.save();
        ctx.beginPath()
        ctx.translate(0,this.elts.canvas.height-300);
        ctx.translate(i,y);
        ctx.arc(0,0,1,0,Math.PI*2,true)
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

}
