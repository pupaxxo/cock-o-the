class FallManager
{
 maxheight;
constructor (maxheight)
{
    console.log("L'alterzza massima è  " + maxheight);
this.maxheight = maxheight;
window.maxheight = maxheight;
}

    tick()
    {
            this.setFallable();
            this.fall();
            
    }

    fall()
    {
        let fallables = document.querySelectorAll(".fallable")
        console.log(fallables);
        for (let i = 0; i<fallables.length; i++) 
        {
            var currentY = fallables[i].style.top.replace('px', '');
            if (currentY<=this.maxheight) {
            currentY = ++currentY  +1;
            fallables[i].style.top = currentY + 'px'
            }
        
        }
    }
    setFallable()
    {
        let usables = document.querySelectorAll(".real-usable");
        for (let i =0; i<usables.length; i++) {
        let random =  Math.floor((Math.random() * 100) + 1);
        if (random ==1 && !usables[i].classList.contains("fallable")) {
        let _x = usables[i].getBoundingClientRect()["x"];
        let _y = usables[i].getBoundingClientRect()["y"];
        if (!usables[i].classList) 
        {
            usables[i].classList = [];
        } 
        usables[i].classList.add('fallable');
        usables[i].style.top = _y + 'px';
        usables[i].style.left  = _x + 'px';
        }
    }
    }

}
export default FallManager;