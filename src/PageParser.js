class PageParser {

    constructor() {
        this.getAllTextNodes()
        this.getAllTextNodes() // Don't ask .
    }


    //LA PRIMA VOLTA DEVE ESSERE CHIAMATA CON QUESTI ELEMENTI
//let elements = document.querySelectorAll("*");

 setUsables(elements){
for (let i =0; i<elements.length; i++) 
{
    if (elements[i]['nodeName'] == 'BUTTON' || (elements[i]['nodeName'] == 'SPAN'&& elements[i].childNodes.length==0 ) ) { 
        elements[i].classList = ['usable']  || elements[i].classList.add('usable');
         
          continue;
    } else  
    if ((elements[i]['nodeName'] != 'SCRIPT' && elements[i]['nodeName'] != 'STYLE'  && elements[i]['nodeName'] != 'TITLE'))
    {
        if (elements[i]['nodeName'] == '#text')
        {
            console.log("k");
            let textthathastobeputintospans = elements[i]['textContent'];
            elements[i]['parentElement'].innerHTML =   elements[i]['parentElement'].innerHTML.replace(textthathastobeputintospans, '<span class="usable" >' + textthathastobeputintospans + '</span>');  
        
        } else {
        setUsables(elements[i]['childNodes']);
        }
    }
}
}  
    







    getAllTextNodes()
     {
        let nodes = []
        let elements = document.querySelectorAll('*')
        for (let i = 0; i < elements.length; i++) {
            if (elements[i]['nodeName'] == 'BUTTON') {
                elements[i].classList.add('usable')
            }
            if (elements[i]['nodeName'] != 'SCRIPT' && elements[i]['nodeName'] != 'STYLE') {
                nodes.push(((elements[i]['childNodes'])))
                for (let j = 0; j < elements[i]["childNodes"].length; j++) {
                    if (typeof elements[i]['childNodes'][j]['nodeName'] != 'undefined') {
                        if (elements[i]['childNodes'][j]['nodeName'] == '#text') {
                            if (elements[i]['childNodes'][j]['textContent'].trim().length !== 0) {
                                let textthathastobeputintospans = elements[i]['childNodes'][j]['textContent']
                                elements[i].innerHTML = elements[i].innerHTML.replace(textthathastobeputintospans, '<span>' + textthathastobeputintospans + '</span>')
                                if (typeof elements[i]['childNodes'][j].classList != 'undefined') {
                                    elements[i]['childNodes'][j].classList.add('usable')
                                } else {
                                    elements[i]['childNodes'][j].classList = ['usable']
                                }
                            }
                        }
                    }
                }
            }//textContent

        }
    }
}

export default PageParser