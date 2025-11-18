import CustomModal from './CustomModal';

function App() {
  return (
    <CustomModal 
      buttonText="Full Screen Modal"
      modalTitle="Full Screen View"
      size="full"
      overlayStyle="dark"
    >
      <p>This modal takes up most of the screen.</p>
      <p>Perfect for detailed content or forms.</p>
    </CustomModal>
  );
}

export default App;