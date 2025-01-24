import Image from "next/image"

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-principal" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <Image
            src="/images/logo_imco_blanco_transparente.png"
            width={75}
            height={45}
            alt={"Logo IMCO"}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link" aria-current="page" href="#">Home</a>
            <a className="nav-link" href="#">Features</a>
            <a className="nav-link" href="#">Pricing</a>
            <a className="nav-link disabled" aria-disabled="true">Disabled</a>
          </div>
        </div>
      </div>
    </nav>
  )
}
