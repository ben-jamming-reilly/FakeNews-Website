import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import { getPosts } from '../../actions/post';

const Posts = ({
  getPosts,
  post: { posts }
}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const [Hot, toggleHot] = useState(false);

  return (
    <Fragment>
      <h1 className="large text-primary">Real News Stories</h1>
      <p className="lead">
        See what has been recently happening in the world
      </p>
      <button
        className='btn btn-primary'
        type="button"
        onClick={() => toggleHot(true)}
      >
        <i class="fas fa-fire-alt"></i>{' '}
        Hotest
      </button>
      <button
        className='btn btn-dark'
        type="button"
        onClick={() => toggleHot(false)}
      >
        <i class="far fa-clock"></i>{' '}
        Latest
      </button>
      <div className="posts">
      {!posts ? (<Spinner />) :
        (
          (!Hot ?
            (
              posts.sort((p1, p2) =>  Date.parse(p2.date) - Date.parse(p1.date))
                .map(post => (<PostItem key={post._id} post={post} />))
            ) : (
              posts.sort((p1, p2) => p2.likes.length - p1.likes.length)
                .map(post => (<PostItem key={post._id} post={post} />))
            )
          )
        )
      }
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
