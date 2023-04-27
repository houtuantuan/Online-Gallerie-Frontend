import { Outlet, Link,NavLink } from 'react-router-dom'

export default () => {
  return (
    <div>
      <nav className='navBar'>
        <ul>
          <li>
            <Link to='/' >Home</Link>
          </li>
          <li>
            <Link to='gallery'>Expolre</Link>
          </li>
          <li>
            <Link to='canvas'>Drawing Board</Link>
          </li>

          <li>Sign In</li>
          <li>Sign up</li>
        </ul>
      </nav>
    </div>
  )
}
