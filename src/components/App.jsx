import React, { Component } from "react";
import Form from "./Form";
import ContactList from "./ContactList";
import Filter from "./Filter";
import { nanoid } from "nanoid";

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const persedContacts = contacts ? JSON.parse(contacts) : [];

    if (persedContacts) {
      this.setState({ contacts: persedContacts });
    }
  };

  componentDidUpdate(prevPops, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  };


  handleSubmit = contact => {
    const isNameUnique = !this.state.contacts.some(
      existingContact => existingContact.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isNameUnique) {
      const newContact = { ...contact, id: nanoid() };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
        filter: '',
      }));
    } else {
      alert(`${contact.name} is already in contacts.`);
    }
  };


  filterContacts = filter => {
    this.setState({ filter });
  };

  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(
      contact =>
        contact.name &&
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          backgroundColor: 'lightblue',
        }}>
        <div>
          <h1>Phonebook</h1>
          <Form onSubmit={this.handleSubmit} />
          <h2>Contacts</h2>
          <Filter filter={filter} onFilter={this.filterContacts.bind(this)} />
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={this.handleDelete}
          />
        </div>
      </div >
    );
  }
}

export { App };
