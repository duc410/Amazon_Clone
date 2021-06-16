import React ,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listProducts } from '../Actions/productActions'

import Product from '../Components/Product'
import MessageBox from '../Components/MessageBox'
import LoadingBox from '../Components/LoadingBox'

function HomeScreen() {
    // const [products,setProducts]=useState([])
    // const [loading, setLoading] = useState(false)
    // const [error, setError] = useState(false)

    const dispatch = useDispatch()
    const productList=useSelector((state)=>state.productList)
    const { loading , error , products } =productList

    useEffect(() => {
       dispatch(listProducts());
    }, [dispatch])

    return (
        <div>
            {loading? (<LoadingBox></LoadingBox>)
            :
            error? (<MessageBox variant="danger">{error}</MessageBox>)
            :
            (<div className="row center">
               {
                 products.map((product)=>
                   (
                    <Product key={product._id} product={product} />
                   )
                 )
                }
            </div>
            )}
        </div>
    )
}

export default HomeScreen
