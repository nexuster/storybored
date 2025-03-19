let x, y, brushSize;
let prevX, prevY;
let mouseDown = false;
let canvasHistory = [];
let historyStep = -1;

function coordinate(event) {
    const rect = event.target.getBoundingClientRect();
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
}

function saveState(canvas, history, step) {
    if (step < history.length - 1) {
        history.length = step + 1;
    }
    history.push(canvas.toDataURL());
    return ++step;
}

function restoreState(ctx, history, step) {
    const img = new Image();
    img.src = history[step];
    img.onload = function() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(img, 0, 0);
    };
}

window.onload = function() {
    const size = document.getElementById('size');
    let bsize = document.getElementById('bsize');
    const undoButton = document.getElementById('undo');

    const sizeInput = document.getElementById('bs');

    size.addEventListener('input', function() {
        brushSize = size.value;
        sizeInput.value = brushSize
    });

    sizeInput.addEventListener('input', function() {
        brushSize = sizeInput.value;
        size.value = brushSize;
    })

    const canvas = document.getElementById("spanel");
    const ctx = canvas.getContext("2d");

    historyStep = saveState(canvas, canvasHistory, historyStep);

    canvas.addEventListener("mousedown", function(event) {
        mouseDown = true;
        coordinate(event);
        prevX = x;
        prevY = y;
    });

    canvas.addEventListener("mouseup", function(event) {
        mouseDown = false;
        historyStep = saveState(canvas, canvasHistory, historyStep);
    });

    canvas.addEventListener("mousemove", function(event) {
        if (mouseDown) {
            coordinate(event);
            interpolateBrush(prevX, prevY, x, y, brushSize, ctx);
            prevX = x;
            prevY = y;
        }
    });

    undoButton.addEventListener("click", function() {
        if (historyStep > 0) {
            historyStep--;
            restoreState(ctx, canvasHistory, historyStep);
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
        ctx.rect(x - size / 2, y - size / 2, size, size);
        ctx.fillStyle = '#000000';
        ctx.fill();
        ctx.closePath();
    }
}