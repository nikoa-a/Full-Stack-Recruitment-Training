import React, { useState } from "react";
import Contact from "../models/Contact";

interface State {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

interface Props {
  addContact(contact: Contact): void;
}

const ContactForm = (props: Props) => {
  const [state, setState] = useState<State>({
    firstname: "",
    lastname: "",
    email: "",
    phone: ""
  })

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value
      }
    })
  }

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!state.firstname || !state.lastname || !state.email || !state.phone) {
      return;
    }
    const contact = new Contact(
        state.firstname, state.lastname, state.email, state.phone, 0
    );
    props.addContact(contact);
    setState({
      firstname: "",
      lastname: "",
      email: "",
      phone: ""
    })
  }

  return (
    <div style={{ width: "16%", margin: "auto" }}>
      <form onSubmit={onSubmit}>
        <label htmlFor="firstname">Firstname </label>
        <input 
          type="text" 
          name="firstname" 
          id="firstname" 
          onChange={onChange} 
          value={state.firstname} />
        <br />
        <label htmlFor="lastname">Lastname </label>
        <input 
          type="text" 
          name="lastname" 
          id="lastname" 
          onChange={onChange} 
          value={state.lastname} />
        <br />
        <label htmlFor="email">Email </label>
        <input 
          type="email" 
          name="email" 
          id="email" 
          onChange={onChange} 
          value={state.email} />
        <br />
        <label htmlFor="phone">Phone </label>
        <input 
          type="tel" 
          name="phone" 
          id="phone" 
          onChange={onChange} 
          value={state.phone} />
        <br />
        <button type="submit">Add Contact</button>
      </form>
    </div>
  )
}

export default ContactForm;