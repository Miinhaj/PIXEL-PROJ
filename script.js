const canvas = document.getElementById("canvas");
// canvas.width = window.innerWidth / 1.5;
// canvas.height = window.innerHeight / 1.5;
const bound = canvas.getBoundingClientRect();
const c = canvas.getContext('2d');

const xlim = canvas.width;
const ylim = canvas.height;

const color = document.getElementById("color");
const radius = document.getElementById("radius");

const mouse = {
    x:0,
    y:0,
    down:false
};
const stroke = [];

function draw() { 
    const size=20
    c.beginPath();
    c.fillStyle = color.value;
    c.fillRect(Math.floor (mouse.x/size) *size, Math.floor (mouse.y/size)*size, size, size)
    c.fill();
    c.closePath();
}

function erase() {
    color.value= "#FFFFFF";
}


function eraseWhole(){
    c.clearRect(0,0,xlim,ylim)
}

addEventListener("mousemove", (e) => {
    mouse.x = e.clientX - bound.left;
    mouse.y = e.clientY - bound.top;
    if (mouse.down) {
        stroke.push({
            x: mouse.x,
            y: mouse.y 
        })
        draw();
    }
})
addEventListener("mousedown", (e) => {
    mouse.down = true;
})
addEventListener("mouseup", (e) => {
    mouse.down = false;
    stroke = [];
})

