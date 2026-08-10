let guests = [];

// Load guest list
fetch("./guests.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Could not load guests.json");
        }
        return response.json();
    })
    .then(data => {
        guests = data;
        console.log("Guest list loaded:", guests.length);
    })
    .catch(error => {
        console.error("Guest list error:", error);
    });


function normalizeName(name) {
    return name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");
}


function findGuest() {

    const input = document
        .getElementById("searchInput")
        .value;

    const result = document
        .getElementById("result");

    const searchName = normalizeName(input);

    if (!searchName) {
        result.innerHTML = `
            <p>Please enter your full name.</p>
        `;
        return;
    }

    if (guests.length === 0) {
        result.innerHTML = `
            <p>Please wait a moment and try again.</p>
        `;
        return;
    }

    const guest = guests.find(g =>
        normalizeName(g.name) === searchName
    );

    if (guest) {

        result.innerHTML = `
            <div class="guest-result">
                <p class="welcome">WELCOME!</p>

                <p class="guest-name">
                    ${guest.name}
                </p>

                <p class="table-label">
                    YOUR TABLE
                </p>

                <p class="table-number">
                    ${guest.table}
                </p>
            </div>
        `;

    } else {

        result.innerHTML = `
            <div class="not-found">
                <p>Guest not found.</p>
                <small>
                    Please check the spelling of your name.
                </small>
            </div>
        `;
    }
}


// Allow pressing ENTER
document
    .getElementById("searchInput")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            findGuest();
        }

    });
