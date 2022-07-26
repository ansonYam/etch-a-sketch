window.onload = function promptUser() {
    const promptButton = document.querySelector('#prompt-btn');
    promptButton.addEventListener('click', () => {
        // prompt the user for a number of squares for a nxn grid
        let numSquares = parseInt(prompt('How many squares per side?'));

        // limit the number
        if (numSquares > 100) {
            alert ("That's too many, sorry");
            return;
        }

        // call a helper function
        populateGridContainer(numSquares);
    })
}

function populateGridContainer(numSquares) {
    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = ''; // clear any existing content
    gridContainer.style['grid-template-columns'] = 'repeat(' + numSquares + ', auto)';

    for (let i = 1; i <= numSquares**2; i++) {
        const div = document.createElement('div');
        div.classList.add('grid-item');
        div.style['background-color'] = 'rgb(255, 255, 255)'; // set a default color so we can pick up on whether the square has been filled
        
        // TODO: split this off into its own function, it's not really related to populating our grid container
        div.addEventListener('mouseover', () => {
            // if the current color is white, apply random three rgb values
            if (div.style['background-color'] === 'rgb(255, 255, 255)') {
                div.style['background-color'] = 'rgb(' + randomColor() + ',' + randomColor() + ',' + randomColor() + ')';
            } else {
            // else, increment each value by 10% until the square becomes black
                let currentRGB = getRGB(div.style['background-color']);
                let red = currentRGB.red * 0.9;
                let green = currentRGB.green * 0.9;
                let blue = currentRGB.blue * 0.9;
                div.style['background-color'] = 'rgb(' + red + ',' + green + ',' + blue + ')';
            }
        })
        gridContainer.appendChild(div);
    }
}

// returns a random color 
function randomColor() {
    // rgb can be 0 through 255
    return Math.floor(Math.random() * 255);
}

// fetches rgb values, thanks to 'akinuri' on stackoverflow
function getRGB(str){
    var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
    return match ? {
      red: match[1],
      green: match[2],
      blue: match[3]
    } : {};
  }
  