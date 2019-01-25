
const clamp = (v, min, max) => {
    if (v < min) return min;
    if (v > max) return max;
    return v;
}

const raycast = ({originX, originY}, {targetX, targetY}, elementsToConsider) => {

    let step = 1

    let startX = originX < targetX ? originX : targetX
    let startY = originY < targetY ? originY : targetY

    let endX = originX >= targetX ? originX : targetX
    let endY = originY >= targetY ? originY : targetY

    if( endX - startX === 0 ){
        let y = startY
        for(; y <= endY; y += step){
            let found = document.elementFromPoint(startX, y)
            console.log(startX, y)
            if (found !== null && found !== undefined && elementsToConsider.includes(found.tagName.toLowerCase())) {
                return true
            }
        }
    } else {
        let slope = (endY - startY) / (endX - startX)
        let x = startX
        let y = 0
        for (; x <= endX; x += step) {
            y = (slope * x)
            let found = document.elementFromPoint(x, y)
            console.log(x, y)
            if (found !== null && found !== undefined && elementsToConsider.includes(found.tagName.toLowerCase())) {
                return true
            }
        }
    }

    return false

}

const isVisible = (el) => {
    const rect = el.getBoundingClientRect(), top = rect.top, height = rect.height
    if (rect.bottom < 0) return false
    if (top > document.documentElement.clientHeight) return false
    let currentElement = el.parentNode
    do {
        const parentRect = currentElement.getBoundingClientRect()
        if (top <= parentRect.bottom === false) return false
        if ((top + height) <= parentRect.top) return false
        currentElement = currentElement.parentNode
    } while (currentElement !== document.body)
    return true
}

export {
    clamp,
    isVisible,
    raycast
}