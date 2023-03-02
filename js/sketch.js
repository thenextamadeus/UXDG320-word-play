let typefaceArray = ['Fjalla One', 'IBM Plex Mono', 'Inter', 'Open Sans', 'Roboto', 'Ubuntu Mono', 'Uncial Antiqua', 'Satoshi', 'Clash Display', 'Boska', 'Stardom', 'Aktura', 'Melodrama', 'Switzer', 'Gambarino', 'Bebas Neue', 'Epilogue'];

let typeface = [];

let userInput = "Planet Big, Planet Small.";

let words = [];
let wordArray = [];
// Don't be afraid to make some noise, make some friends, and eat some good food. Oh, and learn how to code. It's fun!
let count = 0;

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
    // background(0);
    
    // for (let i = 0; i < wordArray.length; i++) {
    //     wordArray[i].display(i*70);
    //     wordArray[i].gravity();
    // }

    // fill(255);
    // ellipse(20 , 20, 20, 20); 

    // textStyle(BOLD);
    // textFont(typeface[9]);
    // textSize(224);
    // text(userInput, 20, 200);
}

function mouseReleased() {
    fill(0);

    wordArray[count].display();
    count ++;
    if (count > wordArray.length) {
        count = 0;
    }
}

// On Key Pressed, add the key to the userInput string

function keyPressed() {
    if (keyCode === BACKSPACE) {
        userInput = userInput.substring(0, userInput.length - 1);
    } else {
        userInput += key;
    }
}

// create  a class 

class Wordclass {
    constructor(word) {
        this.word = word;
        this.x = random(0, windowWidth);
        this.y = 50;

        /* WORK SPACE WORK SPACE WORK SPACE WORK SPACE WORK SPACE WORK SPACE WORK SPACE WORK SPACE */
        this.font = typefaceArray[15];
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
}

