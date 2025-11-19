import CustomModal from './CustomModal';

function DefaultModal() {
  return (
    <CustomModal 
      buttonText="Default Modal"
      modalTitle="Welcome"
    >
      <p>This is a default centered modal with standard styling.</p>
    </CustomModal>
  );
}

export default DefaultModal;