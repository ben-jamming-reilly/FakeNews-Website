import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({ profile: { profile, loading }, createProfile, getCurrentProfile, history }) => {
  const [formData, setFormData] = useState({
    alignment: '',
    race: '',
    height: '',
    birthdate: '',
    location: '',
    skills: '',
    bio: '',
    twitter: '',
    facebook: '',
    youtube: '',
    instagram: ''
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      alignment: loading || !profile.alignment ? '' : profile.alignment,
      race: loading || !profile.race ? '' : profile.race,
      height: loading || !profile.height ? '' : profile.height,
      birthdate: loading || !profile.birthdate ? '' : profile.birthdate,
      location: loading || !profile.location ? '' : profile.location,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      bio: loading || !profile.bio ? '' : profile.bio,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      instagram: loading || !profile.social ? '' : profile.social.instagram
    })

  }, [loading, getCurrentProfile, profile]);

  const {
    alignment,
    race,
    height,
    birthdate,
    location,
    skills,
    bio,
    twitter,
    facebook,
    youtube,
    instagram
  } = formData;

  const onChange = e => setFormData({ ...formData,  [e.target.name]: e.target.value});

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  }

  return (
    <Fragment>
    <h1 className="large text-primary">
      Edit Your Profile
    </h1>
    <p className="lead">
      <i className="fas fa-user"></i> Give us some personal information...
       we will keep it safe.
    </p>
    <form className="form" onSubmit={ e => onSubmit(e)}>
      <div className="form-group">
        <select name="alignment" value={alignment} onChange={e => onChange(e)}>
          <option value="0">-Select DnD alignment-</option>
          <option value="Lawful Good">Lawful Good</option>
          <option value="Neutral Good">Neutral Good</option>
          <option value="Chaotic Good">Chaotic Good</option>
          <option value="Lawful Neutral">Lawful Neutral</option>
          <option value="True Neutral">True Neutral</option>
          <option value="Chaotic Neutral">Chaotic Neutral</option>
          <option value="Lawful Evil">Lawful Evil</option>
          <option value="Neutral Evil">Neutral Evil</option>
          <option value="Chaotic Evil">Chaotic Evil</option>
        </select>
      </div>

      <div className="form-group">
        <select name="race" value={race} onChange={e => onChange(e)}>
          <option value="0">-Select a Mythical Race-</option>
          <option value="Dragonborn">Dragonborn</option>
          <option value="Dwarf">Dwarf</option>
          <option value="Elf">Elf</option>
          <option value="Gnome">Gnome</option>
          <option value="Half-Elf">Half-Elf</option>
          <option value="Halfling">Halfling</option>
          <option value="Half-Orc">Half-Orc</option>
          <option value="Human">Human</option>
          <option value="Tiefling">Tiefling</option>
        </select>
      </div>
      <div className="form-group">
        <input type="number" placeholder="Height" name="height" step="1" value={height} min="0" onChange={e => onChange(e)}/>
        <small className="form-text">
          In Inches</small>
      </div>
      <div className="form-group">
        <input type="date" name="birthdate" value={birthdate} onChange={e => onChange(e)}/>
        <small className="form-text">Date of Birth</small>
      </div>
      <div className="form-group">
        <input type="text" placeholder="location" name="location" value={location} onChange={e => onChange(e)}/>
        <small className="form-text">
        City & state (eg. Spokane, WA)</small>
      </div>
      <div className="form-group">
        <input type="text" placeholder="Skills" name="skills" value={skills} onChange={e => onChange(e)}/>
        <small className="form-text">
          Comma seperated fields, please (eg. Axe-Throwing, Coding, Journalism) </small>
      </div>
      <div className="form-group">
        <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
        <small className="form-text">What's your story?</small>
      </div>

      <div className="my-2">
        <button
          onClick={() => toggleSocialInputs(!displaySocialInputs)}
          type="button"
          className="btn btn-dark">
          Add Social Network Links
        </button>
        <span>Optional</span>
      </div>

      {displaySocialInputs &&
        <Fragment>
          <div className="form-group social-input">
            <i className="fab fa-twitter fa-2x"></i>
            <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e => onChange(e)}/>
          </div>

          <div className="form-group social-input">
            <i className="fab fa-facebook fa-2x"></i>
            <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e => onChange(e)}/>
          </div>

          <div className="form-group social-input">
            <i className="fab fa-youtube fa-2x"></i>
            <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={e => onChange(e)}/>
          </div>

          <div className="form-group social-input">
            <i className="fab fa-instagram fa-2x"></i>
            <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e => onChange(e)}/>
          </div>
        </Fragment>}
      <input type="submit" className="btn btn-primary my-1" />
      <Link to="/dashboard" className="btn btn-light my-1" >Go Back</Link>
      </form>
    </Fragment>
  );
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
