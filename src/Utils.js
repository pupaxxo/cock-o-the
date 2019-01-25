
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

    let slope = (endY - startY) / (endX - startX)
    let x = startX
    let y = 0
    for(; x <= endX; x += step){
        y = - (slope * x)
        let found = document.elementFromPoint(x, y)
        if( found !== null && found !== undefined && elementsToConsider.includes(found.tagName.toLowerCase())){
            return true
        }
    }

    return false

}

const isVisible = (y, height = 0) => {
    const scrollEnd = window.scrollY + window.innerHeight - height
    const scrollTop = window.scrollY
    console.log(scrollTop, scrollEnd, y)
    return y >= scrollTop && y <= scrollEnd
}

const fixElement = (y, height, maxBottom, idealBottom) => {
    const scrollEnd = window.scrollY + window.innerHeight - height
    const scrollTop = window.scrollY
    let current = scrollEnd - (y + height)
    if (current < 0) {
        window.scroll({
            top: y - idealBottom,
            left: 0,
            behavior: 'smooth'
        });
        return
    }
    if (current > maxBottom) {
        window.scroll({
            top: scrollTop - (current - idealBottom),
            left: 0,
            behavior: 'smooth'
        });
    }
}

export {
    clamp,
    isVisible,
    raycast,
    fixElement
}