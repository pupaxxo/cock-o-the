import './Projectile.css'
import {raycast} from './Utils'
import Image from './assets/SVG/bomba.svg'

class VerticalProjectile {

    id = null
    x = null
    y = null
    speed = null
    direction = null
    game = null
    element = null

    maxHeight = null
    maxWidth = null

    constructor(x, y, speed, direction, game) {
        this.x = x
        this.y = y
        this.game = game
        this.speed = speed
        this.direction = direction
        this.id = 'id' + Math.round(Math.random() * 1000)
        this.element = document.createElement('div')
        this.element.id = this.id
        this.element.className = 'game-projectile'
        document.getElementById('game-container').appendChild(this.element)
        this.draw()
        window.onresize = () => {
            this.maxWidth = document.documentElement.scrollWidth - this.element.offsetWidth
            this.maxHeight = document.documentElement.scrollHeight - this.element.offsetHeight - this.element.offsetHeight - 10
        }
        this.maxWidth = document.documentElement.scrollWidth - this.element.offsetWidth
        this.maxHeight = document.documentElement.scrollHeight - this.element.offsetHeight - this.element.offsetHeight - 10
    }

    isGround() {

        let range = Math.abs(this.speed)
        if (range === 0) range = 5

        const result = raycast(this.x + (this.element.offsetWidth/2),
            this.y + this.element.offsetHeight - range,
            this.y + this.element.offsetHeight + 1 + range)

        if (result.length === 0) {
            return false
        }

        const real = result[0]
        return real
    }

    tick() {
        if (this.direction === 1) {
            this.y += this.speed
        } else if (this.direction === -1) {
            this.y -= this.speed
        }
        this.draw()
        if (this.x < 0 || this.x > this.maxWidth || this.y > this.maxHeight || this.y < 0) {
            this.element.remove()
            this.game.ticker.remove(this)
            delete this
        } else {
            if (this.isGround()) {
                const size = 100 + Math.round(Math.random() * 50)
                this.game.ticker.remove(this)
                if (this.y - this.game.character.y < 250 )
                    this.game.character.startJump(1.25)
                this.element.className = 'game-explosion'
                this.element.innerHTML = `<img src="${Image}" style="width: ${size}px; height: ${size}px" alt="bomba"/>`
            }
        }
    }

    draw() {
        this.element.style = `top: ${Math.round(this.y)}px; left: ${Math.round(this.x)}px`
    }
}

export default VerticalProjectile