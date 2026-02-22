function getMessage() {
    const code = document.getElementById("code").value;
    console.log(code);
    return code;
}

function organizeCodeEditor(code){
    orgCode = code.substring(1);
    splitCode = orgCode.split(";");

    const gridwidth = Number(splitCode[1]);
    const gridheight = Number(splitCode[0]);
    const gridpixelSize = Number(splitCode[2]);

    colorCode = [];

    for (let i = 3; i <splitCode.length; i++){
        colorCode2 = splitCode[i].split(",");
        colorCode.push(colorCode2);
    }
   
    console.log(gridwidth);
    console.log(gridheight);
    console.log(gridpixelSize);
    console.log(colorCode);
    return [gridwidth, gridheight, gridpixelSize, colorCode];

}

function makeCanvasEditor(code, gridwidth, gridheight, gridpixelSize, colorCode){
    /* creates canvas* and drawing methods */
    var canvas = document.createElement("canvas");
    canvas.id = "myCanvas";
    canvas.width = gridwidth;
    canvas.height = gridheight;
    var ctx = canvas.getContext("2d");
    const imageData = ctx.createImageData(canvas.width, canvas.height);

    let i = 0;
    let j = 0;
    while (i < colorCode.length){
       let r = colorCode[i][0];
       let g = colorCode[i][1];
       let b = colorCode[i][2];
       let a = 255;
       for (let j = 3; j < colorCode[i].length; j++){
            let gridId = colorCode[i][j];
            let gridSizeX = gridwidth/gridpixelSize;
            let gridSizeY = gridheight/gridpixelSize;
            let gridX = gridId % gridSizeX;
            let gridY = Math.floor(gridId / gridSizeX);
            let startY = gridY * gridpixelSize;
            let startX = gridX * gridpixelSize;

            for (let y = 0; y < gridpixelSize; y++){
                for(let x = 0; x < gridpixelSize; x++){

                    let canvasx = startX + x;
                    let canvasy = startY + y;
                    let index = (canvasy * canvas.width + canvasx) * 4;
                    imageData.data[index] = r;
                    imageData.data[index + 1] = g;
                    imageData.data[index + 2] = b;
                    imageData.data[index + 3] = a;
                }
            }
       }
        i++;
    }
    ctx.putImageData(imageData, 0, 0);
    document.body.appendChild(canvas);
    console.log("Drawing now");
}

const input = document.getElementById("code");

input.addEventListener("keypress", function(event){

    if (event.key === 'Enter') {
        event.preventDefault();
        const code = getMessage();
        if (code[0] === "e"){
                const [gridwidth, gridheight, gridpixelSize, colorCode] = organizeCodeEditor(code);
                makeCanvasEditor(code, gridwidth, gridheight, gridpixelSize, colorCode);
        } else if(code[0] === "s"){
                //makeCanvasScanner();
        }
    }
});

const exportButton = document.querySelector(".exportButton");
exportButton.addEventListener("click", function(event){
    const canvas = document.querySelector("#myCanvas");

    if(!canvas){
        return alert("There is no canvas to export! Please enter your code!");
    }

    const imageUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "scratch.png";
    link.click();
});
