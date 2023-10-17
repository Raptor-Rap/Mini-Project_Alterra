import NavbarComponent from "./navbar";
import FooterComponent from "./footer";

export default function Layout({ children }) {
  return (
    <div>
      <NavbarComponent />
      <div>{children}</div>
      <FooterComponent />
    </div>
  );
}
