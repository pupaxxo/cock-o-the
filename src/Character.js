import './Character.css'
import { clamp } from './Utils'

class Character {

    element = null
    x = 0
    y = 0
    speed = 100

    listener = null
    pressed = null

    constructor() {
        document.writeln('<div id="game-character"></div>')
        this.element = document.getElementById('game-character')
        document.onkeydown = (e) => this.onKeyDown(e)
        document.onkeyup = (e) => {
            if (this.listener) {
                this.pressed = null
                clearTimeout(this.listener)
                this.listener = null
            }
        }
        window.onresize = () => {
            this.fixPg()
            this.reDraw()
        }
        this.reDraw()
    }
    
    reDraw() {
        this.element.style = `top: ${this.y}px; left: ${this.x}px`
    }

    onKeyDown(e) {

        if (this.listener) return

        this.pressed = e.keyCode

        const func = () => {
            if (this.pressed === 38) {
                this.y -= this.speed
            }
            else if (this.pressed === 40) {
                this.y += this.speed
            }
            else if (this.pressed === 37) {
               this.x -= this.speed
            }
            else if (this.pressed === 39) {
               this.x += this.speed
            }

            this.fixPg()
            this.reDraw()
            this.listener = setTimeout(func, 100)
        }

        this.listener = setTimeout(func)
    }

    fixPg() {
        this.x = clamp(this.x, 0, window.innerWidth - this.element.offsetWidth)
        this.y = clamp(this.y, 0, window.innerHeight - this.element.offsetHeight)
    }
}

export default Character