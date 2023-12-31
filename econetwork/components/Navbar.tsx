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
import { useGlobalContext } from "@/contexts/AuthContext";

export default function NavbarComponent() {
  const uid = useGlobalContext();

  return (
    <Navbar className="bg-green">
      <NavbarContent justify="start">
        <a href="/" className="text-white text-2xl font-bold">
          ҉&nbsp;&nbsp;&nbsp;EcoNetwork
        </a>
      </NavbarContent>
      <NavbarContent className="text-white text-md">
        <div className="md:flex hidden gap-8">
          <NavbarItem>
            <a href="#">About Us</a>
          </NavbarItem>
          <NavbarItem>
            <a href="#">Guide</a>
          </NavbarItem>
          <NavbarItem>
            <a href="/leaderboard">Leaderboard</a>
          </NavbarItem>
        </div>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {!uid ? (
            <a href="/signup">
              <Button
                size="md"
                className="text-md font-medium bg-white text-green"
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
