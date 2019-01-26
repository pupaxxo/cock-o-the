import './UIManager.css'

class UIManager {

    timerSeconds = 0
    timerContainer = null

    constructor() {
        document.getElementById('game-container').innerHTML += `<div id="game-ui-container"><p class="animated bounceIn game-time-container">01:00</p></div>`
        this.timerContainer = document.getElementById('game-time-container')
    }

    reDraw(){
        this.timerContainer.innerText = this.timerSeconds
    }

    startTimer(seconds){
        this.timerSeconds = seconds
        setInterval(() => {
            this.timerSeconds--
            this.reDraw()
        }, 1000)
    }
}

export default UIManager