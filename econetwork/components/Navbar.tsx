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

export default function NavbarComponent() {
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
          <Button size="md" className="text-md font-bold bg-white text-green">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
