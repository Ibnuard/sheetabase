![Logo](https://github.com/user-attachments/assets/61cdb050-3923-44f2-af56-e05d375410ef)

# Sheetabase

Sheetabase is a lightweight package that transforms Google Sheets into a powerful database with easy-to-use ORM-like querying. It offers promise-based functions for creating, reading, updating, and deleting data, making it simple to integrate and use in your projects.

## Installation

To install Sheetabase, use npm or yarn:

```bash
npm install sheetabase
```

or

```bash
yarn add sheetabase
```

## Usage

Below is an example of how to set up and use Sheetabase to synchronize models, insert data, update data, find data, and delete data.

### Setup

First, import the `setupSheetabase` function from the `sheetabase` package and configure your database:

```javascript
const { setupSheetabase } = require("sheetabase");

const setup = setupSheetabase({
  sheetUrl:
    "https://docs.google.com/spreadsheets/d/1HNnIsnSEP0DbJ8bfO9JH6cx0sIrcRpm6U6ZbkKGEZC4/edit?usp=sharing",
  models: [
    {
      name: "TestDatabase", // Table Name / Sheet Name
      columns: [["id", "name", "status"], { pk: "id", autoIncrement: true }],
    },
  ],
});
```

Note: The sheetUrl must be a Google Sheets URL with edit access set to "Anyone with the link can edit".

### Synchronize Model

Use the `sync` method to synchronize your model to the sheet. This will create the sheet and tables as specified in the setup if they do not already exist.

```javascript
async function testSyncDB() {
  await setup.sync();
}
```

### Insert Data

To insert data into the sheet, use the `create` method.

```javascript
async function testInsertData() {
  await setup.use("TestDatabase").create({
    name: "Jojo",
    status: 200,
  });
}
```

### Update Data

To update data in the sheet, use the `update` method with the data to update and the conditions for the update.

```javascript
async function testUpdateData() {
  const result = await setup
    .use("TestDatabase")
    .update({ name: "Johan XI" }, { where: { id: 1 } });
}

// Example Result
// Result {
//   isError: false,
//   status: 200,
//   message: 'REQUEST COMPLETE',
//   data: { id: 1, name: 'Johan XI', status: 200 }
// }
```

### Find One Record

To find a single record from the sheet, use the `findOne` method with the search conditions.

```javascript
async function testFindOne() {
  const result = await setup.use("TestDatabase").findOne({ where: { id: 1 } });
}

// Example Result
// Result {
//   isError: false,
//   status: 200,
//   message: 'REQUEST COMPLETE',
//   data: { id: 1, name: 'Johan XI', status: 200 }
// }
```

### Find All Record

To find all records that match certain conditions, use the `findAll` method.

```javascript
async function testFindAll() {
  const result = await setup.use("TestDatabase").findAll({ where: { id: 1 } });
}

// Example Result
// Result {
//   isError: false,
//   status: 200,
//   message: 'REQUEST COMPLETE',
//   data: [{ id: 1, name: 'Johan XI', status: 200 }]
// }
```

### Delete Data

To delete data from the sheet, use the `delete` method with the conditions for deletion.

```javascript
async function testDeleteData() {
  const result = await setup.use("TestDatabase").delete({ where: { id: 1 } });
}

// Example Result
// Result {
//   isError: false,
//   status: 200,
//   message: 'REQUEST COMPLETE',
//   data: []
// }
```

### Full Example

Here is the full example combining all the above methods:

```javascript
const { setupSheetabase } = require("sheetabase");

const setup = setupSheetabase({
  sheetUrl:
    "https://docs.google.com/spreadsheets/d/1HNnIsnSEP0DbJ8bfO9JH6cx0sIrcRpm6U6ZbkKGEZC4/edit?usp=sharing",
  models: [
    {
      name: "TestDatabase",
      columns: [["id", "name", "status"], { pk: "id", autoIncrement: true }],
    },
  ],
});

async function testSyncDB() {
  await setup.sync();

  await setup.use("TestDatabase").create({
    name: "Jojo",
    status: 200,
  });

  const updateResult = await setup
    .use("TestDatabase")
    .update({ name: "Johan XI" }, { where: { id: 1 } });

  const findOneResult = await setup
    .use("TestDatabase")
    .findOne({ where: { id: 1 } });

  const findAllResult = await setup
    .use("TestDatabase")
    .findAll({ where: { id: 1 } });

  const deleteResult = await setup
    .use("TestDatabase")
    .delete({ where: { id: 1 } });
}

testSyncDB();
```

## Contributing

If you find any issues or have suggestions for improvements, please create an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
