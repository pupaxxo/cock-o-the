import './FallManager.css'

class FallManager {

    fallings = []
    maxHeight = 0

    constructor() {
        window.onresize = () => {
            this.maxHeight = document.documentElement.scrollHeight
        }
        this.maxHeight = document.documentElement.scrollHeight
    }

    tick() {
        this.fallings.forEach(a => {
            const rect = a.element.getBoundingClientRect()
            a.top+= 2 + Math.round(Math.random() * 4);
            a.ticks--;
            a.clonedElement.style = `z-index: 10000; position: absolute; top: ${a.top}px; left: ${rect.left + window.scrollX}px;
            width: ${a.element.offsetWidth}px; height: ${a.element.offsetHeight}; opacity: ${a.ticks > 50 ? (a.ticks - 50)/50 : 1}`
            if (a.ticks === 0) {
                a.clonedElement.remove()
            }
            if (a.top < 0 || a.top > this.maxHeight - 100) {
                a.ticks = 0
                a.clonedElement.remove()
            }
        })
        this.fallings = this.fallings.filter(a => a.ticks !== 0)
        if (Math.round(Math.random() * 50) === 25) {
            const elements = Array.from(document.querySelectorAll('.real-usable'))
            const element = elements[Math.round(Math.random() * elements.length)]
            const clonedElement = element.cloneNode(true)
            document.getElementById('game-container').appendChild(clonedElement)
            console.log(element)
            const rect = element.getBoundingClientRect()
            const falling = {
                element,
                clonedElement,
                ticks: 100 + Math.round(Math.random() * 50),
                top: rect.top + window.scrollY
            }
            element.style = 'opacity: 0'
            clonedElement.style = `z-index: 100000; position: absolute; top: ${falling.top}px; left: ${rect.left + window.scrollX}px;
            width: ${element.offsetWidth}px; height: ${element.offsetHeight}; opacity: 1`
            clonedElement.classList.remove('real-usable')
            element.classList.remove('real-usable')
            element.classList.remove('usable')
            clonedElement.classList.add('falling')
            this.fallings.push(falling)
        }
        /*this.setFallable()
        this.fall()*/
    }

    fall() {
        let fallables = document.querySelectorAll('.fallable')
        console.log(fallables)
        for (let i = 0; i < fallables.length; i++) {
            var currentY = fallables[i].style.top.replace('px', '')
            if (currentY <= this.maxheight) {
                currentY = ++currentY + 1
                fallables[i].style.top = currentY + 'px'
            }

        }
    }

    setFallable() {
        let usables = document.querySelectorAll('.real-usable')
        for (let i = 0; i < usables.length; i++) {
            let random = Math.floor((Math.random() * 100) + 1)
            if (random == 1 && !usables[i].classList.contains('fallable')) {
                let _x = usables[i].getBoundingClientRect()['x']
                let _y = usables[i].getBoundingClientRect()['y']
                if (!usables[i].classList) {
                    usables[i].classList = []
                }
                usables[i].classList.add('fallable')
                usables[i].style.top = _y + 'px'
                usables[i].style.left = _x + 'px'
            }
        }
    }

}

export default FallManager