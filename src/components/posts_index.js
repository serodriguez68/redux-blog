import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';


class PostIndex extends Component {
  componentDidMount(){
    // It doesn't matter if we use componentDidMount or componentWillMount
    // in the case of an ajax request because of its async nature
    this.props.fetchPosts();
  }

  renderPosts(){

    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapSateToProps(state){
  return { posts: state.posts };
}

// Shorthand to connect action creator to the component without declaring
// a mapDispatchtoProps function.  The mapDispatchtoProps option should be used
// when you need to add extra logic to the binding process. Otherwise connect
// will handle it for us.
// fetchPosts is available in this.props.fetchPosts
export default connect(mapSateToProps, { fetchPosts })(PostIndex);
