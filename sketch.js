let canvas;
let generateButton;
const nOfControlPoints = 8;

function setup() {
    canvas = createCanvas(1500, 600);
    canvas.parent('generateButton');
    background(220);
    generateButton = select('#generateButton');
    generateButton.mousePressed(generateRacetrack);
}

function draw(){}

function generateRacetrack(){
    background(220);

    stroke(0);
    strokeWeight(0);
    line(50, height/2, 100, height/2);


    // Number of points along the circle
    const numPoints = 10;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.25;
    const angleStep = TWO_PI / numPoints;

    let points = [];

    // Generate points along a circle and perturb them slightly
    for (let i = 0; i < numPoints; i++) {
        let angle = angleStep * i;
        let perturbation = random(-25, 150);
        let x = centerX + (radius + perturbation) * cos(angle);
        let y = centerY + (radius + perturbation) * sin(angle);
        points.push(createVector(x, y));
    }

    // Draw the racetrack using the generated points
    strokeWeight(20);
    noFill();
    beginShape();
    
    curveVertex(points[points.length - 1].x, points[points.length -1].y);

    for (let i = 0; i < points.length; i++) {
        curveVertex(points[i].x, points[i].y);
    }

    // Close the shape by adding the first two points again
    curveVertex(points[0].x, points[0].y);
    curveVertex(points[1].x, points[1].y);
    endShape();

    //DRS Zones
    const angleThreshold = 30;
    stroke(0,0,255);

    let straightSections = [];

    for(let i=0; i<points.length -1; i++){
        let p1 = points[i];
        let p2 = points[i + 1];
        let p0 = points[i === 0 ? points.length - 1 : i - 1];
        let v1 = p5.Vector.sub(p1, p0);
        let v2 = p5.Vector.sub(p2, p1);
        let angle = degrees(v1.angleBetween(v2));

        if(angle < angleThreshold){
            straightSections.push([p1,p2]);
        }
    }

    if(straightSections.length > 2){
        let selectedIndices = [];
        while(selectedIndices.length < 2){
            let index = floor(random(straightSections.length));
            if(!selectedIndices.includes(index)){
                selectedIndices.push(index);
            }
        }

        for(let index of selectedIndices){
            let [p1, p2] = straightSections[index];
            line(p1.x, p1.y, p2.x, p2.y);
        }
    }
    else{
        for(let[p1,p2] of straightSections){
            line(p1.x, p1.y, p2.x, p2.y);
        }
    }
}
