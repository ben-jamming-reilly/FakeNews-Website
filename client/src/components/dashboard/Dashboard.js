import React, { useEffect, Fragment} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

import ProfileTop from '../profile/ProfileTop';
import ProfileAbout from '../profile/ProfileAbout';
import {getCurrentProfile} from '../../actions/profile';
import {deleteAccount} from '../../actions/profile';

const Dashboard = ({ getCurrentProfile, auth: {user}, profile: { profile, loading}, deleteAccount }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (loading && profile === null ? <Spinner /> :
  <Fragment>
    <p className="lead">
      Greetings { user && user.name }
    </p>
    { profile !== null ? (
        <Fragment>
          <div class="dash-buttons">
            <Link to="/edit-profile" className="btn btn-dark">
              <i class="fas fa-user-edit text-light"></i> Edit Profile</Link>
            <Link to="/post-form" className="btn btn-dark">
              <i class="fas fa-edit text-light"></i> Spread Fake News</Link>
          </div>
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus"></i> Delete Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not made a profile yet... fool. Please add some info</p>
          <Link to='/create-profile' className="btn btn-primary my-1">
            Create a Profile
          </Link>
        </Fragment>
      )
    }
  </Fragment>);
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);
