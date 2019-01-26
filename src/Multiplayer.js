import io from 'socket.io-client';
import MultiplayerCharacter from './MultiplayerCharacter'

class Multiplayer {

    game = null
    id = null
    players = {}
    socket = null

    constructor(game) {
        this.game = game
        this.id = Math.floor(Math.random() * 1000)
        this.socket = io('http://localhost:3000');
        this.socket.emit('connect to server', window.location.href)
        this.emit({id: 'myid', value: this.id, x: this.game.character.x, y: this.game.character.y})
        this.socket.on('data', (json) => {
            const data = JSON.parse(json)
            switch (data.id) {
                case 'myid':
                    this.players[data.value] = new MultiplayerCharacter(this.game, data.id, data.x, data.y)
                    this.game.ticker.add(this.players[data.value])
                    break
                case 'key':
                    //this.players[data.pid].onKeyDown(data.code)
                    break
                case 'xy':
                    this.players[data.pid].x = data.x
                    this.players[data.pid].y = data.y
                    this.players[data.pid].reDraw()
                    break
            }
        })
    }

    emit(msg) {
        msg.pid = this.id
        this.socket.emit('data', JSON.stringify(msg))
    }
}

export default Multiplayer