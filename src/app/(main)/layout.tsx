import HeaderBottom from "@/components/common/Header/HeaderBottom";
import SpecialCase from "@/components/shared/SpecialCase/SpecialCase";
import StoreProvider from "@/provider/StoreProvider";
import React from "react";
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StoreProvider>
        <HeaderBottom />
        <SpecialCase />
        {children}
      </StoreProvider>
    </>
  );
}

