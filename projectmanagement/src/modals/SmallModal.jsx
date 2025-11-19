import CustomModal from './CustomModal';

function SmallModal() {
  return (
    <CustomModal 
      buttonText="Small Modal"
      modalTitle="Confirm"
      size="small"
    >
      <p>Are you sure you want to proceed?</p>
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <button>Cancel</button>
        <button style={{ 
          backgroundColor: '#0c1116ff', 
          color: 'white', 
          border: 'none', 
          padding: '8px 16px', 
          borderRadius: '4px' 
        }}>
          Confirm
        </button>
      </div>
    </CustomModal>
  );
}

export default SmallModal;