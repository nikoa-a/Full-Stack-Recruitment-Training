import Contact from "../models/Contact";

interface Props {
  list: Contact[];
  removeContact(id: number): void;
}

const ContactList = (props: Props) => {
  const contactJSX = props.list.map((contact) => {
    return (
      <tr key={contact.id}>
        <td>{contact.firstname}</td>
        <td>{contact.lastname}</td>
        <td>{contact.email}</td>
        <td>{contact.phone}</td>
        <td>
          <button 
            onClick={() => props.removeContact(contact.id)}
            style={{ backgroundColor: "red"}}>
              Remove
          </button>
        </td>
      </tr>
    )
  })

  return (
    <table style={{ width: "16%", margin: "auto" }}>
      <thead>
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {contactJSX}
      </tbody>
    </table>
  )
}

export default ContactList;