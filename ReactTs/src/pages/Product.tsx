import React from 'react'

const Product = (props) => {
    const removeProduct = (id) => {
        props.onRemove(id)
    }
    return (
        <div>
            {props.products.map((items) =>{
                return <div key={items.id}>
                    <h2>{items.name}</h2>
                    <button onClick={() => removeProduct(items.id)}>Remove</button>
                </div>
            })}
        </div>
    )
}

export default Product