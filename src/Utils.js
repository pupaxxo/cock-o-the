
const clamp = (v, min, max) => {
    if (v < min) return min;
    if (v > max) return max;
    return v;
}

const raycast = (x, startY, endY) => {

    return Array.from(document.querySelectorAll('.usable')).filter(a => {
        const rect = a.getBoundingClientRect()

        if (a.className.includes('dio')) {
            console.log(startY <= rect.top + window.scrollY && endY >= rect.top + window.scrollY, startY, endY, rect.top + window.scrollY)
        }

        return startY <= rect.top + window.scrollY && endY >= rect.top + window.scrollY &&
            x >= rect.left + window.scrollX - 10  && x <= rect.right + window.scrollX + 10
    })
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
    raycast,
    fixElement
}