function loadStyle() {
    var parserStyle = document.createElement("style");
    var style = document.createTextNode(".usable{background-color:black !important;}.goal{background-color:lime !important;}");
    parserStyle.appendChild(style);
    document.getElementsByTagName('head')[0].appendChild(parserStyle);
}
loadStyle();

function isVisible(elem) {
    if (!(elem instanceof Element)) throw Error('DomUtil: elem is not an element.');
    const style = getComputedStyle(elem);
    if (style.display === 'none') return false;
    if (style.visibility !== 'visible') return false;
    if (style.opacity < 0.1) return false;
    if (elem.offsetWidth + elem.offsetHeight + elem.getBoundingClientRect().height +
        elem.getBoundingClientRect().width === 0) {
        return false;
    }
    const elemCenter = {
        x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
        y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
    };
    if (elemCenter.x < 0) return false;
    if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
    if (elemCenter.y < 0) return false;
    if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
    let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
    do {
        if (pointContainer === elem) return true;
    } while (pointContainer = pointContainer.parentNode);
    return false;
}

function pushToArray(array, pages) {
    pages.forEach(function (i) {
        if (isVisible(i))
            array.push(i);
    });
    return array;
}

function getPosition(element) {
    var yPosition = 0;
    while (element) {
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return yPosition;
}

function bestOfArray(array) {
    var minY = getPosition(array[0]);
    var pos = 0;

    for (i = 0; i < array.length; i++) {
        if (getPosition(array[i]) < minY) {
            minY = getPosition(array[i]);
            pos = i;
        }
    }
    return pos;
}

function selectGoal() {
    var papabili = [];

    var GGJ_homepage1 = document.querySelectorAll("[href='/']");
    papabili = pushToArray(papabili, GGJ_homepage1)

    var GGJ_homepage2 = document.querySelectorAll("[href='//" + document.location.host + "']");
    papabili = pushToArray(papabili, GGJ_homepage2)

    var GGJ_homepage3 = document.querySelectorAll("[href='" + document.location.origin + "']");
    papabili = pushToArray(papabili, GGJ_homepage3)


    if (papabili.length == 0)
        alert("Questo sito non ha una casa :c");
    else
        papabili[bestOfArray(papabili)].classList.add('goal');
}

selectGoal();
//siti testati positivamente: git.shitware.xyz - globalgamejam.org - code.visualstudio.com - davidwalsh.name - stackoverflow.com - www.w3schools.com - about.me - www.qu.edu
//siti testati negativamente: developer.mozilla.org


/*
if (GGJ_homepage.length != 0){
    GGJ_homepage.forEach(function(i){
        papabili.push(i);
    });
} */

/*
if (GGJ_homepage.length == 0) {
    GGJ_homepage = document.querySelectorAll("[href='//"+document.location.host+"']");
}
else if(GGJ_homepage.length == 0){
    GGJ_homepage = document.querySelectorAll("[href='"+document.location.origin+"']");
}
*/

/*
if (GGJ_homepage.length == 0) {
    document.body.innerHTML = "NON PUOI GIOCARE SU QUESTO SITO";
}
else {
    for (var i = 0, max = GGJ_homepage.length; i < max; i++) {
        if (isVisible(GGJ_homepage[i])) {
            //GGJ_homepage[i].innerHTML = "IO SONO LA HOME";
            GGJ_homepage[i].classList.add('goal');
            break;
        }
    }
}
*/