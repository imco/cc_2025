import LinkOptions from "@/interfaces/navbar/navbar-options.interface"
import Image from "next/image"
import Link from "next/link"

import logo from "@/assets/images/logo_imco_blanco_transparente.png"

interface NavbarProps {
  linksOptions: LinkOptions[]
}

export default function Navbar(props: NavbarProps) {

  return (
    <header id="header">
      <nav className="navbar">
        <a href="https://imco.org.mx" className="logo-link">
          <Image
            src={logo.src}
            width={logo.width}
            height={logo.height}
            alt="IMCO Logo"
            className="logo"
          />
        </a>
        <div className="hamburger-menu">
          <i className="fas fa-bars"></i>
        </div>
        <div className="header-links">
          {props.linksOptions.map((link: LinkOptions) => (
            <Link
              href={link.url}
              key={link.title}
            >
              {link.sectionName}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
