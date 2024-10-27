import React, { ReactNode } from "react";

const ClientTableLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-screen w-full">{children}</div>;
};

export default ClientTableLayout;
