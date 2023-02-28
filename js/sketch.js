let typefaceArray = ['Fjalla One', 'IBM Plex Mono', 'Inter', 'Open Sans', 'Roboto', 'Ubuntu Mono', 'Uncial Antiqua', 'Satoshi', 'Clash Display', 'Boska', 'Stardom', 'Aktura', 'Melodrama', 'Switzer', 'Gambarino', 'Bebas Neue', 'Epilogue'];

let typeface = [];

let userInput = "This is your space on this planet.";
// Don't be afraid to make some noise, make some friends, and eat some good food. Oh, and learn how to code. It's fun!

function preload() {

}



function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('canvasContain');

// Load the fonts into an array
for (let i = 0; i < typefaceArray.length; i++) {
    typeface[i] = typefaceArray[i];
    console.log(typeface[i]);
}
    
}

function draw() {
    background(0);
    fill(255);
    ellipse(20 , 20, 20, 20); 

    textStyle(BOLD);
    textFont(typeface[9]);
    textSize(224);
    text(userInput, 20, 200);
}


