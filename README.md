
## To run this project

Update mysql credential details in "/config/db.config.js

    module.exports = {
        HOST: "localhost",
        USER: "root",
        PASSWORD: "",
        DB: "hotel"
    };

- Run the script located at "/docs/hotel.sql" to create the database on MySQL Workbench or on another program of your preference.

- Install the node modules running the comands below at the root folder:

```batch
    npm install
```

- Run the API:

```batch
    npm run dev
```

- Acess the URL:

```batch
    http://localhost:3000
```

## API SERVICES

```POST
    /hotel/cheapest(Cheapest Hotel List)

    Request Parameters:

    {
        "booking_date(Date of booking)": {
            "from": "2022-06-28 00:00:00",
            "to": "2022-06-28 12:00:00"
        },
        "rooms(Rooms required)": 1,
        "sharing(No.of persons)": 2,
        "distance"(filter based on distance in km): 50
        
    }

## Logic

----------------------------------------

- Acrod hotel per day calculations:

    sharing = 4

    days = 1

    rent = 7000

    discount = 12% (0.12)

    rent after discount = 7000 - (7000 * 0.12) (840) = 6160

    breakfast/lunch/dinner per head = 250

    In Acrod breakfast/lunch/dinner are included, so no food charges

    Total rent =  6160

- Taj Per day calculations:

    sharing = 3

    days = 1

    rent = 3500 

    discount = 15% (0.15)

    Rent after discount = 3500 - (3500 * 0.15) (525) = 2975

    breakfast/lunch/dinner per head = 250

    In Taj breakfast/lunch/dinner are included, so no food charges

    for two days rent = 2975 * 2 = 5950

    Total rent =  5950

- Le Royal per day calculations:

    sharing = 3

    days = 1

    rent = 3500

    discount = 8% (0.08)

    rent after discount = 3500 - (3500 * 0.8) (280) = 3220

    breakfast/lunch/dinner per head = 250

    In Le Royal lunch is excluded, so food charges applicable

    if lunch, rent = 3220 + (sharing(3) * 250)(750) = 3970

    Total rent =  3970

- Promenade Per day calculations:

    sharing = 2

    days = 1

    rent = 3000 

    discount = 17% (0.17)

    rent after discount = 3000 - (3000 * 0.17) (510) = 2490

    breakfast/lunch/dinner per head = 250

    In Promenade lunch and dinner are excluded, so food charges applicable

    if lunch, rent = 2490 + (sharing(2) * 250)(500) = 2990

    if dinner, rent = 2990 + (sharing(2) * 250)(500) = 3490

    for two days rent = 3490 * 2 = 6980

    Total rent =  6980

- Villa Rock Per day calculations:

    sharing = 3

    days = 1

    rent = 5000 

    discount = 14% (0.14)

    rent after discount = 5000 - (5000 * 0.14) (700) = 4300

    breakfast/lunch/dinner per head = 250

    In Villa rock lunch and dinner are excluded, so food charges applicable

    if lunch, rent = 4300 + (sharing(3) * 250)(750) = 5050

    if dinner, rent = 5050 + (sharing(3) * 250)(750) = 5800

    Total rent =  5800