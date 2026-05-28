import React, { createContext, useState, useEffect } from 'react';

export const DeskSetContext = createContext();

export const DeskSetProvider = ({ children }) => {
  // 1. DATA SEED STATE
  const [products, setProducts] = useState([
    {
      id: 1,
      brand: "DeskSet",
      title: "슬레이트 기계식 기어 키보드 V2",
      category: "keyboard",
      price: 189000,
      originalPrice: 220000,
      discountPercent: 14,
      rating: 4.8,
      reviewCount: 142,
      emoji: "⌨",
      color: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",
      colors: ["#1E293B", "#0EA5E9", "#F1F5F9"],
      sizes: ["S (텐키리스)", "M (풀배열)"],
      description: "데스크셋 슬레이트 V2는 몰입과 생산성을 위한 최고급 기계식 키보드입니다. 저소음 갈축 스위치와 알루미늄 풀 바디 하우징으로 단단한 키감과 정숙함을 선사합니다.",
      stock: 45
    },
    {
      id: 2,
      brand: "Orbitkey",
      title: "RGB 무선 충전 레더 데스크 패드 XL",
      category: "pad",
      price: 49000,
      originalPrice: 59000,
      discountPercent: 16,
      rating: 4.6,
      reviewCount: 67,
      emoji: "🖱",
      color: "linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%)",
      colors: ["#1E293B", "#0EA5E9", "#94A3B8"],
      sizes: ["M (600x300)", "XL (900x400)"],
      description: "무선 고속 충전 코일이 내장된 프리미엄 비건 레더 데스크 패드입니다. 테두리를 따라 빛나는 부드러운 RGB 인디케이터가 야간 몰입도를 극대화합니다.",
      stock: 32
    },
    {
      id: 3,
      brand: "BenQ",
      title: "스크린바 플러스 LED 모니터 조명",
      category: "lighting",
      price: 129000,
      originalPrice: 149000,
      discountPercent: 13,
      rating: 4.9,
      reviewCount: 89,
      emoji: "💡",
      color: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
      colors: ["#1E293B", "#94A3B8"],
      sizes: ["Standard"],
      description: "눈부심 없는 비대칭 광학 디자인의 모니터 스크린 바입니다. 주변 밝기를 실시간으로 감지하는 자동 스마트 조도 센서와 직관적인 다이얼 컨트롤러가 포함되어 있습니다.",
      stock: 15
    },
    {
      id: 4,
      brand: "Grovemade",
      title: "월넛 원목 데스크 오거나이저 트레이",
      category: "storage",
      price: 85000,
      originalPrice: 85000,
      discountPercent: 0,
      rating: 4.7,
      reviewCount: 203,
      emoji: "📦",
      color: "linear-gradient(135deg, #78350F 0%, #451A03)",
      colors: ["#78350F", "#451A03"],
      sizes: ["Standard", "Large"],
      description: "장인이 수작업으로 깎아 만든 최고급 월넛 원목 수납 트레이입니다. 펜, 메모지, USB 등 작은 소품들을 품격 있게 정리합니다.",
      stock: 8
    },
    {
      id: 5,
      brand: "Twelve South",
      title: "맥북 알루미늄 버티컬 스탠드 V3",
      category: "storage",
      price: 45000,
      originalPrice: 45000,
      discountPercent: 0,
      rating: 4.5,
      reviewCount: 124,
      emoji: "💻",
      color: "linear-gradient(135deg, #475569 0%, #64748B 100%)",
      colors: ["#94A3B8", "#1E293B", "#F1F5F9"],
      sizes: ["Universal"],
      description: "클램쉘 모드 맥북 사용자들을 위한 버티컬 스탠드입니다. 에어로 스페이스 알루미늄 가공 바디로 냉각 성능을 높이고 데스크 공간을 최대로 확보합니다.",
      stock: 22
    },
    {
      id: 6,
      brand: "DeskSet",
      title: "USB-C 8-in-1 알루미늄 메탈 허브",
      category: "cable",
      price: 89000,
      originalPrice: 99000,
      discountPercent: 10,
      rating: 4.4,
      reviewCount: 118,
      emoji: "🔌",
      color: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
      colors: ["#94A3B8", "#1E293B"],
      sizes: ["Standard"],
      description: "HDMI 4K 60Hz, 기가비트 이더넷, SD 슬롯 및 100W PD 고속 충전을 완벽하게 지원하는 데스크탑 필수 8포트 초소형 메탈 허브입니다.",
      stock: 50
    },
    {
      id: 7,
      brand: "DeskSet",
      title: "밀리터리 항공 코일 케이블",
      category: "cable",
      price: 29000,
      originalPrice: 32000,
      discountPercent: 9,
      rating: 4.8,
      reviewCount: 95,
      emoji: "➰",
      color: "linear-gradient(135deg, #EC4899 0%, #BE185D 100%)",
      colors: ["#EF4444", "#0EA5E9", "#10B981", "#F59E0B"],
      sizes: ["1.5m", "2.0m"],
      description: "이중 슬리빙 처리된 파라코드 소재에 롤링 코일을 더한 기계식 키보드 전용 케이블입니다. 프리미엄 파일럿 커넥터가 포인트입니다.",
      stock: 80
    },
    {
      id: 8,
      brand: "Ergotech",
      title: "가스스프링 싱글 모니터암",
      category: "lighting",
      price: 119000,
      originalPrice: 149000,
      discountPercent: 20,
      rating: 4.7,
      reviewCount: 54,
      emoji: "🦾",
      color: "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)",
      colors: ["#1E293B", "#F1F5F9"],
      sizes: ["Standard"],
      description: "최대 15kg 고중량 모니터까지 지탱하는 가스스프링 모니터암입니다. 자유로운 틸트와 스위블 조절로 완벽한 눈높이 맞춤이 가능합니다.",
      stock: 12
    },
    {
      id: 9,
      brand: "DeskSet",
      title: "미니멀리스트 메리노 울 펠트 데스크 패드",
      category: "pad",
      price: 39000,
      originalPrice: 39000,
      discountPercent: 0,
      rating: 4.6,
      reviewCount: 112,
      emoji: "🐑",
      color: "linear-gradient(135deg, #64748B 0%, #475569 100%)",
      colors: ["#94A3B8", "#475569", "#E2E8F0"],
      sizes: ["M", "L"],
      description: "천연 100% 프리미엄 메리노 울 펠트로 수제작된 울 패드입니다. 부드러운 촉감과 쿠션감으로 데스크 분위기를 따스하게 연출합니다.",
      stock: 19
    }
  ]);

  const [cart, setCart] = useState([]);

  const [orders, setOrders] = useState([
    {
      orderId: "DS-2025-08471",
      date: "2025.01.20",
      items: [
        {
          title: "알루미늄 키보드 트레이",
          price: 75000,
          quantity: 1,
          color: "#1E293B",
          emoji: "⌨",
          bg: "linear-gradient(135deg, #1E293B 0%, #334155 100%)"
        }
      ],
      shippingStatus: "배송중"
    },
    {
      orderId: "DS-2025-08112",
      date: "2025.01.05",
      items: [
        {
          title: "RGB 데스크 패드 XL",
          price: 42000,
          quantity: 2,
          color: "#0EA5E9",
          emoji: "🖱",
          bg: "linear-gradient(135deg, #0EA5E9 0%, #38BDF8 100%)"
        }
      ],
      shippingStatus: "배송완료"
    }
  ]);

  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      type: "배송",
      title: "배송 지연 관련 문의드립니다",
      content: "주문한 슬레이트 키보드가 언제 발송되는지 궁금합니다.",
      date: "2025.01.21",
      status: "답변대기",
      response: null
    },
    {
      id: 2,
      type: "상품",
      title: "색상 옵션 추가 요청",
      content: "데스크 오거나이저 내추럴 우드 색상도 재입고 예정이 있나요?",
      date: "2025.01.20",
      status: "답변완료",
      response: "안녕하세요 DeskSet입니다. 내추럴 우드 색상은 2월 초순 재입고 예정입니다. 많은 관심 감사드립니다!"
    }
  ]);

  const [notices, setNotices] = useState([
    { id: 1, title: "설 연휴 배송 안내 (1/25~1/30)", content: "설 연휴 기간 동안 배송 및 CS 업무가 일시적으로 중단됩니다.", date: "2025.01.20", pinned: true, newPost: false },
    { id: 2, title: "개인정보처리방침 개정 안내", content: "개인정보처리방침 일부 조항이 변경되어 알려드립니다.", date: "2025.01.15", pinned: false, newPost: true },
    { id: 3, title: "2025 신년 특가 프로모션 안내", content: "신년을 맞이하여 DeskSet 인기상품 단독 할인전을 개최합니다.", date: "2025.01.01", pinned: false, newPost: false }
  ]);

  const [faqs, setFaqs] = useState([
    { id: 1, q: "반품/교환 기간이 어떻게 되나요?", a: "수령 후 7일 이내에 반품/교환이 가능합니다. 단, 상품 훼손 또는 사용 흔적이 있는 경우 반품이 어려울 수 있습니다." },
    { id: 2, q: "배송 기간은 얼마나 걸리나요?", a: "결제 완료 후 1~3 영업일 이내에 발송되며, 발송 후 1~2일 내 수령 가능합니다." },
    { id: 3, q: "세금계산서 발행이 가능한가요?", a: "사업자 고객의 경우 1:1 문의 또는 정산 탭 발행 신청을 통해 세금계산서 발행이 자동으로 처리됩니다." }
  ]);

  // 2. CORE ROUTING & GENERAL STATES
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('ds_current_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [role, setRole] = useState(() => {
    const saved = localStorage.getItem('ds_role');
    return saved || 'consumer';
  });
  const [activePage, setActivePage] = useState("consumer-home");
  const [sellerPage, setSellerPage] = useState("seller-dashboard");
  const [adminPage, setAdminPage] = useState("admin-dashboard");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ds_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('ds_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('ds_role', role);
  }, [role]);

  useEffect(() => {
    const handleUrlRouting = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const isAdminPath = path.endsWith('/admin') || path.endsWith('/admin/') || hash === '#/admin' || hash === '#admin';
      
      if (isAdminPath) {
        if (!currentUser || currentUser.role !== 'admin') {
          setRole('admin');
          setAdminPage('admin-login');
        } else {
          setRole('admin');
          setAdminPage('admin-dashboard');
        }
      }
    };
    
    handleUrlRouting();
    window.addEventListener('hashchange', handleUrlRouting);
    return () => window.removeEventListener('hashchange', handleUrlRouting);
  }, [currentUser]);
  
  const [currentProductId, setCurrentProductId] = useState(1);
  const [selectedColor, setSelectedColor] = useState("#1E293B");
  const [selectedSize, setSelectedSize] = useState("S (텐키리스)");
  const [detailQty, setDetailQty] = useState(1);
  const [activeRating, setActiveRating] = useState(5);

  // Modals & Toast State
  const [activeModal, setActiveModal] = useState(null); // 'tracking', 'review', 'add-product', 'tosspay'
  const [modalContext, setModalContext] = useState({});
  const [toast, setToast] = useState({ show: false, message: "" });
  const [paymentLoading, setPaymentLoading] = useState(false);

  // 3. TOAST ACTION
  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 2500);
  };

  const logout = () => {
    setCurrentUser(null);
    setRole('consumer');
    setActivePage('consumer-home');
    showToast("로그아웃되었습니다.");
    if (window.location.pathname.endsWith('/admin') || window.location.pathname.endsWith('/admin/')) {
      const newPath = window.location.pathname.replace(/\/admin\/?$/, '');
      window.history.replaceState({}, document.title, newPath || '/');
    }
  };

  // 4. ROUTER HANDLERS
  const switchRole = (newRole) => {
    setRole(newRole);
    setHistory([]);
    if (newRole === 'seller') {
      setSellerPage('seller-dashboard');
    } else if (newRole === 'admin') {
      setAdminPage('admin-dashboard');
      // Push subfolder-safe pathname e.g. /shop/admin or /admin
      const basePath = window.location.pathname.replace(/\/admin\/?$/, '').replace(/\/$/, '');
      window.history.pushState({}, document.title, basePath + '/admin');
    } else {
      setActivePage('consumer-home');
      if (window.location.pathname.endsWith('/admin') || window.location.pathname.endsWith('/admin/')) {
        const newPath = window.location.pathname.replace(/\/admin\/?$/, '');
        window.history.replaceState({}, document.title, newPath || '/');
      }
    }
  };

  const showPage = (pageId) => {
    if (activePage !== pageId) {
      setHistory(prev => {
        if (prev[prev.length - 1] !== activePage) {
          return [...prev, activePage];
        }
        return prev;
      });
    }
    setActivePage(pageId);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(prevHist => prevHist.slice(0, -1));
      setActivePage(prev);
    } else {
      setActivePage('consumer-home');
    }
  };

  const showSellerPage = (pageId) => {
    setSellerPage(pageId);
  };

  const showAdminPage = (pageId) => {
    setAdminPage(pageId);
  };

  // 5. CONSUMER ACTION HANDLERS
  const openProductDetail = (id) => {
    const prod = products.find(p => p.id === id);
    if (!prod) return;
    setCurrentProductId(id);
    setSelectedColor(prod.colors[0]);
    setSelectedSize(prod.sizes[0]);
    setDetailQty(1);
    showPage('consumer-product-detail');
  };

  const changeQty = (amt) => {
    setDetailQty(prev => {
      const next = prev + amt;
      return next < 1 ? 1 : next;
    });
  };

  const addToCart = () => {
    const prod = products.find(p => p.id === currentProductId);
    if (!prod) return;

    setCart(prevCart => {
      const existing = prevCart.find(item => 
        item.productId === currentProductId && 
        item.color === selectedColor && 
        item.size === selectedSize
      );

      if (existing) {
        return prevCart.map(item => 
          item.id === existing.id 
            ? { ...item, quantity: item.quantity + detailQty }
            : item
        );
      } else {
        return [...prevCart, {
          id: Date.now(),
          productId: currentProductId,
          quantity: detailQty,
          color: selectedColor,
          size: selectedSize,
          checked: true
        }];
      }
    });

    showToast(`${prod.title} (${detailQty}개)를 장바구니에 담았습니다.`);
  };

  const toggleItemChecked = (id, checked) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, checked } : item));
  };

  const toggleAll = (checked) => {
    setCart(prev => prev.map(item => ({ ...item, checked })));
  };

  const changeCartItemQty = (id, amt) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const nQ = item.quantity + amt;
        return { ...item, quantity: nQ < 1 ? 1 : nQ };
      }
      return item;
    }));
  };

  const deleteSelected = () => {
    setCart(prev => prev.filter(item => !item.checked));
    showToast("선택된 상품들이 장바구니에서 삭제되었습니다.");
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('toss_success') === 'true') {
      const savedOrderStr = localStorage.getItem('ds_pending_order');
      if (savedOrderStr) {
        try {
          const savedOrder = JSON.parse(savedOrderStr);
          const newOrderId = `DS-2025-${Math.floor(10000 + Math.random() * 90000)}`;
          const newOrder = {
            orderId: newOrderId,
            date: new Date().toLocaleDateString(),
            items: savedOrder.items,
            shippingStatus: '결제완료'
          };
          
          setOrders(prev => [newOrder, ...prev]);
          setCart(prev => prev.filter(item => !item.checked));
          
          setActivePage('consumer-order-complete');
          setModalContext({ orderId: newOrderId });
          showToast("결제가 성공적으로 완료되었습니다!");
        } catch (e) {
          console.error("Order recovery error", e);
        } finally {
          localStorage.removeItem('ds_pending_order');
        }
      }
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (params.get('toss_fail') === 'true') {
      showToast("결제창이 닫혔거나 결제 승인에 실패했습니다.");
      localStorage.removeItem('ds_pending_order');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [cart, products]);

  const simulatePayment = (recipient, phone) => {
    if (!recipient.trim() || !phone.trim()) {
      showToast("배송 정보(수령인, 연락처)를 모두 채워주세요.");
      return;
    }

    const checkedItems = cart.filter(item => item.checked);
    if (checkedItems.length === 0) {
      showToast("선택된 상품이 없습니다.");
      return;
    }

    let totalAmount = 0;
    const itemsData = checkedItems.map(item => {
      const prod = products.find(p => p.id === item.productId);
      if (prod) totalAmount += prod.price * item.quantity;
      return {
        title: prod ? prod.title : "데스크 기어 상품",
        price: prod ? prod.price : 50000,
        quantity: item.quantity,
        color: item.color,
        emoji: prod ? prod.emoji : "📦",
        bg: prod ? prod.color : "#1E293B"
      };
    });

    localStorage.setItem('ds_pending_order', JSON.stringify({
      items: itemsData,
      recipient,
      phone
    }));

    if (!window.TossPayments) {
      showToast("토스 결제 라이브러리를 로드하지 못했습니다.");
      return;
    }

    const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";
    const tossPayments = window.TossPayments(clientKey);
    const customerKey = currentUser ? currentUser.id : window.TossPayments.ANONYMOUS;
    const payment = tossPayments.payment({ customerKey });
    const tempOrderId = `DS-${Date.now()}`;

    payment.requestPayment({
      method: "CARD",
      amount: {
        currency: "KRW",
        value: totalAmount
      },
      orderId: tempOrderId,
      orderName: itemsData.length > 1 
        ? `${itemsData[0].title} 외 ${itemsData.length - 1}개`
        : `${itemsData[0].title}`,
      successUrl: window.location.origin + '?toss_success=true',
      failUrl: window.location.origin + '?toss_fail=true',
      customerName: recipient,
    })
    .catch((error) => {
      if (error.code === 'USER_CANCEL') {
        showToast("결제를 취소하셨습니다.");
      } else {
        showToast(`결제 에러: ${error.message}`);
      }
      localStorage.removeItem('ds_pending_order');
    });
  };

  const showTrackingModal = (orderId) => {
    setActiveModal('tracking');
    setModalContext({ orderId });
  };

  const showReviewForm = (orderId) => {
    setActiveModal('review');
    setModalContext({ orderId });
    setActiveRating(5);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalContext({});
  };

  const submitReview = (text) => {
    if (!text.trim()) {
      showToast("리뷰 내용을 작성해 주세요.");
      return;
    }
    
    showToast("별점 리뷰가 등록되었습니다! +500P 적립 완료!");
    setActiveModal(null);
  };

  const addInquiry = (type, title, content) => {
    if (!title.trim() || !content.trim()) {
      showToast("문의 제목과 내용을 입력하세요.");
      return false;
    }
    const newInq = {
      id: Date.now(),
      type,
      title,
      content,
      date: new Date().toLocaleDateString(),
      status: '답변대기',
      response: null
    };
    setInquiries(prev => [newInq, ...prev]);
    showToast("문의가 비공개로 안전하게 등록되었습니다.");
    return true;
  };

  // 6. SELLER ACTION HANDLERS
  const submitOrderTracking = (orderId, courier, trackingNo) => {
    if (!trackingNo.trim()) {
      showToast("운송장 번호를 입력해 주세요.");
      return;
    }
    setOrders(prev => prev.map(o => 
      o.orderId === orderId 
        ? { ...o, shippingStatus: '배송중', courier, trackingNo } 
        : o
    ));
    showToast("운송장이 등록되고 배송 프로세스가 실행되었습니다.");
  };

  const adjustStock = (id, newStock) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: newStock } : p));
    showToast("재고 수량이 업데이트되었습니다.");
  };

  const removeProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast("상품이 매켓플레이스에서 제외되었습니다.");
  };

  const addNewProduct = (title, price, stock, categoryText, description) => {
    let category = 'keyboard';
    let emoji = '⌨';
    let color = 'linear-gradient(135deg, #1E293B 0%, #334155 100%)';
    
    if (categoryText === '데스크패드') {
      category = 'pad';
      emoji = '🖱';
      color = 'linear-gradient(135deg, #0EA5E9 0%, #2563EB 100%)';
    } else if (categoryText === '조명') {
      category = 'lighting';
      emoji = '💡';
      color = 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)';
    } else if (categoryText === '수납') {
      category = 'storage';
      emoji = '📦';
      color = 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)';
    }

    const added = {
      id: Date.now(),
      brand: "Bluesquare",
      title,
      price: parseInt(price),
      originalPrice: parseInt(price),
      discountPercent: 0,
      rating: 5.0,
      reviewCount: 0,
      emoji,
      color,
      colors: ["#1E293B", "#94A3B8"],
      sizes: ["Standard"],
      description,
      stock: parseInt(stock)
    };

    setProducts(prev => [added, ...prev]);
    showToast("새 상품이 매켓플레이스에 정상 입점 등록되었습니다.");
  };

  // 7. ADMIN ACTION HANDLERS
  const answerInquiry = (id, ans) => {
    if (!ans.trim()) return;
    setInquiries(prev => prev.map(inq => 
      inq.id === id 
        ? { ...inq, status: '답변완료', response: ans } 
        : inq
    ));
    showToast("문의에 답변이 성공적으로 업로드되었습니다.");
  };

  const editFaq = (id, q, a) => {
    setFaqs(prev => prev.map(f => f.id === id ? { ...f, q, a } : f));
    showToast("FAQ 정보가 정상 변경되었습니다.");
  };

  const deleteFaq = (id) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
    showToast("FAQ 리스트에서 영구 삭제되었습니다.");
  };

  const addFaq = (q, a) => {
    setFaqs(prev => [...prev, { id: Date.now(), q, a }]);
    showToast("FAQ 질문 답변이 성공적으로 추가되었습니다.");
  };

  const addNotice = (title, content, pinned) => {
    const added = {
      id: Date.now(),
      title,
      content,
      date: new Date().toLocaleDateString(),
      pinned,
      newPost: true
    };
    setNotices(prev => [added, ...prev]);
    showToast("새 플랫폼 공지사항이 발행되어 배포되었습니다.");
  };

  return (
    <DeskSetContext.Provider value={{
      products, setProducts,
      cart, setCart,
      orders, setOrders,
      inquiries, setInquiries,
      notices, setNotices,
      faqs, setFaqs,
      
      role, switchRole,
      activePage, showPage, goBack,
      currentUser, setCurrentUser, logout,
      sellerPage, showSellerPage,
      adminPage, showAdminPage,
      
      currentProductId, setCurrentProductId,
      selectedColor, setSelectedColor,
      selectedSize, setSelectedSize,
      detailQty, changeQty,
      activeRating, setActiveRating,
      
      activeModal, setActiveModal,
      modalContext, setModalContext,
      toast, showToast,
      paymentLoading,
      
      openProductDetail,
      addToCart,
      toggleItemChecked,
      toggleAll,
      changeCartItemQty,
      deleteSelected,
      simulatePayment,
      showTrackingModal,
      showReviewForm,
      closeModal,
      submitReview,
      addInquiry,
      
      submitOrderTracking,
      adjustStock,
      removeProduct,
      addNewProduct,
      
      answerInquiry,
      editFaq,
      deleteFaq,
      addFaq,
      addNotice
    }}>
      {children}
    </DeskSetContext.Provider>
  );
};
