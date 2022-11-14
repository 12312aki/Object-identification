Status = "";
object = [];
function setup()
{
    canvas = createCanvas(380, 350);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,350);
    video.hide();
}
function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input_text = document.getElementById("input_thingy").value;
}

function modelLoaded()
{
    console.log("model loaded");
    Status = true;
}

function draw()
{
    image(video, 0, 0, 380, 350);

    if (Status != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i<object.length; i++)
        {
            percent = floor(object[i].confidence*100);
            fill("#7433hf") 
            text(object[i].label + percent + "%", object[i].x, object[i].y);
            noFill();
            stroke("#8744uh");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);

            if(objects[i].label == input_text)
            {
              video.stop();
              objectDetector.detect(gotResult);
              document.getElementById("status").innerHTML = input_text + " Found";
              synth = window.speechSynthesis;
              utterThis = new SpeechSynthesisUtterance(input_text + "Found");
              synth.speak(utterThis);
            }
            else
            {
              document.getElementById("status").innerHTML = input_text + "notadfldf;adjfdkljfladkjfkla";
            }   
        }
    }
}

function gotResult(error, results)
{
if (error)
{
console.log(error);
}
console.log(results);
object = results;

}