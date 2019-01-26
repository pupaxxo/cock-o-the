import Character from './Character'
import './Game.css'
import HomeFinder from './HomeFinder'
import GameFinishChecker from './GameFinishChecker'
import UIManager from './UIManager.js'
import Usable from './Usable.js'
import bgmusic from './assets/bgmusic.mp3'
import PageParser from './PageParser'

const base64ToArrayBuffer = (base64) => {
    console.log(base64)
    let binaryString =  window.atob(base64);
    let len = binaryString.length;
    let bytes = new Uint8Array( len );
    for (let i = 0; i < len; i++)        {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

class Game {

    started = false

    goal = null
    gameFinishChecker = null
    character = null
    UIManager = null
    homeFinder = null
    pageParser = null

    bgmusic = null
    audioCtx = null
    source = null

    //delayBeforeStart = 2500
    delayBeforeStart = 1

    constructor() {
        document.body.innerHTML += '<div id="game-container"><audio><source id="soundtrack-superdubstep" src="' + bgmusic + '" type="audio/mpeg"></audio></div>'

        this.bgmusic = document.getElementById('soundtrack-superdubstep').src.replace('data:audio/mpeg;base64,', '')
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // define audio context
        this.source = this.audioCtx.createBufferSource(); // creates a sound source

        window.onkeydown = (e) => {
            this.audioCtx.resume()
            if (this.started) {
                if (e.keyCode === 82) { // S
                    this.stop()
                }
            } else {
                if (e.keyCode === 83) { // R
                    this.start()
                }
            }
        }
    }

    start() {
        this.started = true
        this.UIManager = new UIManager()
        this.homeFinder = new HomeFinder()
        this.goal = this.homeFinder.selectGoal()
        if (this.goal === false) {
            return
        }
        window.scroll({
            top: this.goal.getBoundingClientRect().top,
            left: 0,
            behavior: 'smooth'
        });
        setTimeout(() => {
            this.pageParser = new PageParser()
            this.character = new Character()
            this.gameFinishChecker = new GameFinishChecker(this)
        }, this.delayBeforeStart)

        this.playSound(this.bgmusic)
    }

    stop() {
        this.started = false
        document.getElementById('game-container').remove()
        document.body.innerHTML += '<div id="game-container"></div>'
    }

    win() {
        document.getElementById('game-container').innerHTML += `<div class="custom-made-modal">
<h1>HAI VINTO!</h1>
<button id="game-close">CHIUDI</button>
</div>`
        document.getElementById('game-close').onclick = () => {
            this.stop()
        }
    }

    playSound(base64) {
        this.audioCtx.decodeAudioData(base64ToArrayBuffer(base64), (buffer) => {
            this.source.buffer = buffer;
            this.source.connect(this.audioCtx.destination);
            this.source.start(0);
        });
    }
}

export default Game