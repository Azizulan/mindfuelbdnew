import Link from "next/link";

const CheckoutButton = ({ checkOutUrl }: { checkOutUrl: string }) => {
  return (
    <div className="flex justify-end">
      <Link href={checkOutUrl}>
        <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
};

export default CheckoutButton;

