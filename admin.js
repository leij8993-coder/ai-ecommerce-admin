// LUMIÈRE 后台管理 - 动态渲染

const STORAGE_KEY = 'lumi_ecommerce_data';

// ============ 数据层 ============

function initData() {
    // 如果localStorage已有数据，绝不覆盖（防止数据清空）
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) {
        try { return JSON.parse(existing); } catch(e) { /* 数据损坏才重新初始化 */ }
    }
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const yday = new Date(now.getTime() - 86400000).toISOString().slice(0, 10);
    const d2 = new Date(now.getTime() - 2*86400000).toISOString().slice(0, 10);

    const data = {
        storeInfo: {
            name: 'LUMIÈRE',
            slogan: '光之所向，生活之美',
            logo: '✦',
            categories: [
                {id:'digital',name:'数码科技',icon:'💻'},
                {id:'fashion',name:'时尚穿搭',icon:'👗'},
                {id:'home',name:'家居生活',icon:'🏠'},
                {id:'beauty',name:'美妆护肤',icon:'✨'},
                {id:'food',name:'美食甄选',icon:'🍽️'}
            ],
            banners: [
                {id:'b1',title:'春季焕新',subtitle:'新品上市 限时9折',image:'',link:''},
                {id:'b2',title:'科技生活',subtitle:'探索前沿数码产品',image:'',link:''},
                {id:'b3',title:'匠心之选',subtitle:'品质生活从这里开始',image:'',link:''}
            ]
        },
        products: [
            {id:'p1',name:'AirPods Max',category:'digital',price:4399,originalPrice:4999,stock:56,status:'active',desc:'高保真音质，主动降噪，空间音频',detail:'<h2>重新定义聆听</h2><p>40mm动圈驱动，自适应均衡，行业领先降噪。</p>',specs:['40mm动圈驱动','主动降噪','空间音频','20小时续航','蓝牙5.0'],rating:4.8,reviews:326,sales:1580,keywords:'耳机,降噪,蓝牙'},
            {id:'p2',name:'智能手表 Ultra',category:'digital',price:5999,originalPrice:6499,stock:35,status:'active',desc:'钛金属表壳，双频GPS，极限运动伴侣',detail:'<h2>突破极限</h2><p>49mm钛金属表壳，3000尼特峰值亮度。</p>',specs:['49mm钛金属','3000尼特亮度','双频GPS','36小时续航','100m防水'],rating:4.9,reviews:218,sales:890,keywords:'手表,运动,GPS'},
            {id:'p3',name:'MacBook Air M3',category:'digital',price:8999,originalPrice:9499,stock:42,status:'active',desc:'M3芯片，13.6英寸Liquid Retina，18小时续航',detail:'<h2>轻巧强大</h2><p>M3芯片带来飞跃性能提升。</p>',specs:['M3芯片','8核CPU','8GB统一内存','256GB SSD','13.6英寸'],rating:4.9,reviews:567,sales:2340,keywords:'笔记本,苹果,M3'},
            {id:'p4',name:'机械键盘 Pro',category:'digital',price:899,originalPrice:1099,stock:120,status:'active',desc:'Gasket结构，热插拔轴体，PBT键帽',detail:'<h2>极致手感</h2><p>Gasket弹性安装，手感软弹舒适。</p>',specs:['Gasket结构','热插拔','PBT键帽','RGB灯效','三模连接'],rating:4.7,reviews:834,sales:3560,keywords:'键盘,机械,热插拔'},
            {id:'p5',name:'轻奢羊绒围巾',category:'fashion',price:1280,originalPrice:1580,stock:22,status:'active',desc:'100%内蒙古羊绒，亲肤柔软，经典百搭',detail:'<h2>温暖如拥</h2><p>甄选阿拉善白绒山羊绒，14.5微米。</p>',specs:['100%羊绒','14.5微米','意大利织造','人字纹','200×70cm'],rating:4.7,reviews:156,sales:620,keywords:'羊绒,围巾,冬季'},
            {id:'p6',name:'真丝睡衣套装',category:'fashion',price:680,originalPrice:880,stock:15,status:'lowstock',desc:'6A级桑蚕丝，丝滑亲肤，优雅居家',detail:'<h2>丝般奢华</h2><p>6A级桑蚕丝，天然蛋白纤维。</p>',specs:['6A级桑蚕丝','天然蛋白纤维','宽松剪裁','精致包边','S/M/L/XL'],rating:4.7,reviews:189,sales:750,keywords:'真丝,睡衣,家居'},
            {id:'p7',name:'智能氛围灯',category:'home',price:399,originalPrice:499,stock:88,status:'active',desc:'1600万色，语音控制，营造沉浸光影',detail:'<h2>光的艺术</h2><p>1600万色自由调色，暖光到冷光无级调节。</p>',specs:['1600万色','语音控制','HomeKit兼容','定时功能','WiFi连接'],rating:4.5,reviews:367,sales:1560,keywords:'氛围灯,智能,灯光'},
            {id:'p8',name:'意式咖啡机',category:'home',price:3299,originalPrice:3999,stock:15,status:'lowstock',desc:'15Bar萃取，蒸汽奶泡，专业级浓缩',detail:'<h2>专业萃取</h2><p>15Bar意式萃取，油脂丰富。</p>',specs:['15Bar萃取','蒸汽奶泡','58mm手柄','预浸功能','1.5L水箱'],rating:4.8,reviews:198,sales:760,keywords:'咖啡机,意式,萃取'},
            {id:'p9',name:'精华液套装',category:'beauty',price:899,originalPrice:1199,stock:45,status:'active',desc:'玻尿酸+烟酰胺双效精华，深层修护焕亮',detail:'<h2>双效焕亮</h2><p>三重分子量透明质酸，层层渗透。</p>',specs:['玻尿酸精华30ml','烟酰胺精华30ml','三重分子量','5%烟酰胺','无添加酒精'],rating:4.8,reviews:512,sales:1890,keywords:'精华,护肤,美妆'},
            {id:'p10',name:'口红礼盒',category:'beauty',price:498,originalPrice:698,stock:35,status:'active',desc:'4色丝绒质地，显白持久，高级雾面',detail:'<h2>唇间艺术</h2><p>4色搭配，日常到派对全hold住。</p>',specs:['4色礼盒','丝绒质地','显白持久','滋润配方','3.5g×4'],rating:4.7,reviews:267,sales:1120,keywords:'口红,礼盒,丝绒'},
            {id:'p11',name:'有机坚果礼盒',category:'food',price:298,originalPrice:398,stock:200,status:'active',desc:'6种有机坚果，进口原料，送礼自用皆宜',detail:'<h2>自然之味</h2><p>6种有机认证坚果，零添加。</p>',specs:['6种坚果','有机认证','零添加','原味烘焙','礼盒包装'],rating:4.6,reviews:489,sales:2100,keywords:'坚果,礼盒,有机'},
            {id:'p12',name:'精品咖啡豆',category:'food',price:168,originalPrice:198,stock:90,status:'active',desc:'埃塞俄比亚耶加雪菲，花果香调，中浅烘',detail:'<h2>花果之韵</h2><p>耶加雪菲产区，花果香调。</p>',specs:['耶加雪菲','花果香调','中浅烘焙','227g','新鲜烘焙'],rating:4.8,reviews:345,sales:1560,keywords:'咖啡豆,耶加雪菲,精品'}
        ],
        orders: [
            {id:'ORD'+today.replace(/-/g,'')+'001',customer:'张伟',items:[{name:'AirPods Max',price:4399,qty:1}],amount:4399,status:'completed',time:today+' 14:30'},
            {id:'ORD'+today.replace(/-/g,'')+'002',customer:'李娜',items:[{name:'智能手表 Ultra',price:5999,qty:1}],amount:5999,status:'shipped',time:today+' 13:20'},
            {id:'ORD'+today.replace(/-/g,'')+'003',customer:'王芳',items:[{name:'有机坚果礼盒',price:298,qty:2}],amount:596,status:'pending',time:today+' 12:10'},
            {id:'ORD'+yday.replace(/-/g,'')+'004',customer:'赵强',items:[{name:'精华液套装',price:899,qty:1}],amount:899,status:'shipped',time:yday+' 18:45'},
            {id:'ORD'+yday.replace(/-/g,'')+'005',customer:'陈静',items:[{name:'机械键盘 Pro',price:899,qty:1}],amount:899,status:'completed',time:yday+' 16:30'},
            {id:'ORD'+yday.replace(/-/g,'')+'006',customer:'刘洋',items:[{name:'轻奢羊绒围巾',price:1280,qty:1}],amount:1280,status:'pending',time:yday+' 10:15'},
            {id:'ORD'+d2.replace(/-/g,'')+'007',customer:'孙丽',items:[{name:'口红礼盒',price:498,qty:2}],amount:996,status:'completed',time:d2+' 20:00'},
            {id:'ORD'+d2.replace(/-/g,'')+'008',customer:'周明',items:[{name:'AirPods Max',price:4399,qty:1}],amount:4399,status:'completed',time:d2+' 09:30'}
        ],
        customers: [
            {id:'c1',name:'张伟',phone:'138****1234',email:'zhangwei@email.com',level:'钻石',orders:28,totalSpent:45600,address:'北京市朝阳区建国路88号'},
            {id:'c2',name:'李娜',phone:'139****5678',email:'lina@email.com',level:'金卡',orders:15,totalSpent:23400,address:'上海市浦东新区陆家嘴环路1000号'},
            {id:'c3',name:'王芳',phone:'136****9012',email:'wangfang@email.com',level:'银卡',orders:8,totalSpent:8900,address:'广州市天河区珠江新城花城大道'},
            {id:'c4',name:'赵强',phone:'137****3456',email:'zhaoqiang@email.com',level:'金卡',orders:12,totalSpent:19800,address:'深圳市南山区科技园南路'},
            {id:'c5',name:'陈静',phone:'135****7890',email:'chenjing@email.com',level:'普通',orders:3,totalSpent:2400,address:'杭州市西湖区文三路'},
            {id:'c6',name:'刘洋',phone:'133****2345',email:'liuyang@email.com',level:'银卡',orders:6,totalSpent:7200,address:'成都市锦江区春熙路'},
            {id:'c7',name:'孙丽',phone:'131****6789',email:'sunli@email.com',level:'钻石',orders:35,totalSpent:67800,address:'南京市鼓楼区中山北路'},
            {id:'c8',name:'周明',phone:'132****0123',email:'zhouming@email.com',level:'金卡',orders:18,totalSpent:31200,address:'武汉市江汉区解放大道'}
        ],
        salesChart: [3200,5800,4200,7600,6100,8900,7400],
        categoryData: [
            {name:'数码',value:45,color:'#00d4ff'},
            {name:'服饰',value:20,color:'#a855f7'},
            {name:'家居',value:15,color:'#00ff88'},
            {name:'美妆',value:10,color:'#ffaa00'},
            {name:'美食',value:10,color:'#ff4466'}
        ]
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
}

async function loadData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) { try { return JSON.parse(stored); } catch(e) { /* 损坏则继续 */ } }
    try {
        const res = await fetch('/api/data');
        if (res.ok) { const data = await res.json(); localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); return data; }
    } catch(e) { /* 后端未启动 */ }
    try {
        const res = await fetch('data.json');
        if (res.ok) { const data = await res.json(); localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); return data; }
    } catch(e) { /* 文件不存在 */ }
    console.warn('所有数据源均不可用，使用内置默认数据');
    return initData();
}

function getData() {
    const d = localStorage.getItem(STORAGE_KEY);
    if (!d) return initData();
    return JSON.parse(d);
}

function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    fetch('/api/data', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).catch(() => {});
}

// ============ 导航切换 ============

window.switchPage = function(pageName) {
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(n => n.classList.toggle('active', n.dataset.page === pageName));
    document.querySelectorAll('.admin-page').forEach(p => p.classList.toggle('active', p.id === `page-${pageName}`));
    const titles = { dashboard: '数据看板', banners: 'Banner管理', products: '商品管理', orders: '订单管理', customers: '客户管理', ai: 'AI 助手' };
    document.getElementById('page-title').textContent = titles[pageName] || '';
};

document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
    item.addEventListener('click', e => { e.preventDefault(); switchPage(item.dataset.page); });
});

// ============ 看板渲染 ============

function renderDashboard() {
    const data = getData();
    if (!data) return;

    const today = new Date().toISOString().slice(0, 10);
    const todayOrders = data.orders.filter(o => o.time.startsWith(today));
    const todayRevenue = todayOrders.reduce((s, o) => s + o.amount, 0);

    document.getElementById('stat-revenue').textContent = '¥' + todayRevenue.toLocaleString();
    document.getElementById('stat-orders').textContent = todayOrders.length;
    document.getElementById('stat-customers').textContent = data.customers.length;
    document.getElementById('stat-conversion').textContent = '3.8%';

    renderBarChart(data.salesChart);
    renderDonutChart(data.categoryData);

    const tbody = document.getElementById('recent-orders');
    tbody.innerHTML = data.orders.slice(0, 5).map(o => `
        <tr>
            <td>${o.id}</td>
            <td>${o.customer}</td>
            <td>${o.items.map(i => i.name).join(', ')}</td>
            <td>¥${o.amount.toLocaleString()}</td>
            <td><span class="status status-${o.status}">${statusLabel(o.status)}</span></td>
            <td>${o.time}</td>
        </tr>
    `).join('');
}

function statusLabel(s) {
    return { pending: '待处理', shipped: '已发货', completed: '已完成' }[s] || s;
}

function renderBarChart(values) {
    const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    const max = Math.max(...values);
    const container = document.getElementById('sales-chart');
    container.innerHTML = '<div class="bar-chart">' + values.map((v, i) => {
        const h = (v / max * 160);
        return `<div class="bar-item">
            <div class="bar-value">¥${(v/1000).toFixed(0)}k</div>
            <div class="bar" style="height:${h}px"></div>
            <div class="bar-label">${days[i]}</div>
        </div>`;
    }).join('') + '</div>';
}

function renderDonutChart(items) {
    const container = document.getElementById('category-chart');
    const total = items.reduce((s, i) => s + i.value, 0);
    let offset = 0;
    const circumference = 2 * Math.PI * 50;
    const circles = items.map(item => {
        const pct = item.value / total;
        const dash = pct * circumference;
        const gap = circumference - dash;
        const circle = `<circle cx="70" cy="70" r="50" fill="none" stroke="${item.color}" stroke-width="16" stroke-dasharray="${dash} ${gap}" stroke-dashoffset="${-offset}" transform="rotate(-90 70 70)"/>`;
        offset += dash;
        return circle;
    }).join('');
    const legend = items.map(item => `
        <div class="legend-item"><div class="legend-dot" style="background:${item.color}"></div><span>${item.name} ${item.value}%</span></div>
    `).join('');
    container.innerHTML = `<div class="donut-chart"><svg class="donut-svg" viewBox="0 0 140 140">${circles}</svg><div class="donut-legend">${legend}</div></div>`;
}

// ============ 数据备份/恢复 ============

function exportData() {
    const data = getData();
    if (!data) { showToast('无数据可导出', true); return; }
    const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'lumiere-backup-' + new Date().toISOString().slice(0,10) + '.json';
    a.click(); URL.revokeObjectURL(url);
    showToast('数据已导出');
}

window.importData = function() {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = '.json';
    input.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => {
            try {
                const data = JSON.parse(ev.target.result);
                if (!data.products || !data.storeInfo) throw new Error('无效数据');
                if (!confirm('导入将覆盖当前所有数据，确定继续？')) return;
                saveData(data); renderDashboard(); renderBanners(); renderProducts(); renderOrders(); renderCustomers();
                showToast('数据导入成功');
            } catch(err) { showToast('导入失败: 数据格式无效', true); }
        };
        reader.readAsText(file);
    };
    input.click();
};

window.resetData = function() {
    if (!confirm('重置将清空所有数据并恢复初始状态，确定继续？')) return;
    if (!confirm('再次确认：所有商品、订单、客户数据将被删除！')) return;
    localStorage.removeItem(STORAGE_KEY);
    initData();
    renderDashboard(); renderBanners(); renderProducts(); renderOrders(); renderCustomers();
    showToast('数据已重置');
};

// ============ Banner管理 ============

function renderBanners() {
    const data = getData();
    const tbody = document.getElementById('banners-table');
    if (!tbody || !data.storeInfo) return;
    const banners = data.storeInfo.banners || [];
    const gradients = ['#f5f5f7,#e8e8ed', '#f5f5f7,#ebe0f5', '#f5f5f7,#e0f0eb'];
    tbody.innerHTML = banners.map((b, i) => `
        <tr>
            <td><div style="width:120px;height:48px;border-radius:8px;background:linear-gradient(135deg,${gradients[i%3]});display:flex;align-items:center;justify-content:center;font-weight:600;font-size:13px">✦ ${b.title}</div></td>
            <td><strong>${b.title}</strong></td>
            <td>${b.subtitle}</td>
            <td>
                <button class="btn btn-sm btn-success" onclick="editBanner('${b.id}')">编辑</button>
                <button class="btn btn-sm btn-danger" onclick="deleteBanner('${b.id}')">删除</button>
            </td>
        </tr>
    `).join('');
}

window.editBanner = function(id) { openBannerModal(id); };

window.deleteBanner = function(id) {
    if (!confirm('确定删除该Banner？')) return;
    const data = getData();
    data.storeInfo.banners = data.storeInfo.banners.filter(b => b.id !== id);
    saveData(data); renderBanners(); showToast('Banner已删除');
};

function openBannerModal(id = null) {
    const modal = document.getElementById('banner-modal');
    document.getElementById('banner-form').reset();
    document.getElementById('b-edit-id').value = '';
    if (id) {
        const data = getData();
        const b = (data.storeInfo.banners || []).find(x => x.id === id);
        if (b) {
            document.getElementById('banner-modal-title').textContent = '编辑Banner';
            document.getElementById('b-edit-id').value = b.id;
            document.getElementById('b-title').value = b.title;
            document.getElementById('b-subtitle').value = b.subtitle;
            document.getElementById('b-gradient').value = b.gradient || '';
            document.getElementById('b-link').value = b.link || '';
        }
    } else {
        document.getElementById('banner-modal-title').textContent = '添加Banner';
    }
    modal.classList.add('active');
}

window.closeBannerModal = function() {
    document.getElementById('banner-modal').classList.remove('active');
};

document.getElementById('add-banner-btn').addEventListener('click', () => openBannerModal());

document.getElementById('banner-form').addEventListener('submit', e => {
    e.preventDefault();
    const data = getData();
    const editId = document.getElementById('b-edit-id').value;
    const banner = {
        id: editId || 'b' + Date.now(),
        title: document.getElementById('b-title').value,
        subtitle: document.getElementById('b-subtitle').value,
        gradient: document.getElementById('b-gradient').value,
        link: document.getElementById('b-link').value,
        image: ''
    };
    if (!data.storeInfo.banners) data.storeInfo.banners = [];
    if (editId) {
        const idx = data.storeInfo.banners.findIndex(b => b.id === editId);
        if (idx !== -1) data.storeInfo.banners[idx] = banner;
    } else {
        data.storeInfo.banners.push(banner);
    }
    saveData(data); closeBannerModal(); renderBanners(); showToast('Banner已保存');
});

// ============ 商品管理 ============

function renderProducts(filter = '', catFilter = '') {
    const data = getData();
    const tbody = document.getElementById('products-table');
    const products = data.products.filter(p =>
        (!filter || p.name.toLowerCase().includes(filter.toLowerCase()) || p.desc.includes(filter)) &&
        (!catFilter || p.category === catFilter)
    );
    const catNames = { digital: '数码科技', fashion: '时尚穿搭', home: '家居生活', beauty: '美妆护肤', food: '美食甄选' };
    const statusLabels = { active: '在售', inactive: '下架', lowstock: '库存不足' };

    tbody.innerHTML = products.map(p => `
        <tr>
            <td><strong>${p.name}</strong><br><small style="color:var(--text-muted)">${p.desc}</small></td>
            <td>${catNames[p.category] || p.category}</td>
            <td>¥${p.price.toLocaleString()}${p.originalPrice ? `<br><small style="color:var(--text-muted);text-decoration:line-through">¥${p.originalPrice.toLocaleString()}</small>` : ''}</td>
            <td>${p.stock}</td>
            <td><span class="status status-${p.status}">${statusLabels[p.status] || p.status}</span></td>
            <td>
                <button class="btn btn-sm btn-success" onclick="editProduct('${p.id}')">编辑</button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct('${p.id}')">删除</button>
            </td>
        </tr>
    `).join('');
}

window.editProduct = function(id) { openProductModal(id); };

window.deleteProduct = function(id) {
    if (!confirm('确定删除该商品？')) return;
    const data = getData();
    data.products = data.products.filter(p => p.id !== id);
    saveData(data); renderProducts(); showToast('商品已删除');
};

function openProductModal(id = null) {
    const modal = document.getElementById('product-modal');
    document.getElementById('product-form').reset();
    document.getElementById('p-edit-id').value = '';
    if (id) {
        const data = getData();
        const p = data.products.find(x => x.id === id);
        if (p) {
            document.getElementById('product-modal-title').textContent = '编辑商品';
            document.getElementById('p-edit-id').value = p.id;
            document.getElementById('p-name').value = p.name;
            document.getElementById('p-category').value = p.category;
            document.getElementById('p-price').value = p.price;
            document.getElementById('p-original-price').value = p.originalPrice || '';
            document.getElementById('p-stock').value = p.stock;
            document.getElementById('p-status').value = p.status;
            document.getElementById('p-desc').value = p.desc;
            document.getElementById('p-keywords').value = p.keywords || '';
            document.getElementById('p-specs').value = (p.specs || []).join(', ');
        }
    } else {
        document.getElementById('product-modal-title').textContent = '添加商品';
    }
    modal.classList.add('active');
}

window.closeProductModal = function() {
    document.getElementById('product-modal').classList.remove('active');
};

document.getElementById('add-product-btn').addEventListener('click', () => openProductModal());

document.getElementById('product-form').addEventListener('submit', e => {
    e.preventDefault();
    const data = getData();
    const editId = document.getElementById('p-edit-id').value;
    const product = {
        id: editId || 'p' + Date.now(),
        name: document.getElementById('p-name').value,
        category: document.getElementById('p-category').value,
        price: parseFloat(document.getElementById('p-price').value),
        originalPrice: parseFloat(document.getElementById('p-original-price').value) || null,
        stock: parseInt(document.getElementById('p-stock').value),
        status: document.getElementById('p-status').value,
        desc: document.getElementById('p-desc').value,
        keywords: document.getElementById('p-keywords').value,
        specs: document.getElementById('p-specs').value.split(',').map(s => s.trim()).filter(s => s),
        detail: '<h2>' + document.getElementById('p-name').value + '</h2><p>' + document.getElementById('p-desc').value + '</p>',
        images: [], rating: 4.5, reviews: 0, sales: 0
    };
    if (editId) {
        const idx = data.products.findIndex(p => p.id === editId);
        if (idx !== -1) { product.rating = data.products[idx].rating; product.reviews = data.products[idx].reviews; product.sales = data.products[idx].sales; data.products[idx] = product; }
    } else { data.products.push(product); }
    saveData(data); closeProductModal(); renderProducts(); showToast('商品已保存');
});

document.getElementById('product-search').addEventListener('input', e => {
    renderProducts(e.target.value, document.getElementById('category-filter').value);
});
document.getElementById('category-filter').addEventListener('change', e => {
    renderProducts(document.getElementById('product-search').value, e.target.value);
});

// AI生成商品描述
document.getElementById('ai-gen-desc').addEventListener('click', async () => {
    const keywords = document.getElementById('p-keywords').value.trim();
    const name = document.getElementById('p-name').value.trim();
    if (!keywords && !name) { showToast('请先输入商品名称或关键词', true); return; }
    const prompt = `请为以下商品生成一段吸引人的电商描述（50-80字）：\n商品：${name}\n关键词：${keywords}`;
    const result = await callAI(prompt);
    if (result) { document.getElementById('p-desc').value = result; showToast('AI描述生成完成'); }
});

// ============ 订单管理 ============

function renderOrders(filter = 'all') {
    const data = getData();
    const orders = filter === 'all' ? data.orders : data.orders.filter(o => o.status === filter);
    document.getElementById('orders-table').innerHTML = orders.map(o => `
        <tr>
            <td>${o.id}</td>
            <td>${o.customer}</td>
            <td>${o.items.map(i => i.name).join(', ')}</td>
            <td>¥${o.amount.toLocaleString()}</td>
            <td><span class="status status-${o.status}">${statusLabel(o.status)}</span></td>
            <td>${o.time}</td>
            <td>
                ${o.status === 'pending' ? `<button class="btn btn-sm btn-success" onclick="updateOrderStatus('${o.id}','shipped')">发货</button>` : ''}
                ${o.status === 'shipped' ? `<button class="btn btn-sm btn-success" onclick="updateOrderStatus('${o.id}','completed')">完成</button>` : ''}
            </td>
        </tr>
    `).join('');
}

window.updateOrderStatus = function(orderId, newStatus) {
    const data = getData();
    const order = data.orders.find(o => o.id === orderId);
    if (order) { order.status = newStatus; saveData(data); renderOrders(); showToast('订单状态已更新'); }
};

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderOrders(btn.dataset.filter);
    });
});

// ============ 客户管理 ============

function renderCustomers(filter = '') {
    const data = getData();
    const customers = data.customers.filter(c => !filter || c.name.includes(filter) || c.level.includes(filter));
    document.getElementById('customers-grid').innerHTML = customers.map(c => `
        <div class="customer-card">
            <div class="customer-header">
                <span class="customer-name">${c.name}</span>
                <span class="customer-level level-${c.level}">${c.level}</span>
            </div>
            <div style="font-size:13px;color:var(--text-muted)">${c.phone} · ${c.email}</div>
            <div class="customer-stats"><span>订单 ${c.orders}</span><span>消费 ¥${c.totalSpent.toLocaleString()}</span></div>
            <div class="customer-actions">
                <button class="btn btn-sm btn-success" onclick="editCustomer('${c.id}')">编辑</button>
                <button class="btn btn-sm btn-danger" onclick="deleteCustomer('${c.id}')">删除</button>
            </div>
        </div>
    `).join('');
}

window.editCustomer = function(id) { openCustomerModal(id); };

window.deleteCustomer = function(id) {
    if (!confirm('确定删除该客户？')) return;
    const data = getData();
    data.customers = data.customers.filter(c => c.id !== id);
    saveData(data); renderCustomers(); showToast('客户已删除');
};

function openCustomerModal(id = null) {
    const modal = document.getElementById('customer-modal');
    document.getElementById('customer-form').reset();
    document.getElementById('c-edit-id').value = '';
    if (id) {
        const data = getData();
        const c = data.customers.find(x => x.id === id);
        if (c) {
            document.getElementById('customer-modal-title').textContent = '编辑客户';
            document.getElementById('c-edit-id').value = c.id;
            document.getElementById('c-name').value = c.name;
            document.getElementById('c-phone').value = c.phone;
            document.getElementById('c-email').value = c.email;
            document.getElementById('c-level').value = c.level;
            document.getElementById('c-address').value = c.address || '';
        }
    } else { document.getElementById('customer-modal-title').textContent = '添加客户'; }
    modal.classList.add('active');
}

window.closeCustomerModal = function() {
    document.getElementById('customer-modal').classList.remove('active');
};

document.getElementById('add-customer-btn').addEventListener('click', () => openCustomerModal());

document.getElementById('customer-form').addEventListener('submit', e => {
    e.preventDefault();
    const data = getData();
    const editId = document.getElementById('c-edit-id').value;
    const customer = {
        id: editId || 'c' + Date.now(),
        name: document.getElementById('c-name').value,
        phone: document.getElementById('c-phone').value,
        email: document.getElementById('c-email').value,
        level: document.getElementById('c-level').value,
        address: document.getElementById('c-address').value,
        orders: 0, totalSpent: 0
    };
    if (editId) {
        const idx = data.customers.findIndex(c => c.id === editId);
        if (idx !== -1) { customer.orders = data.customers[idx].orders; customer.totalSpent = data.customers[idx].totalSpent; data.customers[idx] = customer; }
    } else { data.customers.push(customer); }
    saveData(data); closeCustomerModal(); renderCustomers(); showToast('客户已保存');
});

document.getElementById('customer-search').addEventListener('input', e => renderCustomers(e.target.value));

// ============ AI 助手 ============

const toolPrompts = {
    description: '你是一个电商文案专家。请根据用户输入的关键词，生成一段吸引人的商品描述（50-100字）.',
    pricing: '你是一个电商定价顾问。请根据用户描述的商品信息，分析市场定位并给出定价建议。',
    review: '你是一个客户评价分析师。请分析以下评价内容的情感倾向，并给出改进建议。'
};
let currentTool = null;

document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('click', () => {
        currentTool = card.dataset.tool;
        addChatMsg('ai', `已切换到「${card.querySelector('.tool-name').textContent}」模式。请输入相关信息。`);
    });
});

document.getElementById('chat-send').addEventListener('click', sendChatMessage);
document.getElementById('chat-input').addEventListener('keydown', e => { if (e.key === 'Enter') sendChatMessage(); });

async function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;
    addChatMsg('user', text); input.value = '';
    const sys = currentTool ? toolPrompts[currentTool] : '你是一个电商运营助手，可以帮助解决电商运营相关的问题。';
    const result = await callAI(text, sys);
    addChatMsg('ai', result || '抱歉，AI服务暂时不可用。请检查API配置。');
}

function addChatMsg(type, text) {
    const container = document.getElementById('chat-messages');
    const msg = document.createElement('div');
    msg.className = `chat-msg ${type}`;
    msg.innerHTML = `<span class="msg-avatar">${type === 'ai' ? '🤖' : '👤'}</span><div class="msg-content">${text}</div>`;
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
}

// ============ AI 密钥配置 ============

const AI_KEY = 'lumi_ai_config';

function getAIConfig() {
    try { return JSON.parse(localStorage.getItem(AI_KEY)) || {}; } catch { return {}; }
}

function saveAIConfig(config) {
    localStorage.setItem(AI_KEY, JSON.stringify(config));
}

// 设置卡片点击 → 打开密钥配置
document.querySelector('[data-tool="settings"]').addEventListener('click', () => {
    const cfg = getAIConfig();
    document.getElementById('ak-provider').value = cfg.provider || 'claude';
    document.getElementById('ak-key').value = cfg.apiKey || '';
    document.getElementById('ak-model').value = cfg.model || '';
    document.getElementById('apikey-modal').classList.add('active');
});

document.getElementById('apikey-form').addEventListener('submit', e => {
    e.preventDefault();
    saveAIConfig({
        provider: document.getElementById('ak-provider').value,
        apiKey: document.getElementById('ak-key').value,
        model: document.getElementById('ak-model').value || ''
    });
    document.getElementById('apikey-modal').classList.remove('active');
    showToast('API 密钥已保存');
});

// ============ AI API ============

async function callAI(prompt, systemPrompt = '') {
    const cfg = getAIConfig();
    if (!cfg.apiKey) {
        showToast('请先配置 API 密钥（点击左侧「API 密钥配置」）', true);
        return null;
    }
    try {
        let url, headers, body;
        if (cfg.provider === 'claude') {
            url = 'https://api.anthropic.com/v1/messages';
            headers = { 'Content-Type': 'application/json', 'x-api-key': cfg.apiKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' };
            body = JSON.stringify({ model: cfg.model || 'claude-sonnet-4-20250514', max_tokens: 1024, system: systemPrompt || '你是一个电商运营助手。', messages: [{ role: 'user', content: prompt }] });
        } else {
            url = 'https://api.tokenpony.cn/v1/chat/completions';
            headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${cfg.apiKey}` };
            body = JSON.stringify({ model: cfg.model || 'glm-5', messages: [...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []), { role: 'user', content: prompt }], max_tokens: 1024 });
        }
        const res = await fetch(url, { method: 'POST', headers, body });
        if (!res.ok) throw new Error('API调用失败');
        const data = await res.json();
        return cfg.provider === 'claude' ? data.content[0].text : data.choices[0].message.content;
    } catch (err) {
        console.error('AI Error:', err);
        showToast('AI调用失败: ' + err.message, true);
        return null;
    }
}

// ============ 模态框关闭 ============

document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => { document.querySelectorAll('.modal').forEach(m => m.classList.remove('active')); });
});
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('active'); });
});

// ============ Toast ============

function showToast(msg, isError = false) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.className = `toast show${isError ? ' error' : ''}`;
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ============ 日期 ============

document.getElementById('current-date').textContent = new Date().toLocaleDateString('zh-CN', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
});

// ============ 初始化 ============

async function init() {
    await loadData();
    renderDashboard();
    renderBanners();
    renderProducts();
    renderOrders();
    renderCustomers();
    console.log('LUMIÈRE 后台管理已加载 | Powered by Vibecoding');
}

init();
