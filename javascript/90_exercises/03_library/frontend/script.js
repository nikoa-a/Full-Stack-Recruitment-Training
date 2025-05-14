window.onload = function() {
    getBooks();

    const loanedOnlyCheckbox = document.getElementById('loanedOnly');
    loanedOnlyCheckbox.addEventListener('change', function() {
        if (loanedOnlyCheckbox.checked) {
            getAvailableBooks();
        } else {
            getBooks();
        }
    });
}

const getBooks = async () => {
    const response = await fetch("/api/books/");
    if(response.ok) {
        const list = await response.json();
        if(list) {
            populateTable(list);
        }
    } else {
        console.log("Server responded with a status", response.status, response.statusText);
    }
}

const getAvailableBooks = async () => {
    const response = await fetch("/api/loan/");
    if(response.ok) {
        const list = await response.json();
        if(list) {
            populateTable(list);
        }
    } else {
        console.log("Server responded with a status", response.status, response.statusText);
    }
}

const loanOrReturnBook = async (id) => {
    const url = "/api/books/" + id;
    const request = {
        method: "PUT"
    }
    const response = await fetch(url, request);
    if(response.ok) {
        getBooks();
    } else {
        console.log("Server responded with a status", response.status, response.statusText);
    }
}

const populateTable = (list) => {
    const bookTable = document.getElementById("bookTable");
    const oldTable = document.getElementById("table");
    if(oldTable) {
        bookTable.removeChild(oldTable);
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

    // Author header
    const authorHeader = document.createElement("th");
    const authorHeaderLabel = document.createTextNode("Author");
    authorHeader.appendChild(authorHeaderLabel);

    // Year header
    const yearHeader = document.createElement("th");
    const yearHeaderLabel = document.createTextNode("Year");
    yearHeader.appendChild(yearHeaderLabel);

    // Genre header
    const genreHeader = document.createElement("th");
    const genreHeaderLabel = document.createTextNode("Genre");
    genreHeader.appendChild(genreHeaderLabel);

    // Loaned header
    const loanedHeader = document.createElement("th");
    const loanedHeaderLabel = document.createTextNode("Loaned");
    loanedHeader.appendChild(loanedHeaderLabel);

    // Loan / Return header
    const loanReturnHeader = document.createElement("th");
    const loanReturnHeaderLabel = document.createTextNode("Loan / Return");
    loanReturnHeader.appendChild(loanReturnHeaderLabel)

    headerRow.append(nameHeader, authorHeader, yearHeader, 
        genreHeader, loanedHeader, loanReturnHeader);
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
        const loanReturnColumn = document.createElement("td");
        const loanButton = document.createElement("button");
        loanButton.setAttribute("class", "btn btn-primary");
        const removeText = document.createTextNode("Loan / Return");
        loanButton.appendChild(removeText);
        loanButton.addEventListener("click", function(event) {
            loanOrReturnBook(list[i]._id);
        });
        loanReturnColumn.appendChild(loanButton);

        row.append(loanReturnColumn);
        body.appendChild(row);
    }
    table.appendChild(body);
    bookTable.appendChild(table);
}