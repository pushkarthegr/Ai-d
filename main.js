sound = "";
check = 0;
rightX = 0;
rightY = 0;
leftX = 0;
leftY = 0;
leftConfidence = 0;
rightConfidence = 0;
function preload(){
    sound = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(600,500);
    video.hide();

    posenet = ml5.poseNet(video,loaded);
    posenet.on('pose',getValue);
}
function getValue(result){
    if(result.length>0){
        //console.log(result);
        rightX = result[0].pose.rightWrist.x;
        rightY = result[0].pose.rightWrist.y;
        leftX = result[0].pose.leftWrist.x;
        leftY = result[0].pose.leftWrist.y;

        leftConfidence = result[0].pose.leftWrist.confidence;
        rightConfidence = result[0].pose.rightWrist.confidence;
        console.log(leftY);
        console.log("The confidence is - "+leftConfidence);
    }
}
function loaded(){
    console.log("model has successfully been loaded");
}
function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("black");

    if(leftConfidence>0.2){
        circle(leftX,leftY,20);

        getY = Number(leftY);
        round = Math.round(getY);
        volume = round/500;

        document.getElementById("volume_h3").innerHTML = "Volume = "+volume;
        sound.setVolume(volume);
    }
    if(rightConfidence>0.2){
        y = rightY;
        circle(rightX,rightY,20);
        if(y > 0 && y<=100){
            sound.rate(0.5);
            document.getElementById("speed_h3").innerHTML = "Speed = 0.5x";
        }else if(y > 100 && y<=200){
            sound.rate(1);
            document.getElementById("speed_h3").innerHTML = "Speed = 1x";
        }else if(y > 200 && y<=300){
            sound.rate(1.5);
            document.getElementById("speed_h3").innerHTML = "Speed = 1.5x";
        }else if(y > 300 && y<=400){
            sound.rate(2);
            document.getElementById("speed_h3").innerHTML = "Speed = 2x";
        }else if(y > 400 && y<=500){
            sound.rate(2.5);
            document.getElementById("speed_h3").innerHTML = "Speed = 2.5x";
        }
    }
}
function play(){
    if(check == 0){
        sound.play();
        check = check+1;
    }
    sound.setVolume(1);
    sound.rate(1);
}