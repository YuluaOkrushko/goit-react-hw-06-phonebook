import React, {Component} from 'react';
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import ContactForm from "./Components/ContactForm/ContactForm";
import ContactList from "./Components/ContactList/ContactList";
import Filter from "./Components/Filter/Filter";
import styles from "./App.module.css"


class App extends Component {
    render(){
        const {contacts} = this.props;
        return (
            <div className={styles.wrapper}>
                <ContactForm/>
                <CSSTransition
                in={contacts.phoneBookReducer.length > 1}
                timeout={500}
                classNames={styles}
                unmountOnExit>
                    <Filter/>
                </CSSTransition>
                <ContactList/>
            </div>
    );}
  }
const mapStateToProps = (state) => ({
    contacts: state.contacts
})
export default connect(mapStateToProps)(App)