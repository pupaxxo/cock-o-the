import Character from './Character'
import './Game.css'
import HomeFinder from './HomeFinder'
import UIManager from './UIManager.js'
import Usable from './Usable.js'

class Game {

    started = false

    goal = null
    character = null
    UIManager = null
    homeFinder = null

    delayBeforeStart = 2500

    constructor() {
        document.body.innerHTML += '<div id="game-container"></div>'
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
        setTimeout(() => {this.character = new Character()}, this.delayBeforeStart)
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
        setTimeout(() => {this.character = new Character()}, this.delayBeforeStart)
    }

    stop() {
        this.started = false
        document.getElementById('game-container').remove()
        document.body.innerHTML += '<div id="game-container"></div>'
    }
}

export default Game