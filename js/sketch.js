let typefaceArray = ['Climate Crisis', 'Fjalla One', 'Herr Von Muellerhoff', 'IBM Plex Mono', 'Playfair Display', 'Rubik Iso', 'Spline Sans Mono', 'Uncial Antiqua', 'Pencerio', 'Melodrama', 'Chillax', 'Aktura', 'Boska', 'Epilogue', 'Familjen Grotesk', 'Clash Display', 'Cabinet Grotesk']
// ['Fjalla One', 'IBM Plex Mono', 'Inter', 'Open Sans', 'Roboto', 'Ubuntu Mono', 'Uncial Antiqua', 'Satoshi', 'Clash Display', 'Boska', 'Stardom', 'Aktura', 'Melodrama', 'Switzer', 'Gambarino', 'Bebas Neue', 'Epilogue'];

let typeface = [];

let userInput = "hello two three";
let initmessage = "Start typing, then press enter to begin";
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
let initMessageBoolean = true;

let gamemode = 0;

let img1;
let img2;
let img3;

function preload() {
    img1 = loadImage('Assets/PromptOne.png');
    img2 = loadImage('Assets/PromptTwo.png');
    img3 = loadImage('Assets/PromptThree.png');
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
        push();
        textSize(24);
        displayMessage();
        pop();
    }

    if (gamemode === 1) {
        if (loadedWords) {
            loadWords();
            loadedWords = !loadedWords;
        }

        background('#F5F1EA');
        // circle(initX, initY, 10);
        // circle(finalX, finalY, 10);
        image(img2, 2 * windowWidth / 5 - img3.width / 4, windowHeight - img2.height * 2, img2.width / 2, img2.height / 2);
        image(img3, 3 * windowWidth / 5 - img3.width / 4, windowHeight - img3.height * 2, img3.width / 2, img3.height / 2);

        for (let i = 0; i < clickCount; i++) {
            wordArray[i].display();
            console.log(i, "displayed", clickCount);
        }
        // wordArray[clickCount].display();
        // mouseLocation();
        // mouseReleased(clickCount);
    }

    if (gamemode === 2) {
        saveCanvas(cnv, 'aLetterToYou', 'jpg');
        gamemode = 0;
    }
}


function mousePressed() {
    if (gamemode === 0) {
        console.log("mouse pressed");
    }
    if (gamemode === 1) {

        if (clickCount >= wordArray.length) {
            clickCount = 0;
        }
        // Put clicked mouse location in initial array
        mouseLocation();
        // console.log(initX, initY);
        wordArray[clickCount].place(initX, initY);
    }
}



function mouseDragged() {
    if (gamemode === 0) {
        console.log("mouse dragged");
    }
    if (gamemode === 1) {
        // Put dragged mouse location in array
        finalX = mouseX;
        finalY = mouseY;

        calcScale(initX, initY, finalX, finalY);

        wordArray[clickCount].display();
        console.log(finalX, finalY);
    }
}

function calcScale() {
    if (finalX - initX > 0 && finalY - initY < 0) {
        wordArray[clickCount].y = initY;
        textScaleX = finalX - initX;
        textScaleY = finalY - initY;
        console.log("HOE");
    }
    if (finalY - initY > 0 && finalX - initX > 0) {
        wordArray[clickCount].y = initY + wordArray[clickCount].size;
        textScaleX = finalX - initX;
        textScaleY = finalY - initY;
        console.log("BITCH");
    }
    else {

        // console.log("HEY");
    }
    wordArray[clickCount].size = textScaleX + textScaleY;
}

function mouseReleased() {
    if (gamemode === 0) {
        console.log("mouse released");
    }

    if (gamemode === 1) {
        // Put released mouse location in final array
        console.log(initX, initY);

        // wordArray[clickCount].display();

        clickCount++;
    }
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
        if (gamemode === 1) {
            if (keyCode === 27) {
                gamemode = 0;
                userInput = "";
                msg = "";
            }
            if (keyCode === 83) {
                gamemode = 2;
            }
        }
    }
}

function displayMessage() {
    if (msg.length === 0) {
        push();
        fill('#CBC4B7');
        textFont('Boska');
        textStyle('NORMAL');
        text(initmessage, windowWidth / 2 - initmessage.length * 5, windowHeight / 2);
        pop();
    }
    else {
        push();
        fill('#000000');
        text(msg, windowWidth / 2 - msg.length * 6, windowHeight / 2);
        image(img1, windowWidth / 2 - img1.width / 4, windowHeight / 2 + img1.height, img1.width / 2, img1.height / 2);
        pop();
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

        // randomize weight in between light, bold, and regular
        this.weight = random(0, 1);
        {
            if (this.weight < 0.33) {
                this.weight = "LIGHT";
            }
            else if (this.weight < 0.66) {
                this.weight = "REGULAR";
            }
            else {
                this.weight = "BOLD";
            }
        }

        this.itallics = random(0, 1);
        {
            if (this.itallics < 0.5) {
                this.itallics = "ITALIC";
            }
            else {
                this.itallics = "";
            }
        }


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
        fill(0);
        textSize(this.size);
        textStyle(this.weight + this.itallics);
        textFont(this.font);
        text(this.word, this.x, this.y);
        console.log(this.font, this.weight, this.itallics, this.size);
        // text(this.word, 400, 500);
        pop();
    }

}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
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