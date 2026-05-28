import React, { useContext, useState } from 'react';
import { DeskSetContext } from '../../context/DeskSetContext';

const Modal = () => {
  const { 
    activeModal, 
    closeModal, 
    modalContext, 
    activeRating, 
    setRating, 
    submitReview,
    addNewProduct
  } = useContext(DeskSetContext);

  // States for Add Product Form
  const [prodTitle, setProdTitle] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodStock, setProdStock] = useState('');
  const [prodCat, setProdCat] = useState('키보드');
  const [prodDesc, setProdDesc] = useState('');

  // State for Review Form
  const [reviewText, setReviewText] = useState('');

  if (!activeModal) return null;

  // 1. TOSSPAY EXTERNAL POPUP SIMULATOR
  if (activeModal === 'tosspay') {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(8px)',
        zIndex: 100000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          background: 'white',
          width: '360px',
          borderRadius: '24px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          textAlign: 'center',
          padding: '2.5rem 2rem'
        }}>
          <div style={{
            background: '#0064FF',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '56px',
            height: '56px',
            border: 'none',
            borderRadius: '18px',
            marginBottom: '1.5rem',
            color: 'white',
            fontFamily: '"Syne", sans-serif',
            fontWeight: 800,
            fontSize: '24px'
          }}>T</div>
          <h3 style={{
            fontFamily: '"Syne", sans-serif',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#1E293B',
            marginBottom: '0.5rem'
          }}>토스페이 결제 진행 중</h3>
          <p style={{ color: '#64748B', fontSize: '13px', marginBottom: '2rem', lineHeight: 1.5 }}>
            주문 인증을 진행 중입니다.<br />잠시만 기다려 주세요.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginBottom: '2.5rem' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#0064FF', animation: 'bounceDot 0.6s infinite alternate' }}></span>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#0064FF', animation: 'bounceDot 0.6s infinite alternate 0.2s' }}></span>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#0064FF', animation: 'bounceDot 0.6s infinite alternate 0.4s' }}></span>
          </div>
          <button className="btn-outline full-width" onClick={closeModal} style={{ borderRadius: '12px' }}>결제 취소</button>
          <style>{`
            @keyframes bounceDot { from { transform: translateY(0); } to { transform: translateY(-10px); } }
          `}</style>
        </div>
      </div>
    );
  }

  // 2. SHIPPING TRACKING TIMELINE
  if (activeModal === 'tracking') {
    return (
      <div id="tracking-modal" className="modal-overlay active" onClick={closeModal}>
        <div className="modal-card" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>실시간 배송 추적</h3>
            <span className="close-btn" onClick={closeModal}>&times;</span>
          </div>
          <div className="modal-body">
            <div style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>주문번호</div>
              <strong style={{ fontSize: '16px', color: '#1E293B' }}>#{modalContext.orderId}</strong>
              <div className="tracking-courier" style={{ fontSize: '13px', color: '#0EA5E9', marginTop: '4px', fontWeight: 500 }}>
                CJ대한통운 · 6387-5291-{modalContext.orderId?.substring(8) || '5192'}
              </div>
            </div>
            <div className="timeline">
              <div className="timeline-item active">
                <div className="timeline-badge">✓</div>
                <div className="timeline-content">
                  <h4>배송지시</h4>
                  <p>판매자가 배송정보 등록 및 CJ대한통운으로 포장 발송을 의뢰했습니다.</p>
                  <small>방금 전</small>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-badge"></div>
                <div className="timeline-content">
                  <h4>수하물 인수 (옥천HUB)</h4>
                  <p>CJ대한통운 물류 센터에 수하물이 안전하게 집하 인수되었습니다.</p>
                  <small>대기 중</small>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-badge"></div>
                <div className="timeline-content">
                  <h4>배송 출발 (구로 대리점)</h4>
                  <p>지정 배송 기사님이 고객님의 수령 장소로 배송을 시작했습니다.</p>
                  <small>대기 중</small>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-badge"></div>
                <div className="timeline-content">
                  <h4>배송 완료</h4>
                  <p>수령 장소에 안전하게 배송이 최종 완료되었습니다. (보증 효력 발생)</p>
                  <small>대기 중</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. STAR-RATING REVIEWS FORM
  if (activeModal === 'review') {
    return (
      <div id="review-modal" className="modal-overlay active" onClick={closeModal}>
        <div className="modal-card" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>상품 구매 리뷰 작성</h3>
            <span className="close-btn" onClick={closeModal}>&times;</span>
          </div>
          <div className="modal-body">
            <p style={{ color: '#64748B', fontSize: '13px', marginBottom: '1rem' }}>
              상품에 대한 만족도 별점을 남겨주세요. (+500P 추가 지급)
            </p>
            <div className="star-rating" id="star-rating" style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <span 
                  key={star} 
                  className="star-input" 
                  style={{ color: star <= activeRating ? '#F59E0B' : '#CBD5E1', fontSize: '1.75rem', cursor: 'pointer' }}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <div className="form-group">
              <label>상세 소감 및 리뷰 내용</label>
              <textarea 
                className="form-input" 
                rows="4" 
                placeholder="사용해 보신 소감을 솔직하게 작성해 주세요..."
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
              ></textarea>
            </div>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '8px' }}>
              <button className="btn-outline full-width" onClick={closeModal}>취소</button>
              <button className="btn-primary full-width" onClick={() => {
                submitReview(reviewText);
                setReviewText('');
              }}>리뷰 등록 완료</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. SELLER ADD PRODUCT FORM
  if (activeModal === 'add-product') {
    return (
      <div id="add-product-modal" className="modal-overlay active" onClick={closeModal}>
        <div className="modal-card wide" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>신규 상품 입점 등록</h3>
            <span className="close-btn" onClick={closeModal}>&times;</span>
          </div>
          <div className="modal-body">
            <div className="form-grid">
              <div className="form-group">
                <label>제조 브랜드</label>
                <input className="form-input" type="text" placeholder="제조사명" value="Bluesquare" readOnly />
              </div>
              <div className="form-group">
                <label>상품명</label>
                <input 
                  className="form-input" 
                  type="text" 
                  placeholder="예) 마호가니 에디션 가죽 트레이" 
                  value={prodTitle}
                  onChange={e => setProdTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>카테고리</label>
                <select className="form-input" value={prodCat} onChange={e => setProdCat(e.target.value)}>
                  <option>키보드</option>
                  <option>데스크패드</option>
                  <option>조명</option>
                  <option>수납</option>
                  <option>케이블</option>
                </select>
              </div>
              <div className="form-group">
                <label>판매 단가 (₩)</label>
                <input 
                  className="form-input" 
                  type="number" 
                  placeholder="원 단위 금액" 
                  value={prodPrice}
                  onChange={e => setProdPrice(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>초기 입고 재고</label>
                <input 
                  className="form-input" 
                  type="number" 
                  placeholder="수량(개)" 
                  value={prodStock}
                  onChange={e => setProdStock(e.target.value)}
                />
              </div>
              <div className="form-group full-col">
                <label>상세 설명</label>
                <textarea 
                  className="form-input" 
                  rows="4" 
                  placeholder="마켓에 상시 노출될 핵심 상품 스펙을 자세하게 기입하세요..."
                  value={prodDesc}
                  onChange={e => setProdDesc(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group full-col" style={{ display: 'flex', gap: '8px', marginTop: '1rem' }}>
                <button className="btn-outline full-width" onClick={closeModal}>취소</button>
                <button className="btn-primary full-width" onClick={() => {
                  addNewProduct(prodTitle, prodPrice, prodStock, prodCat, prodDesc);
                  closeModal();
                  setProdTitle('');
                  setProdPrice('');
                  setProdStock('');
                  setProdDesc('');
                }}>입점 완료</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Modal;
