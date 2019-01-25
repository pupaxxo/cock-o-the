
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