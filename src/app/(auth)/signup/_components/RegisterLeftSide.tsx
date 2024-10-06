import { logoLight } from "@/assets/images";
import Image from "next/image";
import Link from "next/link";
import { BsCheckCircleFill } from "react-icons/bs";
import React from "react";
const RegisterLeftSide = () => {
  return (
    <>
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link href="/">
            <Image
              src={logoLight.src}
              alt="MINDFUEL Logo"
              className="w-28 "
              width={100}
              height={100}
            />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Join MINDFUEL for a Healthier You
            </h1>
            <p className="text-base">
              Create your account to access exclusive offers and updates
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Start Your Wellness Journey Today
              </span>
              <br />
              Unlock access to personalized health tips and organic food
              products that fuel your mind and body.
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Access Exclusive MINDFUEL Content
              </span>
              <br />
              Enjoy member-only content, recipes, and lifestyle hacks tailored
              for optimal performance.
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Trusted by Wellness Enthusiasts
              </span>
              <br />
              Join thousands who trust MINDFUEL for their daily health and
              nutrition needs.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10">
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              © MINDFUEL
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Terms
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Privacy
            </p>
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              Security
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterLeftSide;
