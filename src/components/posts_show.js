import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  componentDidMount(){

    // Records caching: If you are ok using the data that is already on state
    // (that can possibly be out of date), you can do something like this:
    // Take into account that this is not 'smart' as it doesn't check if the
    // record has been updated.
    // if (!this.props.post) {
    //   // Attempt to re-fetch
    // }

    // React routes gives this
    // params contains all the wildcard values that are part of the url
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  // delete with programmatic navigation
  onDeleteClick(){
    const { id } = this.props.match.params;

    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {

    const { post } = this.props;

    // On the first render, post is not yet available. Waiting for ajax call
    // to resolve
    if (!post) {
      return(
        <div>Loading...</div>
      );
    }

    return (
      <div>
        <Link to="/">Back to Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)} >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}


// First argument is the application level state
// Second argument is the current component level props (i.e ownProps === this.state.props)
function mapSateToProps({ posts }, ownProps){
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapSateToProps, { fetchPost, deletePost })(PostsShow);
