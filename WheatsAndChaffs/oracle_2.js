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

//runOracle(f: (companies: number[][], candidates: number[][]) => Run): void
function runOracle(f){
  let numTests = 10;
  for (let i = 0; i < numTests; ++i) {
   let n = 10;
   let companies = generateInput(n);
   let candidates = generateInput(n);
   let run = f(companies, candidates);
   let offerArr = run.trace;
   let hireArr = run.out;
   test('hireArr length is correct', function() {
     assert(companies.length === hireArr.length && candidates.length === hireArr.length);
   });
   test('There are no duplicates in hireArr', function(){
     let total = hireArr.reduce((acc,obj)=>acc+(obj.company+obj.candidate),0);
     let realTotal = 0;
     for(let i = 0; i<n;++i){
       for(let j = 0; j<n;++j){
         realTotal += (companies[i][j]+candidates[i][j]);
        }
      }
      assert(total === (realTotal/n));
   });

   test('Tracing is correct',function(){
     let unmatchedCand = [];
     let unmatchedComp = [];
     let from = offerArr[i].from;
     let offto = offerArr[i].to;
     let comp = offerArr[i].fromCo;
     let numSeen=[];
     for(let j=0;j<n;++j){
       unmatchedCand.push(-1);
       unmatchedComp.push(-1);
     }
     let numCand= [];
     let numComp= [];
     for(let j=0;j<n;++j){
       numCand.push(0);
       numComp.push(0);
     }
     for(let j=0; j<offerArr.length; ++j){
       for(let k=0; k<offerArr.length; ++k){
         if(j !== k){
           assert(!((offerArr[j].from === offerArr[k].from)&&(offerArr[j].to === offerArr[k].to)&&(offerArr[j].fromCo===offerArr[k].fromCo)));
          }
        }
       }
     });
  }
}

const oracleLib = require('oracle');
runOracle(oracleLib.traceWheat1);
