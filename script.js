let x, y, brushSize;
let prevX, prevY;
let mouseDown = false;

function coordinate(event) {
    x = event.clientX;
    y = event.clientY;
}

window.onload = function() {
    const size = document.getElementById('size');
    let bsize = document.getElementById('bsize');

    size.addEventListener('input', function() {
        bsize.textContent = 'brush-size: ' + size.value;
        brushSize = size.value;
    });

    brushSize = size.value;

    const canvas = document.getElementById("spanel");
    const ctx = canvas.getContext("2d");

    canvas.addEventListener("mousedown", function(event) {
        mouseDown = true;
        coordinate(event);
        prevX = x;
        prevY = y;
    });

    canvas.addEventListener("mouseup", function(event) {
        mouseDown = false;
    });

    canvas.addEventListener("mousemove", function(event) {
        if (mouseDown) {
            coordinate(event);
            interpolateBrush(prevX, prevY, x, y, brushSize, ctx);
            prevX = x;
            prevY = y;
        }
    });
};

function interpolateBrush(x1, y1, x2, y2, size, ctx) {
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = Math.atan2(y2 - y1, x2 - x1);
    for (let i = 0; i < distance; i++) {
        const x = x1 + Math.cos(angle) * i;
        const y = y1 + Math.sin(angle) * i;
        ctx.beginPath();
        ctx.rect(x, y, size, size);
        ctx.fillStyle = '#000000';
        ctx.fill();
        ctx.closePath();
    }
}