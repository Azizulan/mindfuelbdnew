import Breadcrumbs from "@/components/pageProps/Breadcrumbs";
import { getCartInfo } from "@/lib/cart-info";
import CartDetails from "./_components/CartDetails";
import { transformCartData } from "@/utils/cartUtils";

const CartPage = async () => {
  const cartInfo = await getCartInfo();
  // console.log(cartInfo?.lines[0].merchandise.id , "---cartInfo \n");
  
  const transformedCartData = cartInfo && transformCartData(cartInfo); 
  const checkOutUrl = cartInfo && cartInfo.checkoutUrl;

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Cart" prevLocation={"/"} />
      {
        transformedCartData && checkOutUrl && (
          <CartDetails cartInfo={transformedCartData} checkOutUrl={checkOutUrl} />
        )
      }
    </div>
  );
};

export default CartPage;

