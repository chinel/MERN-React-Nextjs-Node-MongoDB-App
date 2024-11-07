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
  padding: "8px 16px",
  cursor: "pointer",
  color: "#000000a6",
};

const Header = ({ isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  // const isAuthenticated =  //isAuth();

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
              <NavItem style={ButtonStyles} onClick={() => handleSignout()}>
                Signout
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
