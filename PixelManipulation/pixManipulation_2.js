//highlightEdges(img:Image):Image
function highlightEdges(img){
  let result = img.copy();
  for(let i=0; i<result.width; ++i){
    for(let j=0; j<result.height-1; ++j){
      let meanArr = result.getPixel(i,j);
      let m1 = (meanArr[0]+meanArr[1]+meanArr[2])/3;
      let lowerMean = result.getPixel(i,j+1);
      let m2 = (lowerMean[0]+lowerMean[1]+lowerMean[2])/3;
      result.setPixel(i,j,[Math.abs(m1-m2),Math.abs(m1-m2),Math.abs(m1-m2)]);
    }
  for(let i=0; i<result.width; ++i){
      result.setPixel(i,result.height-1,[0,0,0]);
    }
  }
  return result;
}

//blur(img:Image):Image
function blur(img){
  let result = img.copy();
  let imgRes = img.copy();
  for(let i=0; i<result.width-1; ++i){
    for(let j=0; j<result.height-1; ++j){
      let og = [];
      let rgt = [];
      let lft= [];
      let u = [];
      let ur = [];
      let ul = [];
      let dr = [];
      let dl = [];
      let d = [];
      let r=0;
      let g=0;
      let b=0;
      if(i===0 && j ===0){
          og = result.getPixel(i,j);
          rgt = result.getPixel(i+1,j);
          d = result.getPixel(i,j+1);
          dr = result.getPixel(i+1,j+1);
          r = (og[0]+rgt[0]+d[0]+dr[0])/4;
          g = (og[1]+rgt[1]+d[1]+dr[1])/4;
          b = (og[2]+rgt[2]+d[2]+dr[2])/4;
          imgRes.setPixel(i,j,[r,g,b]);
          continue;
        }else if(i === 0 && j===result.height-1){
          og = result.getPixel(i,j);
          rgt = result.getPixel(i+1,j);
          u = result.getPixel(i,j-1);
          ur = result.getPixel(i+1,j-1);
          r = (og[0]+rgt[0]+u[0]+ur[0])/4;
          g = (og[1]+rgt[1]+u[1]+ur[1])/4;
          b = (og[2]+rgt[2]+u[2]+ur[2])/4;
          imgRes.setPixel(i,j,[r,g,b]);
          continue;
        }else if(i===result.height-1 && j === 0){
          og = result.getPixel(i,j);
          lft = result.getPixel(i-1,j);
          d = result.getPixel(i,j+1);
          dl = result.getPixel(i-1,j+1);
          r = (og[0]+lft[0]+d[0]+dl[0])/4;
          g = (og[1]+lft[1]+d[1]+dl[1])/4;
          b = (og[2]+lft[2]+d[2]+dl[2])/4;
          imgRes.setPixel(i,j,[r,g,b]);
          continue;
      }else if(i===result.height-1 && j===result.height-1){
        og = result.getPixel(i,j);
        lft = result.getPixel(i-1,j);
        u = result.getPixel(i,j-1);
        ul = result.getPixel(i-1,j-1);
        r = (og[0]+lft[0]+u[0]+ul[0])/4;
        g = (og[1]+lft[1]+u[1]+ul[1])/4;
        b = (og[2]+lft[2]+u[2]+ul[2])/4;
        imgRes.setPixel(i,j,[r,g,b]);
        continue;
      }else if(i === 0 && (j !==result.height-1 || j !== 0)){
          og = result.getPixel(i,j);
          rgt = result.getPixel(i+1,j);
          d = result.getPixel(i,j+1);
          u = result.getPixel(i,j-1);
          dr = result.getPixel(i+1,j+1);
          ur = result.getPixel(i+1,j-1);
          r = (og[0]+rgt[0]+d[0]+u[0]+dr[0]+ur[0])/6;
          g = (og[1]+rgt[1]+d[1]+u[1]+dr[1]+ur[1])/6;
          b = (og[2]+rgt[2]+d[2]+u[2]+dr[2]+ur[2])/6;
          imgRes.setPixel(i,j,[r,g,b]);
          continue;
        }else if(i === result.height-1 && (j !==result.height-1 || j !== 0)){
          og = result.getPixel(i,j);
          lft = result.getPixel(i-1,j);
          d = result.getPixel(i,j+1);
          u = result.getPixel(i,j-1);
          dl = result.getPixel(i-1,j+1);
          ul = result.getPixel(i-1,j-1);
          r = (og[0]+lft[0]+d[0]+u[0]+dl[0]+ul[0])/6;
          g = (og[1]+lft[1]+d[1]+u[1]+dl[0]+ul[1])/6;
          b = (og[2]+lft[2]+d[2]+u[2]+dl[0]+ul[2])/6;
          imgRes.setPixel(i,j,[r,g,b]);
          continue;
        }else if((i!==result.height-1 || i !== 0) && j === result.height-1){
        og = result.getPixel(i,j);
        rgt = result.getPixel(i+1,j);
        u = result.getPixel(i,j-1);
        lft = result.getPixel(i-1,j);
        ur = result.getPixel(i+1,j-1);
        ul = result.getPixel(i-1,j-1);
        r = (og[0]+rgt[0]+u[0]+lft[0]+ur[0]+ul[0])/6;
        g = (og[1]+rgt[1]+u[1]+lft[1]+ur[1]+ul[1])/6;
        b = (og[2]+rgt[2]+u[2]+lft[2]+ur[2]+ul[2])/6;
        imgRes.setPixel(i,j,[r,g,b]);
        continue;
      }else if((i!==result.height-1 || i !== 0) && j === 0){
        og = result.getPixel(i,j);
        rgt = result.getPixel(i+1,j);
        d = result.getPixel(i,j+1);
        lft = result.getPixel(i-1,j);
        dr = result.getPixel(i+1,j+1);
        dl = result.getPixel(i-1,j+1);
        r = (og[0]+rgt[0]+d[0]+lft[0]+dr[0]+dl[0])/6;
        g = (og[1]+rgt[1]+d[1]+lft[1]+dr[1]+dl[1])/6;
        b = (og[2]+rgt[2]+d[2]+lft[2]+dr[2]+dl[2])/6;
        imgRes.setPixel(i,j,[r,g,b]);
        continue;
      }else{
      og = result.getPixel(i,j);
      rgt = result.getPixel(i+1,j);
      lft = result.getPixel(i-1,j);
      u = result.getPixel(i,j-1);
      d = result.getPixel(i,j+1);
      dr = result.getPixel(i+1,j+1);
      dl = result.getPixel(i-1,j-1);
      ur = result.getPixel(i+1,j-1);
      ul = result.getPixel(i-1,j-1);
      r = (og[0]+rgt[0]+u[0]+d[0]+lft[0]+ur[0]+ul[0]+dr[0]+dl[0])/9;
      g = (og[1]+rgt[1]+u[1]+d[1]+lft[1]+ur[1]+ul[1]+dr[1]+dl[1])/9;
      b = (og[2]+rgt[2]+u[2]+d[2]+lft[2]+ur[2]+ul[2]+dr[2]+dl[2])/9;
      imgRes.setPixel(i,j,[r,g,b]);
      continue;
    }
  }
}
  return imgRes; 
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

//swapGB(img:Image):Image
function swapGB(img){
  let result = img.copy();
  return imageMap(result,helperSwap)
}

//helperSwap(p:Pixel):Pixel
function helperSwap(p){
  return [p[0],p[2],p[1]];
}

//shiftRGB(img:Image):Image
function shiftRGB(img){
  let result = img.copy();
  return imageMap(result,helperShift);
}

//helperShift(p:Pixel):Pixel
function helperShift(p){
  return [p[2],p[0],p[1]];
}

//self tests

test('green and blue is swapped using swapGB',function(){
  const green = lib220.createImage(10,10,[0,1,0]);
  const blue = swapGB(green);
  const pixel = blue.getPixel(4,4);
  assert(pixel[1]===0);
  assert(pixel[2]===1);
});

test("swapGB does not change red pixels' value",function(){
  const random = lib220.createImage(10,10,[1,1,0]);
  const testRand = swapGB(random);
  const pixel = testRand.getPixel(4,4);
  assert(pixel[0]===1);
});

test('RGB values shift after using shiftRGB',function(){
  const random = lib220.createImage(10,10,[0,1,1]);
  const testRand = shiftRGB(random);
  const pixel = testRand.getPixel(4,4);
  assert(pixel[0]===1);
  assert(pixel[1]===0);
  assert(pixel[2]===1);
});
