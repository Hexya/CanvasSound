
class Particles {

    constructor() {
        this.registerDOM();
        this.position = vec2.fromValues(Math.random()*this.elts.canvas.width , Math.random()*this.elts.canvas.height);
        this.velocity = vec2.fromValues(Math.random()*3 , Math.random()*-3.8);
        this.ctx = this.elts.canvas.getContext("2d");
        this.color = 'rgba(255,255,255,0.2)';
    }

    registerDOM(){
        this.elt = wrapper[0];
        this.elts = {};
        this.elts.canvas = this.elt.querySelector('#myCanvas');
    }

    update(dataSound) {
        this.drawParticles(Math.random() * 255);
        this.actualise();
        if (dataSound[0] < 160) {
            this.color = 'rgba(255,255,255,0)';
        } else {
            this.color = 'rgba(255,255,255,0.8)';
        }
    }

    actualise() { // add de la velocity selon la direction
        let margin = 20;
        if(this.position[0]>this.elts.canvas.width +margin || this.position[0]<0 -margin) {
            this.velocity[0] *= -1;
        }
        if(this.position[1]>this.elts.canvas.height +margin || this.position[1]<0 -margin) {
            this.velocity[1] *= -1;
        }
        vec2.add(this.position, this.position, this.velocity);
    }


    drawParticles(color) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(this.position[0], this.position[1]);
        this.ctx.arc(0, 0, 2, 0, 2 * Math.PI, false);
        //this.ctx.fillStyle= "rgb("+color+",50, 250)";
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
    }

    drawLine(target) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.moveTo(this.position[0],this.position[1]);
        //this.ctx.bezierCurveTo(this.position[0], this.position[0], this.position[1]+(Math.floor(Math.random() * (10 +30 + 1)) - 10), this.position[1], target.position[0]+2, target.position[1]);
        this.ctx.bezierCurveTo(this.position[0], this.position[1], this.position[0]+(Math.floor(Math.random() * (10 +30 + 1)) - 10), this.position[1], target.position[0]+2, target.position[1]);
        //this.ctx.lineTo(target.position[0],target.position[1])
        this.ctx.strokeStyle = this.color;
        this.ctx.fillStyle = "transparent";
        this.ctx.fill()
        this.ctx.stroke()
        this.ctx.closePath();
    }
}
