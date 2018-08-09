// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let mealId = 0;
let customerId = 0;
let deliveryId = 0;
let neighborhoodId = 0;

class Neighborhood {
  constructor(name){
    // debugger
    this.name = name;
    this.id = neighborhoodId++;
    store.neighborhoods.push(this);
  }

  deliveries() {
    return store.deliveries.filter((delivery) => {
      return this.id === delivery.neighborhoodId
    })
  }

  customers() {
    return store.customers.filter((customer) =>{
      return this.id === customer.neighborhoodId
    })
  }

  meals() {
    let mealArray = this.deliveries().map((delivery) =>{
      return delivery.meal()
    })
    debugger
    for(let i = 0; i < mealArray.length; i++){

      for(let j= i+1; j< mealArray.length; j++){
        if (mealArray[i] === mealArray[j]){
          mealArray.splice(j, 1)

        }
      }
    }
    return mealArray
  }
}

class Meal {
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = mealId++;
    store.meals.push(this);
  }

  deliveries() {
    return store.deliveries.filter((delivery) => {
      return this.id === delivery.mealId
    })
  }

  customers() {
    return this.deliveries().map((delivery)=>{
      return delivery.customer()
    })
  }

  static byPrice() {
    return store.meals.sort((a,b)=> b.price - a.price)
  }


}



class Customer {
  constructor(name, neighborhoodId) {
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = customerId++;
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter((delivery) => {
      return this.id === delivery.customerId
    })
  }

  meals() {
    return this.deliveries().map((delivery)=>{
      return delivery.meal()
    })

  }

  totalSpent() {
    let total = 0
    this.meals().forEach((meal)=>{
      total += meal.price
    })
    return total
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId){
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;
    this.id = deliveryId++;
    store.deliveries.push(this);
  }

  meal() {
    return store.meals.find((meal)=>{
      return this.mealId === meal.id
    })
  }

  customer() {
    return store.customers.find((customer)=> {
      return this.customerId === customer.id
    })
  }

  neighborhood() {
    return store.neighborhoods.find((neighborhood) =>{
      return this.neighborhoodId === neighborhood.id
    })
  }
}
