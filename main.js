const express = require('express');
const readline = require("readline");
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const app = express();
var PORT = 5002;
var visitnum = 0;

question()
function question(){
    rl.question("Enter a PORT number for the site to be hosted on! ", function(port){
        if(port != "" && port < 10000){
            try{
                PORT = parseInt(port);
                console.log(`PORT set to ${PORT}`);
                app.listen(PORT, () => {
                    console.log("Server started on " + PORT.toString());
                })
            } catch(e){
                console.log("Please enter a valid PORT number!");
                question()
            }
        } else {
            console.log("Please enter a valid PORT number!");
            question()
        }
    })
}


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
    visitnum += 1;
})

app.get('/vct', (req, res) => {
    res.json({visits : visitnum});
})