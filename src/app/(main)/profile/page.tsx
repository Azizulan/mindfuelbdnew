import { fetchCustomerInfo } from "@/lib/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AddressList from "./_components/AddressList";
import ProfileInfo from "./_components/ProfileInfo";

const ProfilePage = async () => {
  const accessToken = cookies().get("MindFuel_accessToken");

  if (!accessToken) {
    redirect("/signin");
  }

  const customerData = await fetchCustomerInfo(accessToken?.value);
  const customerInfo = {
    email: customerData.data.customer.email,
    firstName: customerData.data.customer.firstName,
    lastName: customerData.data.customer.lastName,
    phone: customerData.data.customer.phone,
    displayName: customerData.data.customer.displayName,
    addresses: customerData.data.customer.addresses.edges.map(
      (address: any) => address.node
    ),
  };

  // Remove the id from the address
  customerInfo.addresses.forEach((address: { id: any; }) => delete address.id);

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Your Profile</h1>
      <ProfileInfo {...customerInfo} />
      <AddressList addresses={customerInfo.addresses} />
    </div>
  );
};

export default ProfilePage;

