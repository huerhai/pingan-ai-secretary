const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 模拟数据
const data = {
  skills: [
    { id: 1, name: 'Excel智能分析', category: '数据分析', downloads: 234, rating: 4.8 },
    { id: 2, name: 'PPT自动生成', category: '文档处理', downloads: 567, rating: 4.9 },
  ],
  stats: {
    totalEmployees: 2700,
    coveredEmployees: 368,
    totalTasks: 3456,
  }
};

// API路由
app.get('/api/stats', (req, res) => {
  res.json(data.stats);
});

app.get('/api/skills', (req, res) => {
  res.json(data.skills);
});

app.get('/api/user/:id', (req, res) => {
  res.json({ 
    id: 1, 
    name: '张三', 
    role: 'user',
    tokens: {
      daily: 10,
      used: 5.5,
      remaining: 4.5
    }
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
