import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: {isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/posts'>
          <i class="fas fa-fire-alt"></i>{' '}
          <span className="hide-sm">Hotest Stories</span>
        </Link>
      </li>
      <li>
        <Link to='/posts'>
          <i class="fas fa-stream"></i>{' '}
          <span className="hide-sm">Latest Stories</span>
        </Link>
      </li>
      <li>
        <Link to='/profiles'>
          <i class="fas fa-users"></i>{' '}
          <span className="hide-sm">Colleagues</span>
        </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className="fas fa-user"></i>{' '}
          <span className="hide-sm">Me</span>
        </Link>
      </li>
      <li>
        <Link to="/" onClick={ logout }>
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to='/register'>Register
        </Link>
      </li>
      <li>
        <Link to='/login'>Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to='/'>
          <i class="far fa-newspaper"></i> FakeNews
        </Link>
      </h1>
      { !loading && (<Fragment> { isAuthenticated ? authLinks : guestLinks }</Fragment>)}
    </nav>);
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logout})(Navbar);
