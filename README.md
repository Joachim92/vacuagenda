TODO:

- DONE | Table obtains values from local db

- DONE | Add rows with a click
    - on hover, display '+' button
    - '+' button clicked -> add row

- DONE | Editable values in the table
    - when value clicked -> display edit text mode
        - date
        - dosis
        - arm
    - when 'applied' column clicked, toggle the checkbox svg
- Add a minus button at the bottom of the table and place it on the left side, prior to the `#add-row-btn` button. 
Make both buttons slowly dissapear after a couple of seconds and show them again on hover. Make sure to dissapear them again after some time again.

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