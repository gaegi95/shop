import React, { useContext, useState } from 'react';
import { DeskSetContext } from '../context/DeskSetContext';
import NeonChart from '../components/ui/NeonChart';

const AdminView = () => {
  const {
    products,
    orders,
    inquiries,
    notices,
    faqs,
    adminPage,
    showAdminPage,
    switchRole,
    answerInquiry,
    editFaq,
    deleteFaq,
    addFaq,
    addNotice,
    showToast,
    logout,
    currentUser,
    setCurrentUser
  } = useContext(DeskSetContext);

  const [adminId, setAdminId] = useState('');
  const [adminPw, setAdminPw] = useState('');

  const handleAdminLoginSubmit = (e) => {
    e.preventDefault();
    if (adminId === 'admin' && adminPw === 'admin') {
      setCurrentUser({ id: 'admin', role: 'admin' });
      setAdminId('');
      setAdminPw('');
      showAdminPage('admin-dashboard');
      showToast("최상위 관리자 로그인에 성공했습니다.");
    } else {
      if (adminId === 'company' || adminId === 'user') {
        showToast("관리자 전용 로그인 페이지입니다. 관리자 계정으로 로그인해 주세요.");
      } else {
        showToast("아이디 또는 비밀번호를 다시 확인하세요.");
      }
    }
  };



  // Local States for Member Management
  const [members, setMembers] = useState([
    { id: 1, name: '김지현', email: 'jihyun@gmail.com', points: '3,500P', status: '정상' },
    { id: 2, name: '이민호', email: 'minho@naver.com', points: '12,000P', status: '정상' },
    { id: 3, name: '박서연', email: 'seoyeon@kakao.com', points: '800P', status: '정지' }
  ]);

  // Local States for Seller Applications
  const [sellerApps, setSellerApps] = useState([
    { index: 1, brand: '레드게이트', category: '기계식 키보드', date: '2025.01.21', status: '대기' },
    { index: 2, brand: '우드웍스', category: '원목 오거나이저', date: '2025.01.20', status: '대기' }
  ]);

  // Local States for Reported Contents
  const [reportedContents, setReportedContents] = useState([
    { index: 1, type: '리뷰', preview: '부적절한 언어 포함된 리뷰...', count: 12, author: '익명', status: '정상' },
    { index: 2, type: '상품', preview: '허위 스펙 표기 의심 상품...', count: 5, author: '블루스퀘어', status: '정상' },
    { index: 3, type: '리뷰', preview: '스팸성 반복 내용 의심 리뷰...', count: 3, author: '익명', status: '정상' }
  ]);

  // CS inputs
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticePinned, setNoticePinned] = useState(false);

  const [faqQ, setFaqQ] = useState('');
  const [faqA, setFaqA] = useState('');

  const [inquiryReplies, setInquiryReplies] = useState({});

  if (adminPage === 'admin-login') {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'radial-gradient(circle at top, #1e1e38 0%, #09090b 100%)',
        color: '#f4f4f5',
        fontFamily: "'Inter', sans-serif",
        padding: '1.5rem',
        boxSizing: 'border-box'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '440px',
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          borderRadius: '24px',
          padding: '2.5rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 50px rgba(139, 92, 246, 0.15)',
          textAlign: 'center',
          boxSizing: 'border-box'
        }}>
          <div style={{ marginBottom: '2rem' }}>
            <span style={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
              padding: '8px 16px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '1px',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
            }}>SYSTEM PORTAL</span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '1rem', color: '#ffffff', letterSpacing: '-0.5px' }}>
              DeskSet Admin
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '0.5rem' }}>
              최상위 통합 관리 서비스 로그인
            </p>
          </div>

          <form onSubmit={handleAdminLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ textAlign: 'left' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: '6px' }}>SYSTEM ID</label>
              <input 
                type="text" 
                placeholder="관리자 아이디를 입력하세요" 
                value={adminId}
                onChange={e => setAdminId(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(2, 6, 23, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ textAlign: 'left' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', display: 'block', marginBottom: '6px' }}>SECRET PASSWORD</label>
              <input 
                type="password" 
                placeholder="비밀번호를 입력하세요" 
                value={adminPw}
                onChange={e => setAdminPw(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(2, 6, 23, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <button 
              type="submit" 
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                padding: '14px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
                transition: 'all 0.2s',
                marginTop: '0.5rem'
              }}
            >
              시스템 관리자 로그인
            </button>
          </form>

          <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.5rem' }}>
            <button 
              onClick={() => switchRole('consumer')}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'color 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              ← DeskSet 메인페이지로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  const toggleMemberStatus = (id) => {
    setMembers(prev => prev.map(m => {
      if (m.id === id) {
        const nextStatus = m.status === '정상' ? '정지' : '정상';
        showToast(`${m.name} 회원의 권한이 [${nextStatus}] 상태로 업데이트되었습니다.`);
        return { ...m, status: nextStatus };
      }
      return m;
    }));
  };

  const approveSeller = (index, brand) => {
    setSellerApps(prev => prev.map(s => s.index === index ? { ...s, status: '승인됨' } : s));
    showToast(`[${brand}]의 입점 신청을 최종 승인하였습니다.`);
  };

  const rejectSeller = (index, brand) => {
    setSellerApps(prev => prev.map(s => s.index === index ? { ...s, status: '반려됨' } : s));
    showToast(`[${brand}]의 입점 신청서 반려가 정상 등록되었습니다.`);
  };

  const blindContent = (index) => {
    setReportedContents(prev => prev.map(r => r.index === index ? { ...r, status: '블라인드' } : r));
    showToast("해당 신고 대상 콘텐츠가 블라인드 처리되었습니다.");
  };

  const approveContent = (index) => {
    setReportedContents(prev => prev.map(r => r.index === index ? { ...r, status: '정상승인' } : r));
    showToast("신고 무혐의로 해당 콘텐츠 노출을 승인하였습니다.");
  };

  const handleInquiryReplyChange = (id, text) => {
    setInquiryReplies(prev => ({ ...prev, [id]: text }));
  };

  const handleNoticeSubmit = () => {
    if (!noticeTitle.trim() || !noticeContent.trim()) {
      showToast("공지사항 제목과 내용을 입력하세요.");
      return;
    }
    addNotice(noticeTitle, noticeContent, noticePinned);
    setNoticeTitle('');
    setNoticeContent('');
    setNoticePinned(false);
  };

  const handleFaqSubmit = () => {
    if (!faqQ.trim() || !faqA.trim()) {
      showToast("FAQ 질문과 답변을 입력하세요.");
      return;
    }
    addFaq(faqQ, faqA);
    setFaqQ('');
    setFaqA('');
  };

  return (
    <div id="view-admin" className="view active" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: '100vh' }}>
      
      {/* ADMIN SIDEBAR */}
      <aside className="sidebar" style={{ background: '#0F172A', color: 'white', borderRight: '1px solid #1E293B' }}>
        <div className="sidebar-logo" style={{ padding: '2rem 1.5rem', borderBottom: '1px solid #1E293B', fontSize: '18px', fontWeight: 800 }}>
          DeskSet <span style={{ color: '#8B5CF6', fontSize: '12px', display: 'block', fontWeight: 500 }}>최상위 관리 컨트롤러</span>
        </div>
        <nav className="sidebar-menu" style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '1rem' }}>
          <button 
            className={`menu-item ${adminPage === 'admin-dashboard' ? 'active' : ''}`}
            onClick={() => showAdminPage('admin-dashboard')}
          >
            📈 모니터링
          </button>
          <button 
            className={`menu-item ${adminPage === 'admin-members' ? 'active' : ''}`}
            onClick={() => showAdminPage('admin-members')}
          >
            👥 회원 관리
          </button>
          <button 
            className={`menu-item ${adminPage === 'admin-sellers' ? 'active' : ''}`}
            onClick={() => showAdminPage('admin-sellers')}
          >
            🏪 입점사 관리
          </button>
          <button 
            className={`menu-item ${adminPage === 'admin-reports' ? 'active' : ''}`}
            onClick={() => showAdminPage('admin-reports')}
          >
            ⚠️ 신고 관리
          </button>
          <button 
            className={`menu-item ${adminPage === 'admin-cs' ? 'active' : ''}`}
            onClick={() => showAdminPage('admin-cs')}
          >
            💬 CS / 공지
          </button>
        </nav>
        <div style={{ marginTop: 'auto', padding: '1.5rem', borderTop: '1px solid #1E293B', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
          <div style={{ background: '#8B5CF6', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>AD</div>
          <div>
            <strong>시스템 관리자</strong>
            <span style={{ display: 'block', fontSize: '10px', color: '#64748B' }}>ADMIN</span>
          </div>
        </div>
      </aside>

      {/* ADMIN MAIN CONTENT */}
      <main className="main-content" style={{ background: '#F8FAFC', padding: '2.5rem' }}>
        
        {/* TOP NAV BREADCRUMB */}
        <div className="main-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1E293B' }}>
            {adminPage === 'admin-dashboard' && '종합 운영 모니터링'}
            {adminPage === 'admin-members' && '플랫폼 등록 회원 제어'}
            {adminPage === 'admin-sellers' && '신규 입점 심사 본부'}
            {adminPage === 'admin-reports' && '신고 콘텐츠 블라인드 센터'}
            {adminPage === 'admin-cs' && '공지사항 & FAQ 관리 에디터'}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className="btn-outline sm" style={{ color: '#8B5CF6', borderColor: '#8B5CF6', padding: '6px 16px', borderRadius: '50px', fontWeight: 600 }} onClick={() => switchRole('consumer')}>메인</button>
            <button className="btn-primary sm" disabled style={{ padding: '6px 16px', borderRadius: '50px', fontWeight: 600, background: '#8B5CF6', borderColor: '#8B5CF6', opacity: 0.85 }}>관리자</button>
            <button className="btn-outline sm" style={{ color: '#EF4444', borderColor: '#EF4444', padding: '6px 16px', borderRadius: '50px', fontWeight: 600 }} onClick={logout}>로그아웃</button>
          </div>
        </div>

        {/* -------------------- 7-A. ADMIN DASHBOARD VIEW -------------------- */}
        {adminPage === 'admin-dashboard' && (
          <div className="admin-page-view">
            {/* KPI Cards */}
            <div className="kpi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
              <div className="kpi-card" style={{ background: 'white', border: '1px solid #E2E8F0', padding: '1.5rem', borderRadius: '16px' }}>
                <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>총 가입 회원수</span>
                <strong style={{ fontSize: '1.75rem', fontWeight: 800, display: 'block', margin: '4px 0', color: '#1E293B' }}>48,152명</strong>
                <span style={{ fontSize: '11px', color: '#10B981' }}>+34명 오늘 신규</span>
              </div>
              <div className="kpi-card" style={{ background: 'white', border: '1px solid #E2E8F0', padding: '1.5rem', borderRadius: '16px' }}>
                <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>7일 플랫폼 총 거래대금</span>
                <strong style={{ fontSize: '1.75rem', fontWeight: 800, display: 'block', margin: '4px 0', color: '#8B5CF6' }}>₩1,489M</strong>
                <span style={{ fontSize: '11px', color: '#10B981' }}>목표 달성률 112%</span>
              </div>
              <div className="kpi-card" style={{ background: 'white', border: '1px solid #E2E8F0', padding: '1.5rem', borderRadius: '16px' }}>
                <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>입점 대기 파트너</span>
                <strong style={{ fontSize: '1.75rem', fontWeight: 800, display: 'block', margin: '4px 0', color: '#F59E0B' }}>
                  {sellerApps.filter(s => s.status === '대기').length}개사
                </strong>
                <span style={{ fontSize: '11px', color: '#64748B' }}>즉시 검토 요망</span>
              </div>
              <div className="kpi-card" style={{ background: 'white', border: '1px solid #E2E8F0', padding: '1.5rem', borderRadius: '16px' }}>
                <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>누적 미처리 신고건</span>
                <strong style={{ fontSize: '1.75rem', fontWeight: 800, display: 'block', margin: '4px 0', color: '#EF4444' }}>
                  {reportedContents.filter(r => r.status === '정상').length}건
                </strong>
                <span style={{ fontSize: '11px', color: '#EF4444' }}>유통 질서 위배 의심</span>
              </div>
            </div>

            {/* Neon Chart Section */}
            <div className="chart-card" style={{ background: 'white', border: '1px solid #E2E8F0', padding: '2rem', borderRadius: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1E293B' }}>7일간 플랫폼 통합 거래 추이</h3>
                  <span style={{ fontSize: '12px', color: '#94A3B8' }}>소비자 결제 완료 대금 합산 모니터링</span>
                </div>
                <div style={{ fontSize: '12px', color: '#8B5CF6', background: '#F1F5F9', padding: '4px 12px', borderRadius: '50px' }}>
                  Live 데이터
                </div>
              </div>
              <div style={{ height: '280px', position: 'relative' }}>
                <NeonChart 
                  data={[450, 680, 520, 890, 1100, 1250, 1489]} 
                  labels={['5/21', '5/22', '5/23', '5/24', '5/25', '5/26', '5/27']} 
                  theme="purple" 
                  maxVal={1600}
                  unit="M"
                />
              </div>
            </div>
          </div>
        )}

        {/* -------------------- 7-B. ADMIN MEMBERS VIEW -------------------- */}
        {adminPage === 'admin-members' && (
          <div className="admin-page-view">
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1E293B', marginBottom: '1.5rem' }}>전체 활성 회원 권한 제어</h3>
            
            <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontWeight: 600 }}>
                  <tr>
                    <th style={{ padding: '12px 16px' }}>회원 식별 ID</th>
                    <th style={{ padding: '12px 16px' }}>회원명</th>
                    <th style={{ padding: '12px 16px' }}>이메일</th>
                    <th style={{ padding: '12px 16px' }}>가용 보너스 포인트</th>
                    <th style={{ padding: '12px 16px' }}>현재 등급</th>
                    <th style={{ padding: '12px 16px' }}>서비스 권한</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map(m => (
                    <tr key={m.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '16px', fontWeight: 'bold' }}>#DS-8941{m.id}</td>
                      <td style={{ padding: '16px', fontWeight: 600 }}>{m.name}</td>
                      <td style={{ padding: '16px', color: '#64748B' }}>{m.email}</td>
                      <td style={{ padding: '16px', color: '#0EA5E9', fontWeight: 'bold' }}>{m.points}</td>
                      <td style={{ padding: '16px' }}>
                        <span style={{ background: '#F1F5F9', color: '#475569', padding: '3px 8px', borderRadius: '50px', fontSize: '11px', fontWeight: 600 }}>PREMIUM</span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <button 
                          className={`btn-outline sm ${m.status === '정지' ? 'active' : ''}`}
                          style={{
                            borderColor: m.status === '정지' ? '#EF4444' : '#10B981',
                            color: m.status === '정지' ? '#EF4444' : '#10B981',
                            minWidth: '60px'
                          }}
                          onClick={() => toggleMemberStatus(m.id)}
                        >
                          {m.status === '정지' ? '이용정지' : '정상'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* -------------------- 7-C. ADMIN SELLERS VIEW -------------------- */}
        {adminPage === 'admin-sellers' && (
          <div className="admin-page-view">
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1E293B', marginBottom: '1.5rem' }}>입점 신청 파트너 최종 심사 테이블</h3>
            
            <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontWeight: 600 }}>
                  <tr>
                    <th style={{ padding: '12px 16px' }}>브랜드명</th>
                    <th style={{ padding: '12px 16px' }}>주력 분야</th>
                    <th style={{ padding: '12px 16px' }}>신청 일자</th>
                    <th style={{ padding: '12px 16px' }}>현재 상태</th>
                    <th style={{ padding: '12px 16px' }}>심사 동작</th>
                  </tr>
                </thead>
                <tbody>
                  {sellerApps.map(s => (
                    <tr key={s.index} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '16px', fontWeight: 600 }}>{s.brand}</td>
                      <td style={{ padding: '16px', color: '#475569' }}>{s.category}</td>
                      <td style={{ padding: '16px', color: '#94A3B8' }}>{s.date}</td>
                      <td style={{ padding: '16px' }}>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '50px',
                          fontSize: '11px',
                          fontWeight: 600,
                          color: s.status === '승인됨' ? '#10B981' : s.status === '반려됨' ? '#EF4444' : '#F59E0B',
                          background: s.status === '승인됨' ? 'rgba(16, 185, 129, 0.1)' : s.status === '반려됨' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)'
                        }}>
                          {s.status}
                        </span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        {s.status === '대기' ? (
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <button className="btn-primary sm" onClick={() => approveSeller(s.index, s.brand)}>승인</button>
                            <button className="btn-outline sm" style={{ color: '#EF4444', borderColor: '#EF4444' }} onClick={() => rejectSeller(s.index, s.brand)}>반려</button>
                          </div>
                        ) : (
                          <span style={{ color: '#94A3B8', fontSize: '12px' }}>심사 종결</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* -------------------- 7-D. ADMIN REPORTS VIEW -------------------- */}
        {adminPage === 'admin-reports' && (
          <div className="admin-page-view">
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1E293B', marginBottom: '1.5rem' }}>유해 정보 및 악성 신고 블라인드 관리</h3>
            
            <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontWeight: 600 }}>
                  <tr>
                    <th style={{ padding: '12px 16px' }}>유형</th>
                    <th style={{ padding: '12px 16px' }}>내용 요약</th>
                    <th style={{ padding: '12px 16px' }}>신고 접수</th>
                    <th style={{ padding: '12px 16px' }}>작성 주체</th>
                    <th style={{ padding: '12px 16px' }}>동작</th>
                  </tr>
                </thead>
                <tbody>
                  {reportedContents.map(r => (
                    <tr key={r.index} style={{ borderBottom: '1px solid #F1F5F9', opacity: r.status === '블라인드' ? 0.45 : 1 }}>
                      <td style={{ padding: '16px' }}>
                        <span style={{ background: r.type === '리뷰' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)', color: r.type === '리뷰' ? '#EF4444' : '#F59E0B', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>{r.type}</span>
                      </td>
                      <td style={{ padding: '16px', fontWeight: 500 }}>{r.preview}</td>
                      <td style={{ padding: '16px', color: '#EF4444', fontWeight: 'bold' }}>{r.count}회</td>
                      <td style={{ padding: '16px', color: '#64748B' }}>{r.author}</td>
                      <td style={{ padding: '16px' }}>
                        {r.status === '정상' ? (
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <button className="btn-outline sm" style={{ color: '#EF4444', borderColor: '#EF4444' }} onClick={() => blindContent(r.index)}>블라인드</button>
                            <button className="btn-outline sm" onClick={() => approveContent(r.index)}>정상승인</button>
                          </div>
                        ) : (
                          <span style={{ color: r.status === '블라인드' ? '#EF4444' : '#10B981', fontWeight: 600 }}>{r.status} 완료</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* -------------------- 7-E. ADMIN CS & NOTICE VIEW -------------------- */}
        {adminPage === 'admin-cs' && (
          <div className="admin-page-view" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            
            {/* Left Box: CS Inquiry replies list */}
            <div style={{ background: 'white', border: '1px solid #E2E8F0', padding: '1.5rem', borderRadius: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E293B', marginBottom: '1.25rem' }}>1:1 미답변 실시간 접수 문의</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxHeight: '420px', overflowY: 'auto' }}>
                {inquiries.map(inq => {
                  const replyText = inquiryReplies[inq.id] || '';

                  return (
                    <div key={inq.id} style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '11px', color: '#0EA5E9', fontWeight: 'bold' }}>[{inq.type}] {inq.date}</span>
                        <span style={{
                          fontSize: '10px',
                          fontWeight: 'bold',
                          color: inq.status === '답변완료' ? '#10B981' : '#F59E0B'
                        }}>{inq.status}</span>
                      </div>
                      <h4 style={{ fontSize: '14px', color: '#1E293B' }}>{inq.title}</h4>
                      <p style={{ fontSize: '12px', color: '#64748B', margin: '4px 0' }}>{inq.content}</p>
                      
                      {inq.status === '답변대기' ? (
                        <div style={{ marginTop: '8px', display: 'flex', gap: '4px' }}>
                          <input 
                            className="form-input sm" 
                            type="text" 
                            placeholder="답변 내용을 작성해 주세요..." 
                            style={{ flex: 1, padding: '4px', fontSize: '11px' }}
                            value={replyText}
                            onChange={e => handleInquiryReplyChange(inq.id, e.target.value)}
                          />
                          <button className="btn-primary sm" style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => {
                            answerInquiry(inq.id, replyText);
                            handleInquiryReplyChange(inq.id, '');
                          }}>등록</button>
                        </div>
                      ) : (
                        <div style={{ background: '#F8FAFC', padding: '8px', borderRadius: '6px', fontSize: '11px', color: '#475569', marginTop: '6px' }}>
                          <strong>A:</strong> {inq.response}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Box: Notice and FAQ CRUD Forms */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Notice creation */}
              <div style={{ background: 'white', border: '1px solid #E2E8F0', padding: '1.5rem', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E293B', marginBottom: '1rem' }}>공지사항 신규 발행</h3>
                <div className="form-group" style={{ marginBottom: '10px' }}>
                  <input className="form-input sm" type="text" placeholder="공지사항 제목" value={noticeTitle} onChange={e => setNoticeTitle(e.target.value)} />
                </div>
                <div className="form-group" style={{ marginBottom: '10px' }}>
                  <textarea className="form-input sm" rows="3" placeholder="공지 세부 본문 내용을 기입하세요..." value={noticeContent} onChange={e => setNoticeContent(e.target.value)}></textarea>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="checkbox-label" style={{ fontSize: '12px' }}>
                    <input type="checkbox" checked={noticePinned} onChange={e => setNoticePinned(e.target.checked)} /> Pinned 고정 공지 등록
                  </label>
                  <button className="btn-primary sm" onClick={handleNoticeSubmit}>발행 완료</button>
                </div>
              </div>

              {/* FAQ creation */}
              <div style={{ background: 'white', border: '1px solid #E2E8F0', padding: '1.5rem', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E293B', marginBottom: '1rem' }}>FAQ 자주 묻는 질문 추가</h3>
                <div className="form-group" style={{ marginBottom: '10px' }}>
                  <input className="form-input sm" type="text" placeholder="Q: 자주 묻는 질문 제목" value={faqQ} onChange={e => setFaqQ(e.target.value)} />
                </div>
                <div className="form-group" style={{ marginBottom: '10px' }}>
                  <textarea className="form-input sm" rows="3" placeholder="A: 상세 답변 가이드를 작성하세요..." value={faqA} onChange={e => setFaqA(e.target.value)}></textarea>
                </div>
                <button className="btn-primary sm full-width" onClick={handleFaqSubmit}>FAQ 리스트 등록</button>
              </div>

            </div>

          </div>
        )}

      </main>
    </div>
  );
};

export default AdminView;
