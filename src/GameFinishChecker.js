class GameFinishChecker {
    game = null
    constructor(game) {
        this.game = game
        setInterval(() => this.tick(), 1000/20)
    }

    tick() {
        const goal = this.game.goal.getBoundingClientRect()
        const goalY = goal.top + window.scrollY
        const goalX = goal.left + window.scrollY
        const characterPosition = this.game.character.element.getBoundingClientRect()
        const characterPositionY = characterPosition.top + window.scrollY
        const characterPositionX = characterPosition.left + window.scrollY
        const distance = Math.sqrt(Math.pow(goalX - characterPositionX, 2) + Math.pow(goalY - characterPositionY, 2))
        if (distance < 20) {
            this.game.win()
        }

    }
}

export default GameFinishChecker