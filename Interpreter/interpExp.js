function interpExpression(state,e){
  switch(e.kind){
    case "number":{ return e.value; }
    case "boolean":{ return e.value; }
    case "variable":{ return lib220.getProperty(state,e.name).value; }
    case "operator":{
      let e1=interpExpression(state,e.e1);
      let e2=interpExpression(state,e.e2);
      switch(e.op){
        case "+":{ return e1+e2; }
        case "-":{ return e1-e2; }
        case "*":{ return e1*e2; }
        case "/":{ return e1/e2; }
        case "||":{ return e1 || e2; }
        case "&&":{ return e1 && e2; }
        case "<":{ return e1 < e2; }
        case ">":{ return e1 > e2; }
        case "===":{ return e1 === e2; }
        default:{ 
          console.log("Error : Not a recognised operator");
          assert(false);
         }
      }
    }
    default:{
      console.log("Error : Not a recognised type");
      assert(false);
    }
  }
}
function interpStatement(state,p){
  switch(p.kind){
    case "let":{
      let val = interpExpression(state,p.expression);
      lib220.setProperty(state,p.name,val);
      break;
    }
    case "assignment":{
      let val = interpExpression(state,p.expression);
      if(lib220.getProperty(state, p.name).found){
        lib220.setProperty(state,p.name,val);
      }else{
        assert(false);
      }
      break;
    }
    case "if":{
      if(interpExpression(state,p.test)){
        return blockHelper(state,p.truePart);
      }else{
        return blockHelper(state,p.falsePart);
      }
    }
    case "while":{
      let newObj = {
        kind:"if",
        test:p.test,
        truePart:p.body.concat(p),
        falsePart:[]
      };
      interpStatement(state,newObj);
      break;
    }
    case "print":{
      console.log(interpExpression(state,p.expression));
      break;
    }
  }
}
function interpProgram(prog) {
  let init = {};
  blockHelper(init, prog);
  return init;
}

function blockHelper(state, b){
  for(let i = 0; i < b.length; ++i){
    interpStatement(state, b[i]);
  }
}

test("multiplication with a variable",function() {
  let mul = interpExpression({x:10}, parser.parseExpression("x*2").value);
  assert(mul===20);
});
test("assignment",function(){
  let as = interpProgram(parser.parseProgram("let x=10;x=20;").value);
  assert(as.x===20);
});
test("if statement",function(){
  let check = interpProgram(parser.parseProgram("let x=1;if(x===2){x=10;}else{x=5;}").value);
  assert(check.x===5);
});
test("while loop check",function(){
  let check = interpProgram(parser.parseProgram("let x=2;let y=0;while(x>0){y=y+1;x=x-1;}").value);
  assert(check.x===0);
  assert(check.y===2);
});
test("error check",function() {
  let err = parser.parseProgram("let errCheck = error");
  assert(err.kind==="error");
});
