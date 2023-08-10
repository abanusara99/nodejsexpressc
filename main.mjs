// main.js
import express from 'express';
import { json } from 'body-parser';
import { query as _query } from './data.db';

const app = express();
const port = 3000;

// Use bodyParser middleware
app.use(json());

// API endpoint to get candidate status count for a given user
app.post('/getCandidateStatusCount', (req, res) => {
  const { uid } = req.body;

  // Query to get the status count for the user's candidates
  const query = `
    SELECT
    "User Table"."Id(uid)" AS Uid,
    COUNT("Candidate_Table"."Id (cid)") AS TotalCandidates,
    SUM(CASE WHEN "Candidate_Status_Table"."status" = 'joined' THEN 1 ELSE 0 END) AS Joined,
    SUM(CASE WHEN "Candidate_Status_Table"."status" = 'interview' THEN 1 ELSE 0 END) AS Interview
FROM "User Table"
LEFT JOIN "Candidate_Table" ON "User Table"."Id(uid)" = "Candidate_Table"."Uid"
LEFT JOIN "Candidate_Status_Table" ON "Candidate_Table"."Id (cid)" = "Candidate_Status_Table"."cid"
WHERE "User Table"."Id(uid)" = ?;

  `;

  _query(query, [uid], (error, results) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json(results[0]);
      }
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
