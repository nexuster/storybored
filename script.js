let x, y, brushSize = 10;

let mouseDown = false;

function coordinate(event) {
    x = event.clientX;
    y = event.clientY;
}

window.onload = function() {
    const size = document.getElementById('slider');
    const bsize = document.getElementById('bsize').textContent;

    slider.addEventListener('input', function() {
        bsize = 'brush-size: ' + size.value;
    });

    brushSize = size.value;

        ///////////////////

    const canvas = document.getElementById("spanel");
    const ctx = canvas.getContext("2d");

    canvas.addEventListener("mousedown", function(event) {
        mouseDown = true;
    });
    canvas.addEventListener("mouseup", function(event) {
        mouseDown = false;
    });

    canvas.addEventListener("mousemove", function(event) {
        coordinate(event);
        if (mouseDown) {
            ctx.beginPath();
            ctx.rect(x, y, brushSize, brushSize);
            ctx.fillStyle = '#000000';
            ctx.fill();
        }
    })
}