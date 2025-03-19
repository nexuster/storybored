let x, y, size = 10;

function coordinate(event) {
    x = event.clientX;
    y = event.clientY;
}

window.onload = function() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.addEventListener("mousedown", function(event) {
        coordinate(event);
        ctx.beginPath();
        ctx.rect(x - size / 2, y - size / 2, size, size);
        ctx.fillStyle = '#000000';
        ctx.fill();
    });

    canvas.addEventListener("mouseup", function(event) {
        ctx.stroke();
    });
}