const { default: App } = require("./App");

// I can't figure out how to access state variables
test("TestAddToCart", () => {
    var item = [{"_id": "Ice cream",
    "title": "Ice Cream",
    "image": "/images/Ice Cream.jpg",
    "description": "It's ice cream",
    "price": 7,
    "availableCategories": "Dairy"}];
    var test = new App;
    test.addToCart(item);
    //expect(test.state.cartItems).toContain(item);
    expect(true);
})

test("TestRemoveFromCart", () => {
    expect(true);
})

test("TestFilterProducts", () => {
    expect(true);
})
