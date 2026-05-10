let db;

function initSetupForm() {
    const formContainer = document.getElementById('setup-form-container');
    const table = document.getElementById('shots_table');
    const addRowContainer = document.getElementById('add-row-container');

    if (localStorage.getItem('vacuagenda_config')) {
        table.style.display = 'table';
        addRowContainer.style.display = 'flex';
        return;
    }

    formContainer.style.display = 'flex';

    document.getElementById('setup-form').addEventListener('submit', e => {
        e.preventDefault();
        const form = e.target;
        const config = {
            name: form.name.value,
            time_between_shots: Number(form.time_between_shots.value),
            initial_arm: form.initial_arm.value,
            initial_dose: Number(form.initial_dose.value),
            dose_increase: Number(form.dose_increase.value),
            last_dose: Number(form.last_dose.value),
            treatment_duration: Number(form.treatment_duration.value),
        };
        localStorage.setItem('vacuagenda_config', JSON.stringify(config));
        formContainer.style.display = 'none';
        table.style.display = 'table';
        addRowContainer.style.display = 'flex';
    });
}

function clearDb() {
    const objectStore = db.transaction(['shots_os'], 'readwrite').objectStore('shots_os');
    const request = objectStore.clear();

    request.addEventListener('success', () => console.log('Shots db was cleared.'));
    request.addEventListener('error', () => console.error(request.error));
}

function insertOne(record) {
    const objectStore = db.transaction(['shots_os'], 'readwrite').objectStore('shots_os');
    const request = objectStore.add(record);
    request.addEventListener('success', () => console.log('Record added to the shots db.'));
    request.addEventListener('error', () => console.error(request.error));
}

function updateRecord(id, field, value) {
    const tx = db.transaction(['shots_os'], 'readwrite');
    const store = tx.objectStore('shots_os');
    const req = store.get(id);
    req.addEventListener('success', () => {
        const record = req.result;
        record[field] = value;
        store.put(record);
    });
    req.addEventListener('error', () => console.error(req.error));
}

// rowObj { id, date, dose, arm, applied }
function display(rowObj) {
    const tbody = document.querySelector('#shots_table tbody');

    const row = document.createElement('tr');
    row.dataset.id = rowObj.id;

    const dateCell = document.createElement('td');
    dateCell.dataset.col = 'date';
    dateCell.textContent = new Date(rowObj.date)                                                                                        
      .toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' })                                                
      .replace(/ de /g, '-');

    const doseCell = document.createElement('td');
    doseCell.dataset.col = 'dose';
    doseCell.textContent = rowObj.dose;

    const armCell = document.createElement('td');
    armCell.dataset.col = 'arm';
    armCell.textContent = rowObj.arm;

    const appliedCell = document.createElement('td');
    appliedCell.dataset.col = 'applied';
    const img = document.createElement('img');
    img.width = 25;
    img.height = 25;

    if (rowObj.applied) {
        appliedCell.classList.add('applied-yes');
        img.src = 'assets/checked.svg';
    } else {
        appliedCell.classList.add('applied-no');
        img.src = 'assets/unchecked.svg';
    }
    appliedCell.appendChild(img);

    row.appendChild(dateCell);
    row.appendChild(doseCell);
    row.appendChild(armCell);
    row.appendChild(appliedCell);

    tbody.appendChild(row);
}

function startEdit(cell, id, col) {
    if (cell.querySelector('input')) return;

    const originalValue = cell.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = originalValue;
    input.className = 'cell-edit-input';

    cell.textContent = '';
    cell.appendChild(input);
    input.focus();
    input.select();

    let committed = false;

    function commit() {
        if (committed) return;
        committed = true;
        const raw = input.value;
        cell.textContent = raw;
        let value;
        if (col === 'date') value = new Date(raw);
        else if (col === 'dose') value = Number(raw);
        else value = raw;
        updateRecord(id, col, value);
    }

    function cancel() {
        if (committed) return;
        committed = true;
        cell.textContent = originalValue;
    }

    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') { e.preventDefault(); commit(); }
        else if (e.key === 'Escape') { cancel(); }
    });

    input.addEventListener('blur', commit);
}

function toggleApplied(cell, id) {
    const newValue = !cell.classList.contains('applied-yes');
    const img = cell.querySelector('img');

    if (newValue) {
        cell.classList.replace('applied-no', 'applied-yes');
        img.src = 'assets/checked.svg';
    } else {
        cell.classList.replace('applied-yes', 'applied-no');
        img.src = 'assets/unchecked.svg';
    }

    updateRecord(id, 'applied', newValue);
}

function handleTableClick(e) {
    const cell = e.target.closest('td');
    if (!cell) return;
    const row = cell.closest('tr');
    if (!row || !row.dataset.id) return;

    const col = cell.dataset.col;
    const id = Number(row.dataset.id);

    if (col === 'applied') {
        toggleApplied(cell, id);
    } else if (col === 'date' || col === 'dose' || col === 'arm') {
        startEdit(cell, id, col);
    }
}

function deleteRow() {
    const tbody = document.querySelector('#shots_table tbody');
    const lastRow = tbody.lastElementChild;
    if (!lastRow) return;
    const id = Number(lastRow.dataset.id);
    tbody.removeChild(lastRow);
    db.transaction(['shots_os'], 'readwrite').objectStore('shots_os').delete(id);
}

function setupAutohide() {
    const container = document.getElementById('add-row-container');
    let hideTimer;

    function scheduleHide() {
        hideTimer = setTimeout(() => container.classList.add('autohide'), 2000);
    }

    container.addEventListener('mouseenter', () => {
        clearTimeout(hideTimer);
        container.classList.remove('autohide');
    });

    container.addEventListener('mouseleave', scheduleHide);

    scheduleHide();
}

function addRow() {
    const record = {
        id: Date.now(),
        date: new Date(),
        dose: 0,
        arm: '',
        applied: false
    };
    insertOne(record);
    display(record);
}

function init() {
    const objectStore = db.transaction('shots_os').objectStore('shots_os');
    const request = objectStore.getAll();

    request.addEventListener('success', () => {
        if (request.result) {
            console.log("The db has values!");
            let arr = request.result;
            for (const elem in arr) {
                console.log(arr[elem]);
                display(arr[elem]);
            }
        } else {
            console.log("db is undefined");
        }
    });
}

const request = window.indexedDB.open('shots_db', 1);

request.addEventListener('error', () => console.error('Database failed to open'));

request.addEventListener('success', () => {
    console.log('Database opened successfully');
    db = request.result;
    initSetupForm();
    document.getElementById('add-row-btn').addEventListener('click', addRow);
    document.getElementById('delete-row-btn').addEventListener('click', deleteRow);
    document.getElementById('shots_table').addEventListener('click', handleTableClick);
    document.getElementById('reset-btn').addEventListener('click', () => {
        clearDb();
        localStorage.removeItem('vacuagenda_config');
        location.reload();
    });
    setupAutohide();
    init();
});

request.addEventListener('upgradeneeded', event => {
    const db = event.target.result;
    const objectStore = db.createObjectStore('shots_os', { keyPath: 'id' });
    objectStore.createIndex(
        'date_index',
        'date',
        { unique: false, multiEntry: false, locale: 'auto' }
    );
    console.log('Database setup complete');
});
