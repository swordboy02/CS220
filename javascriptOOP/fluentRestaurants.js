
let data = lib220.loadJSONFromURL('https://people.cs.umass.edu/~joydeepb/yelp.json');

class FluentRestaurants{
  constructor(jsonData){
   this.data = jsonData;
  }
  //fromState(stateStr: string): FluentRestaurants
  fromState(stateStr){
    return new FluentRestaurants(this.data.filter(obj => obj.state === stateStr));
  }
  //ratingLeq(rating: number): FluentRestaurants
  ratingLeq(rating){
    return new FluentRestaurants(this.data.filter(obj => obj.stars <= rating));
  }
  //ratingGeq(rating: number): FluentRestaurants
  ratingGeq(rating){
    return new FluentRestaurants(this.data.filter(obj => obj.stars >= rating));
  }
  //category(categoryStr: string): FluentRestaurants
  category(categoryStr){
    let x = obj => obj.categories.includes(categoryStr);
    return new FluentRestaurants(this.data.filter(obj => x(obj)));
  }
  //hasAmbience(ambienceStr: string): FluentRestaurants
  hasAmbience(ambienceStr){
    let ambFilter = obj => lib220.getProperty(obj.attributes,'Ambience').found===true;
    return new FluentRestaurants(this.data.filter(obj => ambFilter(obj)).filter(obj2 => lib220.getProperty(obj2.attributes.Ambience,ambienceStr).value ===true));
  }
  //bestPlace(): Restaurant | {}
  bestPlace(){
  let bestObj = new FluentRestaurants(this.data);
  return bestObj.data.reduce(function(acc, obj){
    if(lib220.getProperty(acc,'stars').found === false){
      return obj;
    }else if(lib220.getProperty(obj,'stars').value > lib220.getProperty(acc,'stars').value){
      return obj;
    }else if((lib220.getProperty(obj,'stars').value === lib220.getProperty(acc,'stars').value)&&(lib220.getProperty(obj, 'review_count').value > lib220.getProperty(acc,'review_count').value)){
      return obj;
    }else{
      return acc;
    }
  },{})
  }
  //mostReviews(): Restaurant | {}
  mostReviews(){
    let mostObj = new FluentRestaurants(this.data);
    return mostObj.data.reduce(function(acc,obj){
      if(lib220.getProperty(acc,"review_count").found === false){
        return obj;
      }else if(lib220.getProperty(obj,'review_count').value>(lib220.getProperty(acc,'review_count').value)){
        return obj;
      }else if((lib220.getProperty(obj,'review_count').value === lib220.getProperty(acc,'review_count').value)&&(lib220.getProperty(obj,'stars').value > lib220.getProperty(acc,'stars').value)){
      return obj;
    }else{
        return acc;
      }
    },{})
    }
}
//////////////////////////////////
const testData = [
{
  name: "Applebee's",
  state: "NC",
  stars: 4,
  review_count: 6,
}, {
  name: "China Garden",
  state: "NC",
  stars: 4,
  review_count: 10,
}, {
  name: "Beach Ventures Roofing",
  state: "AZ",
  stars: 3,
  review_count: 30,
}, {
  name: "Alpaul Automobile Wash",
  state: "NC",
  stars: 3,
  review_count: 30,
}, {
  name: "Company Workplace X",
  state: "AZ",
  stars: 3,
  review_count: 30,
 } ];

test('fromState filters correctly', function() {
  let tObj = new FluentRestaurants(testData);
  let list = tObj.fromState('NC').data;
  assert(list.length === 3);
  assert(list[0].name === "Applebee's");
  assert(list[1].name === "China Garden");
  assert(list[2].name === "Alpaul Automobile Wash");
});
test('bestPlace tie-breaking', function() {
  let tObj = new FluentRestaurants(testData);
  let place = tObj.fromState('NC').bestPlace();
  assert(place.name === 'China Garden');
});
test('Most Reviews tied test',function(){
  let tObj = new FluentRestaurants(testData);
  let place = tObj.fromState('AZ').mostReviews();
  assert(place.name === 'Beach Ventures Roofing');
});
test('Empty Object Test',function(){
  let tObj = new FluentRestaurants(testData);
  let list = tObj.fromState('NonState').data;
  assert(list.length===0);
});
