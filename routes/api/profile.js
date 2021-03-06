const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator')
// might causes issues ^


const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.user.id})
      .populate('user', ['name', 'avatar']);

      if(!profile) {
        return res.status(400).json(
          { msg: 'There is no profile for this user'});
      }

      res.json(profile);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/',[auth, [
  check('skills', 'Skills is required')
    .not()
    .isEmpty(),
  check('birthdate', 'Date of birth is required')
    .not()
    .isEmpty(),

]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    alignment,
    race,
    height,
    birthdate,
    location,
    skills,
    bio,
    youtube,
    facebook,
    twitter,
    instagram,
  } = req.body;

  //Build profile object
  const profileFields = {};
  profileFields.user = req.user.id;

  if (alignment) profileFields.alignment = alignment;
  if (race) profileFields.race = race;
  if (height) profileFields.height = height;
  if (birthdate) profileFields.birthdate = birthdate;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (skills) {
    profileFields.skills = skills.split(',').map(skill => skill.trim());
  }

  //Build social object
  profileFields.social = {}
  if(youtube) profileFields.social.youtube = youtube;
  if(twitter) profileFields.social.twitter = twitter;
  if(facebook) profileFields.social.facebook = facebook;
  if(instagram) profileFields.social.instagram = instagram;

  try {
    let profile = await Profile.findOne({ user: req.user.id});

    if(profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true}
      );

      return res.json(profile);
    }

    //Create
    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile);

  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   Get api/profile
// @desc    Get all profiles
// @access  Public
router.get('/',  async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   Get api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id',  async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id})
      .populate('user', ['name', 'avatar']);

    if(!profile) return res.status(400).json({msg: 'Profile not found'});

    res.json(profile);
  } catch(err) {
    console.error(err.message);
    if(err.kind == 'ObjectID') {
      return res.status(400).json({msg: 'Profile not found'});
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/profile
// @desc    DELETE profile, user, & post
// @access  Private
router.delete('/',  auth, async (req, res) => {
  try {
    // Remove user posts
    await Post.deleteMany({ user: req.user.id });

    // Remove profile
    await Profile.findOneAndRemove({user : req.user.id});
    // Remove User
    await Profile.findOneAndRemove({_id : req.user.id});

    res.json({ msg: 'User Deleted'});
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
