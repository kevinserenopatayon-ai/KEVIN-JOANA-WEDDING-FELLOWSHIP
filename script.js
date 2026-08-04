let guests = [];

fetch("guests.json")
  .then(response => response.json())
  .then(data => {
    guests = data;
    console.log("Guests loaded:", guests);
    alert("Guest list loaded! " + guests.length + " guests.");
  })
  .catch(error => {
    console.error(error);
    alert("ERROR loading guests.json");
  });

function findGuest() {
  alert("Button clicked!");

  const input = document
    .getElementById("searchInput")
    .value
    .trim()
    .toLowerCase();

  const result = document.getElementById("result");

  const guest = guests.find(g =>
    g.name.toLowerCase() === input
  );

  if (guest) {
    result.innerHTML = `
      <h2>Welcome!</h2>
      <p>${guest.name}</p>
      <h3>${guest.table}</h3>
    `;
  } else {
    result.innerHTML = `
      <p>Guest not found.</p>
    `;
  }
}
