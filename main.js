sound = "";
check = 0;
rightX = 0;
rightY = 0;
leftX = 0;
leftY = 0;
function preload(){
    sound = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(350,350);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(350,350);
    video.hide();

    posenet = ml5.poseNet(video,loaded);
    posenet.on('pose',getValue);
}
function getValue(result){
    if(result.length>0){
        console.log(result);
        rightX = result[0].pose.rightWrist.x;
        rightY = result[0].pose.rightWrist.y;
        leftX = result[0].pose.leftWrist.x;
        leftY = result[0].pose.leftWrist.y;
    }
}
function loaded(){
    console.log("model has successfully been loaded");
}
function draw(){
    image(video,0,0,350,350);
    fill("red");
    stroke("black");
    circle(rightX,rightY,20);
    circle(leftX,leftY,20);
}
function play(){
    if(check == 0){
        sound.play();
        check = check+1;
    }
    sound.setVolume(1);
    sound.rate(1);
}