function setup() {
    let canvas = createCanvas(800, 800);
    canvas.parent("mandelCanvas");
}
  
var global_Data = null;
var change = false;
function draw() {

    if(change){

    

        let res = document.getElementById("res").value;
        let from = document.getElementById("from").value;
        let to = document.getElementById("to").value;

        let diff_x = to.split(':')[0] - from.split(':')[0];

        let h = 800 / (diff_x/res) ;
        if(global_Data){
            for(let i = 0; i < global_Data.length;i++){
                for(let j = 0;j < global_Data[i].length;j++){
                    fill(global_Data[i][j]*255)
                    rect(i*h,j*h,h,h);
                }
            }
        }

        change = false;
    }
    
}

function btnClick(){

    var opts = {
        headers: {
          'mode':'same-origin',
          'Access-Control-Allow-Origin':'*'
        }
      }

    let res = document.getElementById("res").value;
    let from = document.getElementById("from").value;
    let to = document.getElementById("to").value;
    let iter = document.getElementById("iter").value;

    let restult = fetch('https://localhost:7138/Mandelbrot?from='+from+'&to='+to+'&res='+res+'&iter='+iter,opts)
        .then((response) => response.json())
        .then((data) => {
            global_Data = data.points;
            change = true;
        });

}

function DisplayPoints(data){

    

    console.log("hemmp");

    


}