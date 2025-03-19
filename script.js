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
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = brushSize;
            ctx.stroke();
            ctx.closePath();
            prevX = x;
            prevY = y;
        }
    });
};