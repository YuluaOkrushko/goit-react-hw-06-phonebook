import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import contactActions from '../../Redux/actions/contactActions';
import { connect } from 'react-redux';
import styles from './ContactList.module.css';
import PropTypes from 'prop-types';

class ContactList extends Component {
  handleDeleteContact = id => () => {
    const { deleteContact } = this.props;
    deleteContact(id);
  };
  render() {
    const { contacts } = this.props;
    return (
      <TransitionGroup component="ul" className={styles.item}>
        {contacts.map(item => (
          <CSSTransition key={item.id} timeout={250} classNames={styles}>
            <li className={styles.list}>
              {item.name} : {item.number}
              <button
                className={styles.button}
                id={item.id}
                onClick={this.handleDeleteContact(item.id)}
              >
                Delete
              </button>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const mapDispatchToProps = dispatch => ({
  deleteContact: id => dispatch(contactActions.deleteContact(id)),
});

const mapStateToProps = ({ contacts, filter }) => {
  const normalizedFilter = filter.filterContactReducer.toLowerCase();
  const visibleNumbers = contacts.phoneBookReducer.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter),
  );
  return { contacts: visibleNumbers };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
