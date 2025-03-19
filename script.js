let x, y, size = 10;

let mouseDown = false;

function coordinate(event) {
    x = event.clientX;
    y = event.clientY;
}

window.onload = function() {
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
            ctx.rect(x - size, y - size, size, size);
            ctx.fillStyle = '#000000';
            ctx.fill();
        }
    })
}