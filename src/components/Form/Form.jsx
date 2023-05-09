import React, { Component } from "react";
import css from './Form.module.css';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  addContact = () => {
    const { name, number } = this.state;
    const contact = { name, number };
    this.props.onSubmit(contact);
  };

  // addContact = contact => {
  //   const { name } = contact;
  //   const lowerCaseName = name.toLowerCase();
  //   const isNameUnique = !this.state.contacts.some(
  //     existingContact => existingContact.name.toLowerCase() === lowerCaseName
  //   );

  //   if (isNameUnique) {
  //     const id = nanoid();
  //     this.setState(prevState => ({
  //       contacts: [...prevState.contacts, { ...contact, id }],
  //     }));
  //   } else {
  //     alert(`${name} is already in contacts.`);
  //   }
  // };


  contactNameId = nanoid();
  contactNumberId = nanoid();


  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value, });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.reset();
    this.props.onSubmit(this.state);

  }
  reset = () => {
    this.setState({
      name: '',
      number: '',
    })
  }

  render() {
    return (
      <form className={css.form}>
        <label className={css.label} htmlFor="name">
          Name
        </label>
        <input
          className={css.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={this.state.name}
          onChange={this.handleChange}
        />
        <label className={css.label} htmlFor="number">
          Number
        </label>
        <input
          className={css.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={this.state.number}
          onChange={this.handleChange}
        />
        <button
          className={css.btn}
          type="submit"
          onClick={() => {
            this.addContact();
            this.reset();
          }}
        >
          Add Contact
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
