const canvas = document.getElementById("canvas");
// canvas.width = window.innerWidth / 1.5;
// canvas.height = window.innerHeight / 1.5;
// const c = canvas.getContext('2d');
const canvas2 = document.getElementById("canvas2");

const xlim = canvas.width;
const ylim = canvas.height;

const color = document.getElementById("color");
const radius = document.getElementById("radius");
const imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
const ctx = canvas.getContext('2d');
const ctx2 = canvas2.getContext('2d');

const mouse = {
    x:0,
    y:0,
    down:false
};
const stroke = [];

function draw() { 
    const size=20
    ctx.beginPath();
    ctx.fillStyle = color.value;
    ctx.fillRect(Math.floor (mouse.x/size) *size, Math.floor (mouse.y/size)*size, size, size)
    ctx.fill();
    ctx.closePath();
}

function erase() {
    color.value= "#FFFFFF";
}


function eraseWhole(){
    ctx.clearRect(0,0,xlim,ylim)
}

addEventListener("mousemove", (e) => {
    let bound = canvas.getBoundingClientRect();
    mouse.x = e.clientX - bound.left;
    mouse.y = e.clientY - bound.top;
    if (mouse.down) {
        draw();
    }
})
addEventListener("mousedown", (e) => {
    mouse.down = true;
})
addEventListener("mouseup", (e) => {
    mouse.down = false;
})

function handleImage(e){
    let reader = new FileReader();
    reader.onload = function(event){
        let img = new Image();
        img.onload = function(){
            canvas.width=img.width;
            canvas.height=img.height;
          //  ctx.drawImage(img,0,0);
            canvas2.width = img.width;
            canvas2.height = img.height;
            ctx2.drawImage(img,0,0);
            pixelate(20,img.width,img.height)
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}

function pixelate(squareSize,w,h){
    const originalImageData = ctx2.getImageData(0, 0,w,h).data;
           //get image data from ctx 2 
    for (let y = 0; y < h; y += squareSize) {
        for (let x = 0; x < w; x += squareSize) {
            const pixelIndexPosition = (x + y * w) * 4;
            ctx.fillStyle = `rgba(
            ${originalImageData[pixelIndexPosition]},
             ${originalImageData[pixelIndexPosition + 1]},
             ${originalImageData[pixelIndexPosition + 2]},
              ${originalImageData[pixelIndexPosition + 3]}
             )`;
              ctx.fillRect(x, y, squareSize, squareSize);
        }
    }
}
        
    //use nested for loops to read pixels from the array and draw rectangles into ctx