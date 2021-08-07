import { Link } from "react-router-dom";
import { Nav } from "../shared/common";



const Navbar = () => {
    return (
        <Nav>
            <Link  variant="nav" to='/' className="navbar-text title">MyContacts</Link>
            <Link variant="nav" to='/create-contact' className="navbar-text add-contact">Add new contact</Link>
        </Nav>
    );
};

export default Navbar;