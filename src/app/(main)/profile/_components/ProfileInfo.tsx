import React from 'react';
import { FaUser, FaEnvelope, FaPhone, FaUserCircle } from 'react-icons/fa';

interface ProfileInfoProps {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  displayName: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  email,
  firstName,
  lastName,
  phone,
  displayName,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <div className="flex items-center mb-4">
        <FaUserCircle className="text-4xl text-blue-600 mr-4" />
        <h2 className="text-2xl font-bold">{displayName}</h2>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <FaUser className="text-gray-600 mr-2" />
          <p>{`${firstName} ${lastName}`}</p>
        </div>
        <div className="flex items-center">
          <FaEnvelope className="text-gray-600 mr-2" />
          <p>{email}</p>
        </div>
        <div className="flex items-center">
          <FaPhone className="text-gray-600 mr-2" />
          <p>{phone}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
