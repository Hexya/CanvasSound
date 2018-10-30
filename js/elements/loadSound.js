
class LoadSound {

    constructor() {
        this.registerDOM();
        this.registerEvents()
        window.AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext;

        //Sound stuff
        this.audioCtx = new AudioContext();
        this.audioSource;
        this.analyser = this.audioCtx.createAnalyser();
        this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);

        //Time stuff
        this.loader();
        this.isLoaded = false;
    }


    registerDOM(){
        this.elt = wrapper[0];
        this.elts = {};
        this.elts.wait = this.elt.querySelector('.wait');
        this.elts.playBtn = this.elt.querySelector('.can-play');
    }
    registerEvents() {
        this.elts.playBtn.addEventListener('click', this.onPlay.bind(this));
    }

    loader(url) {
        var request = new XMLHttpRequest();
        request.open('GET', './assets/sound/HowDoYouWant.mp3', true);
        request.responseType = 'arraybuffer';

        // Decode asynchronously
        request.onload = ()=> {

            this.audioCtx.decodeAudioData(request.response, (buffer)=> {

                // success callback
                this.audioBuffer = buffer;

                // Create sound from buffer
                this.audioSource = this.audioCtx.createBufferSource();
                this.audioSource.buffer = this.audioBuffer;

                // connect the audio source to context's output
                this.audioSource.connect( this.analyser )
                this.analyser.connect( this.audioCtx.destination )

                // play sound
                //this.audioSource.start();

                this.isLoaded = true;
                if(this.isLoaded == true) {
                    this.elts.wait.style.display = 'none';
                    this.elts.playBtn.style.display = 'block';
                }
            },()=>{
                // error callback
            });
        }
        request.send();
    }

    //update
    update() {
        this.analyser.getByteFrequencyData(this.frequencyData);
        //console.log(this.frequencyData)

        //CANVAS
    }

    onPlay() {
        if(this.elts.playBtn.classList[1] == "unactive"){
            this.elts.playBtn.classList.remove('unactive');
            this.elts.playBtn.classList.add('active');
            this.elts.playBtn.innerHTML = "I I";
            this.audioSource.start();
        } else {
            this.elts.playBtn.classList.remove('active');
            this.elts.playBtn.classList.add('unactive');
            this.elts.playBtn.innerHTML = "►";
            this.audioSource.stop();
        }
    }
    onPlayClick() {
        if(play.id == ""){
            this.audioSource.connect(this.analyser); //Connexion au enceinte
            this.analyser.gain.value = 1;
            this.analyser.connect(this.audioCtx.destination); //Connexion au enceinte
            play.id = "activated";
            play.innerHTML = "I I";
        } else {
            this.analyser.gain.value = 0;
            this.analyser.disconnect(context.destination);//Deco
            play.id = "";
            play.innerHTML = "►";
        }
        this.audioSource.connect(this.audioCtx.destination );
        this.audioSource.start(0);
    }
}

