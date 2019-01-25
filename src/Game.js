import Character from './Character'

class Game {

    started = false

    character = null

    constructor() {
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