let typefaceArray = ['Fjalla One', 'IBM Plex Mono', 'Inter', 'Open Sans', 'Roboto', 'Ubuntu Mono', 'Uncial Antiqua', 'Satoshi', 'Clash Display', 'Boska', 'Stardom', 'Aktura', 'Melodrama', 'Switzer', 'Gambarino', 'Bebas Neue', 'Epilogue'];

let typeface = [];

let userInput = "hello two three";
let msg = "";

let words = [];
let wordArray = [];

// mouse Arrays
let points = [];

let clickCount = 0;

let initX;
let initY;

let finalX;
let finalY;

let textScaleX;
let textScaleY;

let loadedWords = true;

let gamemode = 0;

function preload() {
}



function setup() {
    rectMode(CENTER);
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('canvasContain');

    // Load the fonts into an array (I think this is redundant)
    for (let i = 0; i < typefaceArray.length; i++) {
        typeface[i] = typefaceArray[i];
        console.log(typeface[i]);
    }

}

function draw() {


    if (gamemode === 0) { //receive input from user and display it
        background('#F5F1EA');
        // Display the userInput
        text(msg, windowWidth / 2, windowHeight / 2);
    }

    if (gamemode === 1) {
        if (loadedWords) {
            loadWords();
            loadedWords = !loadedWords;
        }
        background(0);
        for (let i = 0; i < clickCount; i++) {
            wordArray[i].display();
            console.log(i, "displayed", clickCount);
        }
        // wordArray[clickCount].display();
        // mouseLocation();
        // mouseReleased(clickCount);
    }
}


function mousePressed() {
    // Put clicked mouse location in initial array
    mouseLocation();
    console.log(initX, initY);
    wordArray[clickCount].place(initX, initY);
    console.log(wordArray[clickCount], clickCount, wordArray.length, initX);
    // wordArray[clickCount].display();
}

function mouseDragged() {
    // Put dragged mouse location in array
    finalX = mouseX;
    finalY = mouseY;

    calcScale(initX, initY, finalX, finalY);
    wordArray[clickCount].size = textScaleX + textScaleY;
    wordArray[clickCount].display();
    console.log(finalX, finalY);
}

function calcScale() {
    if (finalX - initX < 0) {
        textScaleX = initX - finalX;
    }
    if (finalY - initY < 0) {
        textScaleY = initY - finalY;
    }
    else {
        textScaleX = finalX - initX;
        textScaleY = finalY - initY;
    }
}

function mouseReleased() {
    // Put released mouse location in final array
    console.log(initX, initY);
    // wordArray[clickCount].display();
    if (clickCount >= wordArray.length) {
        clickCount = 0;
    }
    clickCount++;

}



function mouseLocation() {
    initX = mouseX;
    initY = mouseY;
    console.log(initX, initY);
}


function keyReleased() {
    if (keyCode == DELETE || keyCode == BACKSPACE) {
        if (msg.length > 0) {
            msg = msg.substring(0, msg.length - 1);
        }
    }
    if (keyCode == ENTER) {
        userInput = msg;
        gamemode = 1;
    }
}

function keyTyped() {
    if (keyCode >= 32) {
        if (gamemode === 0) {
            msg += key;
        }
        if ((gamemode === 1) && (keyCode === 82)) {
            gamemode = 0;
            userInput = "";
        }
    }
}





function loadWords() {
    // Split userInput into an array of words
    words = split(userInput, ' ');
    for (let i = 0; i < words.length; i++) {
        wordArray[i] = new Wordclass(words[i]);
        console.log(wordArray[i]);
    }
}


// create  a class 

class Wordclass {
    constructor(word) {
        this.word = word;
        this.font = typefaceArray[floor(random(0, typefaceArray.length))];
        this.size = 18;
    }
    place(x, y) {
        // this.x = random(0, windowWidth - this.size*this.word.length);
        // this.y = random(0 + this.size, windowHeight);
        // this.x = points[points.length - 1].x;
        // this.y = points[points.length - 1].y;
        this.x = x;
        this.y = y;
    }
    display() {
        push();
        fill(255);
        textSize(this.size);
        textFont(this.font);
        text(this.word, this.x, this.y);
        // text(this.word, 400, 500);
        pop();
    }

}








/*

// WASTE BIN // WASTE BIN //



// function mouseReleased(i) {
//     console.log("base", i, clickCount);
//     if (gamemode === 1) {
//         if (i >= wordArray.length) {
//             clickCount = 0;
//             console.log("if", clickCount, i);
//         }
//         else {
//             clickCount++;
//             console.log("else", clickCount, i);
//         }
//         wordArray[i].place();
//         wordArray[i].display();
//     }
//     else {
//         console.log("else", clickCount);
//     }
// }

/*
function mouseDragged() {
    // map between initX and initY and mouseX and mouseY to get a scale to map to the text size
    let textScale = map(0, mouseX, 0, 100);
    // RETURNING NAN NAN // RETURNING NAN NAN// RETURNING NAN NAN// RETURNING NAN NAN// RETURNING NAN NAN// RETURNING NAN NAN
    console.log(textScale);


    // let textScale = map(points[0].x, mouseX, 0, 100);

    // wordArray[clickCount].size = textScale;

    // wordArray[clickCount].place();
    wordArray[clickCount].display();

}
*/

/*
function mouseReleased() {
    wordArray[clickCount].place();
    wordArray[clickCount].font = typefaceArray[floor(random(0, typefaceArray.length))];
    // wordArray[clickCount].size = random(18, 500);
    clickCount++;
    if (clickCount >= wordArray.length) {
        clickCount = 0;
    }
}



display() {
        textSize(random(18, 90));
        textFont(this.font);
        text(this.word, this.x, this.y);
    }
    gravity() {
        this.y += 1;
    }
    style() {
    }



On Key Pressed, add the key to the userInput string

function keyPressed() {
    if (keyCode === BACKSPACE) {
        userInput = userInput.substring(0, userInput.length - 1);
    } else {
        userInput += key;
    }
}

*/