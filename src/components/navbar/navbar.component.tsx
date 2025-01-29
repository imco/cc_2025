import LinkOptions from "@/interfaces/navbar/navbar-options.interface"
import Image from "next/image"
import Link from "next/link"

import logo from "@/assets/images/logo_imco_blanco_transparente.png"

interface NavbarProps {
  linksOptions: LinkOptions[]
}

export default function Navbar(props: NavbarProps) {

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-principal"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <Image
              src={logo.src}
              width={75}
              height={45}
              alt={"Logo IMCO"}
            />
          </a>
          <button
            className="navbar-toggler border-white text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="navbar-icon fa fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {props.linksOptions.map((link: LinkOptions) => (
                <li className="nav-item" key={link.title}>
                  <Link className="nav-link text-white" href={link.url}>
                    {link.sectionName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <ul className="navbar d-none d-lg-flex">
            {props.linksOptions.map((link: LinkOptions) => (
              <li className="nav-item" key={link.title}>
                <Link className="nav-link text-white" href={link.url}>
                  {link.sectionName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}
