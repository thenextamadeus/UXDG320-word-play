let typefaceArray = ['Fjalla One', 'IBM Plex Mono', 'Inter', 'Open Sans', 'Roboto', 'Ubuntu Mono', 'Uncial Antiqua', 'Satoshi', 'Clash Display', 'Boska', 'Stardom', 'Aktura', 'Melodrama', 'Switzer', 'Gambarino', 'Bebas Neue', 'Epilogue'];

let typeface = [];

let userInput = "Planet Big, Planet Small.";

let words = [];
let wordArray = [];

// mouse Arrays
let points = [];

let clickCount = 0;

let initX;
let initY;

function preload() {
    // Split userInput into an array of words
    words = split(userInput, ' ');
    for  (let i = 0; i < words.length; i++) {
        wordArray[i] = new Wordclass(words[i]);
        console.log(wordArray[i]);
    }
}



function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('canvasContain');

// Load the fonts into an array (I think this is redundant)
for (let i = 0; i < typefaceArray.length; i++) {
    typeface[i] = typefaceArray[i];
    console.log(typeface[i]);
}
    
}

function draw() {
    background(0);
    mouseLocation(); 
    for (let i = 0; i < wordArray.length; i++) {
        wordArray[i].display();
    }
    
}
function mousePressed() {
    // record location of mouse on initial click
    initX = mouseX;
    initY = mouseY;
    console.log(initX, initY);
}


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

function mouseReleased() {
    wordArray[clickCount].place();
    wordArray[clickCount].font = typefaceArray[floor(random(0, typefaceArray.length))];
    // wordArray[clickCount].size = random(18, 500);
    clickCount++;
    if (clickCount >= wordArray.length) {
        clickCount = 0;   
    }
}

function mouseLocation() {
    var point = {
        x: mouseX,
        y: mouseY
    };
    points.push(point);

    if (points.length > 50) {
        points.splice(0,1);
      }
}


// create  a class 

class Wordclass {
    constructor(word) {
        this.word = word;        
        this.font = typefaceArray[floor(random(0, typefaceArray.length))];
        this.size = 18;
    }
        place() {
            // this.x = random(0, windowWidth - this.size*this.word.length);
            // this.y = random(0 + this.size, windowHeight);
            this.x = points[points.length-1].x;
            this.y = points[points.length-1].y;
        }
        display() {
            push();
            fill(255);
            textSize(this.size);
            textFont(this.font);
            text(this.word, this.x, this.y);
            pop();
        }

}


/*

// WASTE BIN // WASTE BIN //


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