import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';
import CatagoryItem from '../components/CatagoryItem';

export default function Home({ products, featuredProducts ,Catagories}) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    toast.success('Product added to the cart');
  };

  return (
    <Layout title="Home Page">
      <Carousel showThumbs={true} autoPlay>
        {featuredProducts.map((product) => (
          <div key={product._id}>
            <Link href={`/product/${product.slug}`} passHref className="flex w-full ">
              <img src={product.image} alt={product.name} className=' bg-yellow-500 opacity-80 h-[600px] object-cover'   />
              
            </Link>
          </div>
        ))}
      </Carousel>
      <main className=' container m-auto '>
      <h2 className=" text-[30px] font-semibold my-4">Latest Products</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          ></ProductItem>
        ))}
      </div>
      <div className='w-full mt-10 h-[200px] rounded-lg border-[1px] border-yellow-400 shadow-lg flex flex-col justify-center items-center '>
        <p className='text-[40px] font-semibold'>Do you want to sell your products on our website ?</p>
        <Link  href='/Store' className=' bg-yellow-400 py-2 border-[1px] border-white font-medium px-3 text-white rounded-lg'>Create Store </Link>
        
      </div>
      <h2 className=" text-[30px] font-semibold my-8 "> Featured catagories</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Catagories.map((product) => (
          <CatagoryItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          ></CatagoryItem>
        ))}
      </div>
      </main>
  
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  const featuredProducts = await Product.find({ isFeatured: true }).lean();
  const Catagories = await Product.find({}, ['image']).distinct('category')
  console.log(featuredProducts.map(db.convertDocToObj))
 
  return {
    props: {
      featuredProducts: featuredProducts.map(db.convertDocToObj),
      products: products.map(db.convertDocToObj),
      Catagories
    },
  };
}
