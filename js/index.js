var works = [{
        "id": "x50",
        "index": 1,
        "type": "demo",
        "deps": [
            "webgl"
        ],
        "title": "力帆 x50",
        "gridImg": "assets/img/x50.png",
        "url": "case/x50/index.html",
        "contentUrl": "data/glass",
        "info": "by 3DLook",
        "tint": "#cf3201"
    },
    {
        "id": "i8",
        "index": 2,
        "type": "demo",
        "deps": [
            "webgl"
        ],
        "title": "宝马 I8",
        "gridImg": "assets/img/i8.png",
        "url": "case/i8/index.html",
        "contentUrl": "data/glass",
        "info": "by playcanvas",
        "tint": "#cf5601"
    },
    {
        "id": "moto",
        "index": 3,
        "type": "demo",
        "deps": [
            "webgl"
        ],
        "title": "力帆 moto",
        "gridImg": "assets/img/moto.png",
        "url": "case/moto/index.html",
        "contentUrl": "data/glass",
        "info": "by 3DLook",
        "tint": "#cf3201"
    },
    {
        "id": "iwatch",
        "index": 4,
        "type": "demo",
        "deps": [
            "webgl"
        ],
        "title": "苹果 iwatch",
        "gridImg": "assets/img/iwatch.png",
        "url": "case/iwatch/index.html",
        "contentUrl": "data/glass",
        "info": "by 3DLook",
        "tint": "#cf5601"
    },
    {
        "id": "nike",
        "index": 5,
        "type": "demo",
        "deps": [
            "webgl"
        ],
        "title": "耐克 nike",
        "gridImg": "assets/img/nike.png",
        "url": "case/nike/index.html",
        "contentUrl": "data/glass",
        "info": "by 3DLook",
        "tint": "#cf3201"
    },
    {
        "id": "ring",
        "index": 6,
        "type": "demo",
        "deps": [
            "webgl"
        ],
        "title": "海神戒子 ring",
        "gridImg": "assets/img/ring.png",
        "url": "case/ring/index.html",
        "contentUrl": "data/glass",
        "info": "by 3DLook",
        "tint": "#cf5601"
    },
    {
        "id": "shave",
        "index": 7,
        "type": "demo",
        "deps": [
            "webgl"
        ],
        "title": "剃须刀 shave",
        "gridImg": "assets/img/shave.png",
        "url": "case/shave/index.html",
        "contentUrl": "data/glass",
        "info": "by 3DLook",
        "tint": "#cf5601"
    },
    {
        "id": "zsfj",
        "index": 8,
        "type": "demo",
        "deps": [
            "webgl"
        ],
        "title": "Blend4Web 直升机",
        "gridImg": "assets/img/zsfj.png",
        "url": "case/zsfj/index.html",
        "contentUrl": "data/glass",
        "info": "by Blend4Web",
        "tint": "#cf3201"
    },
    {
        "id": "edge",
        "index": 9,
        "type": "demo",
        "deps": [
            "webgl"
        ],
        "title": "三星 Edge",
        "gridImg": "assets/img/edge.png",
        "url": "case/edge/index.html",
        "contentUrl": "data/glass",
        "info": "by 3DLook",
        "tint": "#cf3201"
    },
    {
        "id": "glmg",
        "index": 10,
        "type": "demo",
        "deps": [
            "webgl"
        ],
        "title": "格力 glmg",
        "gridImg": "assets/img/glmg.png",
        "url": "case/glmg/index.html",
        "contentUrl": "data/glass",
        "info": "by 3DLook",
        "tint": "#cf5601"
    }
]










var flippingCards = document.getElementsByClassName("flippingCards")[0]


//RENDER DATA

for (let i = 0; i < works.length; i++) {
    var worksData = works[i];


    var flippingCard = document.createElement("div");
    flippingCard.className = "flippingCard";
    flippingCard.setAttribute('id', worksData.id); // sets 
    flippingCard.setAttribute('data-index', worksData.index); // sets 

    var cardLink = document.createElement("a");
    cardLink.className = "cardLink";

    var container = document.createElement("div");
    container.className = "container";

    var frontBg = document.createElement("div");
    frontBg.className = "frontBg";
    frontBg.style.backgroundImage = "url(" + worksData.gridImg + ")";


    var front = document.createElement("div");
    front.className = "front";

    var frontInner = document.createElement("div");
    frontInner.className = "inner";

    var frontInfo = document.createElement("span");
    frontInfo.className = "frontInfo";
    frontInfo.innerText = worksData.title


    var back = document.createElement("div");
    back.className = "back";

    var backInner = document.createElement("div");
    backInner.className = "inner";

    var backInfo = document.createElement("p");
    backInfo.className = "backInfo";
    backInfo.innerText = worksData.info

    frontInner.appendChild(frontInfo)
    backInner.appendChild(backInfo)

    front.appendChild(frontBg)
    front.appendChild(frontInner)
    back.appendChild(backInner)

    container.appendChild(front)
    container.appendChild(back)

    cardLink.appendChild(container)
    flippingCard.appendChild(cardLink)
    flippingCards.appendChild(flippingCard)


}

var clickDir
let boxes = Array.from(document.getElementsByClassName('flippingCard'));

function selectBox(id) {
    boxes.forEach(b => {
        b.classList.toggle('selected', b.id === id);
    });
}



var eyes3d = document.querySelector(".eyes3d")
var host = "http://" + document.location.host + document.location.pathname
boxes.forEach(b => {
    let id = b.id;
    b.addEventListener('click', e => {


        if (e.clientX > window.innerWidth / 2) {
            clickDir = "clickDir-right"
            siderPage.style.left = "100vw"
            pages.style.transform = "translateX(-100vw)"

        } else {
            clickDir = "clickDir-left"
            siderPage.style.left = "-100vw"
            pages.style.transform = "translateX(100vw)"
        }


        creatIframe(eyes3d, id)

        history.pushState({ id }, `case: ${id}`, `case/${id}`)

        selectBox(id);
    });
});

// var iframeTag

// function putIframe(parent, src, remove) {
//     if (remove) {
//         if (parent.className == "eyes3d hasIframe") {
//             setTimeout(() => {
//                 parent.children[0].style.display = "none";
//             }, 600);
//         } else {
//             parent.children[0].style.display = "block";
//         }

//     } else {
//         parent.textContent = ""
//         iframeTag = document.createElement("iframe");
//         iframeTag.src = host + "case/" + src
//         parent.appendChild(iframeTag)
//         parent.classList.toggle("hasIframe")
//     }

// }




function creatIframe(parent, src) {
    parent.textContent = ""
    var iframeTag = document.createElement("iframe");
    iframeTag.src = host + "case/" + src
    parent.appendChild(iframeTag)
    parent.classList.toggle("hasIframe")

}

function toggleIframe() {

    if (pages.style.transform == "translateX(0vw)") {
        eyes3d.children[0].style.display = "block";
    } else {
        setTimeout(() => {
            eyes3d.children[0].style.display = "none";
        }, 600);
    }

}
// pages.style.transform

// pages.style.transform
// "translateX(100vw)"


window.addEventListener('popstate', e => {

    selectBox(e.state.id);
    toggleIframe()
    if (e.state.id == null) {
        pages.style.transform = "translateX(0vw)"
        history.replaceState({ id: null }, 'home state', host);
    } else {
        console.log("e.state.id  " + e.state.id)
    }


    if (e.state.id != null && clickDir == "clickDir-right") {
        pages.style.transform = "translateX(-100vw)"

    }

    if (e.state.id != null && clickDir == "clickDir-left") {
        pages.style.transform = "translateX(100vw)"
    }

    if (e.state.id == null) {
        pages.style.transform = "translateX(0vw)"
        history.replaceState({ id: null }, 'home state', host);
    }
});

// history.replaceState({ id: null }, 'home state', host);



closeBtn.addEventListener("click", function(event) {
    history.replaceState({ id: null }, 'home state', host);
    pages.style.transform = "translate(0vw, 0px)"
    toggleIframe()
}, false);




















var fl = "first"

var direction = "UP"

var lastScroll = 0;



var flippingCards = document.querySelectorAll(".flippingCard")

var grids = []

for (let i = 0; i < flippingCards.length; i++) {
    const element = flippingCards[i];
    grids.push(element)
}



// var Scrollbar = window.Scrollbar;



















var scrollbarCont = document.getElementById('scrollbar')

// var bodyHeight = document.querySelector(".flippingCards").offsetHeight + document.querySelector(".flippingCards").offsetTop

// scrollbar.style.height = bodyHeight + "px"
// var Scrollbar = window.Scrollbar;

var scrollbar = Scrollbar.init(document.body, {
    damping: 0.1
});

Scrollbar.use(window.OverscrollPlugin);

scrollbar.addListener(function(status) {
    var currentScroll = status.offset.y
    if (lastScroll < currentScroll) {
        direction = "DOWN"
        fl = "first"
    } else {
        direction = "UP"
        fl = "last"
    }

    gridStagger("flippingCard", -currentScroll * (Math.sqrt(currentScroll)) * 0.01, fl, 3000, 0)
    siderPage.style.top = currentScroll + "px"

    lastScroll = currentScroll
});




// gridStagger(gridCard, 300, "first", 1000, 0)

function gridStagger(targets, action, reverse, interval, delay) {

    var targets = document.getElementsByClassName(targets)

    function fire() {
        for (var i = 0, maxi = targets.length; i < maxi; i++) {
            (function() {


                if (reverse == "first") {
                    var target = targets[i]
                }

                if (reverse == "last") {
                    var target = targets[targets.length - 1 - i]
                }

                setTimeout(function() {
                    target.style.transform = "translateY(" + action + "px)"
                }, interval * i / 100)
            })()
        }
    }


    if (delay !== undefined && delay > 0) setTimeout(fire, delay)
    else fire()
}


// var svgTextPath = document.getElementById("infoText")


// var textOffset = 0,
//   textSpeed = 0.1;

// function animateEllipse() {
//   requestAnimationFrame(animateEllipse);
//   svgTextPath.setAttributeNS(null, "startOffset", textOffset + "%");
//   if (textOffset >= 100) {
//     textOffset = 0;
//   }
//   textOffset += 0.1;
// }

// // Init Animation
// animateEllipse();