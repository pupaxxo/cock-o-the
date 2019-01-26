import './Enemy.css'
import Projectile from './Projectile'

class Enemy {

    id = null
    x = null
    y = null
    game = null
    element = null
    width = null
    height = null

    constructor(x, y, width, height, game) {
        this.x = x
        this.y = y
        this.game = game
        this.width = width
        this.height = height
        this.id = 'id' + Math.round(Math.random() * 1000)
        this.element = document.createElement('div')
        this.element.id = this.id
        this.element.className = 'game-enemy'
        document.getElementById('game-container').appendChild(this.element)
        this.draw()
    }

    tick() {
        if (Math.round(Math.random() * 1000) === 4) {
            const direction = Math.round(Math.random() * 2) === 0 ? -1 : 1
            const projectile = new Projectile(this.x, this.y, 7, direction, this.game)
            this.game.ticker.add(projectile)
        }
    }

    draw() {
        this.element.style = `top: ${Math.round(this.y)}px; left: ${Math.round(this.x)}px; width: ${this.width}px; height: ${this.height}px`
    }
}

export default Enemy