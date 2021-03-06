import React, { useState , useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { detailProduct } from '../Actions/productActions'

import Rating from '../Components/Rating'
import { Link } from 'react-router-dom'
import MessageBox from '../Components/MessageBox'
import LoadingBox from '../Components/LoadingBox'


function ProductScreen(props) {
    // const product=data.products.find((item)=>item._id===props.match.params.id);
    // if(!product){
    //     return <div>Product not found </div>;
    // }

    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()
    const productId=props.match.params.id
    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(detailProduct(productId));
    }, [dispatch ,productId])

    const addToCartHandler=()=>{
        props.history.push(`/cart/${productId}?qty=${qty}`)
    }

    return (
        <div>
            {loading ? (<LoadingBox></LoadingBox>)
                :
                error ? (<MessageBox variant="danger">{error}</MessageBox>)
                    :
                    (<div>
                        <Link to="/">Back to results</Link>
                        <div className="row top">
                            <div className="col-2">
                                <img className="large" src={product.image} alt={product.name}></img>
                            </div>
                            <div className="col-1">
                                <ul>
                                    <li>
                                        <h1>{product.name}</h1>
                                    </li>
                                    <li>
                                        <Rating
                                            rating={product.rating}
                                            numReviews={product.numReviews}
                                        ></Rating>
                                    </li>
                                    <li>Price: {product.price}</li>
                                    <li>
                                        Description:
                                        <p>
                                            {product.description}
                                        </p>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-1">
                                <div className="card card-body">
                                    <ul>
                                        <li>
                                            <div className="row">
                                                <div>Price</div>
                                                <div className="price">{product.price}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="row">
                                                <div>Status</div>
                                                <div>
                                                    {product.countInStock > 0 ? (<span className="success">In Stock</span>) : (<span className="error">Unavailable</span>)}
                                                </div>
                                            </div>
                                        </li>
                                        {product.countInStock >0 && (
                                        <>
                                        <li>
                                            <div className="row">
                                                <div>Qty</div>
                                                <div>
                                                    <select value={qty} onChange={e=>setQty(e.target.value)}>
                                                        {
                                                            [...Array(product.countInStock).keys()].map((x)=>(
                                                                <option key={x+1} value={x+1}>{x+1}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </li>    
                                        <li>
                                            <button className="primary block" onClick={addToCartHandler}>Add to cart</button>
                                        </li>   
                                        </>
                                        )}
                                       
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
        </div>
    )
}







export default ProductScreen
