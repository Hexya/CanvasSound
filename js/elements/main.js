
let wrapper = document.querySelectorAll('.main-container');

class Main {

    constructor() {
        this.registerDOM();
        this.registerEvents();
        this.elts.canvas.height = window.innerHeight;
        this.elts.canvas.width = window.innerWidth;
        this.ctx = this.elts.canvas.getContext("2d");
        this.waves =[];
        this.particles = [];
        this.loadSound = new LoadSound();
        this.generateForm();
        this.generateParticles();
        this.update();
    }

    registerDOM(){
        this.elt = wrapper[0];
        this.elts = {};
        this.elts.canvas = this.elt.querySelector('#myCanvas');
        this.elts.full = this.elt.querySelector('.full');
    }
    registerEvents() {
        this.elts.full.addEventListener('click', this.toggleFullScreen.bind(this));
        window.addEventListener('resize', this.onResize.bind(this));
    }

    update() {
        requestAnimationFrame(this.update.bind(this))
        this.ctx.clearRect(0,0,this.elts.canvas.width,this.elts.canvas.height);
        //Sound
        if(this.loadSound.isLoaded == true) {
            this.loadSound.update();
        }

        //Form
        for(var i=0; i<this.waves.length;i++) {
            this.waves[i].update(this.loadSound.frequencyData);// Passe en arguments les datas du sound
        }

        //Back
        for(var i=0; i<this.particles.length;i++) {
            this.particles[i].update(this.loadSound.frequencyData);
        }
        for(var i=0; i<this.particles.length;i++) {
            for(var j=0; j<this.particles.length;j++) {
                var a = this.particles[i].position[0] - this.particles[j].position[0];
                var b = this.particles[i].position[1] - this.particles[j].position[1];
                var c = Math.sqrt( a*a + b*b );
                if(c < Math.random()*100) {
                    this.particles[i].drawLine(this.particles[j]);
                } else {
                    //unline
                }
            }
        }

    }

    generateForm() {
        this.waves.push(new Wave());
        this.waves.push(new Circle());
        this.particles.push(new Particles)
        //this.waves.push(new Line());
    }

    generateParticles() {
        for(var i=0;i<100;i++) {
            this.particles.push(new Particles());
        }
    }

    onResize() {
        let width = window.innerWidth;
        let height = window.innerHeight;
        this.elts.canvas.width = width;
        this.elts.canvas.height = height;
    }

    toggleFullScreen() {
        let all = document.querySelector("body");
        if (!all.mozRequestFullScreen) {
            all.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    }
}
if(wrapper.length > 0) {
    new Main();
}
