import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Menu } from '@headlessui/react';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '../utils/Store';
import DropdownLink from './DropdownLink';
import { useRouter } from 'next/router';
import SearchIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import Shoppingcart from '@heroicons/react/24/outline/ShoppingCartIcon';
import User   from "@heroicons/react/24/outline/UserIcon"
import UserIcon from '@heroicons/react/24/outline/UserIcon';


export default function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  const [query, setQuery] = useState('');

  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <>
      <Head>
        <title>{title ? title + ' - ethio-cultural' : 'ethio-cultural'}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between  ">
        <header>
          <nav className="flex h-20 items-center px-4 justify-between shadow-m border-b-[2px] border-yellow-400/40 shadow-red-50 shadow-xl">
            <Link href="/" className="text-lg font-bold   text-gray-900">
              shero-meda
            </Link>
            <form
              onSubmit={submitHandler}
              className="mx-auto  hidden  justify-center md:flex"
            >
              <div className=' rounded-xl flex justify-center items-center p-2 border-[1px]  border-yellow-400'>
              <button
                className="rounded rounded-tl-none rounded-bl-none  p-1 text-sm dark:text-black"
                type="submit"
                id="button-addon2"
              >
                <SearchIcon className="h-5 w-5"></SearchIcon>
              </button>
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                className=" p-1 text-sm  border-none  focus:ring-0"
                placeholder="Search products"
              />
           
              </div>
        
            </form>
            <div className="flex items-center z-10 gap-x-2 justify-center">
              <Link href="/cart" className="p-2 border-[1px] flex gap-x-2 border-yellow-400 rounded-xl">
                <Shoppingcart className='w-4 h-4'/>
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-yellow-500 w-auto h-auto px-2 py-1 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-600">
                    <UserIcon className='w-6 h-6'>
                    
                    </UserIcon>
                   
                    
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    {session.user.isAdmin && (
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/admin/dashboard"
                        >
                          Admin Dashboard
                        </DropdownLink>
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      <a
                        className="dropdown-link "
                        href="#"
                        onClick={logoutClickHandler}

                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login" className="p-1 px-2 bg-yellow-400 rounded-lg border-[4px] border-white text-white ">
                  Login
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="  ">{children}</main>
        <footer className=" mt-10 px-4 h-auto pt-6 shadow-xl    border-[2px] border-yellow-400/70 ">
          <div className='flex justify-around'>
          <div className='flex flex-col justify-between'>
          <p className=' text-gray-900 font-bold text-[25px]'>Shero-Meda</p>
         
          </div>
          <div className='flex flex-col gap-y-4 '>
            <p className='text-gray-900 font-bold text-[18px]'>Creadits</p>
            <ul className='flex flex-col gap-y-4'>
              <li>
                Dawit A 
              </li>
              <li>
              Youtube
              </li>
              <li>
                Asrat
              </li>
            </ul>

          </div>
          <div className='flex flex-col  gap-y-4 '>
            <p className='text-gray-900 font-bold text-[18px]'>Socials</p>
            <ul className='flex flex-col gap-y-4'>
              <li>
                Linkdin
              </li>
              <li>
               Github
              </li>
              <li>
               Twitter
              </li>
              <li>
               Instagram
              </li>
            </ul>
          </div>
          <div className='flex flex-col  gap-y-4 '>
            <p className='text-gray-900 font-bold text-[18px]'>help</p>
            <ul className='flex flex-col gap-y-4'>
              <li>
                buy me coffee
              </li>
              <li>
                Chapa
              </li>
              <li>
                Pattron
              </li>
            </ul>
          </div>
          <div className='flex flex-col   gap-y-4'>
            <p className='text-gray-900 font-bold text-[18px]'>Other Projects</p>
            <ul className='flex flex-col gap-y-4'>
              <li>
                React Native E-commerce app
              </li>
              <li>
                Skin Cancer Classifyer app
              </li>
              <li>
                More ..
              </li>
            </ul>
          </div>
          
          </div>
       
          <p className='ml-[80px]'>built By <strong>Asrat</strong></p>
        </footer>
       
      </div>
    </>
  );
}
