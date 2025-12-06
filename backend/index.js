const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;
const pool = require('./db');

app.use(cors());
app.use(express.json());



//一問一答用
app.get('/api/flashcard/random', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM qa_questions ORDER BY RANDOM() LIMIT 1');
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching flashcard');
    }
});


//正誤判定用
// ランダムで1問返すAPI 多分いらない
app.get('/api/tf-questions/random', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM tf_questions ORDER BY RANDOM() LIMIT 1'
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch question' });
  }
});

app.get('/api/tf-questions/search', async (req, res) => {
  const { category, tag, era } = req.query;

  let query = 'SELECT * FROM tf_questions WHERE 1=1';
  const params = [];

  if (category) {
    params.push(category);
    query += ` AND category = $${params.length}`;
  }

  if (tag) {
    params.push(tag);
    query += ` AND tag = $${params.length}`;
  }

  if (era) {
    params.push(era);
    query += ` AND era = $${params.length}`;
  }

  query += ' ORDER BY id LIMIT 100';

  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to search questions' });
  }
});






app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
