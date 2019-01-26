
class PageParser {

    game = null

    constructor(game) {
        const skipFunction = (e) => {
            if (e.tagName.toLowerCase() === 'title')
            if (e === game.goal) return false
            let el = e
            while (el) {
                parent = el.parentElement;
                if (parent && (parent.tagName.toLowerCase() === 'title' || parent.id === 'game-container' || (typeof parent.className === "string" && parent.className.includes('goal')))) {
                    return false;
                }
                el = parent;
            }
            return true
        }
        this.game = game
        this.getAllTextNodes(skipFunction)
        this.getAllTextNodes(skipFunction)
        this.getAllTextNodes(skipFunction)
        this.getAllTextNodes(skipFunction)
        this.getAllTextNodes(skipFunction) // Don't ask .
    }
    escapeHtml(text) {
        return text
            .replace('&', "&amp;")
            .replace('<', "&lt;")
            .replace('>', "&gt;")
            .replace('"', '&quot;')
            .replace("'", "&#039;");
      }

    getAllTextNodes(skipFunction = null) {
        let nodes = []
        let elements = document.querySelectorAll('*')
        for (let i = 0; i < elements.length; i++) {
            if (!elements[i]) continue
            if (elements[i]['nodeName'] === 'TITLE') continue
            if (elements[i]['nodeName'] === 'BUTTON') {
                if (skipFunction !== null && !skipFunction(elements[i])) continue
                if (!elements[i].classList) elements[i].classList = []
                elements[i].classList.add('usable')
            }
            if (elements[i]['nodeName'] === 'IMG') {
                if (skipFunction !== null && !skipFunction(elements[i])) continue
                if (!elements[i].classList) elements[i].classList = []
                elements[i].classList.add('usable')
            }
            if ( ( elements[i]["nodeName"] == 'SPAN') &&elements[i]["children"].length==0 )  {

                  if (!elements[i].classList) elements[i].classList = []
                  elements[i].classList.add('usable')
                  continue;
            }
            if (elements[i]['nodeName'] !== 'SCRIPT' && elements[i]['nodeName'] !== 'STYLE' && !elements[i].classList.contains("usable") ) 
             {
                nodes.push(((elements[i]['childNodes'])))
                for (let j = 0; j < elements[i]["childNodes"].length; j++) { 
                    if (typeof elements[i]['childNodes'][j]['nodeName'] != 'undefined') {
                        if (elements[i]['childNodes'][j]['nodeName'] === '#text' || elements[i]['childNodes'][j]['nodeName'] === 'B'
                        || elements[i]['childNodes'][j]['nodeName'] === 'STRONG') {
                            if (elements[i]['childNodes'][j]['textContent'].trim().length !== 0) {
                                let textthathastobeputintospans = elements[i]['childNodes'][j]['textContent'].replace('&nbsp;', ' ');
                                if (skipFunction !== null && !skipFunction(elements[i])) continue
                                elements[i].innerHTML = elements[i].innerHTML.replace('&nbsp;', ' ').replace(textthathastobeputintospans, '<span>' + textthathastobeputintospans + '</span>')
                                if (!elements[i]['childNodes'][j]) continue
                                if (typeof elements[i]['childNodes'][j].classList != 'undefined') {
                                    elements[i]['childNodes'][j].classList.add('usable')
                                } else {
                                    elements[i]['childNodes'][j].classList = ['usable']
                                }
                            }
                        }
                    }
                }
            }

        }

        const ele = Array.from(document.querySelectorAll('.usable')).filter(a => {
            let el = a
            while (el) {
                let parent = el.parentElement;
                if (parent && parent.className && typeof parent.className === "string" && parent.className.includes('usable')) return false
                el = parent;
            }
            return true
        })

        ele.forEach(a => {
            a.classList.add('real-usable')
        })

        /*const ele2 = ele.filter(a => {
            return Math.round(Math.random() * 5) === 0
        })

        const maxWidth = document.documentElement.scrollWidth
        const maxHeight = document.documentElement.scrollHeight

        ele2.forEach(a => {
            const rect = a.getBoundingClientRect()
            if (rect.left + window.scrollX < 0 || rect.left + window.scrollX > maxWidth || rect.top + window.scrollY > maxHeight || rect.top + window.scrollY < 0) return false
            const enemy = new Enemy(rect.left + window.scrollX, rect.top + window.scrollY, a.offsetWidth, a.offsetHeight, this.game)
            this.game.ticker.add(enemy)
        })*/
    }

    



/*            this.ticker.add(this.UIManager)
            this.ticker.add(this.setFallable)*/ 
}




export default PageParser
