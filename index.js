
var cors = require('cors');
var express = require('express');
const app = express()
app.use(cors());
app.listen(3000, () => 
    console.log('app listening on port 3000')
);
var https = require('https')

const fs = require('fs');
const sdk = require("microsoft-cognitiveservices-speech-sdk");
const speechConfig = sdk.SpeechConfig.fromSubscription("6f04f45f094c4662a4aa86b3a305177a", "uaenorth");
speechConfig.speechRecognitionLanguage = 'he-IL';

app.get('/speechModel/', (req, res) => {

    var dest = 'apple.wav'

    let audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync(dest));
            let recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
            recognizer.recognizeOnceAsync(result => {
                console.log(`RECOGNIZED: Text=${result.text}`);
                trans = (result.text).toString()
                trans = trans.slice(0,-1)
                res.send(trans)
                recognizer.close();
    }); 

    /*
    var dest = 'record.wav'
    var url = req.query.recordUrl
    const file = fs.createWriteStream(dest);
    https.get(url, function(response) {
        response.pipe(file);
        file.once('finish', function () {            
            let audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync(dest));
            let recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
            recognizer.recognizeOnceAsync(result => {
                console.log(`RECOGNIZED: Text=${result.text}`);
                res.send(result.text)
                recognizer.close();
            });  
        });
    });

    */

})
