import { Component } from 'react';
import s from './App.module.css';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

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

  createContact = ({ name, number }) => {
    if (!name || !number) {
      return alert(`Some field is empty.`);
    }
    const sameName = this.findSameName(name);
    if (sameName) {
      return alert(`${name} is already in contacts.`);
    }
    const newContact = {
      id: uuidv4(),
      name,
      number,
    };
    this.setState(({ contacts }) => ({ contacts: [...contacts, newContact] }));
  };

  findSameName = name => {
    const { contacts } = this.state;
    return contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );
  };

  deleteContact = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };

  changeFilter = e => {
    const { value } = e.currentTarget;
    this.setState({ filter: value });
  };

  getVisiblesContacts = () => {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );
  };

  render() {
    const { filter } = this.state;
    const filtredContacts = this.getVisiblesContacts();

    return (
      <div className={s.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.createContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={filtredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
