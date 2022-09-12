//generateInput(n:Number):Number[][]
function generateInput(n){
  let twod=[];
  for(let i=0; i<n; ++i){
    twod.push([]);
  }
  for(let i=0; i<n; ++i){
    for(let j=0;j<n;++j){
      twod[i].push(j);
    }
  }
  twod = twod.map(row => shuffleArray(row));
  return twod;
}


//shuffleArray(arr:Number[]):Number[]
function shuffleArray(arr){
  let len = arr.length;
  let temp = 0;
  for(let i=0;i<len;++i){
    let rand = randomInt(0,len);
    temp = arr[i];
    arr[i] = arr[rand];
    arr[rand] = temp;
  }
  return arr;
}
//Reference:- https://en.wikipedia.org/wiki/Fisher–Yates_shuffle


//randomInt(min:Number, max:Number):Number
function randomInt(min, max) {
 return Math.floor(Math.random() * (max - min)) + min;
}

//oracle(f: (companies: number[][], candidates: number[][]) => Hire[]): void
function oracle(f) {
 let numTests = 100;
 for (let i = 0; i < numTests; ++i) {
   let n = 10;
   let companies = generateInput(n);
   let candidates = generateInput(n);
   let hires = f(companies, candidates);
   test('Hires length is correct', function() {
     assert(companies.length === hires.length && candidates.length === hires.length);
   });
   test('There are no duplicates in Hires', function(){
     let total = hires.reduce((acc,obj)=>acc+(obj.company+obj.candidate),0);
     let realTotal = 0;
     for(let i = 0; i<n;++i){
       for(let j = 0; j<n;++j){
         realTotal += (companies[i][j]+candidates[i][j]);
        }
      }
      assert(total === (realTotal/n));
   });
   test('Matches are stable', function() {
     assert(hireCheck(companies, candidates, hires) === true);
     });
 }
}

//hireCheck(companies:Number[],candidates:Number[],hires:Object[]):boolean
function hireCheck(companies,candidates,hires){
  for(let i = 0; i < hires.length; ++i) {
    let candidate = hires[i].candidate;
    let company = hires[i].company;
    let cand = companies[company][0];
    let comp = candidates[candidate][0];
    if(cand !== candidate){
      for(let j = 0; j < candidates[cand].length; ++j){
        let compMatch = undefined;
        hires.forEach(function(obj){
          if(obj.candidate === cand){
            compMatch = obj.company;
          }
        }); 
        if(candidates[cand][j] === compMatch){
          break;
          }else if(candidates[cand][j] === company){
          return false;
        }
      }
    }
    if(comp !== company){
      for(let j = 0; j < companies[comp].length; ++j){
        let candMatch = undefined;
        hires.forEach(function(obj){
          if(obj.company === comp){
            candMatch = obj.candidate;
          }
        });
        if(companies[comp][j] === candMatch){
          break;
        } else if(companies[comp][j] === candidate){
          return false;
        }
      }
    }
  }
  return true;
}

// let comp = generateInput(4);
// let cand = generateInput(4);
// let hire1 = wheat1(comp,cand);
// console.log(comp);
// console.log(cand);
// console.log(hire1);
oracle(wheat1);
oracle(chaff1);
