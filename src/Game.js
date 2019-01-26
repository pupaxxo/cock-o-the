import Character from './Character'
import './Game.css'
import HomeFinder from './HomeFinder'
import GameFinishChecker from './GameFinishChecker'
import UIManager from './UIManager.js'
import Usable from './Usable.js'
import bgmusic from './assets/bgmusic.mp3'
import PageParser from './PageParser'

class Game {

    started = false

    goal = null
    gameFinishChecker = null
    character = null
    UIManager = null
    homeFinder = null
    pageParser = null

    //delayBeforeStart = 2500
    delayBeforeStart = 1

    constructor() {
        document.body.innerHTML += '<div id="game-container"><audio id="soundtrack-superdubstep"><source src="' + bgmusic + '" type="audio/mpeg"></audio></div>'
        window.onkeydown = (e) => {
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
}

export default Game