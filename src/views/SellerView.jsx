import React, { useContext, useState } from 'react';
import { DeskSetContext } from '../context/DeskSetContext';
import NeonChart from '../components/ui/NeonChart';

const SellerView = () => {
  const {
    products,
    orders,
    sellerPage,
    showSellerPage,
    switchRole,
    setActiveModal,
    adjustStock,
    removeProduct,
    submitOrderTracking,
    showToast,
    logout
  } = useContext(DeskSetContext);

  const [couriers, setCouriers] = useState({});
  const [trackingNos, setTrackingNos] = useState({});

  const handleCourierChange = (orderId, val) => {
    setCouriers(prev => ({ ...prev, [orderId]: val }));
  };

  const handleTrackingChange = (orderId, val) => {
    setTrackingNos(prev => ({ ...prev, [orderId]: val }));
  };

  // Helper to filter products created by the Bluesquare/Grovemade mock seller
  const sellerProducts = products.filter(p => p.brand === 'DeskSet' || p.brand === 'Bluesquare');

  // Compute stats
  const totalSales = orders.reduce((sum, o) => {
    return sum + o.items.reduce((iSum, i) => iSum + (i.price * i.quantity), 0);
  }, 0);

  const pendingOrders = orders.filter(o => o.shippingStatus === '결제완료');

  return (
    <div id="view-seller" className="view active" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: '100vh' }}>
      
      {/* SELLER SIDEBAR */}
      <aside className="sidebar" style={{ background: '#0F172A', color: 'white', borderRight: '1px solid #1E293B' }}>
        <div className="sidebar-logo" style={{ padding: '2rem 1.5rem', borderBottom: '1px solid #1E293B', fontSize: '18px', fontWeight: 800 }}>
          DeskSet <span style={{ color: '#0EA5E9', fontSize: '12px', display: 'block', fontWeight: 500 }}>입점 셀러 포털</span>
        </div>
        <nav className="sidebar-menu" style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '1rem' }}>
          <button 
            className={`menu-item ${sellerPage === 'seller-dashboard' ? 'active' : ''}`}
            onClick={() => showSellerPage('seller-dashboard')}
          >
            📊 모니터링
          </button>
          <button 
            className={`menu-item ${sellerPage === 'seller-products' ? 'active' : ''}`}
            onClick={() => showSellerPage('seller-products')}
          >
            🛍 상품 관리
          </button>
          <button 
            className={`menu-item ${sellerPage === 'seller-orders' ? 'active' : ''}`}
            onClick={() => showSellerPage('seller-orders')}
          >
            📦 주문 관리
          </button>
          <button 
            className={`menu-item ${sellerPage === 'seller-settlement' ? 'active' : ''}`}
            onClick={() => showSellerPage('seller-settlement')}
          >
            💳 정산 관리
          </button>
          <button 
            className={`menu-item ${sellerPage === 'seller-notice' ? 'active' : ''}`}
            onClick={() => showSellerPage('seller-notice')}
          >
            📢 공지 게시판
          </button>
        </nav>
        <div style={{ marginTop: 'auto', padding: '1.5rem', borderTop: '1px solid #1E293B', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
          <div style={{ background: '#0EA5E9', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>BS</div>
          <div>
            <strong>블루스퀘어</strong>
            <span style={{ display: 'block', fontSize: '10px', color: '#64748B' }}>SELLER</span>
          </div>
        </div>
      </aside>

      {/* SELLER MAIN CONTENT */}
      <main className="main-content" style={{ background: '#F8FAFC', padding: '2.5rem' }}>
        
        {/* TOP NAV BREADCRUMB */}
        <div className="main-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1E293B' }}>
            {sellerPage === 'seller-dashboard' && '실시간 모니터링'}
            {sellerPage === 'seller-products' && '상품 관리'}
            {sellerPage === 'seller-orders' && '주문 배송 관리'}
            {sellerPage === 'seller-settlement' && '정산 관리'}
            {sellerPage === 'seller-notice' && '입점사 전용 공지'}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className="btn-outline sm" style={{ color: '#0EA5E9', borderColor: '#0EA5E9', padding: '6px 16px', borderRadius: '50px', fontWeight: 600 }} onClick={() => switchRole('consumer')}>메인</button>
            <button className="btn-primary sm" disabled style={{ padding: '6px 16px', borderRadius: '50px', fontWeight: 600, background: '#0EA5E9', borderColor: '#0EA5E9', opacity: 0.85 }}>입점사</button>
            <button className="btn-outline sm" style={{ color: '#EF4444', borderColor: '#EF4444', padding: '6px 16px', borderRadius: '50px', fontWeight: 600 }} onClick={logout}>로그아웃</button>
          </div>
        </div>

        {/* -------------------- 6-A. SELLER DASHBOARD VIEW -------------------- */}
        {sellerPage === 'seller-dashboard' && (
          <div className="seller-page-view">
            {/* KPI Cards */}
            <div className="kpi-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
              <div className="kpi-card" style={{ background: 'white', border: '1px solid #E2E8F0', padding: '1.5rem', borderRadius: '16px' }}>
                <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>금일 매출 누적</span>
                <strong style={{ fontSize: '1.75rem', fontWeight: 800, display: 'block', margin: '4px 0', color: '#1E293B' }}>
                  ₩{(totalSales).toLocaleString()}
                </strong>
                <span style={{ fontSize: '11px', color: '#10B981' }}>+12.4% vs 전일</span>
              </div>
              <div className="kpi-card" style={{ background: 'white', border: '1px solid #E2E8F0', padding: '1.5rem', borderRadius: '16px' }}>
                <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>금월 목표 달성률</span>
                <strong style={{ fontSize: '1.75rem', fontWeight: 800, display: 'block', margin: '4px 0', color: '#0EA5E9' }}>84.5%</strong>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>목표: 1,500만원</span>
              </div>
              <div className="kpi-card" style={{ background: 'white', border: '1px solid #E2E8F0', padding: '1.5rem', borderRadius: '16px' }}>
                <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>신규 결제 건수</span>
                <strong style={{ fontSize: '1.75rem', fontWeight: 800, display: 'block', margin: '4px 0', color: '#1E293B' }}>
                  {orders.length}건
                </strong>
                <span style={{ fontSize: '11px', color: '#EF4444' }}>배송대기 {pendingOrders.length}건</span>
              </div>
              <div className="kpi-card" style={{ background: 'white', border: '1px solid #E2E8F0', padding: '1.5rem', borderRadius: '16px' }}>
                <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>미처리 CS 문의</span>
                <strong style={{ fontSize: '1.75rem', fontWeight: 800, display: 'block', margin: '4px 0', color: '#EF4444' }}>0건</strong>
                <span style={{ fontSize: '11px', color: '#10B981' }}>전체 답변완료 100%</span>
              </div>
            </div>

            {/* Neon Chart Section */}
            <div className="chart-card" style={{ background: 'white', border: '1px solid #E2E8F0', padding: '2rem', borderRadius: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1E293B' }}>일별 판매 대금 누적추이</h3>
                  <span style={{ fontSize: '12px', color: '#94A3B8' }}>최근 7 영업일 기준 매출액 정산 차트</span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748B', background: '#F1F5F9', padding: '4px 12px', borderRadius: '50px' }}>
                  자동 동기화 중
                </div>
              </div>
              <div style={{ height: '280px', position: 'relative' }}>
                <NeonChart 
                  data={[120, 240, 180, 390, 480, 520, 610]} 
                  labels={['5/21', '5/22', '5/23', '5/24', '5/25', '5/26', '5/27']} 
                  theme="cyan" 
                  maxVal={700}
                  unit="k"
                />
              </div>
            </div>
          </div>
        )}

        {/* -------------------- 6-B. SELLER PRODUCTS LIST -------------------- */}
        {sellerPage === 'seller-products' && (
          <div className="seller-page-view">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1E293B' }}>내 상품 목록 및 재고 실시간 제어</h3>
              <button className="btn-primary sm" onClick={() => setActiveModal('add-product')}>+ 신규 상품 등록</button>
            </div>
            
            <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontWeight: 600 }}>
                  <tr>
                    <th style={{ padding: '12px 16px' }}>상품설명</th>
                    <th style={{ padding: '12px 16px' }}>대분류</th>
                    <th style={{ padding: '12px 16px' }}>단가 (₩)</th>
                    <th style={{ padding: '12px 16px' }}>가용 재고</th>
                    <th style={{ padding: '12px 16px' }}>상태</th>
                    <th style={{ padding: '12px 16px' }}>동작</th>
                  </tr>
                </thead>
                <tbody>
                  {sellerProducts.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ background: p.color, color: 'white', padding: '6px', borderRadius: '8px', fontSize: '1.25rem', width: '32px', height: '32px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{p.emoji}</span>
                          <div>
                            <strong>{p.title}</strong>
                            <span style={{ display: 'block', fontSize: '10px', color: '#94A3B8' }}>{p.brand} · ID #{p.id}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px', color: '#475569', fontWeight: 500 }}>{p.category.toUpperCase()}</td>
                      <td style={{ padding: '16px', fontWeight: 'bold' }}>₩{p.price.toLocaleString()}</td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={p.stock} 
                            onChange={e => adjustStock(p.id, parseInt(e.target.value))}
                            style={{ accentColor: '#0EA5E9', cursor: 'pointer' }}
                          />
                          <span style={{ width: '28px', textAlign: 'center', fontWeight: 'bold', color: p.stock < 10 ? '#EF4444' : '#1E293B' }}>{p.stock}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        {p.stock > 0 ? (
                          <span style={{ color: '#10B981', background: 'rgba(16, 185, 129, 0.1)', padding: '3px 8px', borderRadius: '50px', fontSize: '11px', fontWeight: 600 }}>판매중</span>
                        ) : (
                          <span style={{ color: '#EF4444', background: 'rgba(239, 68, 68, 0.1)', padding: '3px 8px', borderRadius: '50px', fontSize: '11px', fontWeight: 600 }}>품절</span>
                        )}
                      </td>
                      <td style={{ padding: '16px' }}>
                        <button className="btn-outline sm" style={{ color: '#EF4444', borderColor: '#EF4444' }} onClick={() => removeProduct(p.id)}>삭제</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* -------------------- 6-C. SELLER ORDERS LIST -------------------- */}
        {sellerPage === 'seller-orders' && (
          <div className="seller-page-view">
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1E293B', marginBottom: '1.5rem' }}>구매 결제완료 주문 배송 처리</h3>
            
            <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontWeight: 600 }}>
                  <tr>
                    <th style={{ padding: '12px 16px' }}>주문번호</th>
                    <th style={{ padding: '12px 16px' }}>주문 일시</th>
                    <th style={{ padding: '12px 16px' }}>품목 명세</th>
                    <th style={{ padding: '12px 16px' }}>상태</th>
                    <th style={{ padding: '12px 16px' }}>택배사 및 운송장 입력</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => {
                    const activeCourier = couriers[order.orderId] || 'CJ대한통운';
                    const activeTracking = trackingNos[order.orderId] || '';

                    return (
                      <tr key={order.orderId} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '16px', fontWeight: 'bold', color: '#0EA5E9' }}>#{order.orderId}</td>
                        <td style={{ padding: '16px', color: '#64748B' }}>{order.date}</td>
                        <td style={{ padding: '16px' }}>
                          <div style={{ fontSize: '13px', fontWeight: 600 }}>{order.items[0].title}</div>
                          <div style={{ fontSize: '11px', color: '#94A3B8' }}>{order.items[0].color} · {order.items[0].quantity}개</div>
                        </td>
                        <td style={{ padding: '16px' }}>
                          <span style={{
                            padding: '3px 8px',
                            borderRadius: '50px',
                            fontSize: '11px',
                            fontWeight: 600,
                            color: order.shippingStatus === '배송완료' ? '#10B981' : order.shippingStatus === '배송중' ? '#0EA5E9' : '#F59E0B',
                            background: order.shippingStatus === '배송완료' ? 'rgba(16, 185, 129, 0.1)' : order.shippingStatus === '배송중' ? 'rgba(14, 165, 233, 0.1)' : 'rgba(245, 158, 11, 0.1)'
                          }}>
                            {order.shippingStatus}
                          </span>
                        </td>
                        <td style={{ padding: '16px' }}>
                          {order.shippingStatus === '결제완료' ? (
                            <div style={{ display: 'flex', gap: '4px' }}>
                              <select 
                                className="form-input sm" 
                                style={{ width: '100px', fontSize: '11px', padding: '4px' }}
                                value={activeCourier}
                                onChange={e => handleCourierChange(order.orderId, e.target.value)}
                              >
                                <option>CJ대한통운</option>
                                <option>한진택배</option>
                                <option>우체국택배</option>
                              </select>
                              <input 
                                className="form-input sm" 
                                type="text" 
                                placeholder="숫자만 입력" 
                                style={{ width: '120px', fontSize: '11px', padding: '4px' }}
                                value={activeTracking}
                                onChange={e => handleTrackingChange(order.orderId, e.target.value)}
                              />
                              <button className="btn-primary sm" style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => submitOrderTracking(order.orderId, activeCourier, activeTracking)}>승인</button>
                            </div>
                          ) : (
                            <span style={{ color: '#64748B', fontSize: '12px' }}>
                              {order.courier || 'CJ대한통운'} · {order.trackingNo || `6387-5291-${order.orderId.substring(8)}`}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* -------------------- 6-D. SELLER SETTLEMENT VIEW -------------------- */}
        {sellerPage === 'seller-settlement' && (
          <div className="seller-page-view">
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1E293B', marginBottom: '1.5rem' }}>전자세금계산서 월별 정산 내역</h3>
            
            <div style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontWeight: 600 }}>
                  <tr>
                    <th style={{ padding: '12px 16px' }}>정산 귀속월</th>
                    <th style={{ padding: '12px 16px' }}>총 판매 금액 (₩)</th>
                    <th style={{ padding: '12px 16px' }}>플랫폼 정산 수수료 (5%)</th>
                    <th style={{ padding: '12px 16px' }}>최종 정산 입금액</th>
                    <th style={{ padding: '12px 16px' }}>동작</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '16px', fontWeight: 600 }}>2025년 1월</td>
                    <td style={{ padding: '16px', fontWeight: 'bold' }}>₩{(totalSales).toLocaleString()}</td>
                    <td style={{ padding: '16px', color: '#EF4444' }}>-₩{(totalSales * 0.05).toLocaleString()}</td>
                    <td style={{ padding: '16px', color: '#10B981', fontWeight: 'bold' }}>₩{(totalSales * 0.95).toLocaleString()}</td>
                    <td style={{ padding: '16px' }}>
                      <button className="btn-primary sm" onClick={() => showToast('국세청 전자세금계산서 정산 승인 신청이 정상 완료되었습니다.')}>발행 승인 신청</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* -------------------- 6-E. SELLER NOTICE VIEW -------------------- */}
        {sellerPage === 'seller-notice' && (
          <div className="seller-page-view">
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1E293B', marginBottom: '1.5rem' }}>입점 파트너 전용 긴급 공지사항</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: 'white', border: '1px solid #E2E8F0', padding: '1.5rem', borderRadius: '16px' }}>
                <span style={{ background: '#EF4444', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>긴급</span>
                <strong style={{ display: 'block', fontSize: '15px', color: '#1E293B', marginTop: '6px' }}>2025년 설 연휴 대형 물류 센터 집하 지연 안내</strong>
                <p style={{ color: '#64748B', fontSize: '13px', marginTop: '6px', lineHeight: 1.5 }}>
                  연휴 전날인 1월 24일부터 CJ대한통운 등 메이저 택배사 집하 물량이 포화될 예정입니다. 입점 셀러 분들께서는 23일 이전에 출고 송장 등록을 완료해 주시기 바랍니다.
                </p>
                <small style={{ color: '#94A3B8', display: 'block', marginTop: '10px' }}>등록일: 2025.01.20 · 플랫폼 운영팀</small>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default SellerView;
