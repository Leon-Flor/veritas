import { useAuthProvider } from "@/context";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Avatar,
} from "@nextui-org/react";

export const NavBar = () => {
  const { user, logout } = useAuthProvider();
  const { avatar, name } = user;

  return (
    <nav className="w-full px-20 py-4 border-b-2 flex justify-between items-center relative">
      <h1 className="text-foreground text-3xl font-bold">{name}</h1>

      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <Avatar size="lg" src={avatar} isBordered color="default" />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={logout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </nav>
  );
};
