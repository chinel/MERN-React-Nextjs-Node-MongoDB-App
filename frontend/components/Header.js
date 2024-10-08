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
} from "reactstrap";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
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
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
