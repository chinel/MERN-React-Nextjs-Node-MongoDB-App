import { useEffect, useState } from "react";
import Router from "next/router";
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
import { signOut, isAuth, getUserProfile } from "../actions/auth";
import { useRouter } from "next/navigation";
import { captializeName } from "../utils/utils";

const HeaderStyles = {
  padding: "20px 5px",
  borderBottom: "1px solid #eaeaea",
};
const ButtonStyles = {
  padding: "8px 16px",
  cursor: "pointer",
  color: "#000000a6",
};

const Header = ({ isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userPath, setUserPath] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  // const isAuthenticated =  //isAuth();

  const handleSignout = async () => {
    await signOut(() => router.push("/signin"));
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const profile = await getUserProfile();

        if (profile.role === 0) {
          setUserPath("/user");
        } else if (profile.role === 1) {
          setUserPath("/admin");
        }
        setName(captializeName(profile.name.split(" ")[0]));
      } catch (error) {
        console.log(error);
        //signOut(() => Router.push("/signin"));
      }
    };

    getUser();
  }, []);
  return (
    <div>
      <Navbar color="light" light expand="md" style={HeaderStyles}>
        <Link href="/" legacyBehavior>
          <NavbarBrand className="font-weight-bold">{APP_NAME}</NavbarBrand>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
          <Nav className="ml-auto" navbar>
            {isAuthenticated ? (
              <>
                <NavItem>
                  <Link href={userPath} legacyBehavior>
                    <NavLink href={userPath}>{`${name}'s`} Dashboard</NavLink>
                  </Link>
                </NavItem>
                <NavItem style={ButtonStyles} onClick={() => handleSignout()}>
                  Signout
                </NavItem>
              </>
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
