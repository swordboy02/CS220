let robot = lib220.loadImageFromURL('https://people.cs.umass.edu/~joydeepb/robot.jpg');

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

//imageMask(img: Image, cond: (img: Image, x: number, y: number) => boolean,maskValue: Pixel): Image
function imageMask(img,cond,maskValue){
  return imageMapXY(img, function(img,x,y) {
    if(cond(img,x,y)){
      return maskValue;
    } else {
      return img.getPixel(x,y);
    }
  });
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

//blurImage(img: Image): Image
function blurImage(img){
  return imageMapXY(img,blurPixel);
}

//Self Tests

test('blurPixel returns a blurred (avg) pixel',function(){
  const white = lib220.createImage(10,10,[1,0,0]);
  const pixel = blurPixel(white,5,5)
  assert(pixel[0]===1);
  assert(pixel[1]===0);
  assert(pixel[2]===0);
});

test('imageMapXY converts an image to green properly',function(){
  const white = lib220.createImage(10,10,[1,1,1]);
  const greenImg = imageMapXY(robot, function(white, x, y) {return [0,1,0];});
  assert(greenImg.getPixel(1, 1)[0]===0);
  assert(greenImg.getPixel(1, 1)[1]===1);
  assert(greenImg.getPixel(1, 1)[2]===0);
});

test('imageMapCond works for Robot', function(){
  let robot = lib220.loadImageFromURL('https://people.cs.umass.edu/~joydeepb/robot.jpg');
  let img = imageMapCond(robot, function(img, x, y){return (x % 5 === 0);}, function(p){return [0, 0, p[2]]})

  const ul = img.getPixel(0,0) 
  const ulPix = robot.getPixel(0,0)
  const ur = img.getPixel(312, 212) 
  const dl = img.getPixel(18, 200)
  const dr = img.getPixel(305, 212)
  const dr1 = robot.getPixel(305, 212)

  assert(pixelEq(ul, [0,0,ulPix[2]]))
  assert(pixelEq(ur, robot.getPixel(312, 212)))
  assert(pixelEq(dl, robot.getPixel(18, 200)))
  assert(pixelEq(dr, [0,0,dr1[2]]))
});

function pixelEq(p1,p2){
  const epsilon = 0.002 ;
  for(let i = 0;i<3;++i){
    let a = Math.abs(p1[i] - p2[i])
    if(a > epsilon) {
      return false ;
    }
  }
  return true ;
};//let img = imageMapCond(robot, function(img, x, y){return (y % 10 === 0);}, function(p){return [0, 0, p[2]]})

console.log(robot.height
)
