// LUMIÈRE 电商前端 - SPA单页应用

const STORAGE_KEY = 'lumi_ecommerce_data';
const CART_KEY = 'lumi_cart';

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
            name: 'LUMIÈRE', slogan: '光之所向，生活之美', logo: '✦',
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
    // 1. 优先用 localStorage 缓存
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) { try { return JSON.parse(stored); } catch(e) { /* 损坏则继续 */ } }
    // 2. 尝试后端 API
    try {
        const res = await fetch('/api/data');
        if (res.ok) { const data = await res.json(); localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); return data; }
    } catch(e) { /* 后端未启动 */ }
    // 3. 尝试本地 data.json
    try {
        const res = await fetch('data.json');
        if (res.ok) { const data = await res.json(); localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); return data; }
    } catch(e) { /* 文件不存在 */ }
    // 4. 兜底：内置种子数据
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
    // 异步同步到后端（不阻塞UI）
    fetch('/api/data', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).catch(() => {});
}

function getCart() { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
function saveCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartBadge(); }

function updateCartBadge() {
    const cart = getCart();
    const count = cart.reduce((s, i) => s + i.qty, 0);
    document.querySelectorAll('#cart-count').forEach(el => el.textContent = count);
}

let appData = null;

// ============ SPA 路由 ============

const routes = ['home', 'category', 'product', 'cart', 'profile'];
let currentView = 'home';
let currentProductId = null;
let currentCategory = '';

function navigate(view, param) {
    // 隐藏所有视图
    document.querySelectorAll('.spa-view').forEach(v => v.style.display = 'none');
    // 显示目标视图
    const target = document.getElementById('view-' + view);
    if (target) target.style.display = 'block';
    currentView = view;

    // 滚动到顶部
    window.scrollTo(0, 0);

    // 根据视图渲染内容
    switch (view) {
        case 'home': renderHomePage(appData); break;
        case 'category': currentCategory = param || ''; renderCategoryPage(appData); break;
        case 'product': currentProductId = param; renderProductView(appData); break;
        case 'cart': renderCartView(appData); break;
        case 'profile': renderProfileView(appData); break;
    }

    // 更新URL hash
    if (view === 'product') window.location.hash = 'product/' + param;
    else if (view === 'category') window.location.hash = 'category/' + (param || '');
    else window.location.hash = view === 'home' ? '' : view;
}

// 导航点击事件
function bindNavigation() {
    document.addEventListener('click', e => {
        const navEl = e.target.closest('[data-nav]');
        if (navEl) {
            e.preventDefault();
            const target = navEl.dataset.nav;
            navigate(target);
        }
        // 商品卡片点击
        const productCard = e.target.closest('[data-product-id]');
        if (productCard) {
            e.preventDefault();
            navigate('product', productCard.dataset.productId);
        }
        // 分类点击
        const catCard = e.target.closest('[data-cat-id]');
        if (catCard) {
            e.preventDefault();
            navigate('category', catCard.dataset.catId);
        }
    });
}

// Hash路由监听
function handleHash() {
    const hash = window.location.hash.slice(1);
    if (hash.startsWith('product/')) navigate('product', hash.split('/')[1]);
    else if (hash.startsWith('category/')) navigate('category', hash.split('/')[1] || '');
    else if (routes.includes(hash)) navigate(hash);
    else navigate('home');
}

// ============ 首页 ============

function renderHomePage(data) {
    if (!data) return;
    renderHero(data.storeInfo.banners);
    renderCategories(data.storeInfo.categories);
    renderFeaturedProducts(data.products);
    renderNewProducts(data.products);
}

function renderHero(banners) {
    const slider = document.getElementById('hero-slider');
    if (!slider || !banners.length) return;
    const gradients = ['#f5f5f7,#e8e8ed', '#f5f5f7,#ebe0f5', '#f5f5f7,#e0f0eb'];
    slider.innerHTML = banners.map((b, i) => `
        <div class="hero-slide ${i === 0 ? 'active' : ''}" style="background:linear-gradient(${135+i*30}deg,${gradients[i%3]||gradients[0]})">
            <h1>${b.title}</h1><p>${b.subtitle}</p>
            <a href="#" class="hero-cta" data-nav="category">立即探索 →</a>
        </div>
    `).join('') +
    '<button class="hero-arrow prev" id="hero-prev">‹</button>' +
    '<button class="hero-arrow next" id="hero-next">›</button>' +
    '<div class="hero-dots">' + banners.map((b, i) => `<button class="hero-dot ${i===0?'active':''}" data-idx="${i}"></button>`).join('') + '</div>' +
    '<div class="hero-progress" id="hero-progress"></div>';

    let current = 0;
    let timer = null;
    let progressTimer = null;
    const slides = slider.querySelectorAll('.hero-slide');
    const dots = slider.querySelectorAll('.hero-dot');
    const progress = document.getElementById('hero-progress');

    function goTo(idx, direction) {
        slides.forEach(s => { s.classList.remove('active','sliding-left','sliding-right'); });
        dots.forEach(d => d.classList.remove('active'));
        if (direction === 'prev') slides[current].classList.add('sliding-right');
        else if (direction === 'next') slides[current].classList.add('sliding-left');
        current = ((idx % banners.length) + banners.length) % banners.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
        startAutoPlay();
    }

    function startAutoPlay() {
        clearInterval(timer); clearInterval(progressTimer);
        let pct = 0;
        if (progress) { progress.style.width = '0%'; }
        progressTimer = setInterval(() => { pct += 2; if (progress) progress.style.width = pct + '%'; }, 100);
        timer = setInterval(() => goTo(current + 1, 'next'), 5000);
    }

    document.getElementById('hero-prev').addEventListener('click', () => goTo(current - 1, 'prev'));
    document.getElementById('hero-next').addEventListener('click', () => goTo(current + 1, 'next'));
    dots.forEach(d => d.addEventListener('click', () => goTo(parseInt(d.dataset.idx))));

    // 拖拽/滑动
    let startX = 0, dragging = false;
    slider.addEventListener('mousedown', e => { startX = e.clientX; dragging = true; });
    slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; dragging = true; }, {passive: true});
    function endDrag(endX) {
        if (!dragging) return; dragging = false;
        const diff = endX - startX;
        if (Math.abs(diff) > 50) { diff > 0 ? goTo(current - 1, 'prev') : goTo(current + 1, 'next'); }
    }
    slider.addEventListener('mouseup', e => endDrag(e.clientX));
    slider.addEventListener('touchend', e => endDrag(e.changedTouches[0].clientX));
    slider.addEventListener('mouseleave', e => { if(dragging) endDrag(e.clientX); });

    startAutoPlay();
}

function renderCategories(categories) {
    const grid = document.getElementById('categories-grid');
    if (!grid) return;
    grid.innerHTML = categories.map(c => `
        <div class="category-card" data-cat-id="${c.id}">
            <span class="category-icon">${c.icon}</span>
            <span class="category-name">${c.name}</span>
        </div>
    `).join('');
}

function renderFeaturedProducts(products) {
    const grid = document.getElementById('featured-products');
    if (!grid) return;
    grid.innerHTML = products.filter(p=>p.status==='active').slice(0,8).map(p=>productCardHTML(p)).join('');
}

function renderNewProducts(products) {
    const grid = document.getElementById('new-products');
    if (!grid) return;
    grid.innerHTML = products.filter(p=>p.status==='active').slice(8,16).map(p=>productCardHTML(p)).join('');
}

function productCardHTML(p) {
    const discount = p.originalPrice ? Math.round((1-p.price/p.originalPrice)*100) : 0;
    const stars = '★'.repeat(Math.floor(p.rating)) + (p.rating%1>=0.5?'☆':'');
    return `
        <div class="product-card" data-product-id="${p.id}">
            <div class="product-image">
                ${discount>0?`<span class="product-badge">-${discount}%</span>`:''}
                ${getCategoryIcon(p.category)}
            </div>
            <div class="product-body">
                <div class="product-name">${p.name}</div>
                <div class="product-desc">${p.desc}</div>
                <div class="product-rating">${stars} <span>(${p.reviews})</span></div>
                <div class="product-price-row">
                    <span class="product-price">¥${p.price.toLocaleString()}</span>
                    ${p.originalPrice?`<span class="product-original-price">¥${p.originalPrice.toLocaleString()}</span>`:''}
                </div>
            </div>
        </div>`;
}

function getCategoryIcon(catId) {
    const icons = {digital:'💻',fashion:'👗',home:'🏠',beauty:'✨',food:'🍽️'};
    return icons[catId]||'📦';
}

// ============ 分类页 ============

function renderCategoryPage(data) {
    if (!data) return;
    const catNames = {digital:'数码科技',fashion:'时尚穿搭',home:'家居生活',beauty:'美妆护肤',food:'美食甄选'};

    // 分类卡片
    const cards = document.getElementById('category-cards');
    if (cards) {
        cards.innerHTML = data.storeInfo.categories.map(c => {
            const count = data.products.filter(p => p.category === c.id && p.status === 'active').length;
            return `<div class="category-card" data-cat-id="${c.id}">
                <span class="category-icon">${c.icon}</span>
                <span class="category-name">${c.name}</span>
                <span class="category-count">${count} 件商品</span>
            </div>`;
        }).join('');
    }

    // 标签
    const tabs = document.getElementById('category-tabs');
    if (tabs) {
        tabs.innerHTML = '<button class="cat-tab active" data-cat="">全部</button>' +
            data.storeInfo.categories.map(c => `<button class="cat-tab" data-cat="${c.id}">${c.icon} ${c.name}</button>`).join('');
        tabs.querySelectorAll('.cat-tab').forEach(btn => {
            btn.addEventListener('click', () => {
                tabs.querySelectorAll('.cat-tab').forEach(b=>b.classList.remove('active'));
                btn.classList.add('active');
                currentCategory = btn.dataset.cat;
                filterCategoryProducts(data);
            });
        });
    }

    // 标题
    const title = document.getElementById('category-title');
    if (title) title.textContent = currentCategory ? (catNames[currentCategory]||'全部分类') : '全部分类';

    filterCategoryProducts(data);
}

function filterCategoryProducts(data) {
    const grid = document.getElementById('category-products');
    const info = document.getElementById('category-result-info');
    if (!grid) return;
    let products = data.products.filter(p=>p.status==='active');
    if (currentCategory) products = products.filter(p=>p.category===currentCategory);
    if (info) info.textContent = `共 ${products.length} 件商品`;
    grid.innerHTML = products.map(p=>productCardHTML(p)).join('') || '<p style="text-align:center;color:var(--text-muted);padding:40px">暂无商品</p>';
}

// ============ 商品详情 ============

function renderProductView(data) {
    if (!data || !currentProductId) return;
    const product = data.products.find(p=>p.id===currentProductId);
    if (!product) return;

    document.title = product.name + ' | LUMIÈRE';

    const gallery = document.getElementById('gallery-main');
    if (gallery) gallery.innerHTML = `<span class="gallery-icon" style="font-size:120px">${getCategoryIcon(product.category)}</span>`;

    const info = document.getElementById('product-info');
    if (info) {
        const stars = '★'.repeat(Math.floor(product.rating)) + (product.rating%1>=0.5?'☆':'');
        info.innerHTML = `
            <h1>${product.name}</h1>
            <div class="price-row"><span class="current-price">¥${product.price.toLocaleString()}</span>${product.originalPrice?`<span class="original-price">¥${product.originalPrice.toLocaleString()}</span>`:''}</div>
            <div class="rating-row">${stars} ${product.rating} · ${product.reviews} 条评价 · 已售 ${product.sales}</div>
            <p class="desc">${product.desc}</p>
            <div class="specs-list">${product.specs.map(s=>`<span class="spec-tag">${s}</span>`).join('')}</div>
            <div class="qty-selector">
                <button class="qty-btn" onclick="changeQty(-1)">−</button>
                <span class="qty-value" id="qty-val">1</span>
                <button class="qty-btn" onclick="changeQty(1)">+</button>
            </div>
            <div class="action-buttons">
                <button class="btn btn-primary btn-large" onclick="addToCart('${product.id}')">加入购物车</button>
                <button class="btn btn-outline btn-large" onclick="addToCart('${product.id}',true)">立即购买</button>
            </div>`;
    }

    const detail = document.getElementById('product-detail-content');
    if (detail) detail.innerHTML = product.detail;

    const related = document.getElementById('related-products');
    if (related) {
        const items = data.products.filter(p=>p.category===product.category&&p.id!==product.id).slice(0,4);
        related.innerHTML = items.map(p=>productCardHTML(p)).join('');
    }

    currentQty = 1;
}

let currentQty = 1;
window.changeQty = function(delta) {
    currentQty = Math.max(1, currentQty+delta);
    const el = document.getElementById('qty-val');
    if (el) el.textContent = currentQty;
};

window.addToCart = function(productId, buyNow) {
    const cart = getCart();
    const existing = cart.find(i=>i.productId===productId);
    if (existing) existing.qty += currentQty;
    else cart.push({productId, qty: currentQty});
    saveCart(cart);
    if (buyNow) navigate('cart');
    else showToast('已加入购物车');
};

// ============ 购物车 ============

function renderCartView(data) {
    if (!data) return;
    const cart = getCart();
    const container = document.getElementById('cart-items');
    const summary = document.getElementById('cart-summary');
    if (!container) return;

    if (cart.length===0) {
        container.innerHTML = '<div class="cart-empty"><span class="empty-icon">🛒</span><p>购物车是空的</p><button class="btn btn-primary" data-nav="home">去逛逛</button></div>';
        if (summary) summary.innerHTML = '';
        return;
    }

    let total = 0;
    container.innerHTML = cart.map(item => {
        const product = data.products.find(p=>p.id===item.productId);
        if (!product) return '';
        const subtotal = product.price * item.qty;
        total += subtotal;
        return `
            <div class="cart-item">
                <div class="cart-item-image">${getCategoryIcon(product.category)}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${product.name}</div>
                    <div class="cart-item-price">¥${product.price.toLocaleString()}</div>
                    <div class="cart-item-qty">
                        <button onclick="updateCartQty('${product.id}',-1)">−</button>
                        <span>${item.qty}</span>
                        <button onclick="updateCartQty('${product.id}',1)">+</button>
                    </div>
                </div>
                <div class="cart-item-total">¥${subtotal.toLocaleString()}</div>
                <button class="cart-item-remove" onclick="removeFromCart('${product.id}')">✕</button>
            </div>`;
    }).join('');

    if (summary) {
        summary.innerHTML = `
            <h3>订单摘要</h3>
            <div class="summary-row"><span>商品小计</span><span>¥${total.toLocaleString()}</span></div>
            <div class="summary-row"><span>运费</span><span>免运费</span></div>
            <div class="summary-row total"><span>合计</span><span>¥${total.toLocaleString()}</span></div>
            <button class="btn btn-primary btn-large" onclick="checkout()">结算</button>`;
    }
}

window.updateCartQty = function(productId, delta) {
    const cart = getCart();
    const item = cart.find(i=>i.productId===productId);
    if (item) { item.qty+=delta; if(item.qty<=0) cart.splice(cart.indexOf(item),1); }
    saveCart(cart);
    renderCartView(appData);
};

window.removeFromCart = function(productId) {
    const cart = getCart().filter(i=>i.productId!==productId);
    saveCart(cart);
    renderCartView(appData);
};

window.checkout = function() {
    const cart = getCart();
    const data = getData();
    if (!cart.length || !data) return;
    let total = 0;
    cart.forEach(item => {
        const p = data.products.find(x => x.id === item.productId);
        if (p) total += p.price * item.qty;
    });
    openPaymentModal(total, cart, data);
};

let selectedPaymentMethod = 'wechat';

function openPaymentModal(total, cart, data) {
    selectedPaymentMethod = 'wechat';
    const overlay = document.getElementById('payment-overlay');
    const modal = document.getElementById('payment-modal');
    modal.innerHTML = `
        <h3>确认支付</h3>
        <div class="payment-amount"><span>¥</span>${total.toLocaleString()}</div>
        <div class="payment-methods">
            <div class="payment-method selected" data-method="wechat">
                <span class="pm-icon">💚</span>
                <span class="pm-name">微信支付</span>
            </div>
            <div class="payment-method" data-method="alipay">
                <span class="pm-icon">🔵</span>
                <span class="pm-name">支付宝</span>
            </div>
            <div class="payment-method" data-method="card">
                <span class="pm-icon">💳</span>
                <span class="pm-name">银行卡</span>
            </div>
        </div>
        <div class="payment-actions">
            <button class="btn" id="payment-cancel">取消</button>
            <button class="btn btn-primary" id="payment-confirm">确认支付</button>
        </div>`;
    overlay.classList.add('active');

    modal.querySelectorAll('.payment-method').forEach(m => {
        m.addEventListener('click', () => {
            modal.querySelectorAll('.payment-method').forEach(x => x.classList.remove('selected'));
            m.classList.add('selected');
            selectedPaymentMethod = m.dataset.method;
        });
    });

    document.getElementById('payment-cancel').addEventListener('click', () => overlay.classList.remove('active'));
    document.getElementById('payment-confirm').addEventListener('click', () => simulatePayment(total, cart, data));
}

async function simulatePayment(total, cart, data) {
    const modal = document.getElementById('payment-modal');
    const methodNames = {wechat:'微信支付',alipay:'支付宝',card:'银行卡'};
    modal.innerHTML = `
        <div class="payment-processing">
            <div class="payment-spinner"></div>
            <p>正在通过${methodNames[selectedPaymentMethod]}支付...</p>
            <p style="color:var(--text-muted);font-size:13px;margin-top:8px">请稍候</p>
        </div>`;

    await new Promise(r => setTimeout(r, 1500 + Math.random() * 1500));

    // 20%概率支付失败
    const success = Math.random() > 0.2;

    if (success) {
        // 创建订单
        const now = new Date();
        const orderId = 'ORD' + now.toISOString().slice(0,10).replace(/-/g,'') + String(data.orders.length + 1).padStart(3,'0');
        const items = cart.map(ci => {
            const p = data.products.find(x => x.id === ci.productId);
            return p ? {name: p.name, price: p.price, qty: ci.qty} : null;
        }).filter(Boolean);
        const order = {
            id: orderId,
            customer: data.customers[0]?.name || '访客',
            items: items,
            amount: total,
            status: 'pending',
            time: now.toISOString().slice(0,10) + ' ' + String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0')
        };
        data.orders.unshift(order);
        saveData(data);

        modal.innerHTML = `
            <div class="payment-result">
                <span class="result-icon">✅</span>
                <div class="result-title">支付成功</div>
                <div class="result-desc">订单号: ${orderId}<br>已通过${methodNames[selectedPaymentMethod]}支付 ¥${total.toLocaleString()}</div>
                <button class="btn btn-primary" id="payment-done">完成</button>
            </div>`;

        localStorage.removeItem(CART_KEY);
        updateCartBadge();

        document.getElementById('payment-done').addEventListener('click', () => {
            document.getElementById('payment-overlay').classList.remove('active');
            navigate('profile');
        });
    } else {
        modal.innerHTML = `
            <div class="payment-result">
                <span class="result-icon">❌</span>
                <div class="result-title">支付失败</div>
                <div class="result-desc">${methodNames[selectedPaymentMethod]}支付未成功，请重试或更换支付方式</div>
                <div class="payment-actions" style="margin-top:16px">
                    <button class="btn" id="payment-close">关闭</button>
                    <button class="btn btn-primary" id="payment-retry">重新支付</button>
                </div>
            </div>`;

        document.getElementById('payment-close').addEventListener('click', () => {
            document.getElementById('payment-overlay').classList.remove('active');
        });
        document.getElementById('payment-retry').addEventListener('click', () => {
            openPaymentModal(total, cart, data);
        });
    }
}

// ============ 个人中心 ============

function renderProfileView(data) {
    if (!data) return;
    const customer = data.customers[0];
    document.getElementById('profile-name').textContent = customer.name;
    document.getElementById('profile-level').textContent = customer.level + '会员';
    renderProfileOrders(data);

    document.querySelectorAll('.profile-nav-item').forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            document.querySelectorAll('.profile-nav-item').forEach(n=>n.classList.remove('active'));
            item.classList.add('active');
            const tab = item.dataset.tab;
            if (tab==='orders') renderProfileOrders(data);
            else if (tab==='wishlist') renderProfileWishlist(data);
            else if (tab==='address') renderProfileAddress(customer);
            else if (tab==='settings') renderProfileSettings(customer);
        });
    });
}

function renderProfileOrders(data) {
    const container = document.getElementById('profile-content');
    if (!container) return;
    container.innerHTML = '<h3 style="margin-bottom:16px">我的订单</h3>' + data.orders.slice(0,10).map(o => {
        const sc = {completed:'completed',shipped:'shipped',pending:'pending'}[o.status]||'';
        const st = {completed:'已完成',shipped:'已发货',pending:'待处理'}[o.status]||o.status;
        return `
            <div class="order-card">
                <div class="order-header">
                    <span class="order-id">${o.id}</span>
                    <span class="order-time">${o.time}</span>
                    <span class="order-status ${sc}">${st}</span>
                </div>
                <div class="order-items">${o.items.map(i=>`<div class="order-item"><span class="order-item-name">${i.name} × ${i.qty}</span><span>¥${(i.price*i.qty).toLocaleString()}</span></div>`).join('')}</div>
                <div class="order-footer"><span class="order-total">合计: ¥${o.amount.toLocaleString()}</span></div>
            </div>`;
    }).join('');
}

function renderProfileWishlist(data) {
    document.getElementById('profile-content').innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-secondary)"><span style="font-size:48px">💝</span><p style="margin-top:12px">暂无收藏商品</p><button class="btn btn-primary" style="margin-top:16px" data-nav="home">去逛逛</button></div>';
}

function renderProfileAddress(customer) {
    document.getElementById('profile-content').innerHTML = `
        <div class="order-card"><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-weight:600">默认地址</span><span style="font-size:13px;color:var(--accent)">编辑</span></div><p style="margin-top:8px;color:var(--text-secondary)">${customer.name} · ${customer.phone}</p><p style="color:var(--text-secondary)">${customer.address}</p></div>`;
}

function renderProfileSettings(customer) {
    document.getElementById('profile-content').innerHTML = `
        <div class="order-card"><h3 style="margin-bottom:16px">账号信息</h3><div style="display:grid;grid-template-columns:1fr 1fr;gap:16px"><div><label style="font-size:13px;color:var(--text-muted)">姓名</label><p>${customer.name}</p></div><div><label style="font-size:13px;color:var(--text-muted)">手机</label><p>${customer.phone}</p></div><div><label style="font-size:13px;color:var(--text-muted)">邮箱</label><p>${customer.email}</p></div><div><label style="font-size:13px;color:var(--text-muted)">会员等级</label><p>${customer.level}</p></div></div></div>`;
}

// ============ 搜索 ============

function initSearch(data) {
    const toggle = document.getElementById('search-toggle');
    const overlay = document.getElementById('search-overlay');
    const close = document.getElementById('search-close');
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');
    if (!toggle||!overlay) return;
    toggle.addEventListener('click', ()=>{ overlay.classList.add('active'); input.focus(); });
    close.addEventListener('click', ()=>overlay.classList.remove('active'));
    overlay.addEventListener('click', e=>{ if(e.target===overlay) overlay.classList.remove('active'); });
    input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        if (!q) { results.innerHTML=''; return; }
        const matches = data.products.filter(p=> p.name.toLowerCase().includes(q)||p.desc.includes(q)).slice(0,8);
        results.innerHTML = matches.map(p => `
            <div class="search-result-item" data-product-id="${p.id}">
                <span class="result-icon">${getCategoryIcon(p.category)}</span>
                <div><div class="result-name">${p.name}</div><div class="result-price">¥${p.price.toLocaleString()}</div></div>
            </div>
        `).join('') || '<p style="padding:16px;color:var(--text-muted)">未找到相关商品</p>';
        // 点击搜索结果关闭遮罩并跳转
        results.querySelectorAll('[data-product-id]').forEach(el => {
            el.addEventListener('click', ()=>{ overlay.classList.remove('active'); navigate('product', el.dataset.productId); });
        });
    });
}

// ============ Toast ============

function showToast(msg) {
    let toast = document.getElementById('toast');
    if (!toast) { toast=document.createElement('div'); toast.id='toast'; document.body.appendChild(toast); }
    toast.textContent = msg;
    toast.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);padding:12px 24px;border-radius:980px;background:var(--text);color:#fff;font-size:14px;z-index:9999;opacity:1;transition:opacity 0.3s';
    setTimeout(()=>{ toast.style.opacity='0'; }, 2000);
}

// ============ 初始化 ============

async function init() {
    appData = await loadData();
    if (!appData) return;

    updateCartBadge();
    bindNavigation();
    initSearch(appData);

    // 根据hash路由初始化
    if (window.location.hash) handleHash();
    else navigate('home');

    // 监听hash变化
    window.addEventListener('hashchange', handleHash);

    // 监听后台数据变更
    window.addEventListener('storage', e => {
        if (e.key === STORAGE_KEY) { appData = getData(); navigate(currentView); }
    });
}

init();
console.log('LUMIÈRE SPA 已加载 | Powered by Vibecoding');