import React, { useEffect, useState } from "react";
import "../Styles/Navbar.css";

function Navbar() {
	const [show, handleShow] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 100) {
				handleShow(true)
			} else handleShow(false);			
		})

		return () => {
			window.removeEventListener("scroll");
		}
	}, [])

	return (
		<div className={`navbar ${show && "navbar__black"}`}>
			<img 
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/255px-Netflix_2015_logo.svg.png"
				alt="Netflix Logo"
				className="navbar__logo"
			/>

			<img 
				src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
				alt=""
				className="navbar__avatar"
			/>
		</div>
	)
}

export default Navbar;