import React, { useState } from 'react';
import styles from './styles';

// 模拟数据
const mockData = {
  stats: {
    totalEmployees: 2700,
    coveredEmployees: 368,
    totalTasks: 3456,
    coverage: 13.62,
    totalSkills: 86,
    totalCases: 42
  },
  // 消息通知数据
  notifications: {
    // 最新更新
    latestUpdates: [
      { id: 1, title: 'V2.1版本发布', content: '新增智能分析功能，支持多维度数据处理', date: '2026-03-08', type: 'update' },
      { id: 2, title: '技能市场改版', content: '全新UI设计，分类筛选更便捷', date: '2026-03-05', type: 'update' },
    ],
    // 通知公告
    announcements: [
      { id: 1, title: '关于开展AI技能培训的通知', content: '将于3月15日开展全员AI技能培训，请各部门做好准备', date: '2026-03-07', important: true },
      { id: 2, title: '技能市场暂停服务公告', content: '系统维护通知：3月10日凌晨2:00-4:00暂停服务', date: '2026-03-06', important: false },
    ],
    // 我的消息
    myMessages: [
      { id: 1, title: '您的技能已通过审核', content: 'Excel智能分析技能已通过审核，正式上线！', date: '2026-03-07', read: false },
      { id: 2, title: '您有新的评论', content: '张伟评论了您的"智能客服助手"技能', date: '2026-03-06', read: false },
      { id: 3, title: '技能下载提醒', content: '您的"理赔自动化"技能被下载了5次', date: '2026-03-05', read: true },
      { id: 4, title: '系统消息', content: '欢迎加入AI超级秘书大家庭！', date: '2026-03-01', read: true },
    ]
  },
  // 18个部门
  departments: [
    '数智平台团队', '理赔管理部', '精算部', '企划财务部', '互联网平台部',
    '市场营销部', '客户服务部', '健康管理部', '产品设计部', '核保管理部',
    '合规风险管理部', '人力资源部', '行政后勤部', '信息技术部', '战略发展部',
    '客户服务运营部', '医疗保险事业部', '团体保险事业部'
  ],
  // 8个机构
  institutions: [
    { name: '上海', code: 'SH' },
    { name: '北京', code: 'BJ' },
    { name: '广东', code: 'GD' },
    { name: '湖南', code: 'HN' },
    { name: '河北', code: 'HE' },
    { name: '天津', code: 'TJ' },
    { name: '江苏', code: 'JS' },
    { name: '深圳', code: 'SZ' }
  ],
  // 部门AI渗透率排行榜（18个部门）
  deptPenetration: [
    { rank: 1, name: '数智平台团队', penetration: 95, employees: 45 },
    { rank: 2, name: '理赔管理部', penetration: 88, employees: 120 },
    { rank: 3, name: '精算部', penetration: 82, employees: 35 },
    { rank: 4, name: '企划财务部', penetration: 75, employees: 58 },
    { rank: 5, name: '互联网平台部', penetration: 71, employees: 89 },
    { rank: 6, name: '市场营销部', penetration: 65, employees: 156 },
    { rank: 7, name: '客户服务部', penetration: 62, employees: 234 },
    { rank: 8, name: '健康管理部', penetration: 58, employees: 42 },
    { rank: 9, name: '产品设计部', penetration: 55, employees: 67 },
    { rank: 10, name: '核保管理部', penetration: 52, employees: 48 },
    { rank: 11, name: '合规风险管理部', penetration: 48, employees: 36 },
    { rank: 12, name: '人力资源部', penetration: 45, employees: 52 },
    { rank: 13, name: '行政后勤部', penetration: 38, employees: 78 },
    { rank: 14, name: '信息技术部', penetration: 85, employees: 124 },
    { rank: 15, name: '战略发展部', penetration: 42, employees: 28 },
    { rank: 16, name: '客户服务运营部', penetration: 68, employees: 189 },
    { rank: 17, name: '医疗保险事业部', penetration: 58, employees: 95 },
    { rank: 18, name: '团体保险事业部', penetration: 51, employees: 72 },
  ],
  // 机构AI渗透率排行榜（8个机构）
  instPenetration: [
    { rank: 1, name: '上海', penetration: 78, employees: 456 },
    { rank: 2, name: '北京', penetration: 72, employees: 389 },
    { rank: 3, name: '广东', penetration: 68, employees: 324 },
    { rank: 4, name: '深圳', penetration: 65, employees: 278 },
    { rank: 5, name: '江苏', penetration: 58, employees: 198 },
    { rank: 6, name: '湖南', penetration: 52, employees: 156 },
    { rank: 7, name: '河北', penetration: 48, employees: 134 },
    { rank: 8, name: '天津', penetration: 45, employees: 112 },
  ],
  userSkills: [
    { id: 1, name: 'Excel智能分析', enName: 'Excel Analyzer', category: '数据分析', tags: ['数据分析', 'Office'], downloads: 234, rating: 4.8, owner: 'admin', status: 'published', description: '智能分析Excel数据，自动生成图表和报告', version: 'v2.1' },
    { id: 2, name: '智能客服助手', enName: 'Smart Customer Service', category: '客户服务', tags: ['客户服务', 'NLP'], downloads: 0, rating: 0, owner: 'admin', status: 'pending', description: '7x24小时智能客服，自动回答常见问题', version: 'v1.0' },
  ],
  mySubmissions: [
    { id: 1, title: 'Excel智能分析', type: 'skill', status: 'approved', isExcellent: true, date: '2026-03-01', downloads: 234 },
    { id: 2, title: '智能客服助手', type: 'skill', status: 'pending', isExcellent: false, date: '2026-03-07', downloads: 0 },
    { id: 3, title: '理赔自动化案例', type: 'case', status: 'approved', isExcellent: true, date: '2026-02-28', downloads: 0 },
  ],
  // 技能需求数据
  skillRequests: [
    { id: 1, title: '智能合同审查', category: '文档处理', problem: '需要自动审查保险合同条款，识别风险点', requester: '李娜', dept: '理赔管理部', votes: 45 },
    { id: 2, title: '保单智能解析', category: '数据分析', problem: '将PDF保单内容自动提取并结构化', requester: '王强', dept: '精算部', votes: 38 },
    { id: 3, title: '理赔材料自动识别', category: '自动化流程', problem: '自动识别理赔材料是否齐全，减少人工审核', requester: '赵敏', dept: '理赔管理部', votes: 56 },
    { id: 4, title: '智能销售话术生成', category: '客户服务', problem: '根据客户画像自动生成个性化销售话术', requester: '钱晨', dept: '市场营销部', votes: 32 },
    { id: 5, title: '批量报案处理', category: '自动化流程', problem: '批量处理客户报案，自动分类和分配', requester: '张伟', dept: '客户服务部', votes: 28 },
  ],
  // 团队成员数据
  teamMembers: [
    { id: 1, name: '张伟', avatar: '张', dept: '数智平台团队', installed: true, tasks: 156, cases: 3 },
    { id: 2, name: '李娜', avatar: '李', dept: '数智平台团队', installed: true, tasks: 134, cases: 2 },
    { id: 3, name: '王强', avatar: '王', dept: '数智平台团队', installed: true, tasks: 98, cases: 5 },
    { id: 4, name: '赵敏', avatar: '赵', dept: '理赔管理部', installed: false, tasks: 87, cases: 1 },
    { id: 5, name: '钱晨', avatar: '钱', dept: '市场营销部', installed: true, tasks: 112, cases: 4 },
    { id: 6, name: '孙丽', avatar: '孙', dept: '精算部', installed: true, tasks: 76, cases: 2 },
  ],
  leaderboards: {
    personalTasks: [
      { rank: 1, name: '张伟', dept: '数智平台团队', tasks: 156, avatar: '张' },
      { rank: 2, name: '李娜', dept: '数智平台团队', tasks: 134, avatar: '李' },
      { rank: 3, name: '王强', dept: '理赔管理部', tasks: 98, avatar: '王' },
      { rank: 4, name: '赵敏', dept: '精算部', tasks: 87, avatar: '赵' },
      { rank: 5, name: '钱晨', dept: '市场营销部', tasks: 76, avatar: '钱' },
    ],
    personalSkills: [
      { rank: 1, name: '张伟', dept: '数智平台团队', skills: 12, avatar: '张' },
      { rank: 2, name: '李娜', dept: '数智平台团队', skills: 8, avatar: '李' },
      { rank: 3, name: '王强', dept: '理赔管理部', skills: 6, avatar: '王' },
      { rank: 4, name: '赵敏', dept: '精算部', skills: 5, avatar: '赵' },
      { rank: 5, name: '钱晨', dept: '市场营销部', skills: 4, avatar: '钱' },
    ],
    skillDownloads: [
      { rank: 1, name: '智能客服助手', downloads: 890, owner: '王强' },
      { rank: 2, name: 'PPT自动生成', downloads: 567, owner: '李娜' },
      { rank: 3, name: '数据可视化', downloads: 456, owner: '张伟' },
      { rank: 4, name: '理赔自动化', downloads: 234, owner: '赵敏' },
      { rank: 5, name: '代码审查助手', downloads: 189, owner: '钱晨' },
    ],
    deptUsage: [
      { rank: 1, name: '数智平台团队', employees: 45, tasks: 4560, perCapita: 38.0 },
      { rank: 2, name: '理赔管理部', employees: 120, tasks: 2340, perCapita: 29.3 },
      { rank: 3, name: '精算部', employees: 35, tasks: 1890, perCapita: 19.9 },
      { rank: 4, name: '企划财务部', employees: 58, tasks: 3456, perCapita: 17.3 },
      { rank: 5, name: '互联网平台部', employees: 89, tasks: 890, perCapita: 14.8 },
    ]
  },
  taskHistory: {
    daily: [12, 18, 15, 22, 28, 19, 24, 30, 25, 32, 28, 35, 40, 22, 18, 15, 20, 25, 30, 28, 35, 40, 38, 42, 45, 48, 50, 52, 55, 58],
    weekly: [120, 145, 168, 189, 210, 195, 225],
    monthly: [520, 680, 750, 820, 890],
    total: 12340
  },
  skills: [
    { id: 1, name: 'Excel智能分析', enName: 'Excel Analyzer', category: '数据分析', tags: ['数据分析', 'Office'], downloads: 234, rating: 4.8, owner: '张伟', status: 'published', description: '智能分析Excel数据，自动生成图表和报告', version: 'v2.1' },
    { id: 2, name: 'PPT自动生成', enName: 'PPT Generator', category: '文档处理', tags: ['文档处理', 'PPT'], downloads: 567, rating: 4.9, owner: '李娜', status: 'published', description: '根据大纲自动生成精美PPT', version: 'v1.5' },
    { id: 3, name: '智能客服助手', enName: 'Smart Customer Service', category: '客户服务', tags: ['客户服务', 'NLP'], downloads: 890, rating: 4.7, owner: '王强', status: 'pending', description: '7x24小时智能客服，自动回答常见问题', version: 'v1.0' },
    { id: 4, name: '理赔自动化', enName: 'Claim Automation', category: '自动化流程', tags: ['自动化', '理赔'], downloads: 456, rating: 4.6, owner: '赵敏', status: 'published', description: '自动处理理赔流程，提升效率', version: 'v3.0' },
    { id: 5, name: '数据可视化', enName: 'Data Visualization', category: '数据分析', tags: ['数据分析', '可视化'], downloads: 789, rating: 4.8, owner: '钱晨', status: 'pending', description: '一键生成数据可视化大屏', version: 'v1.2' },
    { id: 6, name: '代码审查助手', enName: 'Code Reviewer', category: '开发工具', tags: ['开发', '代码'], downloads: 321, rating: 4.5, owner: '孙丽', status: 'published', description: '自动审查代码，提出优化建议', version: 'v2.0' },
  ],
  // 优秀案例（包含贡献人）
  cases: [
    { id: 1, dept: '数智平台团队', contributor: '张伟', title: '智能代码审查系统', efficiency: '89%', users: 156, rating: 4.9, views: 1234, desc: '使用AI自动审查代码，识别潜在bug和安全风险', content: '本系统通过深度学习模型对代码进行静态分析，能够自动识别常见的安全漏洞和代码质量问题。部署后，代码审查效率提升89%，人工审查工作量减少65%。' },
    { id: 2, dept: '市场营销部', contributor: '李娜', title: '智能销售助手', efficiency: '35%', users: 234, rating: 4.8, views: 2156, desc: 'AI辅助分析客户需求，生成个性化方案', content: '智能销售助手能够根据客户的历史行为、偏好和需求，自动生成个性化的销售方案和话术。试点团队销售转化率提升35%。' },
    { id: 3, dept: '客户服务部', contributor: '王强', title: '智能客服机器人', efficiency: '80%', users: 45, rating: 4.7, views: 892, desc: '7x24小时智能回复，平均响应时间缩短80%', content: '基于大语言模型的智能客服机器人，能够处理80%的常见客户咨询，余下20%复杂问题转人工处理。客户满意度提升至4.7分。' },
    { id: 4, dept: '理赔管理部', contributor: '赵敏', title: '智能理赔提速', efficiency: '3x', users: 67, rating: 4.9, views: 1567, desc: 'AI自动识别票据，理赔流程自动化', content: '通过OCR和AI票据识别技术，实现理赔材料的自动分类和关键信息提取。理赔处理效率提升3倍，平均处理时间从3天缩短至1天。' },
    { id: 5, dept: '精算部', contributor: '孙丽', title: '智能风险评估', efficiency: '50%', users: 28, rating: 4.6, views: 678, desc: 'AI辅助保险产品风险评估，提升核保效率', content: '利用机器学习模型对投保人风险进行智能评估，帮助精算师快速判断风险等级。核保效率提升50%，人工复核工作量减少40%。' },
    { id: 6, dept: '企划财务部', contributor: '钱晨', title: '智能财务分析', efficiency: '60%', users: 52, rating: 4.8, views: 945, desc: '自动生成财务分析报告，提升工作效率', content: 'AI财务分析助手能够自动提取财务数据，生成各类分析报表。财务报告生成效率提升60%，数据分析更加精准。' },
  ],
  // 安全合规考试题库
  securityExam: {
    passingScore: 80,
    questions: [
      { id: 1, question: '以下哪个行为可能导致公司敏感数据泄露？', options: ['在公共场合讨论工作内容', '使用公司配备的加密设备处理敏感文件', '将工作文件存储在个人网盘', '定期更新账号密码'], correct: 2 },
      { id: 2, question: 'AI超级秘书平台的使用原则是？', options: ['可以随意分享账号密码', '仅限本人使用，不得分享账号', '可以在非公司设备登录', '可以导出敏感数据到个人设备'], correct: 1 },
      { id: 3, question: '发现安全漏洞后应该如何处理？', options: ['忽略它', '私下解决后不报告', '立即上报安全部门', '在公开场合讨论'], correct: 2 },
      { id: 4, question: '以下哪个是强密码的特征？', options: ['使用生日', '使用简单数字', '包含大小写字母、数字和特殊符号', '使用姓名拼音'], correct: 2 },
      { id: 5, question: '处理客户个人信息时应该？', options: ['随意保存在个人电脑', '按照公司隐私保护政策处理', '分享给无关同事', '打印后随意丢弃'], correct: 1 },
    ]
  },
  deptStats: [
    { name: '数智平台团队', coverage: 95, tasks: 1890, icon: 'code' },
    { name: '理赔管理部', coverage: 88, tasks: 2340, icon: 'file-invoice-dollar' },
    { name: '精算部', coverage: 82, tasks: 567, icon: 'calculator' },
    { name: '企划财务部', coverage: 75, tasks: 890, icon: 'chart-line' },
    { name: '互联网平台部', coverage: 71, tasks: 1234, icon: 'globe' },
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
const Navbar = ({ activePage, setActivePage, user, onLogout, notificationCount, onNotificationClick }) => (
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
      <button style={activePage === 'security' ? styles.navItemActive : styles.navItem} onClick={() => setActivePage('security')}>
        <i className="fas fa-shield-alt"></i> 安全合规
      </button>
      <button style={activePage === 'profile' ? styles.navItemActive : styles.navItem} onClick={() => setActivePage('profile')}>
        <i className="fas fa-user"></i> 个人中心
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
      <button style={styles.notificationBtn} onClick={onNotificationClick}>
        <i className="fas fa-bell"></i>
        {notificationCount > 0 && <span style={styles.notificationBadge}>{notificationCount}</span>}
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
          <div style={styles.statBox}>
            <div style={styles.statNumber}>{mockData.stats.totalSkills}</div>
            <div style={styles.statLabel}>技能市场技能数</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statNumber}>{mockData.stats.totalCases}</div>
            <div style={styles.statLabel}>优秀案例个数</div>
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
    
    {/* AI超级秘书部门渗透率排行榜 */}
    <div style={styles.leaderboardSection}>
      <h3 style={styles.leaderboardTitle}><i className="fas fa-trophy"></i> AI超级秘书部门渗透率排行榜</h3>
      <div style={styles.deptPenetrationGrid}>
        {/* 部门渗透率排行榜 */}
        <div style={styles.deptPenetrationCard}>
          <h4 style={styles.penetrationCardTitle}><i className="fas fa-building"></i> 部门排行榜</h4>
          <div style={styles.penetrationList}>
            {mockData.deptPenetration.slice(0, 10).map(dept => (
              <div key={dept.rank} style={styles.penetrationItem}>
                <div style={{...styles.penetrationRank, background: dept.rank <= 3 ? '#ffd700' : '#e0e0e0'}}>{dept.rank}</div>
                <div style={styles.penetrationInfo}>
                  <div style={styles.penetrationName}>{dept.name}</div>
                  <div style={styles.penetrationBar}>
                    <div style={{...styles.penetrationFill, width: `${dept.penetration}%`}}></div>
                  </div>
                </div>
                <div style={styles.penetrationValue}>{dept.penetration}%</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 机构渗透率排行榜 */}
        <div style={styles.deptPenetrationCard}>
          <h4 style={styles.penetrationCardTitle}><i className="fas fa-map-marker-alt"></i> 机构排行榜</h4>
          <div style={styles.penetrationList}>
            {mockData.instPenetration.map(inst => (
              <div key={inst.rank} style={styles.penetrationItem}>
                <div style={{...styles.penetrationRank, background: inst.rank <= 3 ? '#ffd700' : '#e0e0e0'}}>{inst.rank}</div>
                <div style={styles.penetrationInfo}>
                  <div style={styles.penetrationName}>{inst.name}</div>
                  <div style={styles.penetrationBar}>
                    <div style={{...styles.penetrationFill, width: `${inst.penetration}%`}}></div>
                  </div>
                </div>
                <div style={styles.penetrationValue}>{inst.penetration}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 技能市场页
const SkillsPage = ({ setActivePage, onSubmitSkill }) => {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestForm, setRequestForm] = useState({ title: '', category: '', problem: '' });
  const [requestVotes, setRequestVotes] = useState({});
  const [installModalSkill, setInstallModalSkill] = useState(null);
  
  const filteredSkills = mockData.skills.filter(s => 
    s.status === 'published' && 
    (category === 'all' || s.category === category) &&
    (s.name.includes(search) || s.tags.some(t => t.includes(search)))
  );
  
  const handleRequestSubmit = (e) => {
    e.preventDefault();
    if (!requestForm.title || !requestForm.category || !requestForm.problem) {
      alert('请填写完整信息');
      return;
    }
    alert('技能需求已提交！');
    setShowRequestModal(false);
    setRequestForm({ title: '', category: '', problem: '' });
  };
  
  const handleVote = (id) => {
    setRequestVotes(prev => ({...prev, [id]: !prev[id]}));
  };
  
  const copyCommand = (cmd) => {
    navigator.clipboard.writeText(cmd);
    alert('命令已复制到剪贴板');
  };
  
  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <h2 style={styles.pageTitle}><i className="fas fa-cube"></i> 技能市场</h2>
        <p style={styles.pageSubtitle}>发现、分享、创造智能技能</p>
        <button style={styles.submitSkillBtn} onClick={onSubmitSkill}>
          <i className="fas fa-plus"></i> 投稿技能
        </button>
        <button style={{...styles.submitSkillBtn, background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)', marginLeft: '10px'}} onClick={() => setShowRequestModal(true)}>
          <i className="fas fa-lightbulb"></i> 提交需求
        </button>
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
                <button style={styles.downloadBtn} onClick={() => setInstallModalSkill(skill)}><i className="fas fa-download"></i> 安装</button>
                <button style={styles.detailBtn}>查看详情</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 技能需求区域 */}
      <div style={styles.requestsSection}>
        <h3 style={styles.requestsTitle}><i className="fas fa-fire"></i> 急需构建的技能</h3>
        <p style={styles.requestsSubtitle}>以下是需要大家共同构建的技能，欢迎有能力的小伙伴认领</p>
        <div style={styles.requestsGrid}>
          {mockData.skillRequests?.map(req => (
            <div key={req.id} style={styles.requestCard}>
              <div style={styles.requestHeader}>
                <span style={styles.requestCategory}>{req.category}</span>
                <button 
                  style={requestVotes[req.id] ? styles.votedBtn : styles.voteBtn}
                  onClick={() => handleVote(req.id)}
                >
                  <i className="fas fa-thumbs-up"></i> {req.votes}
                </button>
              </div>
              <h4 style={styles.requestTitle}>{req.title}</h4>
              <p style={styles.requestProblem}>{req.problem}</p>
              <div style={styles.requestMeta}>
                <span><i className="fas fa-user"></i> {req.requester}</span>
                <span><i className="fas fa-building"></i> {req.dept}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 技能需求提交弹窗 */}
      {showRequestModal && (
        <div style={styles.modalOverlay} onClick={() => setShowRequestModal(false)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalHeaderTitle}><i className="fas fa-lightbulb"></i> 提交技能需求</h3>
              <button style={styles.modalClose} onClick={() => setShowRequestModal(false)}>×</button>
            </div>
            <form onSubmit={handleRequestSubmit} style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>希望拥有的技能名称 *</label>
                <input 
                  type="text"
                  placeholder="例如：智能合同审查"
                  style={styles.formInput}
                  value={requestForm.title}
                  onChange={(e) => setRequestForm({...requestForm, title: e.target.value})}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>技能分类 *</label>
                <select 
                  style={styles.formSelect}
                  value={requestForm.category}
                  onChange={(e) => setRequestForm({...requestForm, category: e.target.value})}
                >
                  <option value="">请选择分类</option>
                  <option value="数据分析">数据分析</option>
                  <option value="文档处理">文档处理</option>
                  <option value="客户服务">客户服务</option>
                  <option value="自动化流程">自动化流程</option>
                  <option value="开发工具">开发工具</option>
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>希望解决什么问题？ *</label>
                <textarea 
                  style={styles.formTextarea}
                  placeholder="描述你希望AI技能帮你完成什么工作..."
                  value={requestForm.problem}
                  onChange={(e) => setRequestForm({...requestForm, problem: e.target.value})}
                  rows={4}
                />
              </div>
              <button type="submit" style={styles.submitBtn}>提交需求</button>
            </form>
          </div>
        </div>
      )}
      
      {/* 安装弹窗 */}
      {installModalSkill && (
        <div style={styles.modalOverlay} onClick={() => setInstallModalSkill(null)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalHeaderTitle}><i className="fas fa-download"></i> 安装技能 - {installModalSkill.name}</h3>
              <button style={styles.modalClose} onClick={() => setInstallModalSkill(null)}>×</button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.installMethod}>
                <h4 style={styles.installMethodTitle}><i className="fas fa-terminal"></i> 安装方式一：命令行安装</h4>
                <div style={styles.commandBox}>
                  <code style={styles.commandText}>openclaw skill install {installModalSkill.name}</code>
                  <button 
                    style={styles.copyBtn}
                    onClick={() => copyCommand(`openclaw skill install ${installModalSkill.name}`)}
                  >
                    <i className="fas fa-copy"></i> 复制
                  </button>
                </div>
              </div>
              
              <div style={styles.installMethod}>
                <h4 style={styles.installMethodTitle}><i className="fas fa-robot"></i> 安装方式二：AI助手安装（暂不支持）</h4>
                <p style={styles.installHint}>直接告诉你的AI助手："请安装{installModalSkill.name}"</p>
              </div>
              
              <div style={styles.installMethod}>
                <h4 style={styles.installMethodTitle}><i className="fas fa-download"></i> 安装方式三：点击下载</h4>
                <button style={styles.submitBtn} onClick={() => {
                  alert('技能安装成功！');
                  setInstallModalSkill(null);
                }}>
                  <i className="fas fa-download"></i> 下载安装
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 优秀案例页
const CasesPage = ({ setActivePage }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('views');
  const [selectedCase, setSelectedCase] = useState(null);
  const [caseLikes, setCaseLikes] = useState({});
  const [caseComments, setCaseComments] = useState({});
  
  const filteredCases = mockData.cases
    .filter(c => 
      (category === 'all' || c.dept === category) &&
      (c.title.includes(search) || c.desc.includes(search) || c.contributor.includes(search))
    )
    .sort((a, b) => {
      if (sortBy === 'views') return b.views - a.views;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  
  const departments = [...new Set(mockData.cases.map(c => c.dept))];
  
  const handleLike = (id) => {
    setCaseLikes(prev => ({...prev, [id]: !prev[id]}));
  };
  
  const handleComment = (id, comment) => {
    if (!comment.trim()) return;
    setCaseComments(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), { text: comment, date: new Date().toLocaleDateString() }]
    }));
  };
  
  if (selectedCase) {
    return (
      <div style={styles.page}>
        <button style={styles.backBtn} onClick={() => setSelectedCase(null)}>
          <i className="fas fa-arrow-left"></i> 返回列表
        </button>
        
        <div style={styles.caseDetailCard}>
          <div style={styles.caseDetailHeader}>
            <div>
              <span style={styles.caseDept}>{selectedCase.dept}</span>
              <span style={styles.caseContributor}>贡献人：{selectedCase.contributor}</span>
            </div>
            <h2 style={styles.caseDetailTitle}>{selectedCase.title}</h2>
          </div>
          
          <div style={styles.caseDetailStats}>
            <div style={styles.caseStatItem}>
              <div style={styles.caseStatNum}>{selectedCase.efficiency}</div>
              <div style={styles.caseStatLabel}>效率提升</div>
            </div>
            <div style={styles.caseStatItem}>
              <div style={styles.caseStatNum}>{selectedCase.views}</div>
              <div style={styles.caseStatLabel}>阅读人数</div>
            </div>
            <div style={styles.caseStatItem}>
              <div style={styles.caseStatNum}>{selectedCase.rating}</div>
              <div style={styles.caseStatLabel}>评分</div>
            </div>
          </div>
          
          <div style={styles.caseDetailContent}>
            <h3 style={styles.detailSectionTitle}>案例详情</h3>
            <p style={styles.caseDetailDesc}>{selectedCase.content}</p>
          </div>
          
          <div style={styles.caseDetailActions}>
            <button 
              style={caseLikes[selectedCase.id] ? styles.likedBtn : styles.likeBtn}
              onClick={() => handleLike(selectedCase.id)}
            >
              <i className={caseLikes[selectedCase.id] ? 'fas fa-heart' : 'far fa-heart'}></i>
              {caseLikes[selectedCase.id] ? '已赞' : '点赞'}
            </button>
            <div style={styles.ratingSection}>
              <span>评分：</span>
              {[1,2,3,4,5].map(star => (
                <span key={star} style={styles.starIcon}><i className="fas fa-star"></i></span>
              ))}
            </div>
          </div>
          
          <div style={styles.commentsSection}>
            <h3 style={styles.detailSectionTitle}>评论</h3>
            {(caseComments[selectedCase.id] || []).length === 0 ? (
              <p style={styles.noComments}>暂无评论，快来抢先评论吧！</p>
            ) : (
              <div style={styles.commentsList}>
                {(caseComments[selectedCase.id] || []).map((comment, idx) => (
                  <div key={idx} style={styles.commentItem}>
                    <div style={styles.commentAvatar}>用户</div>
                    <div style={styles.commentContent}>
                      <div style={styles.commentText}>{comment.text}</div>
                      <div style={styles.commentDate}>{comment.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div style={styles.commentForm}>
              <input 
                type="text" 
                placeholder="发表评论..."
                style={styles.commentInput}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleComment(selectedCase.id, e.target.value);
                    e.target.value = '';
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <h2 style={styles.pageTitle}><i className="fas fa-lightbulb"></i> 优秀AI应用案例</h2>
        <p style={styles.pageSubtitle}>看看各部门是如何运用AI提升工作效率的</p>
      </div>
      
      <div style={styles.filterBar}>
        <input 
          type="text" 
          placeholder="搜索案例..." 
          style={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select 
          style={styles.formSelect}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">全部部门</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        <select 
          style={styles.formSelect}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="views">按阅读人数</option>
          <option value="rating">按评分</option>
        </select>
      </div>
      
      <div style={styles.casesGrid}>
        {filteredCases.map(item => (
          <div key={item.id} style={styles.caseCard} onClick={() => setSelectedCase(item)}>
            <div style={styles.caseImage}>
              <i className="fas fa-lightbulb"></i>
            </div>
            <div style={styles.caseBody}>
              <span style={styles.caseDept}>{item.dept}</span>
              <span style={styles.caseContributor}><i className="fas fa-user"></i> {item.contributor}</span>
              <h3 style={styles.caseTitle}>{item.title}</h3>
              <p style={styles.caseDesc}>{item.desc}</p>
              <div style={styles.caseStats}>
                <div style={styles.caseStatItem}>
                  <div style={styles.caseStatNum}>{item.efficiency}</div>
                  <div style={styles.caseStatLabel}>效率提升</div>
                </div>
                <div style={styles.caseStatItem}>
                  <div style={styles.caseStatNum}>{item.views}</div>
                  <div style={styles.caseStatLabel}>阅读人数</div>
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
};

// 投稿技能页
const SubmitSkillPage = ({ onBack, user }) => {
  const [formData, setFormData] = useState({
    name: '',
    enName: '',
    category: '',
    tags: '',
    description: '',
    version: 'v1.0'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.description) {
      alert('请填写必填字段');
      return;
    }
    
    setSubmitting(true);
    
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };
  
  if (submitted) {
    return (
      <div style={styles.page}>
        <div style={styles.successCard}>
          <div style={styles.successIcon}><i className="fas fa-check-circle"></i></div>
          <h2 style={styles.successTitle}>投稿成功！</h2>
          <p style={styles.successText}>您的技能已提交审核，审核通过后将上架到技能市场</p>
          <button style={styles.backBtn} onClick={onBack}>
            <i className="fas fa-arrow-left"></i> 返回技能市场
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div style={styles.page}>
      <button style={styles.backBtn} onClick={onBack}>
        <i className="fas fa-arrow-left"></i> 返回技能市场
      </button>
      
      <div style={styles.submitFormCard}>
        <h2 style={styles.submitFormTitle}><i className="fas fa-cube"></i> 投稿技能</h2>
        <p style={styles.submitFormSubtitle}>分享你的AI技能到技能市场</p>
        
        <div style={styles.noticeBox}>
          <i className="fas fa-info-circle"></i>
          <span>投稿的技能需要经过审核后才会正式上架到公共技能市场</span>
        </div>
        
        <form onSubmit={handleSubmit} style={styles.submitForm}>
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>技能名称 <span style={styles.required}>*</span></label>
              <input 
                type="text" 
                name="name"
                placeholder="例如：Excel智能分析" 
                style={styles.formInput}
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>英文名称</label>
              <input 
                type="text" 
                name="enName"
                placeholder="例如：Excel Analyzer" 
                style={styles.formInput}
                value={formData.enName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>技能分类 <span style={styles.required}>*</span></label>
              <select 
                name="category"
                style={styles.formSelect}
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">请选择分类</option>
                <option value="数据分析">数据分析</option>
                <option value="文档处理">文档处理</option>
                <option value="客户服务">客户服务</option>
                <option value="自动化流程">自动化流程</option>
                <option value="开发工具">开发工具</option>
              </select>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>版本号</label>
              <input 
                type="text" 
                name="version"
                placeholder="例如：v1.0" 
                style={styles.formInput}
                value={formData.version}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>标签（用逗号分隔）</label>
            <input 
              type="text" 
              name="tags"
              placeholder="例如：数据分析, Excel, Office" 
              style={styles.formInput}
              value={formData.tags}
              onChange={handleInputChange}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>技能描述 <span style={styles.required}>*</span></label>
            <textarea 
              name="description"
              placeholder="介绍一下这个技能的功能和使用场景" 
              style={styles.formTextarea}
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
            />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>提交人</label>
            <input 
              type="text" 
              style={styles.formInput}
              value={user.name}
              disabled
            />
          </div>
          
          <div style={styles.formActions}>
            <button type="button" style={styles.cancelBtn} onClick={onBack}>取消</button>
            <button type="submit" style={styles.submitBtn} disabled={submitting}>
              {submitting ? '提交中...' : '提交审核'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 数据看板页
const DashboardPage = () => {
  const [leaderboardPeriod, setLeaderboardPeriod] = useState('week');
  
  return (
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
          <div style={styles.overviewNum}>{mockData.stats.totalSkills}</div>
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
      
      {/* 排行榜区域 */}
      <div style={styles.leaderboardSection}>
        <div style={styles.leaderboardHeader}>
          <h3 style={styles.leaderboardTitle}><i className="fas fa-trophy"></i> 排行榜</h3>
          <div style={styles.periodTabs}>
            <button 
              style={leaderboardPeriod === 'week' ? styles.periodTabActive : styles.periodTab}
              onClick={() => setLeaderboardPeriod('week')}
            >
              周榜
            </button>
            <button 
              style={leaderboardPeriod === 'month' ? styles.periodTabActive : styles.periodTab}
              onClick={() => setLeaderboardPeriod('month')}
            >
              月榜
            </button>
            <button 
              style={leaderboardPeriod === 'all' ? styles.periodTabActive : styles.periodTab}
              onClick={() => setLeaderboardPeriod('all')}
            >
              历史累计
            </button>
          </div>
        </div>
        
        <div style={styles.leaderboardGrid}>
          {/* 个人完成任务排行榜 */}
          <div style={styles.leaderboardCard}>
            <h4 style={styles.leaderboardCardTitle}><i className="fas fa-user-check"></i> 个人完成任务排行</h4>
            <div style={styles.leaderboardList}>
              {mockData.leaderboards.personalTasks.map((item, idx) => (
                <div key={idx} style={styles.leaderboardItem}>
                  <div style={{...styles.rankBadge, background: idx < 3 ? '#ffd700' : '#e0e0e0'}}>
                    {item.rank}
                  </div>
                  <div style={styles.avatar}>{item.avatar}</div>
                  <div style={styles.leaderboardInfo}>
                    <div style={styles.leaderboardName}>{item.name}</div>
                    <div style={styles.leaderboardDept}>{item.dept}</div>
                  </div>
                  <div style={styles.leaderboardValue}>{item.tasks}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 个人贡献技能排行榜 */}
          <div style={styles.leaderboardCard}>
            <h4 style={styles.leaderboardCardTitle}><i className="fas fa-cube"></i> 个人贡献技能排行</h4>
            <div style={styles.leaderboardList}>
              {mockData.leaderboards.personalSkills.map((item, idx) => (
                <div key={idx} style={styles.leaderboardItem}>
                  <div style={{...styles.rankBadge, background: idx < 3 ? '#ffd700' : '#e0e0e0'}}>
                    {item.rank}
                  </div>
                  <div style={styles.avatar}>{item.avatar}</div>
                  <div style={styles.leaderboardInfo}>
                    <div style={styles.leaderboardName}>{item.name}</div>
                    <div style={styles.leaderboardDept}>{item.dept}</div>
                  </div>
                  <div style={styles.leaderboardValue}>{item.skills}个</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 技能下载排行榜 */}
          <div style={styles.leaderboardCard}>
            <h4 style={styles.leaderboardCardTitle}><i className="fas fa-download"></i> 技能下载排行</h4>
            <div style={styles.leaderboardList}>
              {mockData.leaderboards.skillDownloads.map((item, idx) => (
                <div key={idx} style={styles.leaderboardItem}>
                  <div style={{...styles.rankBadge, background: idx < 3 ? '#ffd700' : '#e0e0e0'}}>
                    {item.rank}
                  </div>
                  <div style={styles.leaderboardFullInfo}>
                    <div style={styles.leaderboardName}>{item.name}</div>
                    <div style={styles.leaderboardDept}>by {item.owner}</div>
                  </div>
                  <div style={styles.leaderboardValue}>{item.downloads}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 部门使用排行榜 */}
          <div style={styles.leaderboardCard}>
            <h4 style={styles.leaderboardCardTitle}><i className="fas fa-building"></i> 部门使用排行(人均)</h4>
            <div style={styles.leaderboardList}>
              {mockData.leaderboards.deptUsage.map((item, idx) => (
                <div key={idx} style={styles.leaderboardItem}>
                  <div style={{...styles.rankBadge, background: idx < 3 ? '#ffd700' : '#e0e0e0'}}>
                    {item.rank}
                  </div>
                  <div style={styles.leaderboardInfo}>
                    <div style={styles.leaderboardName}>{item.name}</div>
                    <div style={styles.leaderboardDept}>{item.tasks}次 / {item.employees}人</div>
                  </div>
                  <div style={styles.leaderboardValue}>{item.perCapita}</div>
                </div>
              ))}
            </div>
          </div>
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
};

// 安全合规页
const SecurityPage = ({ user }) => {
  const [tab, setTab] = useState('learn');
  const [examAnswers, setExamAnswers] = useState({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examScore, setExamScore] = useState(0);
  const [hasPassed, setHasPassed] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  
  const handleAnswer = (qId, answer) => {
    setExamAnswers(prev => ({...prev, [qId]: answer}));
  };
  
  const submitExam = () => {
    const questions = mockData.securityExam.questions;
    let correct = 0;
    questions.forEach(q => {
      if (examAnswers[q.id] === q.correct) correct++;
    });
    const score = Math.round((correct / questions.length) * 100);
    setExamScore(score);
    setExamSubmitted(true);
    if (score >= mockData.securityExam.passingScore) {
      setHasPassed(true);
    }
  };
  
  const resetExam = () => {
    setExamAnswers({});
    setExamSubmitted(false);
    setExamScore(0);
    setHasPassed(false);
  };
  
  if (showCertificate) {
    return (
      <div style={styles.page}>
        <div style={styles.certificateCard}>
          <div style={styles.certificateHeader}>
            <i className="fas fa-award" style={styles.certificateIcon}></i>
            <h2 style={styles.certificateTitle}>荣誉证书</h2>
          </div>
          <div style={styles.certificateBody}>
            <p style={styles.certificateText}>兹证明</p>
            <h3 style={styles.certificateName}>{user.name}</h3>
            <p style={styles.certificateText}>已完成AI超级秘书安全合规培训</p>
            <p style={styles.certificateText}>考试合格，成绩优秀</p>
            <div style={styles.certificateSeal}>合格</div>
          </div>
          <div style={styles.certificateFooter}>
            <p>平安健康险 数智平台团队</p>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
          <button style={styles.backBtn} onClick={() => setShowCertificate(false)}>
            <i className="fas fa-arrow-left"></i> 返回
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <h2 style={styles.pageTitle}><i className="fas fa-shield-alt"></i> 安全合规</h2>
        <p style={styles.pageSubtitle}>学习安全规范，通过考试获得高速流量奖励</p>
      </div>
      
      <div style={styles.profileTabs}>
        <button 
          style={tab === 'learn' ? styles.profileTabActive : styles.profileTab}
          onClick={() => setTab('learn')}
        >
          <i className="fas fa-book"></i> 安全规范学习
        </button>
        <button 
          style={tab === 'exam' ? styles.profileTabActive : styles.profileTab}
          onClick={() => setTab('exam')}
        >
          <i className="fas fa-clipboard-check"></i> 安全合规考试
        </button>
      </div>
      
      {tab === 'learn' && (
        <div style={styles.learnSection}>
          <div style={styles.learnCard}>
            <h3 style={styles.learnTitle}><i className="fas fa-user-secret"></i> 账号安全规范</h3>
            <ul style={styles.learnList}>
              <li>AI超级秘书账号仅限本人使用，不得借给他人</li>
              <li>定期修改密码，建议每3个月更换一次</li>
              <li>密码强度要求：至少8位，包含大小写字母、数字</li>
              <li>发现账号异常立即联系IT部门</li>
            </ul>
          </div>
          
          <div style={styles.learnCard}>
            <h3 style={styles.learnTitle}><i className="fas fa-lock"></i> 数据安全规范</h3>
            <ul style={styles.learnList}>
              <li>严禁将公司敏感数据导出到个人设备</li>
              <li>客户个人信息必须按照公司隐私保护政策处理</li>
              <li>使用公司配备的加密存储设备处理敏感文件</li>
              <li>含敏感信息的纸质文档必须碎纸处理</li>
            </ul>
          </div>
          
          <div style={styles.learnCard}>
            <h3 style={styles.learnTitle}><i className="fas fa-robot"></i> AI使用规范</h3>
            <ul style={styles.learnList}>
              <li>不得使用AI处理国家法律法规禁止的内容</li>
              <li>不得向AI输入涉及公司商业秘密的信息</li>
              <li>AI生成的内容需人工审核后方可对外使用</li>
              <li>遵守公司AI使用合规要求，不得违规操作</li>
            </ul>
          </div>
          
          <div style={styles.learnCard}>
            <h3 style={styles.learnTitle}><i className="fas fa-exclamation-triangle"></i> 违规行为处罚</h3>
            <ul style={styles.learnList}>
              <li>首次违规：口头警告，扣除当月绩效</li>
              <li>二次违规：书面警告，取消AI使用资格</li>
              <li>严重违规：解除劳动合同，追究法律责任</li>
            </ul>
          </div>
          
          <div style={styles.rewardSection}>
            <div style={styles.rewardContent}>
              <div style={styles.rewardText}>
                <i className="fas fa-graduation-cap"></i>
                <span>通过安全合规考试可获得<strong>100兆</strong>高速流量奖励</span>
              </div>
              <button style={styles.rewardBtn} onClick={() => setTab('exam')}>
                <i className="fas fa-arrow-right"></i> 前往考试
              </button>
            </div>
          </div>
        </div>
      )}
      
      {tab === 'exam' && (
        <div style={styles.examSection}>
          {!examSubmitted ? (
            <>
              <div style={styles.examInfo}>
                <p>共 {mockData.securityExam.questions.length} 道选择题，达到 {mockData.securityExam.passingScore}% 方可通过</p>
              </div>
              {mockData.securityExam.questions.map(q => (
                <div key={q.id} style={styles.examQuestion}>
                  <p style={styles.questionText}>{q.id}. {q.question}</p>
                  <div style={styles.optionsList}>
                    {q.options.map((opt, idx) => (
                      <label key={idx} style={styles.optionLabel}>
                        <input 
                          type="radio" 
                          name={`q${q.id}`}
                          checked={examAnswers[q.id] === idx}
                          onChange={() => handleAnswer(q.id, idx)}
                        />
                        <span style={examAnswers[q.id] === idx ? styles.optionTextSelected : styles.optionText}>
                          {String.fromCharCode(65 + idx)}. {opt}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <button 
                style={Object.keys(examAnswers).length === mockData.securityExam.questions.length ? styles.submitBtn : styles.submitBtnDisabled}
                onClick={submitExam}
                disabled={Object.keys(examAnswers).length !== mockData.securityExam.questions.length}
              >
                提交试卷
              </button>
            </>
          ) : (
            <div style={styles.examResult}>
              <div style={hasPassed ? styles.passCard : styles.failCard}>
                <i className={hasPassed ? 'fas fa-trophy' : 'fas fa-times-circle'} style={hasPassed ? styles.passIcon : styles.failIcon}></i>
                <h3>{hasPassed ? '恭喜通过考试！' : '考试未通过'}</h3>
                <p>您的得分：<strong>{examScore}</strong> 分</p>
                <p>及格分数：{mockData.securityExam.passingScore} 分</p>
              </div>
              {hasPassed && (
                <button style={styles.rewardBtn} onClick={() => setShowCertificate(true)}>
                  <i className="fas fa-certificate"></i> 查看证书
                </button>
              )}
              <button style={styles.retryBtn} onClick={resetExam}>
                {hasPassed ? '重新考试' : '再次尝试'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

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
  const t = mockData.taskHistory;
  const [profileTab, setProfileTab] = useState('tokens');
  const [taskPeriod, setTaskPeriod] = useState('daily');
  const [chartData, setChartData] = useState(t.daily);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyForm, setApplyForm] = useState({ reason: '', amount: '' });
  
  const handlePeriodChange = (period) => {
    setTaskPeriod(period);
    setChartData(period === 'daily' ? t.daily : period === 'weekly' ? t.weekly : t.monthly);
  };
  
  const maxValue = Math.max(...chartData);
  
  const handleApplySubmit = (e) => {
    e.preventDefault();
    alert('申请已提交，等待领导审批');
    setShowApplyModal(false);
    setApplyForm({ reason: '', amount: '' });
  };
  
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
      
      {/* 二级菜单 */}
      <div style={styles.profileTabs}>
        <button 
          style={profileTab === 'tokens' ? styles.profileTabActive : styles.profileTab}
          onClick={() => setProfileTab('tokens')}
        >
          <i className="fas fa-bolt"></i> 高速流量
        </button>
        <button 
          style={profileTab === 'tasks' ? styles.profileTabActive : styles.profileTab}
          onClick={() => setProfileTab('tasks')}
        >
          <i className="fas fa-chart-bar"></i> 任务统计
        </button>
        <button 
          style={profileTab === 'cases' ? styles.profileTabActive : styles.profileTab}
          onClick={() => setProfileTab('cases')}
        >
          <i className="fas fa-lightbulb"></i> 我的案例投稿
        </button>
        <button 
          style={profileTab === 'skills' ? styles.profileTabActive : styles.profileTab}
          onClick={() => setProfileTab('skills')}
        >
          <i className="fas fa-cube"></i> 我分享的技能
        </button>
        <button 
          style={profileTab === 'team' ? styles.profileTabActive : styles.profileTab}
          onClick={() => setProfileTab('team')}
        >
          <i className="fas fa-users"></i> 我的团队
        </button>
      </div>
      
      {/* 高速流量 */}
      {profileTab === 'tokens' && (
        <div style={styles.tokenSection}>
          <h3 style={styles.sectionTitle}><i className="fas fa-bolt"></i> 今日高速流量剩余情况</h3>
          
          <div style={styles.flowNotice}>
            <i className="fas fa-info-circle"></i>
            <span>高速流量：用完限速不限量 | 普通流量：限速100KB/秒 | 每日0点刷新</span>
          </div>
          
          <div style={styles.tokenCards}>
            <div style={styles.tokenCard}>
              <div style={styles.tokenLabel}>高级模型</div>
              <div style={styles.tokenDesc}>每人每日5兆，每日0点刷新</div>
              <div style={styles.tokenProgress}>
                <div style={styles.progressBar}>
                  <div style={{...styles.progressFill, width: `${(mockData.tokens.used.advanced / mockData.tokens.daily.advanced) * 100}%`}}></div>
                </div>
              </div>
              <div style={styles.tokenInfo}>
                <span>已用: {mockData.tokens.used.advanced}M</span>
                <span>剩余: {mockData.tokens.remaining.advanced}M / {mockData.tokens.daily.advanced}M</span>
              </div>
            </div>
            
            <div style={styles.tokenCard}>
              <div style={styles.tokenLabel}>轻量模型</div>
              <div style={styles.tokenDesc}>每人每日5兆，每日0点刷新</div>
              <div style={styles.tokenProgress}>
                <div style={styles.progressBar}>
                  <div style={{...styles.progressFill, width: `${(mockData.tokens.used.lightweight / mockData.tokens.daily.lightweight) * 100}%`, background: '#28a745'}}></div>
                </div>
              </div>
              <div style={styles.tokenInfo}>
                <span>已用: {mockData.tokens.used.lightweight}M</span>
                <span>剩余: {mockData.tokens.remaining.lightweight}M / {mockData.tokens.daily.lightweight}M</span>
              </div>
            </div>
            
            <div style={styles.tokenCard}>
              <div style={styles.tokenLabel}>文生视频模型</div>
              <div style={styles.tokenDesc}>每人每日10兆，每日0点刷新</div>
              <div style={styles.tokenProgress}>
                <div style={styles.progressBar}>
                  <div style={{...styles.progressFill, width: `${(mockData.tokens.used.video / mockData.tokens.daily.video) * 100}%`, background: '#9c27b0'}}></div>
                </div>
              </div>
              <div style={styles.tokenInfo}>
                <span>已用: {mockData.tokens.used.video}M</span>
                <span>剩余: {mockData.tokens.remaining.video}M / {mockData.tokens.daily.video}M</span>
              </div>
            </div>
          </div>
          
          <div style={styles.rewardSection}>
            <div style={styles.rewardContent}>
              <div style={styles.rewardText}>
                <i className="fas fa-graduation-cap"></i>
                <span>通过安全合规考试可获得<strong>100兆</strong>高速流量奖励</span>
              </div>
              <button style={styles.rewardBtn} onClick={() => setActivePage('security')}>
                <i className="fas fa-arrow-right"></i> 前往考试
              </button>
            </div>
          </div>
          
          <button style={styles.applyBtn} onClick={() => setShowApplyModal(true)}>
            <i className="fas fa-plus"></i> 申请额外流量
          </button>
          
          {showApplyModal && (
            <div style={styles.modalOverlay} onClick={() => setShowApplyModal(false)}>
              <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
                <div style={styles.modalHeader}>
                  <h3 style={styles.modalHeaderTitle}><i className="fas fa-paper-plane"></i> 申请额外流量</h3>
                  <button style={styles.modalClose} onClick={() => setShowApplyModal(false)}>×</button>
                </div>
                <form onSubmit={handleApplySubmit} style={styles.modalBody}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>申请流量（兆）*</label>
                    <input 
                      type="text"
                      placeholder="请输入申请流量"
                      style={styles.formInput}
                      value={applyForm.amount}
                      onChange={(e) => setApplyForm({...applyForm, amount: e.target.value})}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>申请理由 *</label>
                    <textarea 
                      style={styles.formTextarea}
                      placeholder="请说明申请流量的原因..."
                      value={applyForm.reason}
                      onChange={(e) => setApplyForm({...applyForm, reason: e.target.value})}
                      rows={4}
                    />
                  </div>
                  <div style={styles.approvalNotice}>
                    <i className="fas fa-user-tie"></i> 申请需要直属领导审批
                  </div>
                  <button type="submit" style={styles.submitBtn}>提交申请</button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* 任务统计 */}
      {profileTab === 'tasks' && (
        <div style={styles.tokenSection}>
          <h3 style={styles.sectionTitle}><i className="fas fa-chart-bar"></i> AI任务完成情况</h3>
          
          <div style={styles.chartPeriodSelect}>
            <button 
              style={taskPeriod === 'daily' ? styles.periodBtnActive : styles.periodBtn}
              onClick={() => handlePeriodChange('daily')}
            >
              按日
            </button>
            <button 
              style={taskPeriod === 'weekly' ? styles.periodBtnActive : styles.periodBtn}
              onClick={() => handlePeriodChange('weekly')}
            >
              按周
            </button>
            <button 
              style={taskPeriod === 'monthly' ? styles.periodBtnActive : styles.periodBtn}
              onClick={() => handlePeriodChange('monthly')}
            >
              按月
            </button>
          </div>
          
          <div style={styles.chartContainer}>
            <div style={styles.chart}>
              {chartData.map((value, index) => (
                <div key={index} style={styles.chartBar}>
                  <div 
                    style={{
                      ...styles.barFill, 
                      height: `${(value / maxValue) * 100}%`
                    }}
                  ></div>
                  <span style={styles.barLabel}>
                    {taskPeriod === 'daily' ? `${index + 1}日` : taskPeriod === 'weekly' ? `第${index + 1}周` : `${index + 1}月`}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div style={styles.totalTasks}>
            <span>历史累计完成任务数：</span>
            <span style={styles.totalTasksNum}>{t.total}</span>
          </div>
        </div>
      )}
      
      {/* 我的案例投稿 */}
      {profileTab === 'cases' && (
        <div style={styles.tokenSection}>
          <h3 style={styles.sectionTitle}><i className="fas fa-lightbulb"></i> 我的AI应用案例投稿</h3>
          
          <div style={styles.userSkillsList}>
            {mockData.mySubmissions.filter(s => s.type === 'case').map(sub => (
              <div key={sub.id} style={styles.userSkillItem}>
                <div style={styles.userSkillInfo}>
                  <div style={styles.userSkillIcon}>
                    <i className="fas fa-lightbulb"></i>
                  </div>
                  <div>
                    <div style={styles.userSkillName}>{sub.title}</div>
                    <div style={styles.userSkillMeta}>
                      <span style={sub.status === 'approved' ? styles.statusPublished : styles.statusPending}>
                        {sub.status === 'approved' ? '已通过' : '审核中'}
                      </span>
                      {sub.isExcellent && (
                        <span style={styles.excellentBadge}><i className="fas fa-star"></i> 优秀</span>
                      )}
                      <span style={styles.submissionDate}><i className="fas fa-calendar"></i> {sub.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {mockData.mySubmissions.filter(s => s.type === 'case').length === 0 && (
              <p style={styles.noDataText}>暂无案例投稿</p>
            )}
          </div>
        </div>
      )}
      
      {/* 我分享的技能 */}
      {profileTab === 'skills' && (
        <div style={styles.tokenSection}>
          <h3 style={styles.sectionTitle}><i className="fas fa-cube"></i> 我分享的技能</h3>
          
          <div style={styles.userSkillsList}>
            {mockData.userSkills.map(skill => (
              <div key={skill.id} style={styles.userSkillItem}>
                <div style={styles.userSkillInfo}>
                  <div style={styles.userSkillIcon}><i className="fas fa-cube"></i></div>
                  <div>
                    <div style={styles.userSkillName}>{skill.name}</div>
                    <div style={styles.userSkillMeta}>
                      <span style={skill.status === 'published' ? styles.statusPublished : styles.statusPending}>
                        {skill.status === 'published' ? '已通过' : '审核中'}
                      </span>
                      {skill.status === 'published' && (
                        <span style={styles.downloadCount}><i className="fas fa-download"></i> {skill.downloads}次下载</span>
                      )}
                    </div>
                  </div>
                </div>
                <div style={styles.userSkillActions}>
                  <button style={styles.viewBtn}>查看</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* 我的团队 */}
      {profileTab === 'team' && (
        <div style={styles.tokenSection}>
          <h3 style={styles.sectionTitle}><i className="fas fa-users"></i> 我的团队</h3>
          
          <div style={styles.teamTable}>
            <div style={styles.teamHeader}>
              <div style={styles.teamCell}>员工姓名</div>
              <div style={styles.teamCell}>所属部门</div>
              <div style={styles.teamCell}>是否安装</div>
              <div style={styles.teamCell}>累计AI任务</div>
              <div style={styles.teamCell}>案例贡献数</div>
            </div>
            {mockData.teamMembers.map(member => (
              <div key={member.id} style={styles.teamRow}>
                <div style={styles.teamCell}>
                  <div style={styles.teamAvatar}>{member.avatar}</div>
                  {member.name}
                </div>
                <div style={styles.teamCell}>{member.dept}</div>
                <div style={styles.teamCell}>
                  <span style={member.installed ? styles.statusPublished : styles.statusPending}>
                    {member.installed ? '已安装' : '未安装'}
                  </span>
                </div>
                <div style={styles.teamCell}>{member.tasks}</div>
                <div style={styles.teamCell}>{member.cases}</div>
              </div>
            ))}
          </div>
        </div>
      )}
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

// 消息通知弹框组件
const NotificationModal = ({ isOpen, onClose, notifications }) => {
  const [activeTab, setActiveTab] = useState('latest'); // latest: 最新更新, announcements: 通知公告, messages: 我的消息
  
  if (!isOpen) return null;
  
  const unreadCount = notifications.myMessages.filter(m => !m.read).length;
  
  return (
    <div style={styles.notificationOverlay} onClick={onClose}>
      <div style={styles.notificationModal} onClick={e => e.stopPropagation()}>
        <div style={styles.notificationHeader}>
          <h3 style={styles.notificationTitle}><i className="fas fa-bell"></i> 消息通知</h3>
          <button style={styles.notificationClose} onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div style={styles.notificationTabs}>
          <button 
            style={activeTab === 'latest' ? styles.notificationTabActive : styles.notificationTab}
            onClick={() => setActiveTab('latest')}
          >
            <i className="fas fa-rocket"></i> 最新更新
          </button>
          <button 
            style={activeTab === 'announcements' ? styles.notificationTabActive : styles.notificationTab}
            onClick={() => setActiveTab('announcements')}
          >
            <i className="fas fa-volume-up"></i> 通知公告
            {notifications.announcements.filter(a => a.important).length > 0 && (
              <span style={styles.notificationDot}></span>
            )}
          </button>
          <button 
            style={activeTab === 'messages' ? styles.notificationTabActive : styles.notificationTab}
            onClick={() => setActiveTab('messages')}
          >
            <i className="fas fa-envelope"></i> 我的消息
            {unreadCount > 0 && <span style={styles.notificationBadgeSmall}>{unreadCount}</span>}
          </button>
        </div>
        
        <div style={styles.notificationContent}>
          {activeTab === 'latest' && (
            <div style={styles.notificationList}>
              {notifications.latestUpdates.map(item => (
                <div key={item.id} style={styles.notificationItem}>
                  <div style={styles.notificationItemHeader}>
                    <span style={styles.notificationItemTitle}>{item.title}</span>
                    <span style={styles.notificationItemDate}>{item.date}</span>
                  </div>
                  <p style={styles.notificationItemContent}>{item.content}</p>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'announcements' && (
            <div style={styles.notificationList}>
              {notifications.announcements.map(item => (
                <div key={item.id} style={{...styles.notificationItem, borderLeft: item.important ? '3px solid #ff6b6b' : '3px solid #4ecdc4'}}>
                  <div style={styles.notificationItemHeader}>
                    <span style={styles.notificationItemTitle}>
                      {item.important && <span style={styles.importantTag}>重要</span>}
                      {item.title}
                    </span>
                    <span style={styles.notificationItemDate}>{item.date}</span>
                  </div>
                  <p style={styles.notificationItemContent}>{item.content}</p>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'messages' && (
            <div style={styles.notificationList}>
              {notifications.myMessages.map(item => (
                <div key={item.id} style={{...styles.notificationItem, background: item.read ? 'transparent' : '#f0f7ff'}}>
                  <div style={styles.notificationItemHeader}>
                    <span style={{...styles.notificationItemTitle, fontWeight: item.read ? 400 : 600}}>
                      {!item.read && <span style={styles.unreadDot}></span>}
                      {item.title}
                    </span>
                    <span style={styles.notificationItemDate}>{item.date}</span>
                  </div>
                  <p style={styles.notificationItemContent}>{item.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 主应用
function App() {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState('home');
  const [showNotification, setShowNotification] = useState(false);
  
  // 计算未读消息数量
  const notificationCount = mockData.notifications.myMessages.filter(m => !m.read).length;
  
  const handleLogin = (userData) => {
    setUser(userData);
    setActivePage('home');
  };
  
  const handleLogout = () => {
    setUser(null);
    setActivePage('home');
  };
  
  const handleSubmitSkill = () => {
    setActivePage('submitSkill');
  };
  
  const handleBackToSkillsFromSubmit = () => {
    setActivePage('skills');
  };
  
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }
  
  return (
    <div style={styles.app}>
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        user={user} 
        onLogout={handleLogout}
        notificationCount={notificationCount}
        onNotificationClick={() => setShowNotification(true)}
      />
      {activePage === 'home' && <HomePage setActivePage={setActivePage} />}
      {activePage === 'skills' && <SkillsPage setActivePage={setActivePage} onSubmitSkill={handleSubmitSkill} />}
      {activePage === 'submitSkill' && <SubmitSkillPage onBack={handleBackToSkillsFromSubmit} user={user} />}
      {activePage === 'cases' && <CasesPage />}
      {activePage === 'dashboard' && <DashboardPage />}
      {activePage === 'help' && <HelpPage />}
      {activePage === 'security' && <SecurityPage user={user} />}
      {activePage === 'profile' && <ProfilePage user={user} setActivePage={setActivePage} />}
      {(activePage === 'admin') && <AdminPage user={user} />}
      
      <NotificationModal 
        isOpen={showNotification} 
        onClose={() => setShowNotification(false)}
        notifications={mockData.notifications}
      />
    </div>
  );
}

export default App;
