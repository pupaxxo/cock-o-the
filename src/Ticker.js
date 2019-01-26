const TPS = 60

class Ticker {

    tickers = []
    game = null

    constructor(game) {
        this.game = game
        setInterval(this.tick.bind(this), 1000 / TPS)
    }

    tick() {
        if (!this.game.started) {
            return
        }
        this.tickers.forEach((obj) => {
            obj.tick()
        })
    }

    add(obj) {
        this.tickers.push(obj)
    }
}

export default Ticker