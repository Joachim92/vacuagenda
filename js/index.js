let db;
let nextId = 0;

function initSetupForm() {
    const formContainer = document.getElementById('setup-form-container');
    const table = document.getElementById('shots_table');
    const addRowContainer = document.getElementById('add-row-container');

    if (localStorage.getItem('vacuagenda_config')) {
        const config = JSON.parse(localStorage.getItem('vacuagenda_config'));
        const greeting = document.getElementById('greeting');
        greeting.innerHTML = 'Hola <strong>' + config.name + '</strong>!';
        greeting.style.display = 'block';
        document.getElementById('table-tabs').style.display = 'flex';
        table.style.display = 'table';
        addRowContainer.style.display = 'flex';
        document.getElementById('reset-container').style.display = 'block';
        return;
    }

    formContainer.style.display = 'flex';
    document.getElementById('treatment_start_date').value = new Date().toISOString().slice(0, 10);

    document.getElementById('setup-form').addEventListener('submit', e => {
        e.preventDefault();
        const form = e.target;
        const config = {
            name: form.name.value,
            time_between_shots: Number(form.time_between_shots.value),
            initial_arm: form.initial_arm.value,
            treatment_start_date: form.treatment_start_date.value,
            dose: Number(form.dose.value),
            treatment_duration: Number(form.treatment_duration.value),
        };
        localStorage.setItem('vacuagenda_config', JSON.stringify(config));
        const greeting = document.getElementById('greeting');
        greeting.innerHTML = 'Hola <strong>' + config.name + '</strong>!';
        greeting.style.display = 'block';
        generateInitialTable(config);
        formContainer.style.display = 'none';
        document.getElementById('table-tabs').style.display = 'flex';
        table.style.display = 'table';
        addRowContainer.style.display = 'flex';
        document.getElementById('reset-container').style.display = 'block';
    });
}

function generateInitialTable(config) {
    const count = Math.ceil(config.treatment_duration / config.time_between_shots);
    const alternateArm = config.initial_arm === 'Izquierdo' ? 'Derecho' : 'Izquierdo';
    const start = new Date(config.treatment_start_date + 'T00:00:00');

    for (let i = 0; i < count; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i * config.time_between_shots);
        const record = {
            id: nextId++,
            date,
            dose: config.dose,
            arm: i % 2 === 0 ? config.initial_arm : alternateArm,
            applied: false,
        };
        insertOne(record);
        display(record);
    }
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
    const tbody = document.querySelector(rowObj.applied ? '#applied_shots_table tbody' : '#shots_table tbody');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const row = document.createElement('tr');
    row.dataset.id = rowObj.id;
    row.dataset.date = new Date(rowObj.date).toISOString();
    if (new Date(rowObj.date) < today && !rowObj.applied) row.classList.add('missed');

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

function insertRowSorted(tbody, row) {
    const id = Number(row.dataset.id);
    for (const existing of tbody.querySelectorAll('tr')) {
        if (Number(existing.dataset.id) > id) {
            tbody.insertBefore(row, existing);
            return;
        }
    }
    tbody.appendChild(row);
}

function toggleApplied(cell, id) {
    const newValue = !cell.classList.contains('applied-yes');
    const img = cell.querySelector('img');
    const row = cell.closest('tr');

    if (newValue) {
        cell.classList.replace('applied-no', 'applied-yes');
        img.src = 'assets/checked.svg';
        row.classList.remove('missed');
        insertRowSorted(document.querySelector('#applied_shots_table tbody'), row);
    } else {
        cell.classList.replace('applied-yes', 'applied-no');
        img.src = 'assets/unchecked.svg';
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (new Date(row.dataset.date) < today) row.classList.add('missed');
        insertRowSorted(document.querySelector('#shots_table tbody'), row);
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
        id: nextId++,
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
        const arr = request.result;
        if (arr.length > 0) {
            nextId = Math.max(...arr.map(r => r.id)) + 1;
            for (const record of arr) {
                display(record);
            }
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
    document.getElementById('applied_shots_table').addEventListener('click', handleTableClick);

    const tabPending = document.getElementById('tab-pending');
    const tabApplied = document.getElementById('tab-applied');
    const pendingTable = document.getElementById('shots_table');
    const appliedTable = document.getElementById('applied_shots_table');

    const addRowContainer = document.getElementById('add-row-container');

    const resetContainer = document.getElementById('reset-container');

    tabPending.addEventListener('click', () => {
        tabPending.classList.add('active');
        tabApplied.classList.remove('active');
        pendingTable.style.display = 'table';
        appliedTable.style.display = 'none';
        addRowContainer.style.display = 'flex';
        resetContainer.style.display = 'block';
    });

    tabApplied.addEventListener('click', () => {
        tabApplied.classList.add('active');
        tabPending.classList.remove('active');
        appliedTable.style.display = 'table';
        pendingTable.style.display = 'none';
        addRowContainer.style.display = 'none';
        resetContainer.style.display = 'none';
    });
    const resetModal = document.getElementById('reset-modal');
    document.getElementById('reset-btn').addEventListener('click', () => {
        resetModal.classList.add('open');
    });
    document.getElementById('reset-cancel-btn').addEventListener('click', () => {
        resetModal.classList.remove('open');
    });
    document.getElementById('reset-confirm-btn').addEventListener('click', () => {
        clearDb();
        localStorage.removeItem('vacuagenda_config');
        location.reload();
    });
    // setupAutohide();
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
