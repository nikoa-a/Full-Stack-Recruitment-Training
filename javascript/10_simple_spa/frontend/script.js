var mode = "";

window.onload = function() {
    createForm();
    getContacts();
}

const createForm = () => {
    const root = document.getElementById("root");
    const form = document.createElement("form");
    form.setAttribute("class", "m-3");

    // Name input & label
    const nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "name");
    nameLabel.setAttribute("class", "form-label");
    const nameLabelText = document.createTextNode("Name");
    nameLabel.appendChild(nameLabelText);
    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", "name");
    nameInput.setAttribute("id", "name");
    nameInput.setAttribute("class", "form-control");

    // Lastname input & label
    const lastNameLabel = document.createElement("label");
    lastNameLabel.setAttribute("for", "lastname");
    lastNameLabel.setAttribute("class", "form-label");
    const lastNameLabelText = document.createTextNode("Lastname");
    lastNameLabel.appendChild(lastNameLabelText);
    const lastNameInput = document.createElement("input");
    lastNameInput.setAttribute("type", "text");
    lastNameInput.setAttribute("name", "lastname");
    lastNameInput.setAttribute("id", "lastname");
    lastNameInput.setAttribute("class", "form-control");

    // Email input & label
    const emailLabel = document.createElement("label");
    emailLabel.setAttribute("for", "email");
    emailLabel.setAttribute("class", "form-label");
    const emailLabelText = document.createTextNode("Email");
    emailLabel.appendChild(emailLabelText);
    const emailInput = document.createElement("input");
    emailInput.setAttribute("type", "email");
    emailInput.setAttribute("name", "email");
    emailInput.setAttribute("id", "email");
    emailInput.setAttribute("class", "form-control");

    // Phone input & label
    const phoneLabel = document.createElement("label");
    phoneLabel.setAttribute("for", "phone");
    phoneLabel.setAttribute("class", "form-label");
    const phoneLabelText = document.createTextNode("Phone");
    phoneLabel.appendChild(phoneLabelText);
    const phoneInput = document.createElement("input");
    phoneInput.setAttribute("type", "tel");
    phoneInput.setAttribute("name", "phone");
    phoneInput.setAttribute("id", "phone");
    phoneInput.setAttribute("class", "form-control");

    // Submit button
    const submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("id", "submitbutton");
    submitButton.setAttribute("class", "btn btn-primary");
    submitButton.setAttribute("value", "Add");

    form.append(nameLabel, nameInput, lastNameLabel, lastNameInput,
        emailLabel, emailInput, phoneLabel, phoneInput, submitButton);
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        addContact();
    });

    root.appendChild(form);
}

const addContact = async () => {
    const nameInput = document.getElementById("name");
    const lastNameInput = document.getElementById("lastname");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");

    let contact = {
        "name": nameInput.value,
        "lastname": lastNameInput.value,
        "email": emailInput.value,
        "phone": phoneInput.value
    };
    let request = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(contact)
    };
    let url = "/api/contacts/";

    if(mode) {
        request.method = "PUT";
        url = "/api/contacts/" + mode;
    }

    const response = await fetch(url, request);
    if(response.ok) {
        nameInput.value = "";
        lastNameInput.value = "";
        emailInput.value = "";
        phoneInput.value = "";
        mode = "";
        let submitButton = document.getElementById("submitbutton");
        submitButton.value = "Add";
        getContacts();
    } else {
        console.log("Server responded with a status", response.status, response.statusText);
    }
}

const getContacts = async () => {
    const response = await fetch("/api/contacts/");
    if(response.ok) {
        const list = await response.json();
        if(list) {
            populateTable(list);
        }
    } else {
        console.log("Server responded with a status", response.status, response.statusText);
    }
}

const removeContact = async (id) => {
    const url = "/api/contacts/" + id;
    const request = {
        method: "DELETE"
    }
    const response = await fetch(url, request);
    if(response.ok) {
        getContacts();
    } else {
        console.log("Server responded with a status", response.status, response.statusText);
    }
}

const editContact = (contact) => {
    const nameInput = document.getElementById("name");
    const lastnameInput = document.getElementById("lastname");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    nameInput.value = contact.name;
    lastnameInput.value = contact.lastname;
    emailInput.value = contact.email;
    phoneInput.value = contact.phone;
    mode = contact._id;
    const submitButton = document.getElementById("submitbutton");
    submitButton.value = "Save";
}

const populateTable = (list) => {
    const root = document.getElementById("root");
    const oldTable = document.getElementById("table");
    if(oldTable) {
        root.removeChild(oldTable);
    }
    const table = document.createElement("table");
    table.setAttribute("class", "table table-striped");
    table.setAttribute("id", "table");

    // Table headers
    const header = document.createElement("thead");
    const headerRow = document.createElement("tr");

    // Name header
    const nameHeader = document.createElement("th");
    const nameHeaderLabel = document.createTextNode("Name");
    nameHeader.appendChild(nameHeaderLabel);

    // Lastname header
    const lastNameHeader = document.createElement("th");
    const lastNameHeaderLabel = document.createTextNode("Lastname");
    lastNameHeader.appendChild(lastNameHeaderLabel);

    // Email header
    const emailHeader = document.createElement("th");
    const emailHeaderLabel = document.createTextNode("Email");
    emailHeader.appendChild(emailHeaderLabel);

    // Phone header
    const phoneHeader = document.createElement("th");
    const phoneHeaderLabel = document.createTextNode("Phone");
    phoneHeader.appendChild(phoneHeaderLabel);

    // Remove header
    const removeHeader = document.createElement("th");
    const removeHeaderLabel = document.createTextNode("Remove");
    removeHeader.appendChild(removeHeaderLabel);

    // Edit header
    const editHeader = document.createElement("th");
    const editHeaderLabel = document.createTextNode("Edit");
    editHeader.appendChild(editHeaderLabel);

    headerRow.append(nameHeader, lastNameHeader, emailHeader, 
        phoneHeader, removeHeader, editHeader);
    header.appendChild(headerRow);
    table.appendChild(header);

    // Table body
    const body = document.createElement("tbody");
    for(let i = 0; i < list.length; i++) {
        const row = document.createElement("tr");
        for(x in list[i]) {
            if(x === "_id" || x === "__v") {
                continue;
            }
            const column = document.createElement("td");
            const info = document.createTextNode(list[i][x]);
            column.appendChild(info);
            row.appendChild(column);
        }
        const removeColumn = document.createElement("td");
        const removeButton = document.createElement("button");
        removeButton.setAttribute("class", "btn btn-danger");
        const removeText = document.createTextNode("Remove");
        removeButton.appendChild(removeText);
        removeButton.addEventListener("click", function(even) {
            removeContact(list[i]._id);
        });
        removeColumn.appendChild(removeButton);

        const editColumn = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.setAttribute("class", "btn btn-secondary");
        const editText = document.createTextNode("Edit");
        editButton.appendChild(editText);
        editButton.addEventListener("click", function(even) {
            editContact(list[i]);
        });
        editColumn.appendChild(editButton);

        row.append(removeColumn, editColumn);
        body.appendChild(row);
    }
    table.appendChild(body);
    root.appendChild(table);
}