

var p5Div = document.getElementById("mandelCanvas");
var res   = document.getElementById("res");
var from  = document.getElementById("from");
var to    = document.getElementById("to");
var iter  = document.getElementById("iter");
  
var global_Data = null;
var change = false;
var h;
var ratio;

var c_from = null;
var c_to = null

var pg;

function setup() {
    let canvas = createCanvas(800, 800,P2D);
    canvas.parent(p5Div);
    

}

function draw() {
    
    background(42);

    if(change){
        
        pg.noStroke();
        pg.background(42);
        if(global_Data){
            for(let i = 0; i < global_Data.length;i++){
                for(let j = 0;j < global_Data[i].length;j++){
                    pg.fill(global_Data[i][j]*255)
                    pg.rect(i*h,j*(h*ratio),h,h*ratio);
                }
            }
        }
        change = false;
    }

    if(pg){
        image(pg,0,0);
    }

    if(c_from){
        xy1 = CtoXY(c_from);

        if(c_to){
            stroke(100,120,52);
            fill(0,0,0,0);
            xy2 = CtoXY(c_to);

            rect(xy1[0],xy1[1],xy2[0]-xy1[0],xy2[1]-xy1[1]);
        }else{
            stroke(0,120,152);
            fill(0,0,0,0);
            rect(xy1[0],xy1[1],mouseX-xy1[0],mouseY-xy1[1]);
        }

    }
    
}

function XYToComplex(x,y){
    let res_v   = res.value; 
    let from_v  = from.value;
    let to_v    = to.value;


    let wi = Utils.elementWidth(p5Div);
    let he = wi*ratio ;


    let r = map(x,0,wi,parseFloat(from_v.split(':')[0]),parseFloat(to_v.split(':')[0]));
    let i = map(y,0,he,parseFloat(from_v.split(':')[1]),parseFloat(to_v.split(':')[1]));

   // r = parseFloat(from_v.split(':')[0]) + ( ((x)/(wi)) * (diff_x));


    return [r,i];
}

function CtoXY(c){  
    let res_v   = res.value; 
    let from_v  = from.value;
    let to_v    = to.value;

    

    let wi = Utils.elementWidth(p5Div);
    let he = wi*ratio ;


    let x = map(c[0],from_v.split(':')[0],to_v.split(':')[0],0,wi);
    let y = map(c[1],from_v.split(':')[1],to_v.split(':')[1],0,he);

    return [x,y];
}

function mouseClicked(){

    if(global_Data){
        let step_v   = res.value;
        let from_v  = from.value;
        let to_v    = to.value;
        let w = Utils.elementWidth(p5Div);
        let diff_x = to_v.split(':')[0] - from_v.split(':')[0];

        if((mouseX < 0)||(mouseX > w)){
            return
        }

        if((mouseY < 0)||(mouseY > h * global_Data[0].length))  {
            return
        }  

        let c = XYToComplex(mouseX,mouseY);

        let has_set = true;

        if(c_from == null){
            c_from = c;
            has_set = false;
            //from.value = c_from[0]+":"+c_from[1];
        }

        if((c_to == null)&&(has_set)){
            c_to = c;
            //to.value = c_to[0]+":"+c_to[1];
            from.value = c_from[0]+":"+c_from[1];
            to.value = c_to[0]+":"+c_to[1];
            btnClick();
        }

        if((c_from != null)&&(c_to!=null)){
            
        }

    }
}

function btnClick(){

    var opts = {
        headers: {
          'mode':'same-origin',
          'Access-Control-Allow-Origin':'*'
        }
      }

    let step_v   = res.value;
    let from_v  = from.value;
    let to_v    = to.value;
    let iter_v  = iter.value;

    fetch('https://localhost:7138/Mandelbrot?from='+from_v+'&to='+to_v+'&step='+step_v+'&iter='+iter_v,opts)
        .then((response) => response.json())
        .then((data) => {

            global_Data = data.points;

            let w = Utils.elementWidth(p5Div);

            let diff_x = to_v.split(':')[0] - from_v.split(':')[0];
            let diff_y = to_v.split(':')[1] - from_v.split(':')[1];
            
            ratio = diff_y/diff_x;
            h =  (w/step_v) ;
            
            resizeCanvas(w, w * ratio);
            pg = createGraphics(w, w * ratio);
            change = true;

            c_from = null;
            c_to = null;

        });
}