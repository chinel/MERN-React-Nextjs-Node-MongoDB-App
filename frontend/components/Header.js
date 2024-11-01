import { useState } from "react";
import { APP_NAME } from "../config";
import Link from "next/link";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
} from "reactstrap";
import { signOut, isAuth } from "../actions/auth";
import { useRouter } from "next/navigation";

const ButtonStyles = {
  backgroundColor: "transparent", // Transparent background
  border: "none", // No border
  color: "inherit", // Inherit color or specify a color
  padding: "8px 16px", // Optional padding
  cursor: "pointer",
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const isAuthenticated = isAuth();

  const handleSignout = async () => {
    await signOut(() => router.push("/signin"));
  };
  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link href="/" legacyBehavior>
          <NavbarBrand className="font-weight-bold">{APP_NAME}</NavbarBrand>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
          <Nav className="ml-auto" navbar>
            {isAuthenticated ? (
              <NavItem>
                <Button style={ButtonStyles} onClick={() => handleSignout()}>
                  Signout
                </Button>
              </NavItem>
            ) : (
              <>
                <NavItem>
                  <Link href="/signin" legacyBehavior>
                    <NavLink href="/signin">Signin</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/signup" legacyBehavior>
                    <NavLink href="/signup">Signup</NavLink>
                  </Link>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
