"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Import an icon for visual appeal

interface Address {
  address1: string;
  city: string;
  country: string | null;
  province: string | null;
  zip: string;
}

interface AddressListProps {
  addresses: Address[];
}

const AddressList: React.FC<AddressListProps> = ({ addresses }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 p-6 rounded-lg shadow-md mt-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Addresses</h2>
      {addresses.length === 0 ? (
        <p className="text-gray-600">No addresses available.</p>
      ) : (
        addresses.map((address, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm transition-transform duration-200 hover:shadow-lg hover:scale-105"
          >
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="text-red-500 mr-2" />
              <h3 className="text-lg font-semibold">{address.address1}</h3>
            </div>
            <p className="text-gray-600">
              {address.city}, {address.province ? address.province + ', ' : ''} {address.zip}
            </p>
            <p className="text-gray-600">{address.country || 'Country not specified'}</p>
          </div>
        ))
      )}
    </motion.div>
  );
};

export default AddressList;
