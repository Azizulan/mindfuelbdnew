import Flex from "../../designLayouts/Flex";
import CartIcon from "./CartIcon";
import CategoryMenu from "./CategoryMenu";
import SearchBar from "./SearchBar";
import UserMenu from "./UserMenu";
import WishlistIcon from "./WishlistIcon";

const HeaderBottom = () => {
  return (
    <div className="w-full bg-[#F5F5F3] relative">
      <div className="max-w-container mx-auto">
        <Flex className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full px-4 pb-4 lg:pb-0 h-full lg:h-24">
          <CategoryMenu />
          <SearchBar />
          <div className="flex gap-4 mt-2 lg:mt-0 items-center pr-6">
            <UserMenu />
            <CartIcon />
            <WishlistIcon />
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default HeaderBottom;
