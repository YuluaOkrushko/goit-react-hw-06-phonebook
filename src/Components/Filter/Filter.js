import React from 'react';
import { connect } from "react-redux";
import filterActions from "../../Redux/actions/filterActions";
import styles from "./Filter.module.css"
import PropTypes from "prop-types";

const Filter = ({ value, onFilter }) => (
    <div className={styles.wrapper}>
        <p className={styles.title}>Find contact</p>
        <input
        className={styles.input}
        type="text"
        autoComplete="off"
        onChange={onFilter}
        value={value}
        name="filter"></input>
    </div>
);

const mapStateToProps = (state) => ({
    filter: state.filter,
})
const mapDispatchToProps = (dispatch) => ({
    onFilter: (e) => dispatch(filterActions(e.target.value)),
})

Filter.propTypes = {
    onFilter: PropTypes.func,
    value: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);