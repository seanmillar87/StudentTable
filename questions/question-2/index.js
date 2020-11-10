// With the data provided return an array which contains an object
// where the ID is equal to 3.

const users = [
  {
    "id": 1,
    "firstName": "Austen",
    "surname": "De Lascy",
    "email": "adelascy0@msu.edu"
  }, 
  {
    "id": 2,
    "firstName": "Starlene",
    "surname": "Rame",
    "email": "srame1@multiply.com"
  }, 
  {
    "id": 3,
    "firstName": "Colene",
    "surname": "Clewes",
    "email": "cclewes2@ox.ac.uk"
  }, 
  {
    "id": 4,
    "firstName": "Gavra",
    "surname": "Jonke",
    "email": "gjonke3@fc2.com"
  }, 
  {
    "id": 5,
    "firstName": "Skyler",
    "surname": "Wilsey",
    "email": "swilsey4@miitbeian.gov.cn"
  }
];

getUserById = (id, definedUserList) => {
  return definedUserList.filter(user => user.id === id);
};

console.log(getUserById(3, users));