let col1
let col2 
let pg

function setup() {
  createCanvas(600, 1000);
  colorMode(HSB)
 
  
  
}

function draw() {
  //background(220);
  pg = drawLines(pg, mouseX * 0.01);
  
  //drawLines(pg)
  for(let i = 0; i<6; i++){
    for(let j = 0; j<10; j++){
      image(pg, i*100, j*100)
    }
  }
  image(pg, 0, 0)
  image(pg, 100, 0)
  
  
}

function drawLines(graphics, translateOffset){
  graphics = createGraphics(100, 100)
  let sat = lerp(30, 41)
  col1 = color(2, 41, 96)
  col2 = color(2, 8, 100)
  graphics.strokeWeight(1)
  for(let i = 0; i< TWO_PI; i += TWO_PI/1200){
    graphics.stroke(lerpColor(col1, col2, sin(i*2)));
    graphics.push()
    graphics.translate(50, 50)
    graphics.rotate(i + translateOffset)
    graphics.line(-100, -100, 100, 100);
    graphics.pop()
  }
  return graphics
}
