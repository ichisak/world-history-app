const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;
const pool = require('./db');

app.use(cors());
app.use(express.json());


//カテゴリ一覧
app.get('/api/categories', async(req,res) => {
  try{
  const result = await pool.query('SELECT * FROM categories ORDER BY id');
  res.json(result.rows)
}catch (err) {
  console.error(err);
  res.status(500).send('Error fetching categories')
}
});

//カテゴリ選択
app.get('/api/categories/search', async (req, res) => {
  const { category } = req.query;
  let query = 'SELECT * FROM categories WHERE 1=1';
  const params = [];
  try{
    if (!category) {
      // category が指定されていなければ全件返す
      const result = await pool.query('SELECT * FROM categories ORDER BY id');
      return res.json(result.rows);
      }

      const result = await pool.query(
        'SELECT * FROM categories WHERE title = $1',
        [category]
      );

      res.json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to search category' });
      }
});


//一問一答用（カテゴリ選択・順当）
app.get('/api/flashcard/', async (req, res) => {
  const { category_id } = req.query; // URLパラメータでカテゴリ指定

  try {
    let query = 'SELECT * FROM qa_questions';
    const params = [];

    if (category_id) {
      query += ' WHERE category_id = $1';
      params.push(category_id);
    }

    query += ' ORDER BY id LIMIT 1';

    const result = await pool.query(query, params);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch flashcard' });
  }
});

// 一問一答（カテゴリ指定・ランダム順）
app.get('/api/flashcard/random', async (req, res) => {
  const { category_id } = req.query; // URLパラメータでカテゴリ指定

  try {
    let query = 'SELECT * FROM qa_questions';
    const params = [];

    if (category_id) {
      query += ' WHERE category_id = $1';
      params.push(category_id);
    }

    query += ' ORDER BY RANDOM() LIMIT 1';

    const result = await pool.query(query, params);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch flashcard' });
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

// 並び替え（カテゴリ指定・ランダム順）
app.get('/api/chronology/:categoryId', async (req, res) => {
  const { categoryId } = req.params;

  try {
    // STEP 1: 該当カテゴリの question_id をランダムに1つ選ぶ
    const questionIdResult = await pool.query(
      `
      SELECT question_id
      FROM chronology_questions
      WHERE category_id = $1
      GROUP BY question_id
      ORDER BY RANDOM()
      LIMIT 1
      `,
      [categoryId]
    );

    if (questionIdResult.rows.length === 0) {
      return res.status(404).json({ message: "そのカテゴリの問題がありません" });
    }

    const questionId = questionIdResult.rows[0].question_id;

    // STEP 2: その question_id の問題セットを取得
    const eventsResult = await pool.query(
      `
      SELECT question_id, event_id, text, explanation, year, month, show_year
      FROM chronology_questions
      WHERE question_id = $1
      `,
      [questionId]
    );

    res.json(eventsResult.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "サーバーエラー" });
  }
});





app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
