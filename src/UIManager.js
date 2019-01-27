import './UIManager.css'
import {TPS} from './Ticker'

class UIManager {

    timerSeconds = 0
    running = false
    timerContainer = null
    ammoContainer = null
    timerExpired = false

    constructor() {
        document.getElementById('game-container').innerHTML += `<div id="game-ui-container"><p id="super-game-timer" class="animated bounceIn game-time-container"></p>
                                        </div><p id="super-game-ammo">10</p>`

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
        this.ammoContainer = document.getElementById('super-game-ammo')
        this.timerContainer.innerHTML = Math.ceil(this.timerSeconds)
    }

    tick(){
        if (this.running) {
            this.timerSeconds -= 1 / TPS
            if (Math.ceil(this.timerSeconds) === 0){
                this.timerExpired = true
                this.stopTimer()
            }
            this.reDraw()
        }
    }
}

export default UIManager