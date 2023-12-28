import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebaseconfig";
import { useEffect, useState } from "react";

export default function NavbarComponent() {
  const [user] = useAuthState(auth);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    checkForUser();
  });

  const checkForUser = async () => {
    if (user) {
      setIsUser(true);
      console.log(isUser);
    } else {
      console.log(isUser);
    }
  };

  return (
    <Navbar className="bg-green">
      <NavbarContent justify="start">
        <a className="text-white text-2xl font-bold">
          ҉&nbsp;&nbsp;&nbsp;EcoNetwork
        </a>
      </NavbarContent>
      <NavbarContent className="text-white text-md font-regular">
        <div className="flex gap-8">
          <NavbarItem>
            <a href="#">About Us</a>
          </NavbarItem>
          <NavbarItem>
            <a href="#">Programs</a>
          </NavbarItem>
          <NavbarItem>
            <a href="#">Leaderboard</a>
          </NavbarItem>
        </div>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {!isUser ? (
            <a href="/signup">
              <Button
                size="md"
                className="text-md font-bold bg-white text-green"
              >
                Sign Up
              </Button>
            </a>
          ) : (
            <a href="/dashboard">
              <Button
                size="md"
                className="text-md font-bold bg-white text-green"
              >
                Dashboard
              </Button>
            </a>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
