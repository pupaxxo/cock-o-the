import './UIManager.css'
import {TPS} from './Ticker'

class UIManager {

    timerSeconds = 0
    running = false
    timerContainer = null
    timerExpired = false

    constructor() {
        document.getElementById('game-container').innerHTML += `<div id="game-ui-container"><p id="super-game-timer" class="animated bounceIn game-time-container"></p></div>`
        console.log(this.timerContainer)
    }

    setTimerSeconds(seconds) {
        this.timerSeconds = seconds
    }

    startTimer(){
        this.running = true
    }

    stopTimer() {
        this.running = false
    }

    reDraw(){
        this.timerContainer = document.getElementById('super-game-timer')
        //console.log(this.timerContainer)
        this.timerContainer.innerHTML = Math.ceil(this.timerSeconds)
    }

    tick(){
        if (this.running) {
            this.timerSeconds -= 1 / TPS
            if (Math.ceil(this.timerSeconds) === 0)
                this.timerExpired = true
            this.reDraw()
        }
    }
}

export default UIManager