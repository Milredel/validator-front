# ValidatorFront

Launch ValidatorBack `https://github.com/Milredel/validator` to be able to use this little web app.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Test

Run `ng test` to test the project.

## Documentation

You upload a file with the movements and balances to test. Must be a .json file with the following structure :
``
{
    "movements": [
        {"id": 1, "date": "2023-01-23 10:00:00", "label": "First movement", "amount": 10},
        {"id": 3, "date": "2023-01-23 10:10:00", "label": "Third movement", "amount": 30},
        {"id": 2, "date": "2023-01-23 10:05:00", "label": "Second movement", "amount": 20},
        {"id": 4, "date": "2023-01-24 10:00:00", "label": "Fourth movement", "amount": 10},
        {"id": 5, "date": "2023-01-25 10:10:00", "label": "Fifth movement", "amount": 30},
        {"id": 6, "date": "2023-01-25 10:05:00", "label": "Sixth movement", "amount": 20}
    ],
    "balances": [
        {"date": "2023-01-24 00:00:00", "balance": 60},
        {"date": "2023-01-26 00:00:00", "balance": 60}
    ]
}
``

And you'll get the screen below :

<img width="767" alt="file OK" src="https://github.com/Milredel/validator-front/assets/2780114/2a488af9-a84a-447d-95f6-31b6fc8e7954">

If the file contains some error, you'll have that screen :

<img width="764" alt="file KO" src="https://github.com/Milredel/validator-front/assets/2780114/5b3215f8-0bd3-46c4-9959-7d194c87749e">

You can use the action buttons to do some modifications.
The trash icon is here to remove a line (when it is a duplicate).
The wrench icon is here to force change the balance (with the one displayed below the one in bold)

Data will be revalidated each time. And if you come to correct the whole file, you'll be able to download the fixed data in a json file :

<img width="763" alt="file OK after edition" src="https://github.com/Milredel/validator-front/assets/2780114/ce1179b1-08f0-41d1-90be-c72d68efc045">

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
