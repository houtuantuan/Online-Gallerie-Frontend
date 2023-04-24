import { Outlet, Link } from "react-router-dom";


export default () => {
  return (<div>
    <nav className="navBar">
<ul >
  <li><Link to="/">Home</Link></li>
  <li><Link to="canvas">Malbereich</Link></li>
  <li><Link to="gallery">Overview</Link></li>
  
  <li>Sign In</li>
  <li>Sign up</li>
</ul>
    </nav>
  </div>)
}

