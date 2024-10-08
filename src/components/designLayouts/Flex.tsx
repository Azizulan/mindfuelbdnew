import React from "react";

const Flex = ({ children, className }: { children: any; className: any }) => {
  return <div className={className}>{children}</div>;
};

export default Flex;
