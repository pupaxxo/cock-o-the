import './Character.css'
import Image from './Character.svg'
import {clamp, fixElement, raycast} from './Utils'
import BezierEasing from 'bezier-easing'

const TPS = 1000/20

const JUMP_TICKS = 20

const Keys = {
    ArrowLeft: 37,
    ArrowRight: 39,
    ArrowDown: 40,
    ArrowUp: 38,
    SpaceBar: 32,
    D: 68
}

const Directions = {
    Left: -1,
    Right: 1
}

const keysToDirection = (key) => {
    switch( key ){
        case Keys.ArrowLeft:
            return Directions.Left
        case Keys.ArrowRight:
            return Directions.Right
        default:
            return null
    }
}

class Character {

    element = null
    x = 0
    y = 0
    lastDrawnX = 0
    lastDrawnY = 0

    movementSpeed = 40
    jumpStrength = 80

    direction = Directions.Left
    maxHeight = null
    maxWidth = null

    jumpingTicks = 0
    totalJumpTicks = 0
    currentSpeed = 0
    verticalSpeed = 0

    isGround(debug = false) {
        //console.log(this.y + this.element.offsetHeight, this.y + this.element.offsetHeight + 1 - this.verticalSpeed)
        const result = raycast({originX: this.x + (this.element.offsetWidth/2), originY: this.y + this.element.offsetHeight},
            {
                targetX: this.x + (this.element.offsetWidth/2),
                targetY: this.y + this.element.offsetHeight + 1
            }, (el) => {
            if (debug) {
                console.log(el)
            }
                return el !== this.element && el.className.includes('usable')
            })
        if (result !== false) {
            //console.log(Math.abs((this.y + this.element.offsetHeight) - (result.getBoundingClientRect().top + window.scrollY)))
            if (Math.abs((this.y + this.element.offsetHeight) - (result.getBoundingClientRect().top + window.scrollY)) > 30) {
                console.log(Math.abs((this.y + this.element.offsetHeight) - (result.getBoundingClientRect().top + window.scrollY)))
                return false
            }
            /*if (result.fottitene) {
                clearInterval(result.fottitene)
            }
            result.classList.add('bordo')
            result.fottitene = setInterval(() => {
                result.classList.remove('bordo')
            }, 500)*/
            return result
        }
        return false
    }

    constructor() {
        document.getElementById('game-container').innerHTML += `<div id="game-character"><img alt="game" style="width: 100%; height: 100%;" src="${Image}" /></div>`
        this.element = document.getElementById('game-character')
        document.onkeydown = (e) => this.onKeyDown(e)
        document.onkeyup = (e) => {
            if ([Keys.ArrowLeft, Keys.ArrowRight].includes(e.keyCode) && this.direction === keysToDirection(e.keyCode)) {
                this.currentSpeed = 0
            }
        }
        window.onresize = () => {
            this.maxWidth = document.documentElement.scrollWidth - this.element.offsetWidth
            this.maxHeight = document.documentElement.scrollHeight - this.element.offsetHeight - this.element.offsetHeight - 10
            this.fixPg()
            this.reDraw()
        }
        this.maxWidth = document.documentElement.scrollWidth - this.element.offsetWidth
        this.maxHeight = document.documentElement.scrollHeight - this.element.offsetHeight - this.element.offsetHeight - 10
        this.x = this.maxWidth
        this.y = this.maxHeight
        this.reDraw()

        setInterval(() => this.tick(), TPS)
    }

    startJump() {
        this.totalJumpTicks = JUMP_TICKS + 2 * Math.round((Math.random() * 15))
        this.jumpingTicks = this.totalJumpTicks
    }

    handleJump() {
        if (this.jumpingTicks === 0) {
            this.verticalSpeed = 0
            return
        }
        const normalizedTick = this.jumpingTicks / this.totalJumpTicks
        const f = BezierEasing(0, 0, 1, 0.5)
        this.verticalSpeed = (f(normalizedTick) - 0.5) * this.jumpStrength;
        this.jumpingTicks--
        if (this.jumpingTicks < this.totalJumpTicks/2 - 2) {
            const ground = this.isGround()
            if (ground !== false) {
                this.jumpingTicks = 0
                this.verticalSpeed = 0
                if (Math.abs(ground.getBoundingClientRect().top + window.scrollY - this.element.offsetHeight - this.y) < 15)
                    this.y = ground.getBoundingClientRect().top + window.scrollY - this.element.offsetHeight
            }
        }
    }

    tick() {
        if (this.direction === Directions.Left) {
            this.x -= this.currentSpeed
        } else if (this.direction === Directions.Right) {
            this.x += this.currentSpeed
        }

        this.y -= this.verticalSpeed

        if (this.jumpingTicks !== 0) {
            this.handleJump()
        }

        if (this.jumpingTicks === 0 && this.y !== this.maxHeight && !this.isGround()) {
            this.y += 7
        }

        /*if (this.y !== this.maxHeight) {
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
                this.y += this.movementSpeed
            }
        }*/

        this.fixPg()
        this.reDraw()
    }

    reDraw() {
        if (this.x === this.lastDrawnX && this.y === this.lastDrawnY) return
        if (this.direction === Directions.Right) {
            this.element.classList.add('flipped')
        } else {
            this.element.classList.remove('flipped')
        }
        this.lastDrawnX = this.x
        this.lastDrawnY = this.y
        this.element.style = `top: ${this.y}px; left: ${this.x}px`
        fixElement(this.y, this.element.offsetHeight, window.innerHeight / 2, window.innerHeight / 3)
    }

    onKeyDown(e) {

        if (!Object.values(Keys).includes(e.keyCode)) {
            console.log(e.keyCode + " <= tasto non conosciuto")
            return
        }

        e.preventDefault();

        if ([Keys.ArrowUp, Keys.ArrowDown].includes(e.keyCode)) {
            return
        }

        // Stiamo andando già in questa direzione
        if (this.direction === keysToDirection(e.keyCode) && this.currentSpeed === this.movementSpeed) return

        if ([Keys.ArrowLeft, Keys.ArrowRight].includes(e.keyCode)) {
            this.direction = keysToDirection(e.keyCode)
            this.currentSpeed = this.movementSpeed
        }

        if (e.keyCode === Keys.SpaceBar && this.jumpingTicks === 0) {
            this.startJump()
        }
    }

    fixPg() {
        this.x = clamp(this.x, 0, this.maxWidth)
        this.y = clamp(this.y, 0, this.maxHeight)
    }
}

export default Character