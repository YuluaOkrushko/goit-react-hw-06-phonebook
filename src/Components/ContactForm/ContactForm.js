import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import contactActions from '../../Redux/actions/contactActions';
import styles from './ContactForm.module.css';
import InputMask from 'react-input-mask';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
    isExist: false,
    duplicateContact: '',
  };
  componentDidUpdate(prevState) {
    const { contacts } = this.props;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { name } = this.state;
    const { contacts } = this.props;
    const availableNames = contacts.phoneBookReducer.map(contact =>
      contact.name.toLowerCase(),
    );

    if (availableNames.includes(name.toLowerCase())) {
      this.setState({ isExist: true, duplicateContact: name });
      setTimeout(
        () => this.setState({ isExist: false, duplicateContact: '' }),
        5000,
      );
    } else {
      this.props.onSubmit(this.state);
      this.setState({
        name: '',
        number: '',
        isExist: false,
        duplicateContact: '',
      });
    }
  };
  handleCloseErrorWindow = () => {
    this.setState({
      isExist: false,
    });
  };

  render() {
    const { name, number, isExist, duplicateContact } = this.state;
    return (
      <div>
        <div>
          <CSSTransition
            in={true}
            appear={true}
            timeout={500}
            classNames={styles}
            unmountOnExit
          >
            <h1 className={styles.title_phonebook}>Phonebook</h1>
          </CSSTransition>
          <CSSTransition
            in={isExist}
            timeout={250}
            classNames={styles}
            unmountOnExit
          >
            <div onClick={this.handleCloseErrorWindow} className={styles.error}>
              {duplicateContact} already exist!
            </div>
          </CSSTransition>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <div className={styles.wrapper}>
              <h3 className={styles.title_item}>Name</h3>
              <input
                className={styles.input}
                type="text"
                autoComplete="off"
                value={name}
                name="name"
                onChange={this.handleChange}
              />
            </div>
          </label>
          <label>
            <div className={styles.wrapper}>
              <h3 className={styles.title_item}>Number</h3>
              <InputMask
                mask="999-99-99"
                className={styles.input}
                type="tel"
                autoComplete="off"
                onChange={this.handleChange}
                value={number}
                name="number"
                placeholder="000-00-00"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"
              />
            </div>
          </label>
          <div className={styles.button_wrapper}>
            <button
              className={styles.button}
              type="submit"
              disabled={name === '' || number === '' ? true : false}
            >
              Add contact
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts,
});
const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch(contactActions.addContact(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
