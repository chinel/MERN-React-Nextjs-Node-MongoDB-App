import Header from "./Header";

const Layout = ({ isAuthenticated, children }) => {
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      {children}
      {/* <p>Footer</p> */}
    </>
  );
};

export default Layout;
