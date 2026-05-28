import React, { useContext } from 'react';
import { DeskSetProvider, DeskSetContext } from './context/DeskSetContext';
import ConsumerView from './views/ConsumerView';
import SellerView from './views/SellerView';
import AdminView from './views/AdminView';
import Toast from './components/common/Toast';
import Modal from './components/common/Modal';
import './styles/global.css';

const MainApp = () => {
  const { role, switchRole } = useContext(DeskSetContext);

  return (
    <>
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
  return (
    <DeskSetProvider>
      <MainApp />
    </DeskSetProvider>
  );
}

export default App;
