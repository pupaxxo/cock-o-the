import './Character.css'
import { clamp } from './Utils'

class Character {

    element = null
    x = 0
    y = 0
    speed = 100

    listener = null
    pressed = null
    maxHeight = null
    maxWidth = null

    constructor() {
        document.body.innerHTML = document.body.innerHTML + `<div id="game-character"><img alt="game" style="width: 100%; height: 100%;" src="${Image}" /></div>`
        this.element = document.getElementById('game-character')
        document.onkeydown = (e) => this.onKeyDown(e)
        document.onkeyup = (e) => {
            if (this.pressed === e.keyCode)
            this.stopListener()
        }
        window.onresize = () => {
            this.maxWidth = document.documentElement.scrollWidth - this.element.offsetWidth
            this.maxHeight = document.documentElement.scrollHeight - this.element.offsetHeight
            this.fixPg()
            this.reDraw()
        }
        this.maxWidth = document.documentElement.scrollWidth - this.element.offsetWidth
        this.maxHeight = document.documentElement.scrollHeight - this.element.offsetHeight
        this.x = this.maxWidth
        this.y = this.maxHeight
        this.reDraw()
    }
    
    reDraw() {
        this.element.style = `top: ${this.y}px; left: ${this.x}px`
    }

    stopListener() {
        if (this.listener) {
            this.pressed = null
            clearTimeout(this.listener)
            this.listener = null
        }
    }

    onKeyDown(e) {

        if (![38, 40, 37, 39].includes(e.keyCode)) return

        e.preventDefault();

        if (this.listener && this.pressed === e.keyCode) return
        this.stopListener()

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
        this.x = clamp(this.x, 0, this.maxWidth)
        this.y = clamp(this.y, 0, this.maxHeight)
    }
}

export default Character