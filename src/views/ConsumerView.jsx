import React, { useContext, useState, useEffect } from 'react';
import { DeskSetContext } from '../context/DeskSetContext';
import ProductCard from '../components/ui/ProductCard';
import SkeletonCard from '../components/ui/SkeletonCard';

const ConsumerView = () => {
  const { 
    products, 
    cart, 
    orders, 
    notices, 
    faqs, 
    activePage, 
    showPage, 
    goBack,
    switchRole,
    currentUser,
    setCurrentUser,
    logout,
    currentProductId,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    detailQty,
    changeQty,
    addToCart,
    toggleItemChecked,
    toggleAll,
    changeCartItemQty,
    deleteSelected,
    simulatePayment,
    showTrackingModal,
    showReviewForm,
    addInquiry,
    openProductDetail,
    filterCategory,
    modalContext,
    showToast
  } = useContext(DeskSetContext);

  const [activeTabDetail, setActiveTabDetail] = useState('desc');
  const [activeTabCs, setActiveTabCs] = useState('notice');
  const [activeFaq, setActiveFaq] = useState(null);

  // States for search
  const [searchQuery, setSearchQuery] = useState('');

  // States for order shipping
  const [recipient, setRecipient] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [shippingMemo, setShippingMemo] = useState('배송 전 연락 바랍니다.');

  const applyDefaultShipping = () => {
    if (!currentUser) return;
    if (currentUser.id === 'admin') {
      setRecipient("관리자대표");
      setPhone("010-0000-0000");
      setAddress("서울특별시 가상구 테스트로 77, 테크타워 707호");
    } else if (currentUser.id === 'company') {
      setRecipient("입점사 파트너");
      setPhone("010-0000-0000");
      setAddress("경기도 가상시 판교테스트로 88, 로지스틱스 202호");
    } else {
      setRecipient("테스트고객");
      setPhone("010-0000-0000");
      setAddress("인천광역시 가상구 송도과학로 99, 스마트아파트 909동 909호");
    }
    showToast("저장된 집 배송 정보가 적용되었습니다.");
  };

  // States for CS Inquiry Form
  const [inqType, setInqType] = useState('배송');
  const [inqTitle, setInqTitle] = useState('');
  const [inqContent, setInqContent] = useState('');

  // Local Sort Option for catalog
  const [catalogSort, setCatalogSort] = useState('인기순');
  const [catalogCat, setCatalogCat] = useState('전체');

  // States for Login
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    if (loginId === 'admin' && loginPw === 'admin') {
      setCurrentUser({ id: 'admin', role: 'admin' });
      setLoginId('');
      setLoginPw('');
      showPage('consumer-home');
    } else if (loginId === 'company' && loginPw === 'company') {
      setCurrentUser({ id: 'company', role: 'seller' });
      setLoginId('');
      setLoginPw('');
      showPage('consumer-home');
    } else if (loginId === 'user' && loginPw === 'user') {
      setCurrentUser({ id: 'user', role: 'user' });
      setLoginId('');
      setLoginPw('');
      showPage('consumer-home');
    } else {
      setLoginError('로그인 실패: 아이디나 비밀번호를 확인하세요.');
    }
  };

  // ------------------ SNS LOGIN INTEGRATION ------------------
  useEffect(() => {
    const loadNaverScript = () => {
      if (window.naver) return Promise.resolve();
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js';
        script.charset = 'utf-8';
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    };

    loadNaverScript().then(() => {
      // ⚠️ 여기에 본인의 Naver Client ID를 입력하세요.
      // (테스트용 예시 키: "fexzK_E5pPhm_LzG4WpS")
      const clientId = "fexzK_E5pPhm_LzG4WpS"; 
      const callbackUrl = window.location.origin + (window.location.pathname.startsWith('/shop') ? '/shop/login' : '/login');

      const naverLogin = new window.naver.LoginWithNaverId({
        clientId: clientId,
        callbackUrl: callbackUrl,
        isPopup: false,
        loginButton: { color: "green", type: 3, height: 60 }
      });
      naverLogin.init();

      // 로그인 성공 후 리다이렉트되어 돌아왔을 때 토큰 처리
      if (window.location.hash.includes('access_token')) {
        naverLogin.getLoginStatus((status) => {
          if (status) {
            const email = naverLogin.user.getEmail();
            const name = naverLogin.user.getName() || "네이버 회원";
            const profileImage = naverLogin.user.getProfileImage() || "";

            const userObj = {
              id: email || `naver_${Date.now()}`,
              name: name,
              email: email || "",
              profileImage: profileImage,
              role: 'user',
              provider: 'naver'
            };

            setCurrentUser(userObj);
            showToast(`${name}님, 네이버 로그인 성공!`);
            showPage('consumer-home');
            window.history.replaceState({}, document.title, window.location.pathname);
          }
        });
      }
    }).catch(err => console.error("Naver SDK load failed", err));
  }, [activePage]);

  const handleNaverLoginClick = () => {
    if (!window.naver) {
      showToast("네이버 로그인 SDK를 불러오는 중입니다. 잠시 후 다시 시도해 주세요.");
      return;
    }
    const naverAuthBtn = document.getElementById('naverIdLogin')?.querySelector('a');
    if (naverAuthBtn) {
      naverAuthBtn.click();
    } else {
      showToast("네이버 로그인 버튼을 초기화하는 중입니다. 다시 시도해 주세요.");
    }
  };

  const handleMockSnsLogin = (provider) => {
    showToast(`${provider} 로그인 시뮬레이션을 진행합니다...`);
    setTimeout(() => {
      const mockUserObj = {
        id: `${provider.toLowerCase()}_${Date.now()}`,
        name: `${provider} 테스트회원`,
        email: `${provider.toLowerCase()}@mockmail.com`,
        role: 'user',
        provider: provider.toLowerCase()
      };
      setCurrentUser(mockUserObj);
      showToast(`${mockUserObj.name}님, ${provider} 로그인 완료!`);
      showPage('consumer-home');
    }, 1000);
  };
  // -----------------------------------------------------------

  // Compute Cart count
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Helper to translate hex color to string
  const getColorName = (hex) => {
    if (hex === "#1E293B") return "슬레이트";
    if (hex === "#0EA5E9") return "스카이블루";
    if (hex === "#F1F5F9") return "화이트";
    if (hex === "#94A3B8") return "그레이";
    if (hex === "#78350F") return "원목월넛";
    if (hex === "#451A03") return "다크월넛";
    if (hex === "#EF4444") return "레드";
    if (hex === "#10B981") return "그린";
    if (hex === "#F59E0B") return "옐로우";
    return hex;
  };

  return (
    <div id="view-consumer" className="view active">
      {/* CONSUMER HEADER */}
      <header className="header">
        <div className="header-inner">
          <div className="logo" onClick={() => showPage('consumer-home')}>
            <span className="logo-mark">D</span>
            <span className="logo-text">DeskSet</span>
          </div>
          <nav className="nav-links">
            <span className={`nav-link ${activePage === 'consumer-products' ? 'active' : ''}`} onClick={() => {
              setCatalogCat('전체');
              showPage('consumer-products');
            }}>상품</span>
            <span className={`nav-link ${activePage === 'consumer-cs' ? 'active' : ''}`} onClick={() => showPage('consumer-cs')}>고객센터</span>
          </nav>
          <div className="header-actions">
            <button className="icon-btn" onClick={() => showPage('consumer-search')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>
            <button 
              className="icon-btn cart-btn" 
              onClick={() => {
                if (!currentUser) {
                  showToast("로그인 먼저 해주세요.");
                  showPage('consumer-login');
                } else {
                  showPage('consumer-cart');
                }
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
            <button 
              className="icon-btn" 
              onClick={() => {
                if (!currentUser) {
                  showToast("로그인 먼저 해주세요.");
                  showPage('consumer-login');
                } else {
                  showPage('consumer-mypage');
                }
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </button>

            {/* Auth/Role Switching links - Far Right! */}
            {!currentUser ? (
              <span className={`nav-link ${activePage === 'consumer-login' ? 'active' : ''}`} style={{ color: '#0EA5E9', fontWeight: 'bold', marginLeft: '12px', cursor: 'pointer' }} onClick={() => showPage('consumer-login')}>로그인</span>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '12px' }}>
                {currentUser.role === 'admin' && (
                  <span className="nav-link" style={{ color: '#8B5CF6', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => switchRole('admin')}>관리자</span>
                )}
                {currentUser.role === 'seller' && (
                  <span className="nav-link" style={{ color: '#0EA5E9', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => switchRole('seller')}>입점사</span>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* -------------------- 1. CONSUMER HOME VIEW -------------------- */}
      {activePage === 'consumer-home' && (
        <div id="consumer-home" className="page active">
          {/* Hero Banner */}
          <section className="hero">
            <div className="hero-bg-grid"></div>
            <div className="hero-content">
              <div className="hero-badge">2025 DESK COLLECTION</div>
              <h1 className="hero-title">당신의 공간을<br /><em>완성</em>하는 굿즈</h1>
              <p className="hero-desc">미니멀하고 테크니컬한 데스크 셋업을 위한<br />엄선된 프리미엄 아이템 컬렉션</p>
              <div className="hero-cta">
                <button className="btn-primary" onClick={() => showPage('consumer-products')}>컬렉션 보기</button>
              </div>
            </div>
            <div className="hero-visual">
              <div className="desk-mockup">
                <div className="mockup-monitor"><div className="monitor-screen"></div></div>
                <div className="mockup-keyboard"></div>
                <div className="mockup-pad"></div>
                <div className="mockup-plant"></div>
              </div>
            </div>
          </section>

          {/* Categories Grid */}
          <section className="section">
            <div className="container">
              <div className="section-header">
                <h2 className="section-title">카테고리</h2>
                <span className="see-all" onClick={() => showPage('consumer-products')} style={{ cursor: 'pointer' }}>전체 보기 →</span>
              </div>
              <div className="category-grid">
                <div className="cat-card" onClick={() => { setCatalogCat('키보드'); showPage('consumer-products'); }}>
                  <div className="cat-icon">⌨</div>
                  <span className="cat-name">키보드 & 마우스</span>
                  <span className="cat-count">{products.filter(p => p.category === 'keyboard').length}개</span>
                </div>
                <div className="cat-card" onClick={() => { setCatalogCat('조명'); showPage('consumer-products'); }}>
                  <div className="cat-icon">💡</div>
                  <span className="cat-name">모니터 & 조명</span>
                  <span className="cat-count">{products.filter(p => p.category === 'lighting').length}개</span>
                </div>
                <div className="cat-card" onClick={() => { setCatalogCat('데스크패드'); showPage('consumer-products'); }}>
                  <div className="cat-icon">🖱</div>
                  <span className="cat-name">데스크 패드</span>
                  <span className="cat-count">{products.filter(p => p.category === 'pad').length}개</span>
                </div>
                <div className="cat-card" onClick={() => { setCatalogCat('수납'); showPage('consumer-products'); }}>
                  <div className="cat-icon">📦</div>
                  <span className="cat-name">수납 & 정리</span>
                  <span className="cat-count">{products.filter(p => p.category === 'storage').length}개</span>
                </div>
                <div className="cat-card" onClick={() => { setCatalogCat('케이블'); showPage('consumer-products'); }}>
                  <div className="cat-icon">🔌</div>
                  <span className="cat-name">케이블 & 허브</span>
                  <span className="cat-count">{products.filter(p => p.category === 'cable').length}개</span>
                </div>
                <div className="cat-card" onClick={() => { setCatalogCat('데스크 인테리어'); showPage('consumer-products'); }}>
                  <div className="cat-icon">🌿</div>
                  <span className="cat-name">데스크 인테리어</span>
                  <span className="cat-count">{products.filter(p => p.category === 'plant' || p.category === 'interior').length}개</span>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Products */}
          <section className="featured-section">
            <div className="container">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 className="section-title" style={{ marginBottom: 0 }}>이 주의 주목할 기어</h2>
              </div>
              <div className="products-grid">
                {products.slice(0, 4).map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* -------------------- LOGIN VIEW -------------------- */}
      {activePage === 'consumer-login' && (
        <div id="consumer-login" className="page active" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '65vh', padding: '4rem 2rem' }}>
          <div className="login-card" style={{ boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid #E2E8F0' }}>
            <h2 className="page-title-sm" style={{ textAlign: 'center', marginBottom: '1.5rem', fontFamily: 'Syne, sans-serif' }}>DeskSet 로그인</h2>
            
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748B', marginBottom: '6px', display: 'block' }}>아이디</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="아이디를 입력하세요 (admin, company, user)" 
                  value={loginId} 
                  onChange={e => setLoginId(e.target.value)} 
                  required
                />
              </div>
              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#64748B', marginBottom: '6px', display: 'block' }}>비밀번호</label>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="비밀번호를 입력하세요" 
                  value={loginPw} 
                  onChange={e => setLoginPw(e.target.value)} 
                  required
                />
              </div>

              {loginError && (
                <div style={{ color: '#EF4444', fontSize: '13px', textAlign: 'center', fontWeight: 'bold', margin: '4px 0' }}>
                  {loginError}
                </div>
              )}

              <button type="submit" className="btn-buy full-width" style={{ marginTop: '0.5rem', padding: '12px' }}>로그인</button>
            </form>

            {/* SNS Logins Divider */}
            <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0 1rem', color: '#94A3B8', fontSize: '13px' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }}></div>
              <span style={{ padding: '0 10px', fontSize: '11px', fontWeight: 600 }}>간편 SNS 로그인</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }}></div>
            </div>

            {/* SNS Login Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Naver Button */}
              <button 
                type="button" 
                onClick={handleNaverLoginClick}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '10px', 
                  width: '100%', 
                  padding: '12px', 
                  borderRadius: '10px', 
                  border: 'none', 
                  background: '#03C75A', 
                  color: 'white', 
                  fontWeight: 600, 
                  fontSize: '13px', 
                  cursor: 'pointer',
                  transition: 'opacity 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = 0.9}
                onMouseOut={(e) => e.currentTarget.style.opacity = 1}
              >
                <span style={{ fontSize: '14px', fontWeight: 900 }}>N</span> 네이버로 로그인하기
              </button>

              {/* Kakao Button (Mocked) */}
              <button 
                type="button" 
                onClick={() => handleMockSnsLogin('Kakao')}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '10px', 
                  width: '100%', 
                  padding: '12px', 
                  borderRadius: '10px', 
                  border: 'none', 
                  background: '#FEE500', 
                  color: '#191919', 
                  fontWeight: 600, 
                  fontSize: '13px', 
                  cursor: 'pointer',
                  transition: 'opacity 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = 0.9}
                onMouseOut={(e) => e.currentTarget.style.opacity = 1}
              >
                <span style={{ fontSize: '14px' }}>💬</span> 카카오로 로그인하기
              </button>

              {/* Google Button (Mocked) */}
              <button 
                type="button" 
                onClick={() => handleMockSnsLogin('Google')}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '10px', 
                  width: '100%', 
                  padding: '12px', 
                  borderRadius: '10px', 
                  border: '1px solid #E2E8F0', 
                  background: 'white', 
                  color: '#475569', 
                  fontWeight: 600, 
                  fontSize: '13px', 
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" style={{ display: 'block' }}>
                  <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.68 1.54 14.98 1 12 1 7.35 1 3.37 3.65 1.4 7.56l3.85 2.99c.95-2.85 3.6-5.51 6.75-5.51z"/>
                  <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.7 2.87c2.16-2 3.72-4.94 3.72-8.69z"/>
                  <path fill="#FBBC05" d="M5.25 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29L1.4 7.02C.5 8.81 0 10.81 0 12.98s.5 4.17 1.4 5.96l3.85-2.99-.02.03z"/>
                  <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.7-2.87c-1.03.69-2.35 1.11-4.26 1.11-3.15 0-5.8-2.66-6.75-5.51l-3.85 2.99C3.37 20.35 7.35 23 12 23z"/>
                </svg>
                구글로 로그인하기
              </button>
            </div>

            {/* Hidden actual Naver SDK button trigger */}
            <div id="naverIdLogin" style={{ display: 'none' }}></div>
            
            <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '11px', color: '#94A3B8', lineHeight: 1.5, borderTop: '1px dashed #E2E8F0', paddingTop: '1rem' }}>
              프로토타입 계정 안내:<br />
              <strong>시스템 관리자</strong>: admin / admin &nbsp;&nbsp;|&nbsp;&nbsp; <strong>일반 사용자</strong>: user / user
            </div>
          </div>
        </div>
      )}

      {/* -------------------- 2. CONSUMER PRODUCTS LIST -------------------- */}
      {activePage === 'consumer-products' && (
        <div id="consumer-products" className="page active">
          <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
            <div className="filter-wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div className="filter-tabs" style={{ display: 'flex', gap: '8px' }}>
                {['전체', '키보드', '조명', '데스크패드', '수납', '케이블', '데스크 인테리어'].map(cat => (
                  <button 
                    key={cat} 
                    className={`filter-tab ${catalogCat === cat ? 'active' : ''}`}
                    onClick={() => setCatalogCat(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="sort-select-wrap">
                <select className="sort-select" value={catalogSort} onChange={e => setCatalogSort(e.target.value)}>
                  <option>인기순</option>
                  <option>낮은 가격순</option>
                  <option>높은 가격순</option>
                  <option>평점 높은 순</option>
                  <option>신상품순</option>
                </select>
              </div>
            </div>
            
            <div className="products-grid" id="all-products">
              {(() => {
                let list = [...products];
                if (catalogCat !== '전체') {
                  let mapped = '';
                  if (catalogCat === '키보드') mapped = 'keyboard';
                  else if (catalogCat === '조명') mapped = 'lighting';
                  else if (catalogCat === '데스크패드') mapped = 'pad';
                  else if (catalogCat === '수납') mapped = 'storage';
                  else if (catalogCat === '케이블') mapped = 'cable';
                  else if (catalogCat === '데스크 인테리어') mapped = 'plant';
                  list = list.filter(p => p.category === mapped);
                }
                
                if (catalogSort === '인기순') {
                  list.sort((a, b) => b.reviewCount - a.reviewCount);
                } else if (catalogSort === '낮은 가격순') {
                  list.sort((a, b) => a.price - b.price);
                } else if (catalogSort === '높은 가격순') {
                  list.sort((a, b) => b.price - a.price);
                } else if (catalogSort === '평점 높은 순') {
                  list.sort((a, b) => b.rating - a.rating);
                } else if (catalogSort === '신상품순') {
                  list.sort((a, b) => b.id - a.id);
                }

                if (list.length === 0) {
                  return <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem 0', color: '#94A3B8' }}>상품이 비어 있습니다.</div>;
                }

                return list.map(p => (
                  <ProductCard key={p.id} product={p} />
                ));
              })()}
            </div>
          </div>
        </div>
      )}

      {/* -------------------- 3. CONSUMER PRODUCT DETAIL -------------------- */}
      {activePage === 'consumer-product-detail' && (
        <div id="consumer-product-detail" className="page active">
          {(() => {
            const prod = products.find(p => p.id === currentProductId);
            if (!prod) return <div className="container">상품 오류</div>;

            const totalAmount = prod.price * detailQty;

            return (
              <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
                <span className="back-btn" onClick={goBack} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer', marginBottom: '1.5rem', color: '#64748B', fontSize: '14px', fontWeight: 500 }}>
                  ← 뒤로 가기
                </span>
                <div className="product-detail-grid">
                  {/* Left Column: Visuals */}
                  <div className="detail-visual">
                    <div className="detail-main-img-placeholder" id="detail-main-img" style={{ background: prod.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', borderRadius: '16px', height: '420px', marginBottom: '1rem' }}>
                      {prod.emoji}
                    </div>
                    <div className="thumbnails-row" id="thumbnails" style={{ display: 'flex', gap: '8px' }}>
                      <div className="thumb active" style={{ background: prod.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', width: '70px', height: '70px', borderRadius: '8px', cursor: 'pointer', border: '2px solid #0EA5E9' }}>{prod.emoji}</div>
                      <div className="thumb" style={{ background: '#334155', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', width: '70px', height: '70px', borderRadius: '8px', cursor: 'pointer' }}>📦</div>
                      <div className="thumb" style={{ background: '#0EA5E9', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', width: '70px', height: '70px', borderRadius: '8px', cursor: 'pointer' }}>✨</div>
                    </div>
                  </div>

                  {/* Right Column: Buying controls */}
                  <div className="detail-info">
                    <span className="detail-brand" id="detail-brand" style={{ fontSize: '14px', fontWeight: 600, color: '#0EA5E9', textTransform: 'uppercase', letterSpacing: '1px' }}>{prod.brand}</span>
                    <h1 className="detail-title" id="detail-title" style={{ fontSize: '2rem', fontWeight: 700, color: '#1E293B', margin: '0.5rem 0' }}>{prod.title}</h1>
                    <div className="detail-rating" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '1.5rem' }}>
                      <span className="stars" style={{ color: '#F59E0B' }}>
                        {'★'.repeat(Math.round(prod.rating))}
                        {'☆'.repeat(5 - Math.round(prod.rating))}
                      </span>
                      <span className="review-count" style={{ color: '#94A3B8', fontSize: '13px' }}>({prod.reviewCount}개 리뷰)</span>
                    </div>

                    <div className="detail-price-row" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                      <span className="detail-price" id="detail-price" style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1E293B' }}>₩{prod.price.toLocaleString()}</span>
                      {prod.discountPercent > 0 && (
                        <>
                          <span className="detail-original" id="detail-original" style={{ textDecoration: 'line-through', color: '#94A3B8' }}>₩{prod.originalPrice.toLocaleString()}</span>
                          <span className="discount-badge" style={{ background: '#EF4444', color: 'white', padding: '3px 8px', borderRadius: '50px', fontSize: '12px', fontWeight: 600 }}>-{prod.discountPercent}%</span>
                        </>
                      )}
                    </div>

                    {/* Colors */}
                    <div className="detail-option-group" style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', fontSize: '12px', color: '#64748B', fontWeight: 600, marginBottom: '6px' }}>색상 선택</label>
                      <div className="color-options" style={{ display: 'flex', gap: '8px' }}>
                        {prod.colors.map(col => (
                          <button 
                            key={col}
                            className={`color-opt ${selectedColor === col ? 'active' : ''}`}
                            style={{ background: col }}
                            onClick={() => setSelectedColor(col)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Sizes */}
                    <div className="detail-option-group" style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', fontSize: '12px', color: '#64748B', fontWeight: 600, marginBottom: '6px' }}>규격 / 사이즈</label>
                      <div className="size-options" style={{ display: 'flex', gap: '8px' }}>
                        {prod.sizes.map(sz => (
                          <button 
                            key={sz}
                            className={`size-opt ${selectedSize === sz ? 'active' : ''}`}
                            onClick={() => setSelectedSize(sz)}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="qty-price-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F1F5F9', borderBottom: '1px solid #F1F5F9', padding: '1rem 0', marginBottom: '1.5rem' }}>
                      <div className="qty-control">
                        <button className="qty-btn" onClick={() => changeQty(-1)}>−</button>
                        <span className="qty-num" id="qty-display">{detailQty}</span>
                        <button className="qty-btn" onClick={() => changeQty(1)}>+</button>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '12px', color: '#94A3B8' }}>총 금액</div>
                        <strong className="total-price" id="total-price" style={{ fontSize: '1.5rem', color: '#1E293B' }}>₩{totalAmount.toLocaleString()}</strong>
                      </div>
                    </div>

                    <div className="buy-btns-row" style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn-outline full-width" onClick={addToCart}>장바구니 담기</button>
                      <button className="btn-primary full-width" onClick={() => {
                        addToCart();
                        showPage('consumer-cart');
                      }}>바로 구매</button>
                    </div>
                  </div>
                </div>

                {/* Detailed Spec Tabs */}
                <div className="detail-tabs" style={{ marginTop: '4rem' }}>
                  <div className="tab-btns" style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', marginBottom: '1.5rem' }}>
                    <button className={`tab-btn ${activeTabDetail === 'desc' ? 'active' : ''}`} onClick={() => setActiveTabDetail('desc')}>상품 설명</button>
                    <button className={`tab-btn ${activeTabDetail === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTabDetail('reviews')}>소비자 리뷰 ({prod.reviewCount})</button>
                    <button className={`tab-btn ${activeTabDetail === 'qa' ? 'active' : ''}`} onClick={() => setActiveTabDetail('qa')}>Q&A 문의</button>
                  </div>
                  <div className="tab-panels">
                    <div className={`tab-panel ${activeTabDetail === 'desc' ? 'active' : ''}`} id="tab-desc">
                      <div className="tab-content-inner">
                        <h3>상품설명 및 가이드</h3>
                        <p>{prod.description}</p>
                      </div>
                    </div>
                    <div className={`tab-panel ${activeTabDetail === 'reviews' ? 'active' : ''}`} id="tab-reviews">
                      <h3>실제 구매자 평가</h3>
                      <div className="review-stat-summary" style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '12px', display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1E293B' }}>{prod.rating}</div>
                          <div style={{ color: '#F59E0B' }}>★★★★★</div>
                        </div>
                        <div style={{ flex: 1, fontSize: '13px', color: '#64748B', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <div>98%의 구매자가 이 제품을 추천합니다.</div>
                          <div style={{ color: '#94A3B8', marginTop: '4px' }}>단단한 알루미늄 마감과 훌륭한 타건 사운드로 극찬받고 있습니다.</div>
                        </div>
                      </div>
                    </div>
                    <div className={`tab-panel ${activeTabDetail === 'qa' ? 'active' : ''}`} id="tab-qa">
                      <h3>1:1 기술 문의</h3>
                      <p style={{ color: '#64748B' }}>상품의 결합 규격, 무선 주파수 호환성 등에 대한 답변을 1일 내에 드립니다.</p>
                      <button className="btn-outline sm" style={{ marginTop: '1rem' }} onClick={() => showPage('consumer-cs')}>문의 등록하러 가기 ➔</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* -------------------- 4. CONSUMER SHOPPING CART -------------------- */}
      {activePage === 'consumer-cart' && (
        <div id="consumer-cart" className="page active">
          <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
            <h1 className="page-title">장바구니</h1>
            
            <div className="cart-grid">
              {/* Left Column: Cart items checklist */}
              <div className="cart-left">
                <div className="cart-select-all" style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid #E2E8F0', marginBottom: '1rem' }}>
                  <label className="checkbox-label" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500 }}>
                    <input 
                      type="checkbox" 
                      checked={cart.length > 0 && cart.every(i => i.checked)}
                      onChange={e => toggleAll(e.target.checked)}
                    />
                    <span>전체 선택</span>
                  </label>
                  <button className="btn-outline sm" onClick={deleteSelected}>선택 삭제</button>
                </div>

                <div className="cart-list" id="cart-item-list">
                  {cart.length === 0 ? (
                    <div style={{ padding: '4rem 0', textAlign: 'center', color: '#94A3B8' }}>
                      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
                      장바구니가 텅 비어 있습니다.
                    </div>
                  ) : (
                    cart.map(item => {
                      const prod = products.find(p => p.id === item.productId);
                      if (!prod) return null;

                      return (
                        <div className="cart-item" key={item.id}>
                          <label className="checkbox-label" style={{ alignSelf: 'center' }}>
                            <input 
                              type="checkbox" 
                              checked={item.checked} 
                              onChange={e => toggleItemChecked(item.id, e.target.checked)}
                            />
                          </label>
                          <div className="cart-thumb" style={{ background: prod.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                            {prod.emoji}
                          </div>
                          <div className="cart-item-info">
                            <div className="cart-item-brand">{prod.brand}</div>
                            <div className="cart-item-name" onClick={() => openProductDetail(prod.id)} style={{ cursor: 'pointer' }}>{prod.title}</div>
                            <div className="cart-item-option">옵션: {getColorName(item.color)} / {item.size}</div>
                          </div>
                          <div className="cart-item-right">
                            <div className="cart-item-price">₩{(prod.price * item.quantity).toLocaleString()}</div>
                            <div className="cart-qty-control">
                              <button className="cart-qty-btn" onClick={() => changeCartItemQty(item.id, -1)}>−</button>
                              <span className="cart-qty-num">{item.quantity}</span>
                              <button className="cart-qty-btn" onClick={() => changeCartItemQty(item.id, 1)}>+</button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Right Column: Invoice summary box */}
              <div className="cart-right">
                <div className="summary-card" style={{ background: 'white', border: '1px solid #E2E8F0', padding: '1.5rem', borderRadius: '16px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E293B', marginBottom: '1.25rem' }}>결제 금액</h3>
                  
                  {(() => {
                    const checkedItems = cart.filter(i => i.checked);
                    let sub = 0;
                    let final = 0;
                    checkedItems.forEach(i => {
                      const p = products.find(prod => prod.id === i.productId);
                      if (p) {
                        sub += p.originalPrice * i.quantity;
                        final += p.price * i.quantity;
                      }
                    });
                    const discount = sub - final;

                    return (
                      <>
                        <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#64748B', marginBottom: '8px' }}>
                          <span>총 주문 금액</span>
                          <span id="sub-total">₩{sub.toLocaleString()}</span>
                        </div>
                        <div className="summary-row discount" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#EF4444', marginBottom: '8px' }}>
                          <span>쿠폰 세일 할인</span>
                          <span>-₩{discount.toLocaleString()}</span>
                        </div>
                        <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#64748B', marginBottom: '8px' }}>
                          <span>기본 배송비</span>
                          <span>₩0 (무료배송)</span>
                        </div>
                        <div className="summary-divider" style={{ borderTop: '1px solid #F1F5F9', margin: '1rem 0' }}></div>
                        <div className="summary-row total" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800, color: '#1E293B', marginBottom: '1.5rem' }}>
                          <span>최종 결제 금액</span>
                          <span id="final-total">₩{final.toLocaleString()}</span>
                        </div>

                        <button 
                          className="btn-buy full-width" 
                          disabled={checkedItems.length === 0}
                          onClick={() => {
                            setRecipient('');
                            setPhone('');
                            setAddress('');
                            showPage('consumer-order');
                          }}
                        >
                          주문하기 ({checkedItems.length}개)
                        </button>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- 5. CONSUMER ORDER CHECKOUT -------------------- */}
      {activePage === 'consumer-order' && (
        <div id="consumer-order" className="page active">
          <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
            <h1 className="page-title">주문 / 결제</h1>
            
            <div className="order-grid">
              {/* Left Column: Recipient info */}
              <div className="order-left">
                <div className="order-section-card" style={{ background: 'white', border: '1px solid #E2E8F0', padding: '1.5rem', borderRadius: '16px', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E293B', marginBottom: '1.25rem' }}>배송 정보 수령인</h3>
                  
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label style={{ margin: 0 }}>수령인 성명 *</label>
                      <button 
                        type="button" 
                        onClick={applyDefaultShipping} 
                        style={{ 
                          background: 'rgba(14, 165, 233, 0.08)', 
                          border: '1px solid rgba(14, 165, 233, 0.2)', 
                          color: '#0EA5E9', 
                          padding: '4px 10px', 
                          borderRadius: '50px', 
                          fontSize: '11px', 
                          fontWeight: 700, 
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        🏠 저장된 집
                      </button>
                    </div>
                    <input 
                      className="form-input" 
                      type="text" 
                      placeholder="이름을 기입하세요" 
                      value={recipient}
                      onChange={e => setRecipient(e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label>연락처 번호 *</label>
                    <input 
                      className="form-input" 
                      type="text" 
                      placeholder="010-0000-0000" 
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label>배송지 주소 *</label>
                    <input 
                      className="form-input" 
                      type="text" 
                      placeholder="도로명 또는 지번 주소" 
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>배송 메모</label>
                    <input 
                      className="form-input" 
                      type="text" 
                      value={shippingMemo}
                      onChange={e => setShippingMemo(e.target.value)}
                    />
                  </div>
                </div>

                <div className="order-section-card" style={{ background: 'white', border: '1px solid #E2E8F0', padding: '1.5rem', borderRadius: '16px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E293B', marginBottom: '1.25rem' }}>결제 수단 선택</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div style={{ border: '2px solid #0064FF', padding: '1rem', borderRadius: '12px', textAlign: 'center', cursor: 'pointer', background: 'rgba(0, 100, 255, 0.05)', fontWeight: 600, color: '#0064FF' }}>
                      토스페이 (간편인증)
                    </div>
                    <div style={{ border: '1px solid #E2E8F0', padding: '1rem', borderRadius: '12px', textAlign: 'center', cursor: 'not-allowed', color: '#94A3B8' }}>
                      신용카드 (점검중)
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Checkout item summary */}
              <div className="order-right">
                <div className="summary-card" style={{ background: 'white', border: '1px solid #E2E8F0', padding: '1.5rem', borderRadius: '16px', position: 'sticky', top: '100px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E293B', marginBottom: '1.25rem' }}>주문 예정 내역</h3>
                  
                  <div className="order-items-list" id="order-items" style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '250px', overflowY: 'auto', marginBottom: '1.5rem' }}>
                    {cart.filter(item => item.checked).map(item => {
                      const prod = products.find(p => p.id === item.productId);
                      if (!prod) return null;

                      return (
                        <div className="order-item" key={item.id}>
                          <div className="order-thumb-sm" style={{ background: prod.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', width: '40px', height: '40px', borderRadius: '6px' }}>
                            {prod.emoji}
                          </div>
                          <div className="order-item-name" style={{ flex: 1, fontSize: '13px', marginLeft: '10px' }}>
                            <strong>{prod.title}</strong><br />
                            <small style={{ color: '#94A3B8' }}>{getColorName(item.color)} · {item.size} · {item.quantity}개</small>
                          </div>
                          <div className="order-item-price" style={{ fontSize: '13px', fontWeight: 600 }}>₩{(prod.price * item.quantity).toLocaleString()}</div>
                        </div>
                      );
                    })}
                  </div>

                  {(() => {
                    const checkedItems = cart.filter(i => i.checked);
                    let sub = 0;
                    let final = 0;
                    checkedItems.forEach(i => {
                      const p = products.find(prod => prod.id === i.productId);
                      if (p) {
                        sub += p.originalPrice * i.quantity;
                        final += p.price * i.quantity;
                      }
                    });
                    const discount = sub - final;

                    return (
                      <>
                        <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748B', marginBottom: '6px' }}>
                          <span>총 주문 금액</span>
                          <span>₩{sub.toLocaleString()}</span>
                        </div>
                        <div className="summary-row discount" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#EF4444', marginBottom: '6px' }}>
                          <span>세일 동시적용 할인</span>
                          <span>-₩{discount.toLocaleString()}</span>
                        </div>
                        <div className="summary-divider" style={{ borderTop: '1px solid #F1F5F9', margin: '0.75rem 0' }}></div>
                        <div className="summary-row total" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 800, color: '#1E293B', marginBottom: '1.25rem' }}>
                          <span>최종 결제 예정액</span>
                          <span>₩{final.toLocaleString()}</span>
                        </div>

                        <button className="btn-toss full-width" onClick={() => simulatePayment(recipient, phone)}>
                          ₩{final.toLocaleString()} 토스페이로 안전결제
                        </button>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- 6. CONSUMER ORDER COMPLETE -------------------- */}
      {activePage === 'consumer-order-complete' && (
        <div id="consumer-order-complete" className="page active">
          <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'inline-flex', alignItems: 'center', justifyContents: 'center', width: '70px', height: '70px', borderRadius: '50%', fontSize: '2.5rem', marginBottom: '1.5rem', alignSelf: 'center', justifyContent: 'center' }}>✓</div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#1E293B', marginBottom: '0.5rem' }}>주문 결제가 완료되었습니다!</h1>
            <p style={{ color: '#64748B', fontSize: '15px', marginBottom: '2.5rem' }}>
              고객님의 소중한 데스크 가이가 안전하게 배송 발송 처리에 등록되었습니다.<br />
              주문 번호: <strong style={{ color: '#0EA5E9' }}>{modalContext.orderId}</strong>
            </p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button className="btn-outline" onClick={() => showPage('consumer-home')}>홈 쇼핑가기</button>
              <button className="btn-primary" onClick={() => showPage('consumer-mypage')}>마이페이지 주문목록</button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- 7. CONSUMER MY PAGE -------------------- */}
      {activePage === 'consumer-mypage' && (
        <div id="consumer-mypage" className="page active">
          <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
            {/* Header info */}
            <div className="mypage-user-card" style={{ background: '#1E293B', color: 'white', padding: '2rem', borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
              <div>
                <span style={{ fontSize: '13px', color: '#38BDF8', fontWeight: 600 }}>PREMIUM MEMBER</span>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '4px' }}>
                  {currentUser?.id === 'admin' ? '시스템 관리자님' : currentUser?.id === 'company' ? '입점 파트너님' : '김지현 고객님'}
                </h2>
                <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '6px' }}>
                  가입일: 2025.01.05 · 회원식별 ID: {currentUser?.id === 'admin' ? '#DS-ADMIN' : currentUser?.id === 'company' ? '#DS-COMPANY' : '#DS-58912'}
                </div>
                <button 
                  className="btn-outline sm" 
                  style={{ 
                    marginTop: '1rem', 
                    color: '#EF4444', 
                    borderColor: '#EF4444', 
                    background: 'rgba(239, 68, 68, 0.08)',
                    fontWeight: 'bold',
                    padding: '6px 16px',
                    borderRadius: '50px',
                    cursor: 'pointer'
                  }} 
                  onClick={logout}
                >
                  로그아웃
                </button>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <div className="stat-card" style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem 1.5rem', borderRadius: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>최근 주문</div>
                  <strong className="stat-num" style={{ fontSize: '1.5rem', fontWeight: 700 }}>{orders.length}건</strong>
                </div>
                <div className="stat-card" style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem 1.5rem', borderRadius: '16px', textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>가용 포인트</div>
                  <strong className="stat-num" style={{ fontSize: '1.5rem', fontWeight: 700, color: '#38BDF8' }}>3,500P</strong>
                </div>
              </div>
            </div>

            <h3 style={{ marginBottom: '1rem' }}>최근 주문 내역</h3>
            <div className="order-list">
              {orders.length === 0 ? (
                <div style={{ padding: '3rem 0', textAlign: 'center', color: '#94A3B8' }}>최근 주문 내역이 없습니다.</div>
              ) : (
                orders.map(order => {
                  const first = order.items[0];
                  const others = order.items.length - 1;
                  const dispName = others > 0 ? `${first.title} 외 ${others}개` : first.title;

                  const steps = ['결제완료', '배송준비', '배송중', '배송완료'];
                  const activeIdx = steps.indexOf(order.shippingStatus);

                  return (
                    <div className="order-row" key={order.orderId}>
                      <div className="order-row-left">
                        <div className="order-thumb" style={{ background: first.bg || '#334155', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                          {first.emoji || '📦'}
                        </div>
                        <div>
                          <div className="order-product-name">{dispName}</div>
                          <div className="order-date">{order.date} · #{order.orderId}</div>
                        </div>
                      </div>
                      <div className="order-row-right">
                        <div className="order-status-bar">
                          {steps.map((st, idx) => {
                            let cls = 'status-step';
                            if (idx < activeIdx) cls += ' done';
                            else if (idx === activeIdx) cls += ' active';
                            return <div key={st} className={cls}>{st}</div>;
                          })}
                        </div>
                        {order.shippingStatus === '배송완료' ? (
                          <button className="btn-primary sm" onClick={() => showReviewForm(order.orderId)}>리뷰 작성</button>
                        ) : (
                          <button className="btn-outline sm" onClick={() => showTrackingModal(order.orderId)}>배송 추적</button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* -------------------- 8. CONSUMER CUSTOMER SERVICE (CS) -------------------- */}
      {activePage === 'consumer-cs' && (
        <div id="consumer-cs" className="page active">
          <div className="container" style={{ paddingTop: '3rem', paddingBottom: '5rem' }}>
            <h1 className="page-title">고객센터</h1>
            
            <div className="cs-layout" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2rem' }}>
              {/* CS Sidebar */}
              <div className="cs-sidebar">
                <button className={`cs-tab ${activeTabCs === 'notice' ? 'active' : ''}`} onClick={() => setActiveTabCs('notice')}>공지사항</button>
                <button className={`cs-tab ${activeTabCs === 'faq' ? 'active' : ''}`} onClick={() => setActiveTabCs('faq')}>자주 묻는 질문</button>
                <button className={`cs-tab ${activeTabCs === 'inquiry' ? 'active' : ''}`} onClick={() => setActiveTabCs('inquiry')}>1:1 개인 문의</button>
              </div>

              {/* CS Content */}
              <div className="cs-content" style={{ background: 'white', border: '1px solid #E2E8F0', padding: '2rem', borderRadius: '20px' }}>
                
                {/* 8-A. Notice Panel */}
                {activeTabCs === 'notice' && (
                  <div className="cs-panel active" id="cs-notice">
                    <h3 style={{ marginBottom: '1.5rem' }}>플랫폼 공지사항</h3>
                    <div className="notice-list">
                      {notices.map(n => (
                        <div key={n.id} className={`notice-item ${n.pinned ? 'pinned' : ''}`} style={{ borderBottom: '1px solid #F1F5F9', padding: '12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {n.pinned ? <span className="pin-badge">공지</span> : n.newPost ? <span className="pin-badge new">NEW</span> : null}
                            <span style={{ fontWeight: 500, color: '#1E293B' }}>{n.title}</span>
                          </div>
                          <span style={{ fontSize: '12px', color: '#94A3B8' }}>{n.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 8-B. FAQ Panel */}
                {activeTabCs === 'faq' && (
                  <div className="cs-panel active" id="cs-faq">
                    <h3 style={{ marginBottom: '1.5rem' }}>자주 묻는 질문</h3>
                    <div className="faq-list">
                      {faqs.map(faq => (
                        <div key={faq.id} className={`faq-item ${activeFaq === faq.id ? 'open' : ''}`} style={{ borderBottom: '1px solid #F1F5F9' }}>
                          <div className="faq-q" style={{ padding: '16px 0', fontWeight: 600, display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => setActiveFaq(prev => prev === faq.id ? null : faq.id)}>
                            {faq.q} <span className="faq-arrow">{activeFaq === faq.id ? '▲' : '▼'}</span>
                          </div>
                          {activeFaq === faq.id && (
                            <div className="faq-a" style={{ background: '#F8FAFC', padding: '1.25rem', borderRadius: '8px', fontSize: '13px', lineHeight: 1.6, color: '#64748B', marginBottom: '1rem' }}>
                              {faq.a}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 8-C. 1:1 Inquiry Form */}
                {activeTabCs === 'inquiry' && (
                  <div className="cs-panel active" id="cs-inquiry">
                    <h3 style={{ marginBottom: '1.5rem' }}>1:1 신규 개인 문의</h3>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                      <label>문의 유형</label>
                      <select className="form-input" value={inqType} onChange={e => setInqType(e.target.value)}>
                        <option>배송</option>
                        <option>상품</option>
                        <option>반품/환불</option>
                        <option>기타</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                      <label>문의 제목</label>
                      <input className="form-input" type="text" placeholder="제목을 기입하세요" value={inqTitle} onChange={e => setInqTitle(e.target.value)} />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                      <label>상세 내용</label>
                      <textarea className="form-input" rows="5" placeholder="문의하실 구체적인 내용을 기입하세요..." value={inqContent} onChange={e => setInqContent(e.target.value)}></textarea>
                    </div>
                    <button className="btn-primary" onClick={() => {
                      const ok = addInquiry(inqType, inqTitle, inqContent);
                      if (ok) {
                        setInqTitle('');
                        setInqContent('');
                        setActiveTabCs('notice'); // Redirect
                      }
                    }}>문의글 비공개 등록</button>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- 9. CONSUMER SEARCH PAGE -------------------- */}
      {activePage === 'consumer-search' && (
        <div id="consumer-search" className="page active">
          <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
            <div className="search-bar-wrap" style={{ position: 'relative', marginBottom: '1.5rem' }}>
              <input 
                type="text" 
                className="search-input" 
                placeholder="찾고 계신 데스크 가이나 액세서리를 검색해보세요..." 
                style={{ width: '100%', padding: '14px 20px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '15px' }}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="search-tags" style={{ display: 'flex', gap: '6px', marginBottom: '3rem' }}>
              {['키보드', '데스크패드', 'LED 조명', '알루미늄', '수납 트레이'].map(tag => (
                <span 
                  key={tag} 
                  className="tag" 
                  style={{ background: '#F1F5F9', padding: '6px 12px', borderRadius: '50px', fontSize: '12px', color: '#475569', cursor: 'pointer', fontWeight: 500 }}
                  onClick={() => setSearchQuery(tag)}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="products-grid" id="search-results">
              {(() => {
                const query = searchQuery.trim().toLowerCase();
                if (!query) {
                  return <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#94A3B8', padding: '4rem 0' }}>검색어를 실시간 기입해 주세요.</div>;
                }

                const res = products.filter(p => 
                  p.title.toLowerCase().includes(query) ||
                  p.brand.toLowerCase().includes(query) ||
                  p.description.toLowerCase().includes(query)
                );

                if (res.length === 0) {
                  return <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#94A3B8', padding: '4rem 0' }}>'{searchQuery}'에 대한 검색 결과가 없습니다.</div>;
                }

                return res.map(p => (
                  <ProductCard key={p.id} product={p} />
                ));
              })()}
            </div>
          </div>
        </div>
      )}

      {/* CONSUMER FOOTER */}
      <footer className="footer" style={{ background: '#1E293B', color: '#94A3B8', borderTop: '1px solid #334155', padding: '4rem 0' }}>
        <div className="container footer-inner" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div className="logo" style={{ color: 'white', marginBottom: '1rem' }}>DeskSet <span>데스크테리어 전문</span></div>
            <p style={{ fontSize: '13px', lineHeight: 1.6, maxWidth: '320px' }}>나만의 완벽한 몰입을 선사하는 감성 테크 데스크셋 브랜드 공식 몰입니다.</p>
          </div>
          <div style={{ display: 'flex', gap: '4rem', fontSize: '13px' }}>
            <div>
              <h4 style={{ color: 'white', marginBottom: '1rem', fontWeight: 600 }}>쇼핑 가이드</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>자주 묻는 질문</li>
                <li>배송지 조율 규정</li>
                <li>반품 및 교환 요건</li>
              </ul>
            </div>
            <div>
              <h4 style={{ color: 'white', marginBottom: '1rem', fontWeight: 600 }}>파트너십</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>입점 파트너 가입 신청</li>
                <li>기업 B2B 특판 가이드</li>
                <li>전자세금계산서 요청</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container" style={{ borderTop: '1px solid #334155', marginTop: '3rem', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
          <span>© 2026 DeskSet Inc. All rights reserved.</span>
          <span>개인정보처리방침 · 이용약관</span>
        </div>
      </footer>
    </div>
  );
};

export default ConsumerView;
