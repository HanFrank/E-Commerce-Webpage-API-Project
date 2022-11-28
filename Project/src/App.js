import React from 'react';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';
import data from "./data.json";

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      products: data.products,
      // Stores data on local storage so refreshing page doesn't reset data
      cartItems: localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")): [],
      category: "",
    };
  }

  removeFromCart = (product) => {
    /*** This function removes a product from the shopping cart ***/
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });
    // Stores data on local storage so refreshing page doesn't reset data
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter((x) => x._id !== product._id)));
  }

  addToCart = (product) => {
    /*** This function removes a product from the shopping cart ***/
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    // For duplicate items
    cartItems.forEach(item => {
      if(item._id === product._id){
        item.count++;
        alreadyInCart = true;
      }
    })
    // For new items
    if(!alreadyInCart){
      cartItems.push({...product, count: 1});
    }
    this.setState({cartItems});
    // Stores data on local storage so refreshing page doesn't reset data
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  filterProducts = (event) => {
    /*** This function helps with the display of filtered items ***/
    console.log(event.target.value);
    // No filter, display all items
    if (event.target.value === ""){
      this.setState({category: event.target.value, products: data.products});
    
    // Filtering based on category of the product
    } else {
      this.setState({
        category: event.target.value,
        products: data.products.filter(
          (product) => product.availableCategories === event.target.value)
      })
    }
  }
  render(){
    // Main function for App
    return (
      <div className="grid-container">
        <header>
          <a href="/">CSC301 Grocery Store</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter count={this.state.products.length}
              category={this.state.category}
              filterProducts={this.filterProducts}
              ></Filter>
              <Products 
                products={this.state.products} 
                addToCart={this.addToCart}
              ></Products>
            </div>
            <div className="sidebar">
              <Cart 
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
              />
            </div>
          </div>
        </main>
        <footer>
          This is a CSC301 Project. Ziyao Han and Jessie Lam.
        </footer>
      </div>
    );
  }
}

export default App;
