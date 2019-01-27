import './FallManager.css'

class FallManager {

    fallings = []
    maxHeight = 0
    container = null

    constructor() {
        window.onresize = () => {
            this.maxHeight = document.body.offsetHeight
        }
        this.maxHeight = document.body.offsetHeight
        const div = document.createElement('div')
        div.className = "falling-container"
        document.body.appendChild(div)
        this.container = div
    }

    tick() {
        this.container.style = `height: ${this.maxHeight}px`
        this.fallings.forEach(a => {
            const rect = a.element.getBoundingClientRect()
            a.top += 2 + Math.round(Math.random() * 4);
            a.ticks--;
            a.clonedElement.style = `z-index: 10000; position: absolute; top: ${a.top}px; left: ${rect.left + window.scrollX}px;
            width: ${a.element.offsetWidth}px; height: ${a.element.offsetHeight}; opacity: ${a.ticks > 50 ? (a.ticks - 50) / 50 : 1}`
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
            if (element.parentNode && element.parentNode.className && typeof element.parentNode.className === "string" && element.parentNode.className.includes('goal')) {
                return
            }
            const clonedElement = element.cloneNode(true)
            //document.getElementById('game-container').appendChild(clonedElement)
            this.container.appendChild(clonedElement)
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
    }

}

export default FallManager