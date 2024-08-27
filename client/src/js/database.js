import { openDB } from "idb";

const initdb = async () =>
  // Creates a new database named 'jate' which will be using version 1 of the database.
  openDB("jate", 1, {
    // Adds database schema if it has not already been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("Database already exists");
        return;
      }
      // Creates a new object store for the data and gives it a key name of 'id' which increments automatically.
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("Database has been created");
    },
  });

// Exports a function to POST to the database.
export const putDb = async (content) => {
  console.log("Put to the database");

  // Creates a connection to the jate database and version.
  const jateDB = await openDB("jate", 1);

  // Creates a new transaction and specifies the database and data privileges.
  const tx = jateDB.transaction("jate", "readwrite");

  // Opens up the desired object store.
  const store = tx.objectStore("jate");

  // Uses the .put() method on the store and passes in the content.
  const request = store.put({ id: 1, value: content });

  // Gets confirmation of the request.
  const result = await request;

  if (result !== undefined) {
    console.log("Data saved to the database, ID:", result);

    // Fetch the newly inserted data to confirm it was saved correctly.
    const savedData = await store.get(result);
    console.log("Saved data:", savedData.value);
    return savedData.value;
  } else {
    console.log(
      "Data wasn't saved to the database!"
    );
    return null;
  }
};

// Exports a function to get the database.
export const getDb = async () => {
  console.log("Get all notes from the database");

  // Creates a connection to the jate database and version.
  const jateDB = await openDB("jate", 1);

  // Creates a new transaction and specifies the database and data privileges.
  const tx = jateDB.transaction("jate", "readonly");

  // Opens up the desired object store.
  const store = tx.objectStore("jate");

  // Uses the .get(1) method to retrieve the value of the first record matching the query.

  const request = store.get(1);

  // Gets confirmation of the request.
  const result = await request;
  result
    ? console.log("Notes retrieved from database:", result.value)
    : console.log("No notes found in database!");
  return result?.value;
};

export const deleteDb = async () => {
  console.log("Notes Deleted!");
  const jateDB = await openDB("jate", 1);
  const tx = jateDB.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.delete(1);
  await request;

  console.log("Note has been removed from the database");
  return true;
};

// Starts database
initdb();