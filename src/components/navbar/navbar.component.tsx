"use client"
import { useEffect, useState } from "react"

import LinkOptions from "@/interfaces/navbar/navbar-options.interface"
import Image from "next/image"
import Link from "next/link"

import { MenuIcon } from "@/components/icons"

import logo from "@/assets/images/logo_imco_blanco_transparente.png"

interface NavbarProps {
  linksOptions: LinkOptions[]
}

export default function Navbar(props: NavbarProps) {
  const [abierto, setAbierto] = useState(false)

  // cerrar el menú al hacer clic fuera del navbar
  useEffect(() => {
    const alClickFuera = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.navbar')) {
        setAbierto(false)
      }
    }
    document.addEventListener('click', alClickFuera)
    return () => document.removeEventListener('click', alClickFuera)
  }, [])

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
        <button
          type="button"
          className="hamburger-menu"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={abierto}
          aria-controls="menu-principal"
          onClick={() => setAbierto(a => !a)}
        >
          <MenuIcon size={28} />
        </button>
        <div id="menu-principal" className={`header-links${abierto ? ' show' : ''}`}>
          {props.linksOptions.map((link: LinkOptions) => (
            <Link
              href={link.url}
              key={link.title}
              onClick={() => setAbierto(false)}
            >
              {link.sectionName}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
