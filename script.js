let x, y, radius = 5;
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
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = '#000000';
        ctx.fill();
    });

    canvas.addEventListener("mouseup", function(event) {
        ctx.stroke();
    });
}