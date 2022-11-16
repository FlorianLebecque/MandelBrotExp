

var p5Div = document.getElementById("mandelCanvas");
var res   = document.getElementById("res");
var from  = document.getElementById("from");
var to    = document.getElementById("to");
var iter  = document.getElementById("iter");
var split_e  = document.getElementById("split");
  
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
        
        
    }

    if((pg)&&(!change)){
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


    document.getElementById("mandelCanvas").hidden = true;
    document.getElementById("wait").hidden = false;

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
    let split_v = split_e.value;

    fetch('https://localhost:7138/Mandelbrot?from='+from_v+'&to='+to_v+'&step='+step_v+'&iter='+iter_v + '&split='+split_v,opts)
        .then((response) => response.json())
        .then((data) => {

            document.getElementById("mandelCanvas").hidden = false;
            document.getElementById("wait").hidden = true;

            global_Data = data.points;

            let w = Utils.elementWidth(p5Div);

            let diff_x = to_v.split(':')[0] - from_v.split(':')[0];
            let diff_y = to_v.split(':')[1] - from_v.split(':')[1];
            
            ratio = diff_y/diff_x;
            h =  (w/step_v);
            
            resizeCanvas(w, w * ratio);
            pg = createGraphics(w, w * ratio);
            change = true;

            c_from = null;
            c_to = null;

            pg.noStroke();
            pg.background(42);
            if(global_Data){
                for(let i = 0; i < global_Data.length;i++){
                    for(let j = 0;j < global_Data[i].length;j++){

                        var bright = map(global_Data[i][j], 0, parseInt(iter.value), 0, 1);
                        var angle = map(bright,0,1,0,TWO_PI);

                        bright = map((bright)**2, 0, 1, 0, 100);
                        hue    = map(sin(angle), 0, 1, 0,360 );

                        if (global_Data[i][j] == parseInt(iter.value)) {
                            bright = 0;
                            hue = 0;
                        }

                        pg.colorMode(HSB, 360,100,100);
                        pg.fill(hue,100,bright);
                        pg.rect(i*h,j*(h),h,h);
                    }
                }
            }
            change = false;

        });
}


function GetyImg(){
    const imageUrl = 'https://localhost:7138/Mandelbrot?from='+from_v+'&to='+to_v+'&step='+step_v+'&iter='+iter_v;

    (async () => {
      const response = await fetch(imageUrl)
      const imageBlob = await response.blob()
      const reader = new FileReader();
      reader.readAsDataURL(imageBlob);
      reader.onloadend = () => {
        const base64data = reader.result;
        pg = loadImage(base64data);
      }

        let w = Utils.elementWidth(p5Div);

        let diff_x = to_v.split(':')[0] - from_v.split(':')[0];
        let diff_y = to_v.split(':')[1] - from_v.split(':')[1];
        
        ratio = diff_y/diff_x;
        h =  (w/step_v) ;
        
        resizeCanvas(w, w * ratio);
        c_from = null;

    })()
}