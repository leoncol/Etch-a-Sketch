const container = document.querySelector("#container");
const newgrid = document.querySelector("#newgrid");
const resetgrid = document.querySelector("#resetgrid");
const eraser = document.querySelector("#eraser");
const body = document.querySelector("body");
let initialgrids = 16;
let realsize = initialgrids * initialgrids;
let squaresize = 960 / initialgrids;
let totalInteractions = 0; // Track total interactions globally
let touchedSquares = new Set(); // Track squares that have been interacted with
let isErasing = false; // Flag to track eraser mode

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

// Create a custom cursor element
const cursor = document.createElement("img");
cursor.src = "assets/iconmonstr-eraser-2.svg";
cursor.style.position = "absolute";
cursor.style.width = "20px";
cursor.style.height = "20px";
cursor.style.pointerEvents = "none"; // Ensure the cursor doesn't interfere with touch events
cursor.style.display = "none"; // Initially hidden
document.body.appendChild(cursor);

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

function eraseSquare(square) {
    square.style.backgroundColor = "white";
    square.style.opacity = "1.0";
}

// Add event listeners for desktop and mobile
squares.forEach((square) => {
    // Desktop support
    square.addEventListener("mouseover", () => {
        if (isErasing == false){
            handleInteraction(square);
        }
    });

    square.addEventListener("mouseover", () => {
        if (isErasing == true){
            eraseSquare(square);
        }
    });

    // Mobile support
    square.addEventListener("touchstart", (e) => {
        e.preventDefault();
        if (isErasing == false){
            handleInteraction(square);
        }
    });

    square.addEventListener("touchstart", (e) => {
        e.preventDefault();
        if (isErasing == true){
            eraseSquare(square);
        }
    });

    square.addEventListener("touchmove", (e) => { // Touch color
        if (isErasing == false){
            e.preventDefault(); // Prevent scrolling
            let touch = e.touches[0];
            let touchedElement = document.elementFromPoint(touch.clientX, touch.clientY);
            if (touchedElement && touchedElement.classList.contains("squares")) {
                handleInteraction(touchedElement); // Apply interaction to the touched square
            }
        }   
    });

    square.addEventListener("touchmove", (e) => { // Touch erase
        if (isErasing == true){
            e.preventDefault(); // Prevent scrolling
            let touch = e.touches[0];
            let touchedElement = document.elementFromPoint(touch.clientX, touch.clientY);
            if (touchedElement && touchedElement.classList.contains("squares")) {
                eraseSquare(touchedElement); // Apply interaction to the touched square
            }
        }   
    });
});

// Function to create a new grid
function newGrid() {
    isErasing = false;
    container.innerHTML = "";
    let grids = prompt("Insert the new size. A number not greater than 100, not lesser than 1.");
    while (isNaN(grids) || grids < 1 || grids > 100) {
        grids = prompt("Insert a valid number, not greater than 100, not lesser than 1 to establish the size of the grid");
    }
    initialgrids = grids;
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
        // Desktop support
        square.addEventListener("mouseover", () => {
            if (isErasing == false){
                handleInteraction(square);
            }
        });
    
        square.addEventListener("mouseover", () => {
            if (isErasing == true){
                eraseSquare(square);
            }
        });
    
        // Mobile support
        square.addEventListener("touchstart", (e) => {
            e.preventDefault();
            if (isErasing == false){
                handleInteraction(square);
            }
        });
    
        square.addEventListener("touchstart", (e) => {
            e.preventDefault();
            if (isErasing == true){
                eraseSquare(square);
            }
        });
    
        square.addEventListener("touchmove", (e) => { // Touch color
            if (isErasing == false){
                e.preventDefault(); // Prevent scrolling
                let touch = e.touches[0];
                let touchedElement = document.elementFromPoint(touch.clientX, touch.clientY);
                if (touchedElement && touchedElement.classList.contains("squares")) {
                    handleInteraction(touchedElement); // Apply interaction to the touched square
                }
            }   
        });
    
        square.addEventListener("touchmove", (e) => { // Touch erase
            if (isErasing == true){
                e.preventDefault(); // Prevent scrolling
                let touch = e.touches[0];
                let touchedElement = document.elementFromPoint(touch.clientX, touch.clientY);
                if (touchedElement && touchedElement.classList.contains("squares")) {
                    eraseSquare(touchedElement); // Apply interaction to the touched square
                }
            }   
        });
    });

    // Reset total interactions and touched squares when creating a new grid
    totalInteractions = 0;
    touchedSquares.clear();
}

// Function to reset existing grid
function resetGrid() {
    isErasing = false;
    container.innerHTML = "";
    let grids = initialgrids;
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
        // Desktop support
        square.addEventListener("mouseover", () => {
            if (isErasing == false){
                handleInteraction(square);
            }
        });
    
        square.addEventListener("mouseover", () => {
            if (isErasing == true){
                eraseSquare(square);
            }
        });
    
        // Mobile support
        square.addEventListener("touchstart", (e) => {
            e.preventDefault();
            if (isErasing == false){
                handleInteraction(square);
            }
        });
    
        square.addEventListener("touchstart", (e) => {
            e.preventDefault();
            if (isErasing == true){
                eraseSquare(square);
            }
        });
    
        square.addEventListener("touchmove", (e) => { // Touch color
            if (isErasing == false){
                e.preventDefault(); // Prevent scrolling
                let touch = e.touches[0];
                let touchedElement = document.elementFromPoint(touch.clientX, touch.clientY);
                if (touchedElement && touchedElement.classList.contains("squares")) {
                    handleInteraction(touchedElement); // Apply interaction to the touched square
                }
            }   
        });
    
        square.addEventListener("touchmove", (e) => { // Touch erase
            if (isErasing == true){
                e.preventDefault(); // Prevent scrolling
                let touch = e.touches[0];
                let touchedElement = document.elementFromPoint(touch.clientX, touch.clientY);
                if (touchedElement && touchedElement.classList.contains("squares")) {
                    eraseSquare(touchedElement); // Apply interaction to the touched square
                }
            }   
        });
    });

    // Reset total interactions and touched squares when creating a new grid
    totalInteractions = 0;
    touchedSquares.clear();
}

newgrid.addEventListener("click", newGrid);
resetgrid.addEventListener("click", resetGrid);
eraser.addEventListener("click", () => {
    isErasing = !isErasing;
    if (isErasing) {
        body.classList.add("eraser-mode");
    } else {
        body.classList.remove("eraser-mode");
    }
});

// Add touch event listeners to show/hide the cursor
document.addEventListener("touchstart", (e) => {
    if(isErasing == true){
        const touch = e.touches[0];
        cursor.style.left = `${touch.clientX - 10}px`; // Adjust for cursor size
        cursor.style.top = `${touch.clientY - 10}px`; // Adjust for cursor size
        cursor.style.display = "block";
    }
});

document.addEventListener("touchmove", (e) => {
    if(isErasing == true){
        const touch = e.touches[0];
        cursor.style.left = `${touch.clientX - 10}px`; // Adjust for cursor size
        cursor.style.top = `${touch.clientY - 10}px`; // Adjust for cursor size
    }
});

document.addEventListener("touchend", () => {
    cursor.style.display = "none";
});