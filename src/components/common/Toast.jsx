import React, { useContext } from 'react';
import { DeskSetContext } from '../../context/DeskSetContext';

const Toast = () => {
  const { toast } = useContext(DeskSetContext);
  
  if (!toast.show) return null;

  const isWarning = toast.message?.includes("로그인") || toast.message?.includes("실패") || toast.message?.includes("확인");

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        background: '#1E293B',
        color: '#F8FAFC',
        padding: '16px 24px',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        zIndex: 9999,
        border: '1px solid rgba(255, 255, 255, 0.08)',
        animation: 'toast-fade-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <style>{`
        @keyframes toast-fade-in {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
      <div 
        style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: isWarning ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
          color: isWarning ? '#EF4444' : '#10B981',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '14px',
          flexShrink: 0
        }}
      >
        {isWarning ? '!' : '✓'}
      </div>
      <span style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '-0.3px' }}>
        {toast.message}
      </span>
    </div>
  );
};

export default Toast;
