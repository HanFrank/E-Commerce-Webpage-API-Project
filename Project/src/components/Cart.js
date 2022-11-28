import React, { Component } from 'react'
import formatCurrency from '../util';
// Ontario Tax Rate
const HST = 1.13;
// Placeholder so state doesn't change onChange
var dis = "";

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            discount: "",
            applyDiscount: false };
    }
    // Handles onChange input
    handleInput = (e) =>{
        let input = e.target.value;

        // Setting our placeholder to the input
        dis = input;
    }
    // Handles form submission and applying the discount
    createDiscount = (e) =>{
        e.preventDefault();
        
        // Error Checking
        if (Number(dis) > 100 || Number(dis) < 0){
            alert("Please enter a value between 0-100")
        } else {
            this.setState({discount: dis});
        }
    }
    render() {
        const {cartItems} = this.props;
        return (
            <div>
                {cartItems.length === 0? ( //if empty
                    <div className="cart cart-header">Cart is empty</div> 
                ) : (
                    // I can't really find a regex solution to singular and plural for product(s) :(
                    <div className="cart cart-header">
                        You have {cartItems.length} products in the cart{" "}
                    </div>
                )}
                <div>
                    <div className="cart">
                        <ul className="cart-items">
                            {cartItems.map(item => (
                                <li key={item._id}>
                                    <div>
                                        <img src={item.image} alt={item.title}></img>
                                    </div>
                                    <div>
                                        <div>{item.title}</div>
                                        <div className="right">
                                            {formatCurrency(item.price)} x {item.count}{" "}
                                            <button
                                                className="button"
                                                onClick={() => this.props.removeFromCart(item)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {cartItems.length !==0 && ( // Not showing cart components unless there are items in cart
                        <div>
                            <div className="cart">
                                <button onClick={ ()=>{this.setState({applyDiscount: true})}} className="button primary">Apply Discount</button>
                                {this.state.applyDiscount && (
                                    <div className="cart">
                                        <form onSubmit={this.createDiscount}>
                                            <ul className="form-container">
                                                <label>Discount Percentage:</label>
                                                <input
                                                    //step = "any" allows for decimal points
                                                    type="number" step = "any"
                                                    onChange={this.handleInput}
                                                ></input>
                                                <button className="button primary" type="submit">
                                                    Apply Discount
                                                </button>
                                            </ul>
                                        </form>
                                    </div>
                                )}
                                <div className="payment">
                                    <div className="tax">
                                        <div>
                                            Tax:{" "}
                                            {formatCurrency(
                                                cartItems.reduce((a, c) => a + (c.price * c.count) * (HST - 1) * (1 - Number(this.state.discount) * 0.01), 0) 
                                            )}
                                        </div>
                                    </div>
                                    <div className="total">
                                        <div>
                                            Total:{" "}
                                            {formatCurrency(
                                                cartItems.reduce((a, c) => a + (c.price * c.count) * HST * (1 - Number(this.state.discount) * 0.01), 0) 
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
