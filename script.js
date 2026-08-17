/* =====================================================
   KEVIN & JOANA
   WEDDING GUEST TABLE FINDER
===================================================== */


/*
   Store the guest list here after loading guests.json
*/

let guests = [];


/* =====================================================
   LOAD GUEST LIST
===================================================== */

async function loadGuests() {

    const result = document.getElementById("result");

    try {

        const response = await fetch("./guests.json");

        if (!response.ok) {
            throw new Error(
                "Could not load guests.json"
            );
        }

        guests = await response.json();

        console.log(
            "Guest list successfully loaded:",
            guests.length,
            "guests"
        );

    } catch (error) {

        console.error(
            "Guest list loading error:",
            error
        );

        result.innerHTML = `
            <div class="not-found">
                <p>Guest list unavailable.</p>
                <small>
                    Please refresh the page and try again.
                </small>
            </div>
        `;
    }
}


/* =====================================================
   NORMALIZE NAME
===================================================== */

function normalizeName(name) {

    return String(name)
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");
}


/* =====================================================
   GET GUEST NAME
===================================================== */

function getGuestName(guest) {

    /*
       Supports:
       {
           "name": "Kevin Patayon"
       }

       or

       {
           "Name": "Kevin Patayon"
       }
    */

    return (
        guest.name ||
        guest.Name ||
        guest.fullName ||
        guest.full_name ||
        ""
    );
}


/* =====================================================
   GET TABLE
===================================================== */

function getGuestTable(guest) {

    /*
       Supports different table field names.
    */

    return (
        guest.table ||
        guest.Table ||
        guest.tableNumber ||
        guest.table_number ||
        guest.seat ||
        guest.Seat ||
        "Assigned Table"
    );
}


/* =====================================================
   FIND GUEST
===================================================== */

async function findGuest() {

    const input =
        document.getElementById("searchInput");

    const result =
        document.getElementById("result");


    const searchName =
        normalizeName(input.value);


    /* -----------------------------------------------
       Empty search
    ------------------------------------------------ */

    if (!searchName) {

        result.innerHTML = `
            <div class="not-found">
                <p>Please enter your name.</p>

                <small>
                    Enter your full name to find your table.
                </small>
            </div>
        `;

        input.focus();

        return;
    }


    /* -----------------------------------------------
       If list hasn't loaded yet, try loading it
    ------------------------------------------------ */

    if (guests.length === 0) {

        result.innerHTML = `
            <div class="loading">
                Searching guest list...
            </div>
        `;

        await loadGuests();

        if (guests.length === 0) {
            return;
        }
    }


    /* -----------------------------------------------
       Search guest
    ------------------------------------------------ */

    const guest = guests.find(function(item) {

        const guestName =
            normalizeName(getGuestName(item));

        return guestName === searchName;

    });


    /* -----------------------------------------------
       Guest FOUND
    ------------------------------------------------ */

    if (guest) {

        const guestName =
            getGuestName(guest);

        const table =
            getGuestTable(guest);


        result.innerHTML = `

            <div class="guest-result">

                <p class="welcome">
                    WELCOME!
                </p>

                <p class="guest-name">
                    ${escapeHTML(guestName)}
                </p>

                <p class="table-label">
                    YOUR TABLE IS
                </p>

                <p class="table-number">
                    ${escapeHTML(table)}
                </p>

            </div>

        `;

        return;
    }


    /* -----------------------------------------------
       Guest NOT FOUND
    ------------------------------------------------ */

    result.innerHTML = `

        <div class="not-found">

            <p>
                Guest not found.
            </p>

            <small>
                Please check the spelling of your full name
                and try again.
            </small>

        </div>

    `;
}


/* =====================================================
   SECURITY
   Prevent HTML from being inserted through names
===================================================== */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =====================================================
   PRESS ENTER TO SEARCH
===================================================== */

document
    .getElementById("searchInput")
    .addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                findGuest();

            }

        }
    );


/* =====================================================
   LOAD GUESTS WHEN PAGE OPENS
===================================================== */

loadGuests();
