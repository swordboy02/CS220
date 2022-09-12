let robot = lib220.loadImageFromURL('https://people.cs.umass.edu/~joydeepb/robot.jpg');
//removeBlueAndGreen(img:Image):Image
function removeBlueAndGreen(img){
  img = robot.copy();
  for(let i=0; i<img.width; ++i){
    for(let j=0; j<img.height; ++j){
      let redPixel = robot.getPixel(i,j);
      img.setPixel(i,j,[redPixel[0],0,0]);
    }
  }
  return img;
}

//makeGrayscale(img:Image):Image
function makeGrayscale(img){
  img = robot.copy();
  for(let i=0; i<img.width; ++i){
    for(let j=0; j<img.height; ++j){
      let meanArr = robot.getPixel(i,j);
      let mean = (meanArr[0]+meanArr[1]+meanArr[2])/3;
      img.setPixel(i,j,[mean,mean,mean]);
    }
  }
  return img;
}

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

//mapToRed(img:Image):Image
function mapToRed(img){
  let redImg = imageMap(img,getRed);
  return redImg;
}

//mapToGrayscale(img:Image):Image
function mapToGrayscale(img){
  let grayImg = imageMap(img,getGray);
  return grayImg;
}

//getRed(pixel:Pixel):Pixel
function getRed(pixel){
  return [pixel[0],0,0];
}

//getGray(pixel:Pixel):Pixel
function getGray(pixel){
  let mean = (pixel[0]+pixel[1]+pixel[2])/3;
  return [mean,mean,mean];
}

//selfTests
test('no blue and green in mapToRed function',function(){
  const white = lib220.createImage(10,10,[1,1,1]);
  const redOnly = mapToRed(white);
  const pixel = redOnly.getPixel(4,4);
  assert(pixel[0]===1);
  assert(pixel[1]===0);
  assert(pixel[2]===0);
});

test('Image is gray in mapToGrayscale function',function(){
  const white = lib220.createImage(10,10,[1,1,1]);
  const grayImg = mapToGrayscale(white);
  const pixel = grayImg.getPixel(4,4);
  assert(pixel[0]===1);
  assert(pixel[1]===1);
  assert(pixel[2]===1);
});

