
const clamp = (v, min, max) => {
    if (v < min) return min;
    if (v > max) return max;
    return v;
}

const raycast = (element, {targetX, targetY}, elementsToConsider) => {
    let elementCenter = {
        x: element.getBoundingClientRect().left,
        y: element.getBoundingClientRect().top
    }
    let step = 1
    let startX = elementCenter.x < targetX ? elementCenter.x : targetX
    let startY = elementCenter.y < targetY ? elementCenter.y : targetY

    let endX = elementCenter.x >= targetX ? elementCenter.x : targetX
    let endY = elementCenter.y >= targetY ? elementCenter.y : targetY
    for(; startX <= endX; startX += step){
        for(; startY <= endY; startY += step){
            let found = document.elementFromPoint(startX, startY)
            if( found !== null && found !== undefined && elementsToConsider.includes(found.tagName.toLowerCase())){
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
    isVisible
}