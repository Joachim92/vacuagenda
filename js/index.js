console.log("index.js running!");

let db;

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

// rowObj { id, date, dose, arm, applied }
function display(rowObj) {
    const tbody = document.querySelector('#shots_table tbody');

    const row = document.createElement('tr');

    const dateCell = document.createElement('td');
    dateCell.textContent = new Date(rowObj.date).toISOString().slice(0,10);

    const doseCell = document.createElement('td');
    doseCell.textContent = rowObj.dose;

    const armCell = document.createElement('td');
    armCell.textContent = rowObj.arm;

    const appliedCell = document.createElement('td');
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
    const record = {
        id: 1,
        date: new Date(),
        dose: 20,
        arm: 'Izquierdo',
        applied: false
    };
    insertOne(record);
    
    const record2 = {
        id: 2,
        date: new Date(),
        dose: 21,
        arm: 'Derecho',
        applied: false
    };
    insertOne(record2);

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