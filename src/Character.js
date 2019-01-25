import './Character.css'

class Character {

    element = null
    x = 0
    y = 0
    speed = 10

    constructor() {
        document.writeln('<div id="game-character"></div>')
        this.element = document.getElementById('game-character')
        document.onkeydown = (e) => this.keyListener(e)
    }
    
    reDraw() {
        this.element.style = `top: ${this.y}px; left: ${this.x}px`
    }

    keyListener(e) {
        if (e.keyCode == '38') {
            this.y -= this.speed
        }
        else if (e.keyCode == '40') {
            this.y += this.speed
        }
        else if (e.keyCode == '37') {
           this.x -= this.speed
        }
        else if (e.keyCode == '39') {
           this.x += this.speed
        }
        this.reDraw()
    }
}

export default Character