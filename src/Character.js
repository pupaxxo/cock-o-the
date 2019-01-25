import './Character.css'
import { clamp } from './Utils'

class Character {

    element = null
    x = 0
    y = 0
    speed = 100

    constructor() {
        document.writeln('<div id="game-character"></div>')
        this.element = document.getElementById('game-character')
        document.onkeydown = (e) => this.keyListener(e)
        window.onresize = () => {
            this.fixPg()
            this.reDraw()
        }
        this.reDraw()
    }
    
    reDraw() {
        this.element.style = `top: ${this.y}px; left: ${this.x}px`
    }

    keyListener(e) {
        if (e.keyCode === '38') {
            this.y -= this.speed
        }
        else if (e.keyCode === '40') {
            this.y += this.speed
        }
        else if (e.keyCode === '37') {
           this.x -= this.speed
        }
        else if (e.keyCode === '39') {
           this.x += this.speed
        }

        this.fixPg();

        this.reDraw()
    }

    fixPg() {
        this.x = clamp(this.x, 0, window.innerWidth - this.element.offsetWidth)
        this.y = clamp(this.y, 0, window.innerHeight - this.element.offsetHeight)
    }
}

export default Character