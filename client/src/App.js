import React, { useState } from 'react';

// 模拟数据
const mockData = {
  stats: {
    totalEmployees: 2700,
    coveredEmployees: 368,
    totalTasks: 3456,
    coverage: 13.62
  },
  skills: [
    { id: 1, name: 'Excel智能分析', enName: 'Excel Analyzer', category: '数据分析', tags: ['数据分析', 'Office'], downloads: 234, rating: 4.8, owner: '张三', status: 'published', description: '智能分析Excel数据，自动生成图表和报告', version: 'v2.1' },
    { id: 2, name: 'PPT自动生成', enName: 'PPT Generator', category: '文档处理', tags: ['文档处理', 'PPT'], downloads: 567, rating: 4.9, owner: '李四', status: 'published', description: '根据大纲自动生成精美PPT', version: 'v1.5' },
    { id: 3, name: '智能客服助手', enName: 'Smart Customer Service', category: '客户服务', tags: ['客户服务', 'NLP'], downloads: 890, rating: 4.7, owner: '王五', status: 'pending', description: '7x24小时智能客服，自动回答常见问题', version: 'v1.0' },
    { id: 4, name: '理赔自动化', enName: 'Claim Automation', category: '自动化流程', tags: ['自动化', '理赔'], downloads: 456, rating: 4.6, owner: '赵六', status: 'published', description: '自动处理理赔流程，提升效率', version: 'v3.0' },
    { id: 5, name: '数据可视化', enName: 'Data Visualization', category: '数据分析', tags: ['数据分析', '可视化'], downloads: 789, rating: 4.8, owner: '钱七', status: 'pending', description: '一键生成数据可视化大屏', version: 'v1.2' },
    { id: 6, name: '代码审查助手', enName: 'Code Reviewer', category: '开发工具', tags: ['开发', '代码'], downloads: 321, rating: 4.5, owner: '孙八', status: 'published', description: '自动审查代码，提出优化建议', version: 'v2.0' },
  ],
  cases: [
    { id: 1, dept: '技术部', title: '智能代码审查系统', efficiency: '89%', users: 156, rating: 4.9, desc: '使用AI自动审查代码，识别潜在bug和安全风险' },
    { id: 2, dept: '销售部', title: '智能销售助手', efficiency: '35%', users: 234, rating: 4.8, desc: 'AI辅助分析客户需求，生成个性化方案' },
    { id: 3, dept: '客服部', title: '智能客服机器人', efficiency: '80%', users: 45, rating: 4.7, desc: '7x24小时智能回复，平均响应时间缩短80%' },
    { id: 4, dept: '理赔部', title: '智能理赔提速', efficiency: '3x', users: 67, rating: 4.9, desc: 'AI自动识别票据，理赔流程自动化' },
  ],
  deptStats: [
    { name: '技术部', coverage: 92, tasks: 1890, hours: 456, icon: 'code' },
    { name: '销售部', coverage: 78, tasks: 2340, hours: 389, icon: 'bullhorn' },
    { name: '客服部', coverage: 85, tasks: 5678, hours: 678, icon: 'headset' },
    { name: '理赔部', coverage: 68, tasks: 3456, hours: 523, icon: 'file-invoice-dollar' },
  ],
  tokens: {
    daily: { advanced: 5, lightweight: 5, video: 10 },
    used: { advanced: 3.2, lightweight: 4.1, video: 2 },
    remaining: { advanced: 1.8, lightweight: 0.9, video: 8 }
  },
  pendingSkills: [
    { id: 3, name: '智能客服助手', owner: '王五', date: '2026-03-08' },
    { id: 5, name: '数据可视化', owner: '钱七', date: '2026-03-07' },
  ]
};

// 导航组件
const Navbar = ({ activePage, setActivePage, user, onLogout }) => (
  <nav style={styles.navbar}>
    <div style={styles.logo}>
      <i className="fas fa-robot" style={styles.logoIcon}></i>
      <h1 style={styles.logoText}>AI超级秘书</h1>
    </div>
    <div style={styles.navItems}>
      <button style={activePage === 'home' ? styles.navItemActive : styles.navItem} onClick={() => setActivePage('home')}>
        <i className="fas fa-home"></i> 首页
      </button>
      <button style={activePage === 'skills' ? styles.navItemActive : styles.navItem} onClick={() => setActivePage('skills')}>
        <i className="fas fa-cube"></i> 技能市场
      </button>
      <button style={activePage === 'cases' ? styles.navItemActive : styles.navItem} onClick={() => setActivePage('cases')}>
        <i className="fas fa-lightbulb"></i> 优秀案例
      </button>
      <button style={activePage === 'dashboard' ? styles.navItemActive : styles.navItem} onClick={() => setActivePage('dashboard')}>
        <i className="fas fa-chart-bar"></i> 数据看板
      </button>
      <button style={activePage === 'help' ? styles.navItemActive : styles.navItem} onClick={() => setActivePage('help')}>
        <i className="fas fa-question-circle"></i> 使用帮助
      </button>
      {user.role === 'admin' && (
        <button style={activePage === 'admin' ? styles.navItemActive : styles.navItem} onClick={() => setActivePage('admin')}>
          <i className="fas fa-cog"></i> 管理后台
        </button>
      )}
      {user.role === 'superadmin' && (
        <button style={activePage === 'admin' ? styles.navItemActive : styles.navItem} onClick={() => setActivePage('admin')}>
          <i className="fas fa-cog"></i> 超管后台
        </button>
      )}
    </div>
    <div style={styles.userArea}>
      <button style={styles.navItem} onClick={() => setActivePage('profile')}>
        <i className="fas fa-user"></i> {user.name}
      </button>
      <button style={styles.logoutBtn} onClick={onLogout}>退出</button>
    </div>
  </nav>
);

// 首页
const HomePage = ({ setActivePage }) => (
  <div style={styles.page}>
    <div style={styles.hero}>
      <canvas id="particles" style={styles.particles}></canvas>
      <div style={styles.heroContent}>
        <h2 style={styles.heroTitle}>平安健康险AI超级秘书</h2>
        <p style={styles.heroSubtitle}>让每一位员工都能轻松使用AI工具，提升工作效率，开启智能办公新时代</p>
        
        <div style={styles.statsRow}>
          <div style={styles.statBox}>
            <div style={styles.statNumber}>{mockData.stats.coveredEmployees}</div>
            <div style={styles.statLabel}>已累计覆盖员工数</div>
            <div style={styles.statSub}>占比 {mockData.stats.coverage}%</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statNumber}>{mockData.stats.totalTasks}</div>
            <div style={styles.statLabel}>已累计完成任务数</div>
          </div>
        </div>
      </div>
    </div>
    
    <div style={styles.moduleSection}>
      <div style={styles.moduleGrid}>
        <div style={styles.moduleCard} onClick={() => setActivePage('help')}>
          <div style={styles.moduleIcon}><i className="fas fa-book"></i></div>
          <div style={styles.moduleTitle}>使用指南</div>
          <div style={styles.moduleDesc}>安装教程和使用帮助</div>
        </div>
        <div style={styles.moduleCard} onClick={() => setActivePage('cases')}>
          <div style={styles.moduleIcon}><i className="fas fa-lightbulb"></i></div>
          <div style={styles.moduleTitle}>优秀案例</div>
          <div style={styles.moduleDesc}>看看大家怎么用AI</div>
        </div>
        <div style={styles.moduleCard} onClick={() => setActivePage('skills')}>
          <div style={styles.moduleIcon}><i className="fas fa-cube"></i></div>
          <div style={styles.moduleTitle}>技能市场</div>
          <div style={styles.moduleDesc}>浏览和下载AI技能</div>
        </div>
        <div style={styles.moduleCard} onClick={() => setActivePage('dashboard')}>
          <div style={styles.moduleIcon}><i className="fas fa-chart-bar"></i></div>
          <div style={styles.moduleTitle}>数据看板</div>
          <div style={styles.moduleDesc}>各部门AI使用情况</div>
        </div>
      </div>
    </div>
  </div>
);

// 技能市场页
const SkillsPage = ({ setActivePage }) => {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  
  const filteredSkills = mockData.skills.filter(s => 
    s.status === 'published' && 
    (category === 'all' || s.category === category) &&
    (s.name.includes(search) || s.tags.some(t => t.includes(search)))
  );
  
  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <h2 style={styles.pageTitle}><i className="fas fa-cube"></i> 技能市场</h2>
        <p style={styles.pageSubtitle}>发现、分享、创造智能技能</p>
      </div>
      
      <div style={styles.filterBar}>
        <input 
          type="text" 
          placeholder="搜索技能..." 
          style={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div style={styles.categoryTabs}>
          {['all', '数据分析', '文档处理', '客户服务', '自动化流程', '开发工具'].map(cat => (
            <button 
              key={cat}
              style={category === cat ? styles.categoryTabActive : styles.categoryTab}
              onClick={() => setCategory(cat)}
            >
              {cat === 'all' ? '全部' : cat}
            </button>
          ))}
        </div>
      </div>
      
      <div style={styles.skillsGrid}>
        {filteredSkills.map(skill => (
          <div key={skill.id} style={styles.skillCard}>
            <div style={styles.skillHeader}>
              <div style={styles.skillIcon}><i className="fas fa-cube"></i></div>
              <div>
                <h3>{skill.name}</h3>
                <p>{skill.enName}</p>
              </div>
            </div>
            <div style={styles.skillBody}>
              <p style={styles.skillDesc}>{skill.description}</p>
              <div style={styles.skillTags}>
                {skill.tags.map(tag => (
                  <span key={tag} style={styles.tag}>{tag}</span>
                ))}
              </div>
              <div style={styles.skillMeta}>
                <span><i className="fas fa-download"></i> {skill.downloads}</span>
                <span><i className="fas fa-star"></i> {skill.rating}</span>
              </div>
              <div style={styles.skillActions}>
                <button style={styles.downloadBtn}><i className="fas fa-download"></i> 下载</button>
                <button style={styles.detailBtn}>查看详情</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 优秀案例页
const CasesPage = () => (
  <div style={styles.page}>
    <div style={styles.pageHeader}>
      <h2 style={styles.pageTitle}><i className="fas fa-lightbulb"></i> 优秀AI应用案例</h2>
      <p style={styles.pageSubtitle}>看看各部门是如何运用AI提升工作效率的</p>
    </div>
    
    <div style={styles.casesGrid}>
      {mockData.cases.map(item => (
        <div key={item.id} style={styles.caseCard}>
          <div style={styles.caseImage}>
            <i className="fas fa-lightbulb"></i>
          </div>
          <div style={styles.caseBody}>
            <span style={styles.caseDept}>{item.dept}</span>
            <h3 style={styles.caseTitle}>{item.title}</h3>
            <p style={styles.caseDesc}>{item.desc}</p>
            <div style={styles.caseStats}>
              <div style={styles.caseStatItem}>
                <div style={styles.caseStatNum}>{item.efficiency}</div>
                <div style={styles.caseStatLabel}>效率提升</div>
              </div>
              <div style={styles.caseStatItem}>
                <div style={styles.caseStatNum}>{item.users}</div>
                <div style={styles.caseStatLabel}>使用人数</div>
              </div>
              <div style={styles.caseStatItem}>
                <div style={styles.caseStatNum}>{item.rating}</div>
                <div style={styles.caseStatLabel}>评分</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 数据看板页
const DashboardPage = () => (
  <div style={styles.page}>
    <div style={styles.pageHeader}>
      <h2 style={styles.pageTitle}><i className="fas fa-chart-bar"></i> 各部门AI应用情况</h2>
      <p style={styles.pageSubtitle}>实时了解公司AI使用情况</p>
    </div>
    
    <div style={styles.statsOverview}>
      <div style={styles.overviewCard}>
        <div style={styles.overviewIcon}><i className="fas fa-users"></i></div>
        <div style={styles.overviewNum}>{mockData.stats.coveredEmployees}</div>
        <div style={styles.overviewLabel}>活跃用户</div>
      </div>
      <div style={styles.overviewCard}>
        <div style={styles.overviewIcon}><i className="fas fa-cube"></i></div>
        <div style={styles.overviewNum}>86</div>
        <div style={styles.overviewLabel}>技能总数</div>
      </div>
      <div style={styles.overviewCard}>
        <div style={styles.overviewIcon}><i className="fas fa-download"></i></div>
        <div style={styles.overviewNum}>5,678</div>
        <div style={styles.overviewLabel}>总下载量</div>
      </div>
      <div style={styles.overviewCard}>
        <div style={styles.overviewIcon}><i className="fas fa-clock"></i></div>
        <div style={styles.overviewNum}>2,340h</div>
        <div style={styles.overviewLabel}>节省工时</div>
      </div>
    </div>
    
    <div style={styles.deptGrid}>
      {mockData.deptStats.map(dept => (
        <div key={dept.name} style={styles.deptCard}>
          <div style={styles.deptHeader}>
            <div style={styles.deptIcon}><i className={`fas fa-${dept.icon}`}></i></div>
            <div style={styles.deptName}>{dept.name}</div>
          </div>
          <div style={styles.deptProgress}>
            <div style={styles.progressBar}>
              <div style={{...styles.progressFill, width: `${dept.coverage}%`}}></div>
            </div>
            <div style={styles.progressLabel}>
              <span>AI渗透率</span>
              <span>{dept.coverage}%</span>
            </div>
          </div>
          <div style={styles.deptStats}>
            <div style={styles.deptStatItem}>
              <div style={styles.deptStatNum}>{dept.tasks}</div>
              <div style={styles.deptStatLabel}>调用次数</div>
            </div>
            <div style={styles.deptStatItem}>
              <div style={styles.deptStatNum}>{dept.hours}h</div>
              <div style={styles.deptStatLabel}>节省工时</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// 使用帮助页
const HelpPage = () => (
  <div style={styles.page}>
    <div style={styles.pageHeader}>
      <h2 style={styles.pageTitle}><i className="fas fa-question-circle"></i> 使用帮助中心</h2>
      <p style={styles.pageSubtitle}>关于AI超级秘书的一切</p>
    </div>
    
    <div style={styles.helpGrid}>
      <div style={styles.helpCard}>
        <div style={styles.helpIcon}><i className="fas fa-download"></i></div>
        <div style={styles.helpTitle}>安装下载</div>
        <div style={styles.helpDesc}>如何下载和安装AI超级秘书客户端</div>
      </div>
      <div style={styles.helpCard}>
        <div style={styles.helpIcon}><i className="fas fa-play-circle"></i></div>
        <div style={styles.helpTitle}>快速入门</div>
        <div style={styles.helpDesc}>5分钟快速上手AI超级秘书</div>
      </div>
      <div style={styles.helpCard}>
        <div style={styles.helpIcon}><i className="fas fa-cube"></i></div>
        <div style={styles.helpTitle}>技能使用</div>
        <div style={styles.helpDesc}>如何使用和管理各种AI技能</div>
      </div>
      <div style={styles.helpCard}>
        <div style={styles.helpIcon}><i className="fas fa-bug"></i></div>
        <div style={styles.helpTitle}>常见问题</div>
        <div style={styles.helpDesc}>常见问题解答汇总</div>
      </div>
      <div style={styles.helpCard}>
        <div style={styles.helpIcon}><i className="fas fa-envelope"></i></div>
        <div style={styles.helpTitle}>联系支持</div>
        <div style={styles.helpDesc}>遇到问题？联系我们获取帮助</div>
      </div>
      <div style={styles.helpCard}>
        <div style={styles.helpIcon}><i className="fas fa-comment-dots"></i></div>
        <div style={styles.helpTitle}>反馈建议</div>
        <div style={styles.helpDesc}>提出你的建议，帮助我们改进</div>
      </div>
    </div>
    
    <div style={styles.installSection}>
      <h3 style={styles.installTitle}><i className="fas fa-download"></i> 下载与安装</h3>
      <p style={styles.installDesc}>立即下载AI超级秘书，开启智能办公</p>
      <button style={styles.downloadBtn}><i className="fas fa-download"></i> 下载AI超级秘书 v2.0</button>
    </div>
  </div>
);

// 个人中心页
const ProfilePage = ({ user, setActivePage }) => {
  const t = mockData.tokens;
  
  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <h2 style={styles.pageTitle}><i className="fas fa-user"></i> 个人中心</h2>
      </div>
      
      <div style={styles.profileCard}>
        <div style={styles.profileAvatar}>{user.name[0]}</div>
        <div style={styles.profileInfo}>
          <h3>{user.name}</h3>
          <p>{user.dept} - {user.role === 'superadmin' ? '超级管理员' : user.role === 'admin' ? '管理员' : '普通员工'}</p>
        </div>
      </div>
      
      <div style={styles.tokenSection}>
        <h3 style={styles.sectionTitle}><i className="fas fa-coins"></i> 今日Token额度</h3>
        
        <div style={styles.tokenCards}>
          <div style={styles.tokenCard}>
            <div style={styles.tokenLabel}>高级模型</div>
            <div style={styles.tokenProgress}>
              <div style={styles.progressBar}>
                <div style={{...styles.progressFill, width: `${(t.used.advanced / t.daily.advanced) * 100}%`}}></div>
              </div>
            </div>
            <div style={styles.tokenInfo}>
              <span>已用: {t.used.advanced}M</span>
              <span>剩余: {t.remaining.advanced}M / {t.daily.advanced}M</span>
            </div>
          </div>
          
          <div style={styles.tokenCard}>
            <div style={styles.tokenLabel}>轻量模型</div>
            <div style={styles.tokenProgress}>
              <div style={styles.progressBar}>
                <div style={{...styles.progressFill, width: `${(t.used.lightweight / t.daily.lightweight) * 100}%`, background: '#28a745'}}></div>
              </div>
            </div>
            <div style={styles.tokenInfo}>
              <span>已用: {t.used.lightweight}M</span>
              <span>剩余: {t.remaining.lightweight}M / {t.daily.lightweight}M</span>
            </div>
          </div>
          
          <div style={styles.tokenCard}>
            <div style={styles.tokenLabel}>文生视频模型</div>
            <div style={styles.tokenProgress}>
              <div style={styles.progressBar}>
                <div style={{...styles.progressFill, width: `${(t.used.video / t.daily.video) * 100}%`, background: '#9c27b0'}}></div>
              </div>
            </div>
            <div style={styles.tokenInfo}>
              <span>已用: {t.used.video}M</span>
              <span>剩余: {t.remaining.video}M / {t.daily.video}M</span>
            </div>
          </div>
        </div>
        
        <button style={styles.applyBtn}><i className="fas fa-plus"></i> 申请额外算力</button>
      </div>
    </div>
  );
};

// 管理员后台
const AdminPage = ({ user }) => {
  const [tab, setTab] = useState('pending');
  
  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <h2 style={styles.pageTitle}>
          <i className="fas fa-cog"></i> {user.role === 'superadmin' ? '超级' : ''}管理后台
        </h2>
      </div>
      
      <div style={styles.adminTabs}>
        <button style={tab === 'pending' ? styles.adminTabActive : styles.adminTab} onClick={() => setTab('pending')}>
          <i className="fas fa-clock"></i> 待审核 {mockData.pendingSkills.length > 0 && <span style={styles.badge}>{mockData.pendingSkills.length}</span>}
        </button>
        <button style={tab === 'users' ? styles.adminTabActive : styles.adminTab} onClick={() => setTab('users')}>
          <i className="fas fa-users"></i> 用户管理
        </button>
        <button style={tab === 'tokens' ? styles.adminTabActive : styles.adminTab} onClick={() => setTab('tokens')}>
          <i className="fas fa-coins"></i> 算力管理
        </button>
        <button style={tab === 'skills' ? styles.adminTabActive : styles.adminTab} onClick={() => setTab('skills')}>
          <i className="fas fa-cube"></i> 技能管理
        </button>
      </div>
      
      {tab === 'pending' && (
        <div style={styles.adminContent}>
          <h3 style={styles.adminTitle}>待审核技能</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>技能名称</th>
                <th>上传者</th>
                <th>上传时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {mockData.pendingSkills.map(skill => (
                <tr key={skill.id}>
                  <td>{skill.name}</td>
                  <td>{skill.owner}</td>
                  <td>{skill.date}</td>
                  <td>
                    <button style={styles.approveBtn}><i className="fas fa-check"></i> 通过</button>
                    <button style={styles.rejectBtn}><i className="fas fa-times"></i> 拒绝</button>
                    <button style={styles.viewBtn}><i className="fas fa-eye"></i> 查看</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {tab === 'users' && (
        <div style={styles.adminContent}>
          <h3 style={styles.adminTitle}>用户列表</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>姓名</th>
                <th>部门</th>
                <th>角色</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>张三</td>
                <td>技术部</td>
                <td><span style={styles.roleTag}>管理员</span></td>
                <td>
                  <button style={styles.actionBtn}>编辑</button>
                  <button style={styles.actionBtn}>禁用</button>
                </td>
              </tr>
              <tr>
                <td>李四</td>
                <td>销售部</td>
                <td><span style={styles.roleTag}>普通员工</span></td>
                <td>
                  <button style={styles.actionBtn}>设为管理员</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      
      {tab === 'tokens' && (
        <div style={styles.adminContent}>
          <h3 style={styles.adminTitle}>算力充值</h3>
          <div style={styles.tokenForm}>
            <input type="text" placeholder="搜索用户..." style={styles.formInput} />
            <select style={styles.formSelect}>
              <option>选择用户</option>
              <option>李四</option>
              <option>王五</option>
            </select>
            <input type="number" placeholder="Token数量(M)" style={styles.formInput} />
            <input type="number" placeholder="有效期(天)" style={styles.formInput} defaultValue={90} />
            <button style={styles.submitBtn}>确认充值</button>
          </div>
        </div>
      )}
      
      {tab === 'skills' && (
        <div style={styles.adminContent}>
          <h3 style={styles.adminTitle}>技能管理</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>技能名称</th>
                <th>分类</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {mockData.skills.map(skill => (
                <tr key={skill.id}>
                  <td>{skill.name}</td>
                  <td>{skill.category}</td>
                  <td>
                    <span style={skill.status === 'published' ? styles.statusPublished : styles.statusPending}>
                      {skill.status === 'published' ? '已发布' : '待审核'}
                    </span>
                  </td>
                  <td>
                    <button style={styles.actionBtn}>编辑</button>
                    <button style={skill.status === 'published' ? styles.offlineBtn : styles.actionBtn}>
                      {skill.status === 'published' ? '下架' : '上架'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// 登录页
const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = (e) => {
    e.preventDefault();
    // 模拟登录，根据用户名返回不同角色
    let role = 'user';
    if (username === 'admin') role = 'admin';
    if (username === 'superadmin') role = 'superadmin';
    
    onLogin({ name: username, role, dept: '技术部' });
  };
  
  return (
    <div style={styles.loginPage}>
      <div style={styles.loginCard}>
        <div style={styles.loginLogo}>
          <i className="fas fa-robot"></i>
        </div>
        <h2 style={styles.loginTitle}>AI超级秘书</h2>
        <p style={styles.loginSubtitle}>平安健康险内部系统</p>
        
        <form onSubmit={handleLogin} style={styles.loginForm}>
          <input 
            type="text" 
            placeholder="请输入工号" 
            style={styles.loginInput}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="请输入密码" 
            style={styles.loginInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" style={styles.loginBtn}>登录</button>
        </form>
        
        <div style={styles.loginTips}>
          <p>测试账号：</p>
          <p>普通用户: 任意输入</p>
          <p>管理员: admin / 任意密码</p>
          <p>超管: superadmin / 任意密码</p>
        </div>
      </div>
    </div>
  );
};

// 主应用
function App() {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState('home');
  
  const handleLogin = (userData) => {
    setUser(userData);
    setActivePage('home');
  };
  
  const handleLogout = () => {
    setUser(null);
    setActivePage('home');
  };
  
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }
  
  return (
    <div style={styles.app}>
      <Navbar activePage={activePage} setActivePage={setActivePage} user={user} onLogout={handleLogout} />
      {activePage === 'home' && <HomePage setActivePage={setActivePage} />}
      {activePage === 'skills' && <SkillsPage setActivePage={setActivePage} />}
      {activePage === 'cases' && <CasesPage />}
      {activePage === 'dashboard' && <DashboardPage />}
      {activePage === 'help' && <HelpPage />}
      {activePage === 'profile' && <ProfilePage user={user} setActivePage={setActivePage} />}
      {(activePage === 'admin') && <AdminPage user={user} />}
    </div>
  );
}

export default App;
