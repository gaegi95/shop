import React, { useContext, useEffect } from 'react';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import { DeskSetProvider, DeskSetContext } from './context/DeskSetContext';
import ConsumerView from './views/ConsumerView';
import SellerView from './views/SellerView';
import AdminView from './views/AdminView';
import Toast from './components/common/Toast';
import Modal from './components/common/Modal';
import './styles/global.css';

// URL <-> React Context state synchronization component
const RouteSyncer = () => {
  const { 
    role, setRole,
    activePage, setActivePage,
    currentUser,
    setAdminPage,
  } = useContext(DeskSetContext);

  const location = useLocation();
  const navigate = useNavigate();

  // 1. Sync FROM URL TO React state (e.g. initial load, back/forward button clicks)
  useEffect(() => {
    const path = location.pathname;

    if (path === '/admin' || path === '/admin/') {
      if (role !== 'admin') {
        setRole('admin');
      }
      if (!currentUser || currentUser.role !== 'admin') {
        setAdminPage('admin-login');
      } else {
        setAdminPage('admin-dashboard');
      }
    } else if (path === '/seller' || path === '/seller/') {
      if (role !== 'seller') {
        setRole('seller');
      }
    } else {
      if (role !== 'consumer') {
        setRole('consumer');
      }

      if (path === '/' || path === '') {
        if (activePage !== 'consumer-home') setActivePage('consumer-home');
      } else if (path === '/login') {
        if (activePage !== 'consumer-login') setActivePage('consumer-login');
      } else if (path === '/products') {
        if (activePage !== 'consumer-products') setActivePage('consumer-products');
      } else if (path === '/product-detail') {
        if (activePage !== 'consumer-product-detail') setActivePage('consumer-product-detail');
      } else if (path === '/cart') {
        if (activePage !== 'consumer-cart') setActivePage('consumer-cart');
      } else if (path === '/order') {
        if (activePage !== 'consumer-order') setActivePage('consumer-order');
      } else if (path === '/mypage') {
        if (activePage !== 'consumer-mypage') setActivePage('consumer-mypage');
      } else if (path === '/cs') {
        if (activePage !== 'consumer-cs') setActivePage('consumer-cs');
      } else if (path === '/search') {
        if (activePage !== 'consumer-search') setActivePage('consumer-search');
      }
    }
  }, [location.pathname, currentUser]);

  // 2. Sync FROM React state TO URL (e.g. clicking buttons in the UI)
  useEffect(() => {
    if (role === 'admin') {
      if (location.pathname !== '/admin' && location.pathname !== '/admin/') {
        navigate('/admin');
      }
    } else if (role === 'seller') {
      if (location.pathname !== '/seller' && location.pathname !== '/seller/') {
        navigate('/seller');
      }
    } else {
      let targetPath = '/';
      if (activePage === 'consumer-login') targetPath = '/login';
      else if (activePage === 'consumer-products') targetPath = '/products';
      else if (activePage === 'consumer-product-detail') targetPath = '/product-detail';
      else if (activePage === 'consumer-cart') targetPath = '/cart';
      else if (activePage === 'consumer-order') targetPath = '/order';
      else if (activePage === 'consumer-mypage') targetPath = '/mypage';
      else if (activePage === 'consumer-cs') targetPath = '/cs';
      else if (activePage === 'consumer-search') targetPath = '/search';

      if (location.pathname !== targetPath) {
        navigate(targetPath);
      }
    }
  }, [role, activePage, location.pathname, navigate]);

  return null;
};

const MainApp = () => {
  const { role } = useContext(DeskSetContext);

  return (
    <>
      <RouteSyncer />
      {role === 'consumer' && <ConsumerView />}
      {role === 'seller' && <SellerView />}
      {role === 'admin' && <AdminView />}
      
      {/* Global Elements */}
      <Toast />
      <Modal />
    </>
  );
};

function App() {
  // Detect if pathname is deployed subfolder e.g. /shop/
  const basename = window.location.pathname.startsWith('/shop') ? '/shop' : '/';

  return (
    <BrowserRouter basename={basename}>
      <DeskSetProvider>
        <MainApp />
      </DeskSetProvider>
    </BrowserRouter>
  );
}

export default App;
