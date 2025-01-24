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
      <nav className="navbar navbar-expand-lg bg-principal">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <Image
              src={logo.src}
              width={75}
              height={45}
              alt={"Logo IMCO"}
            />
          </a>
          <ul className="navbar">
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
