
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
    }

    return false

}

export {
    clamp
}