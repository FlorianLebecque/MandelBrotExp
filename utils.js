    //https://stackoverflow.com/questions/71034739/how-to-extend-the-canvas-to-the-size-of-the-parent-div-with-p5js  --- fguillen
class Utils {
    // Calculate the Width in pixels of a Dom element
    static elementWidth(element) {
      return (
        element.clientWidth -
        parseFloat(window.getComputedStyle(element, null).getPropertyValue("padding-left")) -
        parseFloat(window.getComputedStyle(element, null).getPropertyValue("padding-right"))
      )
    }
  
    // Calculate the Height in pixels of a Dom element
    static elementHeight(element) {
      return (
        element.clientHeight -
        parseFloat(window.getComputedStyle(element, null).getPropertyValue("padding-top")) -
        parseFloat(window.getComputedStyle(element, null).getPropertyValue("padding-bottom"))
      )
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