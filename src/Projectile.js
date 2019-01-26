import './Projectile.css'

class Projectile {

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

    checkHit() {
        let player = this.game.character
        if ((this.x + this.element.offsetWidth/2) > player.x && this.y > player.y && (this.y < player.y - player.element.offsetHeight)){
            return player
        }
        return null
    }

    tick() {
        if (this.direction === 1) {
            this.x += this.speed
        } else if (this.direction === -1) {
            this.x -= this.speed
        }
        this.draw()
        if (this.x < 0 || this.x > this.maxWidth || this.y > this.maxHeight || this.y < 0) {
            this.element.remove()
            this.game.ticker.remove(this)
            delete this
        } else {
            let other = this.checkHit()
            if (other !== null){
                other.classList.add('super-game-hit')
                this.game.ticker.remove(this)
                delete this
            }
        }
    }

    draw() {
        this.element.style = `top: ${Math.round(this.y)}px; left: ${Math.round(this.x)}px`
    }
}

export default Projectile