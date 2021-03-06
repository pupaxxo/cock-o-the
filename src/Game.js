import Character from './Character'
import './Game.css'
import HomeFinder from './HomeFinder'
import GameFinishChecker from './GameFinishChecker'
import UIManager from './UIManager.js'
import Usable from './Usable.js'
import bgmusic from './assets/bgmusic.mp3'
import shootSFX from './assets/shootSFX.mp3'
import shitSFX from './assets/shitSFX.mp3'
import PageParser from './PageParser'
import Ticker from './Ticker'
import FallManager from './FallManager';
import {base64ToArrayBuffer} from './Utils'
import Multiplayer from './Multiplayer'


class Game {

    started = false

    goal = null
    gameFinishChecker = null
    character = null
    UIManager = null
    homeFinder = null
    pageParser = null
    ticker = null
    fallmanager = null;
    multiplayer = null
    bgmusic = null
    audioCtx = null
    source = null

    background = null

    //delayBeforeStart = 2500
    delayBeforeStart = 1

    audioEnabled = true

    oldBodyStyle = ''
    oldHtmlStyle = ''

    constructor() {
        document.body.innerHTML += `<div id="game-container"><audio><source id="soundtrack-superdubstep" src="`
            + bgmusic + `" type="audio/mpeg"><source id="super-sfx-shoot" src="` + shootSFX + `" type='audio/mpeg'><source src='` + shitSFX +
            `' id="super-sfx-shit" type='audio/mpeg'></audio></div>`

        this.background = document.getElementById('super-background')
        this.bgmusic = document.getElementById('soundtrack-superdubstep').src.replace('data:audio/mpeg;base64,', '')
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // define audio context
        this.source = this.audioCtx.createBufferSource(); // creates a sound source

        /*window.onkeydown = (e) => {
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
        }*/

        this.homeFinder = new HomeFinder()
        this.goal = this.homeFinder.selectGoal(true)
        let oldOnClick = []

        this.goal.forEach(i => {
            oldOnClick.push(i.onclick);
        })

        for (let i = 0; i < this.goal.length; i++) {
            this.goal[i].onclick = (e) => {
                if (this.started) return
                e.preventDefault()
                this.audioCtx.resume()
                this.goal = this.goal[i];
                this.goal.classList.add('goal', 'animated', 'wobble', 'infinite')
                this.start()
                this.goal.onclick = oldOnClick[i]
            }
        }
    }

    start() {

        this.oldBodyStyle = document.body.style
        this.oldHtmlStyle = document.body.parentNode.style

        //document.body.parentNode.style = `height: ${document.body.offsetHeight}px !important; overflow: hidden`
        //document.body.style = `height: ${document.body.offsetHeight}px !important; overflow: hidden`

        this.ticker = new Ticker(this)
        this.started = true
        
        this.UIManager = new UIManager()
        this.UIManager.setTimerSeconds(60)
        if (this.goal === false) {
            return
        }
        window.scroll({
            top: this.goal.getBoundingClientRect().top,
            left: 0,
            behavior: 'smooth'
        });
        setTimeout(() => {
            this.fallmanager = new FallManager();
            this.pageParser = new PageParser(this)
            this.character = new Character(this)
            //this.multiplayer = new Multiplayer(this)
            this.ticker.add(this.character)
            this.gameFinishChecker = new GameFinishChecker(this)
            this.ticker.add(this.gameFinishChecker)
            this.ticker.add(this.UIManager)
            this.UIManager.startTimer()
            this.ticker.add(this.fallmanager)
        }, this.delayBeforeStart)

        this.playSound(this.bgmusic)
    }

    stop() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        document.body.parentNode.style = this.oldHtmlStyle
        document.body.style = this.oldBodyStyle
        document.body.parentNode.style='overflow: hidden'
        this.started = false
        document.getElementById('game-container').remove()
        document.body.innerHTML += '<div id="game-container"></div>'
    }

    win() {
        const div = document.createElement('div')
        div.className = 'win-game-modal-container'
        div.innerHTML += `<div class="win-game-modal">
<h1>Wow!</h1><h2>Sei riuscito a raggiungere casa!</h2>
<button id="game-close">Continua</button></div>
`
        document.body.parentNode.style='overflow: hidden'
        this.stop()
        document.getElementById('game-container').appendChild(div)
        document.getElementById('game-close').onclick = () => {
            this.goal.click()
        }
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    lose() {
        const div = document.createElement('div')
        div.className = 'win-game-modal-container'
        div.innerHTML += `<div class="win-game-modal">
<h1>Wow!</h1><h2>Non sei riuscito a tornare a casa...</h2>
<button id="game-close">Riprova</button></div>`

        document.body.parentNode.style='overflow: hidden'
        this.stop()
        document.getElementById('game-container').appendChild(div)
        document.getElementById('game-close').onclick = () => {
            this.start()
        }
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

}

    playSound(base64) {
        if (this.audioEnabled)
            this.audioCtx.decodeAudioData(base64ToArrayBuffer(base64), (buffer) => {
                this.source.buffer = buffer;
                this.source.connect(this.audioCtx.destination);
                this.source.start(0);
            });
    }

 

}



export default Game