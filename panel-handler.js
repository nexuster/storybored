window.onload = function() {
    const newButton = document.querySelector('#new');
    const panelContainer = document.querySelector('.panelContainer');
    const canvas = document.querySelector('#canv');

    newButton.addEventListener('click', function(e) {
        let newCanv = canvas.cloneNode(true);
        panelContainer.appendChild(newCanv);
    })
}