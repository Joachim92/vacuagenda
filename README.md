TODO:

- DONE | Table obtains values from local db

- DONE | Add rows with a click
    - on hover, display '+' button
    - '+' button clicked -> add row

- Editable values in the table
    - when value clicked -> display edit text mode
        - date
        - dosis
        - arm
    - when 'applied' column clicked, toggle the checkbox svg

## Example of how to manually insert a record
```
    const record = {
        id: 1,
        date: new Date(),
        dose: 20,
        arm: 'Izquierdo',
        applied: false
    };
    insertOne(record);
```

# To start local server
```
python3 -m http.server 8000
```