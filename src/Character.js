import './Character.css'
import Image from './Character.svg'
import {clamp, fixElement, raycast} from './Utils'

class Character {

    element = null
    x = 0
    y = 0
    lastDrawnX = 0
    lastDrawnY = 0
    speed = 50

    listener = null
    pressed = null
    maxHeight = null
    maxWidth = null

    constructor() {
        document.getElementById('game-container').innerHTML += `<div id="game-character"><img alt="game" style="width: 100%; height: 100%;" src="${Image}" /></div>`
        this.element = document.getElementById('game-character')
        document.onkeydown = (e) => this.onKeyDown(e)
        document.onkeyup = (e) => {
            if (this.pressed === e.keyCode) {
                this.pressed = null
            }
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

        setInterval(() => this.tick(), 1000/20)
    }

    tick() {
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
        } else if (this.pressed === 32) {
            this.y -= this.speed * 2
            this.pressed = false
            this.fixPg()
            this.reDraw()

        } else if (this.pressed === 68) {
            this.y -= this.speed * 10
            this.pressed = false
            this.fixPg()
            this.reDraw()

        }

        if (this.y !== this.maxHeight) {
            const result = raycast({originX: this.x + (this.element.offsetWidth/2), originY: this.y + this.element.offsetHeight},
                {targetX: this.x + (this.element.offsetWidth/2), targetY: this.y + this.element.offsetHeight + 10 }, (el) => {
                    return el !== this.element && ['span', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'].includes(el.tagName.toLowerCase())
                });

            if (result !== false) {
                if (result.nonFotte) {
                    clearInterval(result.nonFotte)
                }
                result.className += " bordo"
                result.nonFotte = setTimeout(() => {
                    result.className = result.className.split(' ').filter(a => a !== 'bordo').join(' ')
                }, 300)
                //this.y = result.getBoundingClientRect().top
            } else {
                this.y += this.speed
            }
        }

        this.fixPg()
        this.reDraw()
    }

    reDraw() {
        if (this.x === this.lastDrawnX && this.y === this.lastDrawnY) return
        this.lastDrawnX = this.x
        this.lastDrawnY = this.y
        this.element.style = `top: ${this.y}px; left: ${this.x}px`
        fixElement(this.y, this.element.offsetHeight, window.innerHeight / 2, window.innerHeight / 3)
    }

    onKeyDown(e) {

        if (![38, 40, 37, 39, 32, 68].includes(e.keyCode)) {
            console.log(e.keyCode + " <= tasto non conosciuto")
            return
        }

        e.preventDefault();

        if (this.listener && this.pressed === e.keyCode) return
        this.pressed = e.keyCode
    }

    fixPg() {
        this.x = clamp(this.x, 0, this.maxWidth)
        this.y = clamp(this.y, 0, this.maxHeight)
    }
}

export default Character