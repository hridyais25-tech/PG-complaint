const complaints = [
    {
        name: "Ravi",
        room: 101,
        category: "Water",
        status: "Pending"
    },
    {
        name: "Sneha",
        room: 102,
        category: "Electricity",
        status: "Resolved"
    }
];

console.log(complaints);


// Filter pending complaints
let result = complaints.filter((x) => {
    return x.status == "Pending";
});

console.log(result);


// Complaint form
const form = document.getElementById("form");

if (form) {
    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        const complaint = {
            name: document.getElementById("name").value,
            room: document.getElementById("room").value,
            contact: document.getElementById("contact").value,
            category: document.getElementById("category").value,
            description: document.getElementById("description").value
        };

        try {

            const response = await fetch("http://localhost:3001/complaints", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(complaint)
            });

            if (response.ok) {
                alert("Complaint submitted successfully!");
                form.reset();
            } else {
                alert("Failed to submit complaint.");
            }

        } catch (error) {
            console.error(error);
            alert("Server is not running.");
        }

    });
}
// Display complaints on complaints.html

const complaintsContainer =
    document.getElementById("complaints-container");

if (complaintsContainer) {

    fetch("http://localhost:3001/complaints")
        .then(response => response.json())
        .then(complaints => {

            complaintsContainer.innerHTML = "";

            complaints.forEach(complaint => {

                const card = document.createElement("div");

                card.innerHTML = `
                    <h3>${complaint.name}</h3>
                    <p>Room: ${complaint.room}</p>
                    <p>Category: ${complaint.category}</p>
                    <p>Description: ${complaint.description}</p>
                    <p>Priority: ${complaint.priority}</p>
                    <p>Status: ${complaint.status || "Pending"}</p>
                `;

                complaintsContainer.appendChild(card);
            });

        })
        .catch(error => {

            console.error("Error:", error);

            complaintsContainer.innerHTML =
                "<p>Unable to load complaints.</p>";
        });
}