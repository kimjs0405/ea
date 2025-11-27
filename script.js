// ========== 모바일 메뉴 ==========
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        const newToggle = navToggle.cloneNode(true);
        navToggle.parentNode.replaceChild(newToggle, navToggle);
        
        newToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('active');
            newToggle.classList.toggle('active');
        });
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                newToggle.classList.remove('active');
            });
        });
        
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !newToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                newToggle.classList.remove('active');
            }
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}

// ========== 헤더 스크롤 효과 ==========
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (header && header.style) {
            if (currentScroll > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }
        }
    });
}

// ========== 스크롤 애니메이션 ==========
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.worship-card, .program-card, .news-card, .vision-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ========== 문의 폼 ==========
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('문의가 접수되었습니다. 담당자가 곧 연락드리겠습니다.');
        contactForm.reset();
    });
}

// ========== 부드러운 스크롤 ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========== 히어로 애니메이션 ==========
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && heroContent.style) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        setTimeout(() => {
            if (heroContent && heroContent.style) {
                heroContent.style.transition = 'all 1s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }
        }, 100);
    }
});

// ========== 관리자 인증 (SHA-256 해시) ==========
const AUTH_HASH = {
    id: 'a6a86ce1318a9bb43806d8c9221ac3c0e85f2e2f7378993ebee73a3e7cd40865',
    pw: 'd2e874303c6c41145065ef3d78bba5d09e7a4de3355a7b279d6fee5659c15ef4'
};

async function hashString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function checkAdminLogin() {
    const id = document.getElementById('adminId').value;
    const pw = document.getElementById('adminPw').value;
    
    if (!id || !pw) {
        showLoginError();
        return;
    }
    
    const idHash = await hashString(id);
    const pwHash = await hashString(pw);
    
    if (idHash === AUTH_HASH.id && pwHash === AUTH_HASH.pw) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        closeAdminLogin();
        updateAdminUI();
        alert('관리자로 로그인되었습니다.');
    } else {
        showLoginError();
    }
}

function showLoginError() {
    const errorEl = document.getElementById('loginError');
    if (errorEl && errorEl.style) {
        errorEl.style.display = 'block';
        setTimeout(() => {
            if (errorEl && errorEl.style) errorEl.style.display = 'none';
        }, 3000);
    }
}

function openAdminLogin() {
    const modal = document.getElementById('adminLoginModal');
    if (modal && modal.style) modal.style.display = 'flex';
}

function closeAdminLogin() {
    const modal = document.getElementById('adminLoginModal');
    if (modal && modal.style) modal.style.display = 'none';
    const adminId = document.getElementById('adminId');
    const adminPw = document.getElementById('adminPw');
    if (adminId) adminId.value = '';
    if (adminPw) adminPw.value = '';
}

function adminLogout() {
    sessionStorage.removeItem('adminLoggedIn');
    updateAdminUI();
    alert('로그아웃되었습니다.');
}

function updateAdminUI() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const adminMenuBtn = document.getElementById('adminMenuBtn');
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');
    
    if (adminLoginBtn) adminLoginBtn.style.display = isLoggedIn ? 'none' : 'inline-block';
    if (adminMenuBtn) adminMenuBtn.style.display = isLoggedIn ? 'inline-block' : 'none';
    if (adminLogoutBtn) adminLogoutBtn.style.display = isLoggedIn ? 'inline-block' : 'none';
    
    if (document.getElementById('boardPosts')) renderBoardPosts();
}

function showAdminMenu() {
    window.open('admin.html', '_blank');
}

// ========== 게시판 (Firebase 사용) ==========
let currentPage = 1;
const postsPerPage = 10;
let allPosts = [];

async function loadBoardPosts() {
    if (typeof getData === 'function') {
        return await getData('posts');
    }
    // Firebase 로드 안됐으면 localStorage 사용
    return JSON.parse(localStorage.getItem('elim-board-posts') || '[]');
}

async function saveBoardPost(post) {
    if (typeof addData === 'function') {
        return await addData('posts', post);
    }
    const posts = JSON.parse(localStorage.getItem('elim-board-posts') || '[]');
    post.id = Date.now().toString();
    post.date = Date.now();
    posts.push(post);
    localStorage.setItem('elim-board-posts', JSON.stringify(posts));
    return { success: true, id: post.id };
}

async function updateBoardPost(postId, data) {
    if (typeof updateData === 'function') {
        return await updateData('posts', postId, data);
    }
    const posts = JSON.parse(localStorage.getItem('elim-board-posts') || '[]');
    const idx = posts.findIndex(p => p.id === postId);
    if (idx !== -1) {
        posts[idx] = { ...posts[idx], ...data };
        localStorage.setItem('elim-board-posts', JSON.stringify(posts));
    }
    return { success: true };
}

async function deleteBoardPost(postId) {
    if (typeof deleteData === 'function') {
        return await deleteData('posts', postId);
    }
    const posts = JSON.parse(localStorage.getItem('elim-board-posts') || '[]');
    const filtered = posts.filter(p => p.id !== postId);
    localStorage.setItem('elim-board-posts', JSON.stringify(filtered));
    return { success: true };
}

async function renderBoardPosts() {
    const container = document.getElementById('boardPosts');
    if (!container) return;
    
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    container.innerHTML = '<div class="loading-message"><p>게시글을 불러오는 중...</p></div>';
    
    try {
        allPosts = await loadBoardPosts();
        allPosts = allPosts.sort((a, b) => (b.date || 0) - (a.date || 0));
        
        if (allPosts.length === 0) {
            container.innerHTML = '<div class="loading-message"><p>아직 게시글이 없습니다.</p></div>';
            return;
        }
        
        const start = (currentPage - 1) * postsPerPage;
        const end = start + postsPerPage;
        const pagePosts = allPosts.slice(start, end);
        
        let html = '<div class="board-posts">';
        pagePosts.forEach((post, index) => {
            const postDate = new Date(post.date).toLocaleDateString('ko-KR');
            html += `
                <div class="board-post-item" onclick="viewPost(${start + index})">
                    <div class="board-post-header">
                        <div>
                            <div class="board-post-title">${post.title || '제목없음'}</div>
                            <div class="board-post-meta">
                                <span>📅 ${postDate}</span>
                                <span>👤 ${post.author || '게시자'}</span>
                            </div>
                        </div>
                    </div>
                    <div class="board-post-preview">${(post.content || '').substring(0, 100)}...</div>
                    ${isLoggedIn ? `
                        <div class="board-post-actions">
                            <button class="btn btn-primary" onclick="event.stopPropagation(); editPost(${start + index})">수정</button>
                            <button class="btn btn-secondary" onclick="event.stopPropagation(); deletePost(${start + index})" style="background: #dc3545;">삭제</button>
                        </div>
                    ` : ''}
                </div>
            `;
        });
        html += '</div>';
        
        container.innerHTML = html;
        renderPagination(allPosts.length);
    } catch (error) {
        console.error('게시글 로드 실패:', error);
        container.innerHTML = '<div class="loading-message"><p>게시글을 불러오는데 실패했습니다.</p></div>';
    }
}

function renderPagination(totalPosts) {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const container = document.getElementById('pagination');
    if (!container) return;
    if (totalPages <= 1) { container.innerHTML = ''; return; }
    
    let html = '';
    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    }
    container.innerHTML = html;
}

function goToPage(page) {
    currentPage = page;
    renderBoardPosts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 글쓰기 모달
let editingPostIndex = null;

function openWriteModal(postIndex = null) {
    editingPostIndex = postIndex;
    const modal = document.getElementById('postModal');
    if (!modal) return;
    
    const titleEl = document.getElementById('modalTitle');
    const authorInput = document.getElementById('postAuthor');
    const titleInput = document.getElementById('postTitle');
    const contentInput = document.getElementById('postContent');
    
    if (postIndex !== null) {
        const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
        if (!isLoggedIn) { alert('게시글 수정은 관리자만 가능합니다.'); return; }
        
        const post = allPosts[postIndex];
        if (titleEl) titleEl.textContent = '글 수정';
        if (authorInput) authorInput.value = post.author || '';
        if (titleInput) titleInput.value = post.title || '';
        if (contentInput) contentInput.value = post.content || '';
    } else {
        if (titleEl) titleEl.textContent = '글쓰기';
        if (authorInput) authorInput.value = '';
        if (titleInput) titleInput.value = '';
        if (contentInput) contentInput.value = '';
    }
    
    modal.style.display = 'flex';
}

function closeWriteModal() {
    const modal = document.getElementById('postModal');
    if (modal) modal.style.display = 'none';
    editingPostIndex = null;
}

async function savePost() {
    const author = document.getElementById('postAuthor').value.trim();
    const title = document.getElementById('postTitle').value.trim();
    const content = document.getElementById('postContent').value.trim();
    
    if (!author) { alert('작성자 이름을 입력해주세요.'); return; }
    if (!title || !content) { alert('제목과 내용을 입력해주세요.'); return; }
    
    try {
        if (editingPostIndex !== null) {
            const post = allPosts[editingPostIndex];
            await updateBoardPost(post.id, { title, content, author });
            alert('글이 수정되었습니다.');
        } else {
            await saveBoardPost({ title, content, author });
            alert('글이 등록되었습니다.');
        }
        closeWriteModal();
        await renderBoardPosts();
    } catch (error) {
        alert('저장에 실패했습니다: ' + error.message);
    }
}

function editPost(index) {
    openWriteModal(index);
}

async function deletePost(index) {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    if (!isLoggedIn) { alert('게시글 삭제는 관리자만 가능합니다.'); return; }
    if (!confirm('정말 삭제하시겠습니까?')) return;
    
    try {
        const post = allPosts[index];
        await deleteBoardPost(post.id);
        alert('글이 삭제되었습니다.');
        await renderBoardPosts();
    } catch (error) {
        alert('삭제에 실패했습니다: ' + error.message);
    }
}

function viewPost(index) {
    const post = allPosts[index];
    if (!post) return;
    
    const container = document.getElementById('boardPosts');
    const postDate = new Date(post.date).toLocaleDateString('ko-KR');
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    
    container.innerHTML = `
        <div class="board-post-detail">
            <h2 class="board-post-detail-title">${post.title}</h2>
            <div class="board-post-meta" style="margin-bottom: 20px;">
                <span>📅 ${postDate}</span>
                <span>👤 ${post.author || '게시자'}</span>
            </div>
            <div class="board-post-detail-content">${(post.content || '').replace(/\n/g, '<br>')}</div>
            <div class="board-post-detail-actions">
                ${isLoggedIn ? `
                    <button class="btn btn-primary" onclick="editPost(${index})">수정</button>
                    <button class="btn btn-secondary" onclick="deletePost(${index})" style="background: #dc3545;">삭제</button>
                ` : ''}
                <button class="btn btn-secondary" onclick="renderBoardPosts()">목록</button>
            </div>
        </div>
    `;
}

// ========== 주보광고 (Firebase 사용) ==========
async function loadBulletins() {
    const container = document.getElementById('bulletinList');
    if (!container) return;
    
    container.innerHTML = '<div class="loading-message"><p>주보를 불러오는 중...</p></div>';
    
    try {
        let bulletins = [];
        if (typeof getData === 'function') {
            bulletins = await getData('bulletins');
        } else {
            bulletins = JSON.parse(localStorage.getItem('elim-bulletins') || '[]');
        }
        
        if (bulletins.length === 0) {
            container.innerHTML = '<div class="loading-message"><p>등록된 주보가 없습니다.</p></div>';
            window.bulletinsData = [];
            return;
        }
        
        const sortedBulletins = [...bulletins].sort((a, b) => {
            try {
                const dateA = a.date ? new Date(a.date.replace(/\./g, '-')) : new Date(0);
                const dateB = b.date ? new Date(b.date.replace(/\./g, '-')) : new Date(0);
                return dateB - dateA;
            } catch (e) { return 0; }
        });
        
        const displayBulletins = sortedBulletins.slice(0, 5);
        
        let html = '';
        displayBulletins.forEach((bulletin, index) => {
            html += `
                <div class="board-list-item">
                    <a href="javascript:void(0)" onclick="showBulletinDetail(${index})">
                        <span class="date">${bulletin.bulletinDate || bulletin.date || ''}</span>
                        <span class="text">${bulletin.title || '제목 없음'}</span>
                    </a>
                </div>
            `;
        });
        
        container.innerHTML = html;
        window.bulletinsData = sortedBulletins;
    } catch (error) {
        console.error('주보 로드 실패:', error);
        container.innerHTML = '<div class="loading-message"><p>주보를 불러오는 중 오류가 발생했습니다.</p></div>';
    }
}

function showBulletinDetail(index) {
    const bulletins = window.bulletinsData || [];
    const bulletin = bulletins[index];
    if (!bulletin) { alert('주보를 찾을 수 없습니다.'); return; }
    
    const modal = document.getElementById('bulletinModal');
    const content = document.getElementById('bulletinModalContent');
    if (!modal || !content) return;
    
    let html = `
        <h2 style="margin-bottom: 20px; color: #2C3E50;">${bulletin.title}</h2>
        <div style="margin-bottom: 20px; color: #666; font-size: 0.95rem;">
            <span>📅 ${bulletin.bulletinDate || bulletin.date || ''}</span>
        </div>
    `;
    
    if (bulletin.imageUrl) {
        html += `<div style="margin-bottom: 20px;"><img src="${bulletin.imageUrl}" alt="${bulletin.title}" style="width: 100%; max-height: 500px; object-fit: contain; border-radius: 8px;" onerror="this.style.display='none'"></div>`;
    }
    
    if (bulletin.content) {
        html += `<div style="line-height: 1.8; color: #333; white-space: pre-wrap;">${bulletin.content.replace(/\n/g, '<br>')}</div>`;
    }
    
    content.innerHTML = html;
    modal.style.display = 'flex';
}

function closeBulletinModal() {
    const modal = document.getElementById('bulletinModal');
    if (modal) modal.style.display = 'none';
}

// ========== 행사앨범 (Firebase 사용) ==========
async function loadAlbums() {
    const container = document.getElementById('albumGrid');
    if (!container) return;
    
    container.innerHTML = '<div class="loading-message"><p>앨범을 불러오는 중...</p></div>';
    
    try {
        let albums = [];
        if (typeof getData === 'function') {
            albums = await getData('albums');
        } else {
            albums = JSON.parse(localStorage.getItem('elim-albums') || '[]');
        }
        
        if (albums.length === 0) {
            container.innerHTML = '<div class="loading-message"><p>등록된 사진이 없습니다.</p></div>';
            return;
        }
        
        const displayAlbums = albums.slice(-6).reverse();
        
        let html = '';
        displayAlbums.forEach(album => {
            const imageUrl = album.imageUrl || album.image_url;
            html += `
                <div class="album-item">
                    <div class="album-thumb" style="background-image: url('${imageUrl}'); background-size: cover; background-position: center;">
                        <img src="${imageUrl}" alt="행사앨범" style="width: 100%; height: 100%; object-fit: cover; display: block;" onerror="this.parentElement.innerHTML='<div class=\\'album-placeholder\\'>📷</div>'">
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    } catch (error) {
        console.error('앨범 로드 실패:', error);
        container.innerHTML = '<div class="loading-message"><p>앨범을 불러오는 중 오류가 발생했습니다.</p></div>';
    }
}

// ========== 교회소식 스크롤 (Firebase 사용) ==========
let currentNewsIndex = 0;
let newsItems = [];

async function loadNewsScrollItems() {
    const container = document.getElementById('newsScrollContent');
    if (!container) return;
    
    try {
        let items = [];
        if (typeof getData === 'function') {
            items = await getData('newsScroll');
        } else {
            items = JSON.parse(localStorage.getItem('elim-news-scroll') || '[]');
        }
        
        if (items.length === 0) {
            container.innerHTML = '<div class="news-scroll-item active">교회소식을 관리자 페이지에서 추가해주세요.</div>';
            newsItems = container.querySelectorAll('.news-scroll-item');
            return;
        }
        
        container.innerHTML = '';
        items.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'news-scroll-item';
            if (index === 0) div.classList.add('active');
            div.textContent = item.text;
            container.appendChild(div);
        });
        
        newsItems = container.querySelectorAll('.news-scroll-item');
        if (newsItems.length > 0) initNewsScroll();
    } catch (error) {
        console.error('교회소식 로드 실패:', error);
        container.innerHTML = '<div class="news-scroll-item active">교회소식을 불러오는 중 오류가 발생했습니다.</div>';
    }
}

function initNewsScroll() {
    if (newsItems.length === 0) return;
    if (newsItems[0]) newsItems[0].classList.add('active');
    
    if (window.newsScrollInterval) clearInterval(window.newsScrollInterval);
    
    window.newsScrollInterval = setInterval(() => {
        if (newsItems.length === 0) return;
        if (newsItems[currentNewsIndex]) newsItems[currentNewsIndex].classList.remove('active');
        currentNewsIndex = (currentNewsIndex + 1) % newsItems.length;
        if (newsItems[currentNewsIndex]) newsItems[currentNewsIndex].classList.add('active');
    }, 5000);
}

function scrollNews(direction) {
    if (newsItems.length === 0) return;
    if (newsItems[currentNewsIndex]) newsItems[currentNewsIndex].classList.remove('active');
    
    if (direction === 'up') {
        currentNewsIndex = (currentNewsIndex - 1 + newsItems.length) % newsItems.length;
    } else {
        currentNewsIndex = (currentNewsIndex + 1) % newsItems.length;
    }
    
    if (newsItems[currentNewsIndex]) newsItems[currentNewsIndex].classList.add('active');
}

// ========== YouTube 설교영상 ==========
function extractVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

async function loadYouTubeVideos(channelId) {
    const latestVideoContainer = document.getElementById('latest-video');
    
    if (latestVideoContainer) {
        latestVideoContainer.innerHTML = '<div class="loading-spinner"></div><p style="text-align: center;">영상을 불러오는 중...</p>';
    }
    
    try {
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
        
        const proxyServices = [
            { url: `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`, type: 'allorigins' },
            { url: `https://corsproxy.io/?${encodeURIComponent(rssUrl)}`, type: 'corsproxy' }
        ];
        
        let xmlData = null;
        
        for (const proxy of proxyServices) {
            try {
                const response = await fetch(proxy.url);
                if (!response.ok) continue;
                
                let text = await response.text();
                if (proxy.type === 'allorigins') {
                    try {
                        const json = JSON.parse(text);
                        if (json.contents) { xmlData = json.contents; break; }
                    } catch (e) { xmlData = text; break; }
                } else {
                    xmlData = text; break;
                }
            } catch (err) { continue; }
        }
        
        if (!xmlData) throw new Error('영상을 불러올 수 없습니다.');
        
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
        const entries = xmlDoc.querySelectorAll('entry');
        
        if (entries.length === 0) throw new Error('영상을 찾을 수 없습니다.');
        
        const latestVideo = entries[0];
        let videoId = null;
        
        const videoIdElement = latestVideo.querySelector('yt\\:videoId') || latestVideo.querySelector('videoid');
        if (videoIdElement) videoId = videoIdElement.textContent.trim();
        
        if (!videoId) {
            const linkElement = latestVideo.querySelector('link[rel="alternate"]');
            if (linkElement) {
                const href = linkElement.getAttribute('href');
                const match = href.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
                if (match) videoId = match[1];
            }
        }
        
        if (!videoId || videoId.length !== 11) throw new Error('영상 ID를 찾을 수 없습니다.');
        
        const titleElement = latestVideo.querySelector('title');
        const title = titleElement ? titleElement.textContent.trim() : '제목 없음';
        
        const updatedElement = latestVideo.querySelector('updated') || latestVideo.querySelector('published');
        const updated = updatedElement ? new Date(updatedElement.textContent) : new Date();
        const pubDate = updated.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
        
        if (latestVideoContainer) {
            latestVideoContainer.innerHTML = `
                <div class="sermon-video-container">
                    <iframe src="https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
                <div class="sermon-video-info" style="margin-top: 20px; padding: 20px; background: #f9f9f9; border-radius: 5px;">
                    <h3 style="font-size: 1.2rem; margin-bottom: 10px; color: #333;">${title}</h3>
                    <p style="color: #666; font-size: 0.95rem;">📅 ${pubDate}</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('영상 로드 실패:', error);
        if (latestVideoContainer) {
            latestVideoContainer.innerHTML = `
                <div class="loading-message">
                    <p>❌ 영상을 불러오는데 실패했습니다.</p>
                    <p style="font-size: 0.9rem; margin-top: 10px; color: #999;">${error.message}</p>
                </div>
            `;
        }
    }
}

// ========== 페이지 초기화 ==========
window.addEventListener('load', async () => {
    updateAdminUI();
    
    if (document.getElementById('boardPosts')) await renderBoardPosts();
    
    await loadBulletins();
    await loadAlbums();
    await loadNewsScrollItems();
    
    // 모달 외부 클릭시 닫기
    window.onclick = function(event) {
        const loginModal = document.getElementById('adminLoginModal');
        const postModal = document.getElementById('postModal');
        const bulletinModal = document.getElementById('bulletinModal');
        if (loginModal && event.target === loginModal) closeAdminLogin();
        if (postModal && event.target === postModal) closeWriteModal();
        if (bulletinModal && event.target === bulletinModal) closeBulletinModal();
    };
    
    // 설교영상 페이지
    const latestVideoContainer = document.getElementById('latest-video');
    if (latestVideoContainer) {
        let savedChannelId = '';
        if (typeof getSettings === 'function') {
            const settings = await getSettings();
            savedChannelId = settings.youtubeChannelId || '';
        } else {
            const settings = JSON.parse(localStorage.getItem('elim-settings') || '{}');
            savedChannelId = settings.youtubeChannelId || '';
        }
        
        if (!savedChannelId) {
            latestVideoContainer.innerHTML = `
                <div class="loading-message">
                    <p>⚠️ YouTube 채널 ID가 설정되지 않았습니다.</p>
                    <p style="font-size: 0.9rem; margin-top: 10px;">관리자 페이지에서 채널 ID를 설정해주세요.</p>
                </div>
            `;
            return;
        }
        
        loadYouTubeVideos(savedChannelId);
    }
});

console.log('✅ 엘림교회 홈페이지 로드 완료!');
