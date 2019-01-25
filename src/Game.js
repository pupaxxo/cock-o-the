import Character from './Character'
import './Game.css'

class Game {

    started = false

    character = null

    constructor() {
        document.body.innerHTML += '<div id="game-container"></div>'
        document.onkeydown = (e) => {
            if (this.started) return
            if (e.keyCode === 83) {
                this.start()
            }
        }
    }

    start() {
        this.started = true
        this.character = new Character()
    }
}

export default Game