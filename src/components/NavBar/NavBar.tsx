import { useAuthProvider } from "@/context";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Avatar,
} from "@nextui-org/react";

export const NavBar = () => {
  const { user, handleLogout } = useAuthProvider();
  if (!user) return null;
  const { picture, name, email } = user;

  return (
    <nav className="w-full px-20 py-4 border-b-2 flex justify-between items-center relative">
      <h1 className="text-foreground text-3xl font-bold">{name}</h1>

      {user && (
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <Avatar size="lg" src={picture} isBordered color="default" />
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Iniciaste como</p>
              <p className="font-semibold">{email}</p>
            </DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger" onPress={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </nav>
  );
};
