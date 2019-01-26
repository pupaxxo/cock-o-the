function loadStyle() {
    var parserStyle = document.createElement("style");
    var style = document.createTextNode(".usable{background-color:black; !important}")
    parserStyle.appendChild(style);
    document.getElementsByTagName('head')[0].appendChild(parserStyle);
}
//loadStyle();

function getLinks() {
    var elements = document.querySelectorAll("*");
    for (var i = 0; i < elements.length; i++) {
        var currentElement = elements[i];
        if ( currentElement['nodeName'] == 'A') {
            console.log("va beeene");
            currentElement.classList.add("usable");
            
        }
    }
}



function getUsableElements2() {
    var elements = document.querySelectorAll("*");
    for (var i = 0; i < elements.length; i++) {
        var currentElement = elements[i];
        if (currentElement['childElementCount'] == '0'  ) {
            console.log("va beeene");
            currentElement.classList.add("usable");
        } else 
        
        {


        }
     
    }
}


function setSpans() {
    var elements = document.querySelectorAll("*");
    for (var i = 0; i < elements.length; i++) {
        var currentElement = elements[i];
        if (currentElement['childElementCount'] == '0') {
            console.log("va beeene");
            
            currentElement.textContent = "AAAAA";
        
        }
    }
}
var texts;
var nodes = new Array;


function isVisible(elem) {

    if (!(elem instanceof Element)) throw Error('DomUtil:  elem is not an element.');
    
    const style = getComputedStyle(elem);
    
    if (style.display === 'none') return false;
    
    if (style.visibility !== 'visible') return false;
    
    if (style.opacity < 0.1) return false;
    
    if (elem.offsetWidth + elem.offsetHeight + elem.getBoundingClientRect().height
    +
    
    elem.getBoundingClientRect().width === 0) {
    
    return false;
    
    }
    
    const elemCenter = {
    
    x: elem.getBoundingClientRect().left + elem.offsetWidth
    / 2,
    
    y: elem.getBoundingClientRect().top + elem.offsetHeight
    / 2
    
    };
    
    if (elemCenter.x < 0) return false;
    
    if (elemCenter.x > (document.documentElement.clientWidth
    || window.innerWidth)) return false;
    
    if (elemCenter.y < 0) return false;
    
    if (elemCenter.y > (document.documentElement.clientHeight
    || window.innerHeight)) return false;
    
    let pointContainer = document.elementFromPoint(elemCenter.x,
    elemCenter.y);
    
    do {
    
    if (pointContainer === elem) return true;
    
    } while (pointContainer = pointContainer.parentNode);
    
    return false;
     }
 function getAllTextNodes()
{
    nodes = new Array;
    var elements = document.querySelectorAll("*");
    for (var i = 0; i<elements.length; i++)  
    {
       
        if ( elements[i]["nodeName"] != "SCRIPT" && elements[i]["nodeName"] != "STYLE" ) {
          
            nodes.push(((elements[i]["childNodes"])));
    
            for (var j=0; j<elements[i]["childNodes"].length; j++ ) 
            {
                if (typeof elements[i]["childNodes"][j]["nodeName"]!= 'undefined'){
                if (elements[i]["childNodes"][j]["nodeName"]=="#text" ) {
                    if (elements[i]["childNodes"][j]["textContent"].trim().length!=0) {
                    console.log(elements[i]["childNodes"][j]["textContent"]);
                    var textthathastobeputintospans =  elements[i]["childNodes"][j]["textContent"];
                    elements[i].innerHTML = elements[i].innerHTML.replace(textthathastobeputintospans, '<span>' + textthathastobeputintospans + '</span>');
                    if (typeof  elements[i]["childNodes"][j].classList != 'undefined') 
                    {
                        elements[i]["childNodes"][j].classList.add("usable");
                    } else 
                    {
                        elements[i]["childNodes"][j].classList = ['usable'];
                    }
                    
                    }
              
            }
        }
        }
        }//textContent

} 
}