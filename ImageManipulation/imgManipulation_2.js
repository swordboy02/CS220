//imageMap(img:Image,func:(p:Pixel) => Pixel):Image
function imageMap(img,func){
  let result = img.copy();
  for(let i=0; i<result.width; ++i){
    for(let j=0; j<result.height; ++j){
      result.setPixel(i,j,func(img.getPixel(i,j)))
    }
  }
  return result;
}

//imageMapXY(img: Image, func: (img: Image, x: number, y: number) => Pixel):Image
function imageMapXY(img,func){
  let result = img.copy();
  for(let i=0; i<result.width; ++i){
    for(let j=0; j<result.height; ++j){
      result.setPixel(i,j,func(result,i,j));
    }
  }
  return result;
}

//imageMapCond(img: Image, cond: (img: Image, x: number, y: number) => boolean,func: (p: Pixel) => Pixel): Image
function imageMapCond(img,cond,func){
  return imageMapXY(img, function(img,x,y) {
    if(cond(img,x,y)){
      return func(img.getPixel(x,y));
    } else {
      return img.getPixel(x,y);
    }
  });
}

//imageMapCond(img: Image, cond: (img: Image, x: number, y: number) => boolean,func: (p: Pixel) => Pixel): Image
function imageMapCondFunc(img,cond,func){
  return imageMapXY(img, function(img,x,y) {
    if(cond(img,x,y)){
      return func(img,x,y);
    } else {
      return img.getPixel(x,y);
    }
  });
}

//blurPixel(img: Image, x: number, y: number): Pixel
function blurPixel(img,x,y){
  let result;
  let pixel = [];
  let red = 0;
  let green = 0;
  let blue = 0;
  let cnt=0;
  for(let i=(x-1<0?x:x-1);i<(x+1>img.width?x:x+1);++i){
    for(let j=(y-1<0?y:y-1);j<(y+1>img.height?y:y+1);++j){
      red += (img.getPixel(i,j))[0];
      blue += (img.getPixel(i,j))[1];
      green += (img.getPixel(i,j))[2];
      ++cnt;
    }
  }
  pixel = [red/cnt,blue/cnt,green/cnt];
  return pixel;
}

// blurHalfImage(img: Image, left: boolean): Image
function blurHalfImage(img, left) {
  let l= (img,x,y) => (x<img.width/2);
  let r= (img,x,y) => (x>=img.width/2);
  let imc= (side) => imageMapCondFunc(img,side,blurPixel);

  return left?imc(l):imc(r);
}

//isGrayish(p: Pixel): boolean
function isGrayish(p){
  let max = Math.max(p[0],p[1],p[2]);
  let min = Math.min(p[0],p[1],p[2]);
  const third = (1/3);
  let diff = max-min;
  if(diff <= third){
    return true;
  }else{
    return false;
  }
}

//makeGrayish(img: Image): Image
function makeGrayish(img){
  return imageMapCond(img,function(img, x, y){
    return !isGrayish(img.getPixel(x,y));},function(p){
      return [(p[0]+p[1]+p[2])/3,(p[0]+p[1]+p[2])/3,(p[0]+p[1]+p[2])/3];
      });
}

//grayHalfImage(img: Image): Image
function grayHalfImage(img){
  return imageMapXY(img,function(img,x,y){
    let p = img.getPixel(x,y);
    if(y<(img.height/2)){
      if(!isGrayish(p)){
        return [(p[0]+p[1]+p[2])/3,(p[0]+p[1]+p[2])/3,(p[0]+p[1]+p[2])/3];
      }else{
        return img.getPixel(x,y);
      }
    }else{
      return img.getPixel(x,y);
    }
  });
}

//saturateHigh(img: Image): Image
function saturateHigh(img){
  return imageMapXY(img,function(img,x,y){
    let pix = img.getPixel(x,y);
    let r = satCheck(pix[0]);
    let g = satCheck(pix[1]);
    let b = satCheck(pix[2]);
    return [r,g,b];
  })
}

//satCheck(x:number):number
function satCheck(x){
  if(x>(2/3)){
    return 1;
  }else{ return x;}
}

//blackenLow(img: Image): Image
function blackenLow(img){
  return imageMapXY(img,function(img,x,y){
    let pix = img.getPixel(x,y);
    let r = blaCheck(pix[0]);
    let g = blaCheck(pix[1]);
    let b = blaCheck(pix[2]);
    return [r,g,b];
  })
}

//blaCheck(x:number):number
function blaCheck(x){
  if(x<(1/3)){
    return 0;
  }else{ return x;}
}

//reduceFunctions(fa:((p:Pixel)=>Pixel)[]):((x:Pixel)=>Pixel)
function reduceFunctions(fa){
  let cb = function(acc,pix){
    return x => pix(acc(x));
  }
  return fa.reduce(cb,fa[0]);
}

//contrastGray(img: Image): Image
function contrastGray(img){
  return img;
}
let robot = lib220.loadImageFromURL('https://people.cs.umass.edu/~joydeepb/robot.jpg');
contrastGray(robot).show();

//self tests

function pixelEq(p1,p2){
  const epsilon = 0.002 ;
  for(let i = 0;i<3;++i){
    let a = Math.abs(p1[i] - p2[i])
    if(a > epsilon) {
      return false ;
    }
  }
  return true ;
};

test('imageMapXY converts an image to green properly',function(){
  const white = lib220.createImage(10,10,[1,1,1]);
  const greenImg = imageMapXY(robot, function(white, x, y) {return [0,1,0];});
  assert(greenImg.getPixel(1, 1)[0]===0);
  assert(greenImg.getPixel(1, 1)[1]===1);
  assert(greenImg.getPixel(1, 1)[2]===0);
});
