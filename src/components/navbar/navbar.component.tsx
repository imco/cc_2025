"use client"
import { useEffect, useRef } from "react"

import LinkOptions from "@/interfaces/navbar/navbar-options.interface"
import Image from "next/image"
import Link from "next/link"

import logo from "@/assets/images/logo_imco_blanco_transparente.png"

interface NavbarProps {
  linksOptions: LinkOptions[]
}

export default function Navbar(props: NavbarProps) {
  const hamburgerMenu = useRef(Object());
  const headerLinks = useRef(Object());

  useEffect(() => {
    hamburgerMenu.current = document.querySelector('.hamburger-menu');
    headerLinks.current = document.querySelector('.header-links');

    hamburgerMenu.current.addEventListener('click', () => {
      headerLinks.current.classList.toggle('show');
    });

    // Close menu when a link is clicked
    headerLinks.current.querySelectorAll('a').forEach(
      (link: HTMLAnchorElement) => {
        link.addEventListener('click', () => {
          headerLinks.current.classList.remove('show');
        });
      });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (!(((event.target as Element).closest('.navbar')))) {
        headerLinks.current.classList.remove('show');
      }
    });
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
