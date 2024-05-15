import { NavBar } from "@/components";
import { ReactNode } from "react";

interface ILayoutProps {
  children: ReactNode;
  navBar: boolean;
  className?: string;
}
export const Layout = ({
  children,
  navBar = false,
  className,
}: ILayoutProps) => {
  return (
    <div className="flex flex-col w-screen h-screen overflow-auto">
      {navBar && <NavBar />}
      <main className={className}> {children}</main>
    </div>
  );
};
