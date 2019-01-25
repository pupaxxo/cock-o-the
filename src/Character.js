import './Character.css'

class Character {

    element = null

    constructor() {
        document.writeln('<div id="game-character"></div>')
        this.element = document.getElementById('game-character')
    }
}

export default Character