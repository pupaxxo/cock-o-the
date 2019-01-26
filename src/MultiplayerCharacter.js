import './Character.css'
import Image from './assets/SVG/pollo.svg'
import Image2 from './assets/SVG/pollo_cammina.svg'
import Image3 from './assets/SVG/pollo_volo.svg'
import Image4 from './assets/SVG/pollo_bocca_aperta.svg'
import {clamp, fixElement, raycast, base64ToArrayBuffer} from './Utils'
import BezierEasing from 'bezier-easing'
import Projectile from './Projectile'
import VerticalProjectile from './VerticalProjectile'

const JUMP_TICKS = 60

const Keys = {
    ArrowLeft: 37,
    ArrowRight: 39,
    ArrowDown: 40,
    ArrowUp: 38,
    SpaceBar: 32,
    D: 68,
    E: 69
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

class MultiplayerCharacter {

    game = null

    element = null
    x = 0
    y = 0
    lastDrawnX = 0
    lastDrawnY = 0

    movementSpeed = 10
    jumpStrength = 10

    spriteChangeTicks = 0

    direction = Directions.Left
    maxHeight = null
    maxWidth = null
    id = null

    jumpingTicks = 0
    totalJumpTicks = 0
    currentSpeed = 0
    verticalSpeed = 0

    boccaAperta = 0
    boccaAperta2 = 0

    isGround() {

        let range = Math.abs(this.verticalSpeed)
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

    constructor(game, id, x, y) {
        this.game = game
        this.id = id
        this.spriteChangeTicks = 20
        document.getElementById('game-container').innerHTML += `<div class="game-character" id="game-character-${this.id}"><img alt="game" style="width: 100%; height: 100%;" src="${Image}" /></div>`
        this.source = this.game.audioCtx.createBufferSource()
        this.shootSFX = document.getElementById('super-sfx-shoot').src.replace('data:audio/mpeg;base64,', '')
        this.element = document.getElementById('game-character-' + this.id)
        this.x = x
        this.y = y
        this.reDraw()
    }

    startJump() {
        this.totalJumpTicks = JUMP_TICKS + 2 * Math.round((Math.random() * 15))
        this.jumpingTicks = this.totalJumpTicks
    }

    addProjectile() {
        this.playSound(this.shootSFX)
        const projectile = new Projectile(this.x + (this.direction === 1 ? this.element.offsetWidth : 0), this.y + 10, 10, this.direction, this.game)
        this.game.ticker.add(projectile)
        this.boccaAperta = 30
    }

    addVerticalProjectile() {
        const projectile = new VerticalProjectile(this.x + this.element.offsetWidth/2, this.y + this.element.offsetHeight, 10, 1, this.game)
        this.game.ticker.add(projectile)
        this.boccaAperta2 = 30
    }

    handleJump() {

        const speed = this.jumpStrength

        if (this.jumpingTicks === this.totalJumpTicks) {
            this.verticalSpeed = -speed
        }

        if (this.jumpingTicks === this.totalJumpTicks/2) {
            this.verticalSpeed = 0
        }

        const acceleration = speed/(this.totalJumpTicks/2)

        if (this.jumpingTicks <= this.totalJumpTicks/2) { // GIU
            this.verticalSpeed += acceleration
        } else { // SU
            this.verticalSpeed += acceleration
        }


        this.jumpingTicks--

        if (this.jumpingTicks === 0) {
            this.verticalSpeed = 0
        }
    }

    tick() {

        if (!this.game.started) return

        if (this.game.UIManager.timerExpired){
            this.game.lose()
        }


        if (this.direction === Directions.Left) {
            this.x -= this.currentSpeed
        } else if (this.direction === Directions.Right) {
            this.x += this.currentSpeed

        }

        if (this.currentSpeed !== 0) {
            this.spriteChangeTicks--
        }

        const img = this.element.getElementsByTagName('img')[0]

        if (this.spriteChangeTicks === 0) {
            img.src = img.src === Image ? Image2 : Image
            this.spriteChangeTicks = 20
        }

        if (this.jumpingTicks !== 0) {
            img.src = Image3
        }

        if (this.boccaAperta !== 0) {
            img.src = Image4
            this.boccaAperta --
        }

        if (this.boccaAperta2 !== 0) {
            img.src = Image3
            this.boccaAperta2 --
        }

        this.y += this.verticalSpeed

        if (this.jumpingTicks !== 0) {
            this.handleJump()

            if (this.jumpingTicks === 0) {
                img.src = Image
            }
        }

        const ground = this.isGround()
        if (ground !== false) {
            if (this.jumpingTicks <= this.totalJumpTicks / 2) {
                this.jumpingTicks = 0;
                this.verticalSpeed = 0;
                if (this.boccaAperta === 0 && this.boccaAperta2 === 0) {
                    img.src = Image
                }
            }
        }

        if (this.y !== this.maxHeight && this.jumpingTicks === 0 && ground === false) {
            this.y += 5
        }

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
        this.element.style = `top: ${Math.round(this.y)}px; left: ${Math.round(this.x)}px`
    }

    onKeyDown(keyCode) {

        if (!Object.values(Keys).includes(keyCode)) {
            console.log(keyCode + " <= tasto non conosciuto")
            return
        }

        if ([Keys.ArrowUp, Keys.ArrowDown].includes(keyCode)) {
            return
        }

        // Stiamo andando già in questa direzione
        if (this.direction === keysToDirection(keyCode) && this.currentSpeed === this.movementSpeed) return

        if ([Keys.ArrowLeft, Keys.ArrowRight].includes(keyCode)) {
            this.direction = keysToDirection(keyCode)
            this.currentSpeed = this.movementSpeed
        }

        if (keyCode === Keys.SpaceBar && this.jumpingTicks === 0) {
            this.startJump()
        }

        if (keyCode === Keys.D) {
            this.addProjectile()
        }

        if (keyCode === Keys.E) {
            this.addVerticalProjectile()
        }
    }

    fixPg() {
        this.x = clamp(this.x, 0, this.maxWidth)
        this.y = clamp(this.y, 0, this.maxHeight)
    }

    playSound(base64) {
        if (this.game.audioEnabled)
            this.game.audioCtx.decodeAudioData(base64ToArrayBuffer(base64), (buffer) => {
                this.source.buffer = buffer;
                this.source.connect(this.game.audioCtx.destination);
                this.source.start(0);
            });
    }
}

export default MultiplayerCharacter