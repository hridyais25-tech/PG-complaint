import http from 'http';
import url from 'url';

const complaints = [
    {id: 1,name: "Rakesh", room: 101,category: "Water",description: "No water supply",priority: "High",status: "Pending"},
    {id: 2,name: "Mahesh",room: 102,category: "Electricity",description: "Fan is not working",priority: "Medium",status: "Pending"},
    {id: 3,name: "Sneha",room: 103,category: "Internet",description: "WiFi is not working",priority: "High",status: "Resolved"},
    {id: 4,name: "Rahul",room: 104,category: "Cleaning",description: "Room cleaning is required",priority: "Low",status: "Pending"}
];

const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");

if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
}  
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
   console.log("Path:", path);

    // GET all complaints
    if (path === '/complaints' && req.method === 'GET') {

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify(complaints));
    }


    // GET one complaint
    else if (path.startsWith('/complaints/') &&
             req.method === 'GET') {

        const id = parseInt(path.split('/')[2]);

        const complaint = complaints.find(
            complaint => complaint.id === id
        );

        if (complaint) {

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify(complaint));

        } else {

            res.writeHead(404, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({
                message: "Complaint not found"
            }));
        }
    }


    // POST complaint
    else if (path === '/complaints' &&
             req.method === 'POST') {

        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {

            const complaint = JSON.parse(body);
            complaint.id = complaints.length + 1;
            complaint.status = "Pending";
            complaints.push(complaint);
            res.writeHead(201, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify(complaint));
        });
    }


    // PUT complaint
    else if (path.startsWith('/complaints/') &&
             req.method === 'PUT') {
        const id = Number(path.split('/')[2]);
        let body = '';
         req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {

            const updatedComplaint = JSON.parse(body);

            const complaint = complaints.find(
                complaint => complaint.id === id
            );

            if (complaint) {

                complaint.name = updatedComplaint.name;
                complaint.room = updatedComplaint.room;
                complaint.category = updatedComplaint.category;
                complaint.description = updatedComplaint.description;
                complaint.priority = updatedComplaint.priority;
                complaint.status = updatedComplaint.status;

                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify(complaint));

            } else {

                res.writeHead(404, {
                    'Content-Type': 'application/json'
                });

                res.end(JSON.stringify({
                    message: "Complaint not found"
                }));
            }
        });
    }


    // DELETE complaint
    else if (path.startsWith('/complaints/') &&
             req.method === 'DELETE') {

        const id = Number(path.split('/')[2]);

        const index = complaints.findIndex(
            complaint => complaint.id === id
        );

        if (index !== -1) {

            const deletedComplaint =
                complaints.splice(index, 1);

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify(deletedComplaint[0]));

        } else {

            res.writeHead(404, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({
                message: "Complaint not found"
            }));
        }
    }


    // Route not found
    else {

        res.writeHead(404, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
            message: "Route not found"
        }));
    }

});


server.listen(3001, () => {
    console.log("Server is running on port 3001");
});
