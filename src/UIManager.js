import './UIManager.css'
import {TPS} from './Ticker'
import ImageAmmo from './assets/SVG/ammo .svg'

class UIManager {

    timerSeconds = 0
    running = false
    timerContainer = null
    ammoContainer = null
    timerExpired = false
    drawnTimerSeconds = 0

    constructor() {
        document.getElementById('game-container').innerHTML += `<div id="game-ui-container"><p id="super-game-timer" class="animated bounceIn game-time-container"></p>
                                        </div><img id ="super-game-ammo-svg"alt="game" style="width: 100%; height: 100%;" src="${ImageAmmo}" /><p id="super-game-ammo">10</p>`

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
        if (this.drawnTimerSeconds === Math.ceil(this.timerSeconds)) return
        this.drawnTimerSeconds = Math.ceil(this.timerSeconds)
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