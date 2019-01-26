import Character from './Character'
import './Game.css'
import HomeFinder from './HomeFinder'

class Game {

    started = false

    character = null
    homeFinder = null

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
        this.homeFinder = new HomeFinder()
    }
}

export default Game