import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { emptyCart } from '@/assets/images';
import Link from 'next/link';

const EmptyCart: React.FC = () => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
    >
      <div>
        <Image
          className="w-80 rounded-lg p-4 mx-auto"
          src={emptyCart.src}
          alt="Empty Cart"
          width={300}
          height={300}
        />
      </div>
      <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
        <h1 className="font-titleFont text-xl font-bold uppercase">Your Cart feels lonely.</h1>
        <p className="text-sm text-center px-10 -mt-2">
          Your Shopping cart lives to serve. Give it purpose - fill it with books, electronics,
          videos, etc., and make it happy.
        </p>
        <Link href="/shop">
          <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
            Continue Shopping
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default EmptyCart;
