let x, y, brushSize;
let prevX, prevY;
let mouseDown = false;
let historyStep = -1;

function coordinate(event) {
    const rect = event.target.getBoundingClientRect();
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
}

function saveState(canvas, step) {
    const dataURL = canvas.toDataURL();
    localStorage.setItem('canvasState' + step, dataURL);
    return ++step;
}

function restoreState(ctx, step) {
    const dataURL = localStorage.getItem('canvasState' + step);
    if (dataURL) {
        const img = new Image();
        img.src = dataURL;
        img.onload = function() {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.drawImage(img, 0, 0);
        };
    }
}

window.onload = function() {
    const size = document.getElementById('size');
    let bsize = document.getElementById('bsize');
    const undoButton = document.getElementById('undo');

    const sizeInput = document.getElementById('bs');

    size.addEventListener('input', function() {
        brushSize = size.value;
        sizeInput.value = brushSize;
    });

    sizeInput.addEventListener('input', function() {
        brushSize = sizeInput.value;
        size.value = brushSize;
    });

    const canvas = document.getElementById("spanel");
    const ctx = canvas.getContext("2d");
    const clearButton = document.getElementById("clearc");

    historyStep = saveState(canvas, historyStep);

    const eraserCheck = document.getElementById("eraserButton");

    canvas.addEventListener("mousedown", function(event) {
        mouseDown = true;
        coordinate(event);
        prevX = x;
        prevY = y;
    });

    canvas.addEventListener("mouseup", function(event) {
        mouseDown = false;
        historyStep = saveState(canvas, historyStep);
    });

    canvas.addEventListener("mousemove", function(event) {
        if (mouseDown) {
            let col = '#000000';
            coordinate(event);
            if (eraserCheck.checked) {
                col = '#ffffff';
            }
            interpolateBrush(prevX, prevY, x, y, brushSize, ctx, col);
            prevX = x;
            prevY = y;
        }
    });


    undoButton.addEventListener("click", function() {
        if (historyStep > 0) {
            historyStep--;
            restoreState(ctx, historyStep);
        }
    });

    clearButton.addEventListener("click", function() {
        ctx.rect(0,0,ctx.canvas.width,ctx.canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.closePath();
    })
};

function interpolateBrush(x1, y1, x2, y2, size, ctx, col) {
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const angle = Math.atan2(y2 - y1, x2 - x1);
    for (let i = 0; i < distance; i++) {
        const x = x1 + Math.cos(angle) * i;
        const y = y1 + Math.sin(angle) * i;
        ctx.beginPath();
        ctx.rect(x - size / 2, y - size / 2, size, size);
        ctx.fillStyle = col;
        ctx.fill();
        ctx.closePath();
    }
}

window.onbeforeunload = function(event) {
    const message = "you forgot to save... are you sure??";
    if (event) {
        event.returnValue = message;
    }
    return message;
};