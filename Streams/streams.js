function node(data, next) {
  return { head: () => data, tail: () => next, isEmpty: () => false };
}
function empty() { return { isEmpty: () => true }; }
// memo0<T>(f: () => T): Memo<T>
function memo0(f) {
  let r = { evaluated: false };
  return {
    get() {
      if (! r.evaluated) { r = { evaluated: true, v: f() } }
      return r.v;
    }
  };
}

// sempty: Stream<T>
const sempty = {
  isEmpty: () => true,
  toString:()=> 'sempty'};

// snode<T>(head: T, tail: Memo<Stream<T>>): Stream<T>
function snode(head, tail) {
  return {
    isEmpty: () => false,
    head: () => head,
    tail: tail.get,
    toString:() => 'snode('+head.toString()+','+tail.toString()+')'};
}

function smap(stream, f){
  if (stream.isEmpty()) { return sempty; }
  return snode(f(stream.head()) , memo0(() => smap(stream.tail(), f)));
}

function addSeries(s,t){
  if(s.isEmpty()){
    return t;
  }else if(t.isEmpty()){
    return s;
  }
  return snode(s.head()+t.head(),memo0(()=>addSeries(s.tail(),t.tail())));
}

function prodSeries(s,t){
  if(s.isEmpty()){
    return t;
  }else if(t.isEmpty()){
    return s;
  }
  let map = smap(t,str=>str*s.head());
  let res = (s.tail().isEmpty())? snode(0,memo0(()=>sempty)) : snode(0,memo0(()=>prodSeries(s.tail(),t)));
  return addSeries(map,res);
}

function derivSeries(s){
  if(s.isEmpty()){
    return undefined;
  }
  function deriv(i,s){
    return snode(i*s.head(),memo0(()=>deriv(i+1,s.tail())));
  }
  return deriv(0,s);
}

function coeff(s,n){
  let sTemp = s;
  let coeffs = [];
  for(let i=0;i<=n;++i){
    coeffs.push(sTemp.head());
    sTemp = sTemp.tail();
    if(sTemp.isEmpty()){
      break;
    }
  }
  return coeffs;
}

function evalSeries(s,n){
  let lim = coeff(s,n);
  return function(x){
    let res = 0;
    for(let i=0;i<lim.length;++i){
      res = res+(lim[i]*Math.pow(x,i));
    }
    return res;
  }
}

function rec1Series(f,v){
  let coef1 = c => snode(c,memo0(()=>coef1(f(c))));
  return coef1(v);
}

function expSeries(){
  let taylorS = function(n){
    let value = 0;
    if(n<=1){
      value = 1;
    }else{
      value = n*taylorS(n-1);
    }
    return (1/value);
  }
  return rec1Series(taylorS,0);
}

function recurSeries(coef,init){
  let infi = function(){
    let x = init;
    return snode(x,memo0(()=>sempty));
  }
  return rec1Series(coef,infi);
}
