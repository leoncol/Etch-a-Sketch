const container = document.querySelector("#container");
const newgrid = document.querySelector("#newgrid");
let initialgrids = 16;
let realsize = initialgrids * initialgrids;
let squaresize = 960 / initialgrids;
let totalInteractions = 0; // Track total interactions globally
let touchedSquares = new Set(); // Track squares that have been interacted with

// Create the initial grid
for (let i = 0; i < realsize; i++) {
    const div = document.createElement("div");
    container.appendChild(div);
    div.classList.add("squares");
    div.style.height = squaresize + "px";
    div.style.width = squaresize + "px";
    div.style.opacity = "1.0"; // Start fully opaque
}

const squares = document.querySelectorAll(".squares");

function getRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function handleInteraction(square) {
    if (!touchedSquares.has(square)) {
        touchedSquares.add(square); // Mark the square as interacted with
        if (totalInteractions < 10) {
            totalInteractions++; // Increment total interactions
            const opacityLevel = 1 - (totalInteractions / 10); // Calculate opacity
            square.style.opacity = opacityLevel.toString(); // Apply opacity to the square
        } else {
            // Reset after 10 interactions
            totalInteractions = 0;
            touchedSquares.clear();
            square.style.opacity = "1.0"; // Reset to fully visible
        }
        square.style.backgroundColor = getRandomColor(); // Change color
    }
}

// Add event listeners for desktop and mobile
squares.forEach((square) => {
    // Desktop support
    square.addEventListener("mouseover", () => {
        handleInteraction(square);
    });

    // Mobile support
    square.addEventListener("touchstart", (e) => {
        e.preventDefault();
        handleInteraction(square);
    });

    square.addEventListener("touchmove", (e) => {
        e.preventDefault(); // Prevent scrolling
        let touch = e.touches[0];
        let touchedElement = document.elementFromPoint(touch.clientX, touch.clientY);
        if (touchedElement && touchedElement.classList.contains("squares")) {
            handleInteraction(touchedElement); // Apply interaction to the touched square
        }
    });
});

// Function to create a new grid
function newGrid() {
    container.innerHTML = "";
    let grids = prompt("Insert the new size. A number not greater than 100, not lesser than 1.");
    while (isNaN(grids) || grids < 1 || grids > 100) {
        grids = prompt("Insert a valid number, not greater than 100, not lesser than 1 to establish the size of the grid");
    }
    grids = parseInt(grids);
    let realsize = grids * grids;
    squaresize = 960 / grids;
    for (let i = 0; i < realsize; i++) {
        const div = document.createElement("div");
        container.appendChild(div);
        div.classList.add("squares");
        div.style.height = squaresize + "px";
        div.style.width = squaresize + "px";
        div.style.opacity = "1.0"; // Start fully opaque
    }
    const squares = document.querySelectorAll(".squares");

    squares.forEach((square) => {
        square.addEventListener("mouseover", () => {
            handleInteraction(square);
        });

        square.addEventListener("touchstart", (e) => {
            e.preventDefault();
            handleInteraction(square);
        });

        square.addEventListener("touchmove", (e) => {
            e.preventDefault();
            let touch = e.touches[0];
            let touchedElement = document.elementFromPoint(touch.clientX, touch.clientY);
            if (touchedElement && touchedElement.classList.contains("squares")) {
                handleInteraction(touchedElement);
            }
        });
    });

    // Reset total interactions and touched squares when creating a new grid
    totalInteractions = 0;
    touchedSquares.clear();
}

newgrid.addEventListener("click", newGrid);