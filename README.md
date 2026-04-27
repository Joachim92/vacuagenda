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
- DONE | Add a minus button at the bottom of the table and place it on the left side, prior to the `#add-row-btn` button. 
Make both buttons slowly dissapear after a couple of seconds and show them again on hover. Make sure to dissapear them again after some time again.

  - The first time the user visits the website, display a form with these fields:
    - [name]: Nombre
    - [time_between_shots]: Cada cuanto te aplicas las vacunas? (semanal, mensual)
    - [initial_arm]: Brazo de la primer vacuna
    - [initial_dose]: Dosis inicial (minima)
    - [last_dose]: Dosis final (maxima)
    - [treatment_duration]: Duracion del tratamiento
  - These values should be stored in the IndexedDB as they will later be used to fill the initial table.
  
- When clicking on `#add-row-btn` set the new row values as follow:
  - date: take the date of the previous row and add the 'time_between_shots' from the initial user values.
  - dose: same as the previous row, even if previous is empty. 
  - arm: Values can either be 'Izquierdo' or 'Derecho'. Use the one that is different from the previous one, so that they are alternating. If the previous one is empty, also leave it empty.

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