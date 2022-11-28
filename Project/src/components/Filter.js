import React, { Component } from 'react'

// This is the filter component
export default class Filter extends Component {
    render() {
        return (
            <div className="filter">
                <div className="filter-result">{this.props.count} Products</div>
                <div className="filter-category">
                    Filter{" "}
                    <select value={this.props.category} onChange={this.props.filterProducts}>
                        <option value="">ALL</option>
                        <option value="Dairy">Dairy</option>
                        <option value="Fruit">Fruit</option>
                        <option value="Meat">Meat</option>
                        <option value="Vegetables">Vegetables</option>
                    </select>
                </div>
            </div>
        )
    }
}
