const container = document.querySelector("#container");
const newgrid = document.querySelector("#newgrid");
let initialgrids = 16;
let realsize = initialgrids * initialgrids;
let squaresize = 960 / initialgrids;
let opacityLevel = 1.0; // Start fully visible
let interactions = 0; // Count interactions

for(let i = 0; i < realsize; i++){
    const div = document.createElement("div");
    container.appendChild(div);
    div.classList.add("squares");
    div.style.height = squaresize + "px";
    div.style.width = squaresize + "px";
    div.style.opacity = "1"; // Ensure opacity starts at 1
    div.dataset.opacity = "1"; // Store opacity in dataset



}

const squares = document.querySelectorAll(".squares");

function getRandomColor() {
    let r = Math.floor(Math.random() * 256); // Random red (0-255)
    let g = Math.floor(Math.random() * 256); // Random green (0-255)
    let b = Math.floor(Math.random() * 256); // Random blue (0-255)
    
    return `rgb(${r}, ${g}, ${b})`; // Return as a CSS RGB string
}

squares.forEach((square) => {
    square.addEventListener("mouseover", () => {
    square.style.backgroundColor = getRandomColor();
    })
})


squares.forEach((square) => {

    square.addEventListener("mouseover", () => {
        if (interactions < 9) {
            interactions++;
            opacityLevel = 1 - (interactions / 10); // Reduce opacity progressively
            square.style.opacity = opacityLevel.toString();
        } else {
            square.style.opacity = "0"; // No transparency effect on black
            interactions = 0;
            opacityLevel = 1.0; // Resets opacity, so after the 10th black square, 
        }
    });
});


function newGrid(){
    opacityLevel = 1.0; // Start fully visible
    interactions = 0; // Count interactions
    container.innerHTML = "";
    let grids = prompt("Insert the new size. A number not greater than 100, not lesser than 1.");
    while (isNaN(grids) || grids < 1 || grids > 100) {
        grids = prompt("Insert a valid number, not greater than 100, not lesser than 1 to establish the size of the grid");
        grids = parseInt(initialgrids);
     }
    grids = parseInt(grids);
    let realsize = grids * grids;
    squaresize = 960 / grids;
    for(let i = 0; i < realsize; i++){
        const div = document.createElement("div");
        container.appendChild(div);
        div.classList.add("squares");
        div.style.height = squaresize + "px";
        div.style.width = squaresize + "px";

        

        
    
    
    }
    const squares = document.querySelectorAll(".squares");
    
        squares.forEach((square) => {
            square.addEventListener("mouseover", () => {
            square.style.backgroundColor = getRandomColor();
            if (interactions < 9) {
                interactions++;
                opacityLevel = 1 - (interactions / 10); // Reduce opacity progressively
                square.style.opacity = opacityLevel.toString();
            } else {
                square.style.opacity = "0"; // Fully transparent square.
                interactions = 0; // Resets the interaction at the 10th square.
                opacityLevel = 1.0; // Resets opacity after the 10th square, 
            }
            })
        })

        
    
}

newgrid.addEventListener("click", newGrid);