class FSA{
  constructor(){
    let states = [];
    let curSt = undefined;
    class State{
      constructor(name){
        this.name = name;
        this.transition = [];
      }
        getName(){
          return this.name;
        }
        setName(s){
          this.name = s;
          return this;
        }
        addTransition(e,s){
          let tranState = lib220.getProperty(this.transition,e);
          tranState.found ? tranState.value.push(s) : lib220.setProperty(this.transition,e,[s]); 
          return this;
        }
        nextState(e){
          let trState = lib220.getProperty(this.transition,e);
          if (trState.found){
            let tArr = trState.value;
            let rand = (x) => Math.floor(Math.random()*x);
            return tArr[rand(tArr.length)];
          }else{
            return undefined;
          }
        }
        nextStates(e){
          let tState = lib220.getProperty(this.transition,e);
          if (tState.found){
            return tState.value;
          }else{
            return [];
          }
        }
      }
      class Memento{
        constructor(curSt){
          this.getState = function(){
            return curSt;
          }
        }
        storeState(s){
          this.getState = function(){
            return s;
          }
        }
      }
    this.nextState = function(e){
      if(curSt !== undefined){
        let temp = curSt.nextState(e);
        curSt = temp;
        return this;
      }else{
        return this;
      }
    }
    this.createState = function(s, transitions){
      let newSt = new State(s);
      if(curSt === undefined){
        curSt = newSt;
      }
      for (let i=0;i<transitions.length;++i){
        let key = Object.keys(transitions[i])[0];
        let value = Object.values(transitions[i])[0];
        if(lib220.getProperty(states, value).found){
          newSt.addTransition(key, lib220.getProperty(states, value).value);
        }else{
          let newTransitionState = new State(value);
          lib220.setProperty(states, value, newTransitionState);
          newSt.addTransition(key, newTransitionState);
        }
      }
      if(lib220.getProperty(states, s).found){
        let st = lib220.getProperty(states, s).value;
        Object.assign(st, newSt);
      }else{
        lib220.setProperty(states, s, newSt);
      }
      return this;
    }
    this.addTransition = function(s, t){
      curSt.addTransition(s, t);
      return this;
    }
    this.showState = function(){
      if(curSt !== undefined){
        return curSt.getName();
      }else{
        return undefined;
      }
    }
    this.renameState = function(name, newName) {
      if (curSt.getName() === name) {
        curSt.setName(newName);
      }
      return this;
    }
    this.createMemento = function(){
      if(curSt !== undefined){
        return new Memento(curSt);
      }else{
        return undefined;
      }
    }
    this.restoreMemento = function(m){
      curSt = m.getState();
      return this;
    }
  }
}
let myMachine = new FSA().createState("delicates, low", [{mode: "normal, low"}, {temp: "delicates, medium"}]) .createState("normal, low", [{mode: "delicates, low"}, {temp: "normal, medium"}]) .createState("delicates, medium", [{mode: "normal, medium"},{temp: "delicates, low"}]) .createState("normal, medium", [{mode: "delicates, medium"},{temp: "normal, high"}]) .createState("normal, high", [{mode: "delicates, medium"},{temp: "normal, low"}]);
myMachine.nextState("temp").nextState('mode').nextState('temp');
let restoreTo = myMachine.createMemento();
console.log(myMachine.showState());
