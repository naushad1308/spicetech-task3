loadDataOnPageLoad()


// save data in localStorage
function saveData() {
    const inputs = document.querySelectorAll("#inputFields input")

    let data = {};

    inputs.forEach(input => {
        data[input.placeholder] = input.value.trim();

    });
    console.log(data)

    localStorage.setItem("formData", JSON.stringify(data))


    // Clear input fields
    inputs.forEach(input => {
        input.value = '';
    });
    // Updating table with localStorage saved data
    updateTable(data);


}


// Function to update the table with data from localStorage
function updateTable() {
    // console.log(data)
    const tableBody = document.querySelector('#tableBody');
    const savedData = JSON.parse(localStorage.getItem('formData'))
    const noDataRow = document.querySelector('#noDataRow');
    // console.log(savedData)

    if (!savedData || Object.keys(savedData).length === 0) {
        if (!noDataRow) {
            tableBody.innerHTML = '<tr id="noDataRow"><td colspan="6">Data is not available</td></tr>';
        }
    } else {
        if (noDataRow) {
            noDataRow.remove();
        }
        const newRow = document.createElement('tr');
        Object.values(savedData).forEach((val) => {
            const newCell = document.createElement('td');
            newCell.textContent = val;
            newRow.appendChild(newCell);
        });
        tableBody.appendChild(newRow);
    }

}

updateTable()
const saveButton = document.querySelector("#saveButton")
saveButton.addEventListener("click", saveData)


function loadDataOnPageLoad() {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData && Object.keys(savedData).length > 0) {
        updateTable();
    } else {
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '<tr><td colspan="6">Data is not available</td></tr>';
    }
}



// Clear all Data
const clearButton = document.querySelector("#clearButton")

clearButton.addEventListener('click', () => {
    localStorage.removeItem('formData')
    updateTable()
})