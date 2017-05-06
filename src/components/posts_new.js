import React, { Component } from 'react';
// Field: React component used to generate input fields. Handles all changes and
// helps us avoid writting a lot of boilerplate code.
// reduxForm: function that is very similar to the connect helper to react-redux.
// Use as you would use connect helper.
// Helps this component communicate with the form reducer. It manages the
// STATE of our form (not the html, not posting to a remote url, that is left to us)
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

  // field argument contains some event handlers that we need to wire up
  // to the jsx we are returning. We need to make sure the Field component
  // knows that it is responsible for dealing with the input tag that this
  // function returns
  // field also has info on errors on field.meta.error
  renderField(field){
    // equivalent to
    // const touched = field.meta.touched;
    // const error = field.meta.error;
    const { meta: { touched, error } } = field;
    const  className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return(
      <div className={className}>
        <label>{field.label}</label>
        <input
          className='form-control'
          type="text"
          // field.input has a lot of event handlers and properties.
          // Here we are telling to wire up ALL those as props on the input field
          // replaces:
          // onChange={field.input.onChange}
          // onBlur={field.input.onBlur}
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
      // field.meta.touched is tracked internally by redux form. It tracks
      // when a field has been touched (used focused in and then blured out)
      // Only on this case we want to show error messages
    );
  }

  onSubmit(values){
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {

    // This is a property that has been passed to the component on behalf
    // of redux-form (given on export default reduxFrom)
    // handleSubmit is a redux-form function that handles all the redux-form
    // part of form submittal (state and validation). We must pass a function
    // that will be called if everything is ok with handleSubmit
    const { handleSubmit } = this.props;

    // name: the field name
    // component: tells the Field component how to render on the screen.
    //    Function that returns some jsx
    //  other props: you may pass any arbitrary prop to field and they will
    //    be passed as part of the argument that the renderField function recieves
    //    when called
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
        <Field
          label='Title'
          name="title"
          component={this.renderField}
        />
        <Field
          label='Categories'
          name="categories"
          component={this.renderField}
        />
        <Field
          label='Post Content'
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to='/' className='btn btn-danger'>Cancel</Link>
      </form>
    );
  }
}

// The validate function must return an errors object (even if it is an empty object)
// Values is an object with the values that the user entered in the form
// { title: 'my title', categories: 'my, categories', content: '' }
function validate(values){
  const errors = {};

  // Validate the inputs from 'values object'
  if(!values.title){
    // errors.Y must map EXACTLY to the name of the field involved.
    errors.title = "Enter a title!";
  }

  if (!!values.title && values.title.length <= 3) {
    errors.title = "The title must be larger than 3 characters";
  }

  if(!values.categories){
    errors.categories = "Enter some categories";
  }

  if(!values.content){
    errors.content = "Enter some content please";
  }

  // If errors is empty {} the form is fine to submit.
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

// requires a single argument: configuration options.
//    the form: property is the name of the form.
//    Needed for rendering multiple forms on the same screen.
//    MAKE SURE THAT STRING IS UNIQUE IN THE APP)
export default reduxForm({
  // equal to validate: validate
  // validate key must recieve a function where validation will take place
  validate,
  form: 'PostNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
