import './HomeFinder.css'
import 'animate.css'

class HomeFinder {

    constructor() {

    }


    static isVisible(elem) {
        if (!(elem instanceof Element)) throw Error('DomUtil: elem is not an element.')
        const style = getComputedStyle(elem)
        if (style.display === 'none') return false
        if (style.visibility !== 'visible') return false
        if (style.opacity < 0.1) return false
        if (elem.offsetWidth + elem.offsetHeight + elem.getBoundingClientRect().height +
            elem.getBoundingClientRect().width === 0) {
            return false
        }
        const elemCenter = {
            x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
            y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
        }
        if (elemCenter.x < 0) return false
        if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false
        return true
    }

    pushToArray(array, pages) {
        pages.forEach(i => {
            if (HomeFinder.isVisible(i))
                array.push(i)
        })
        return array
    }

    static getPosition(element) {
        let yPosition = 0
        while (element) {
            yPosition += (element.offsetTop - element.scrollTop + element.clientTop)
            element = element.offsetParent
        }
        return yPosition
    }

    static bestOfArray(array) {
        let minY = HomeFinder.getPosition(array[0])
        let pos = 0

        for (let i = 0; i < array.length; i++) {
            if (HomeFinder.getPosition(array[i]) < minY) {
                minY = HomeFinder.getPosition(array[i])
                pos = i
            }
        }
        return pos
    }

    selectGoal(noClass = false) {
        let papabili = []

        let GGJ_homepage1 = document.querySelectorAll('body [href=\'/\'] , body [href=\'/it\'] , body [href=\'/en\'] ,' +
            'body [href=\'//' + document.location.host + '\'] , body [href=\'' + document.location.origin + '\']')
        papabili = this.pushToArray(papabili, GGJ_homepage1)

        let GGJ_homepage2 = document.querySelectorAll('body [href=""] , body [class*=\'logo\'] > [href] , body [class*=\'home\'] > [href] ')
        papabili = this.pushToArray(papabili, GGJ_homepage2)

        let GGJ_homepage3 = document.querySelectorAll('body [href*=\'home\'] , body [href*=\'index\'] , body [href*=\'logo\'] , body [href*=\'principale\']')
        papabili = this.pushToArray(papabili, GGJ_homepage3)

        let GGJ_homepage4 = document.querySelectorAll('body [href] > [src*=\'logo\'] , body [href] > [src*=\'home\']')
        papabili = this.pushToArray(papabili, GGJ_homepage4)

        if (papabili.length === 0) {
            alert('Questo sito non ha una casa :c')
            return false
        } else {
            const goal = papabili[HomeFinder.bestOfArray(papabili)]
            if (!noClass) {
                goal.classList.add('goal', 'animated', 'wobble', 'infinite')
            }
            return goal
        }
    }
}

export default HomeFinder