import CustomModal from './CustomModal';

function LargeModal() {
  return (
    <CustomModal 
      buttonText="Large Modal"
      modalTitle="Data Table"
      size="large"
    >
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid #ddd' }}>Name</th>
            <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid #ddd' }}>Email</th>
            <th style={{ textAlign: 'left', padding: '8px', borderBottom: '2px solid #ddd' }}>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '8px', borderBottom: '5px solid #0f0f0fff' }}>John Doe</td>
            <td style={{ padding: '8px', borderBottom: '1px solid #101010ff' }}>john@example.com</td>
            <td style={{ padding: '8px', borderBottom: '1px solid #060606ff' }}>Admin</td>
          </tr>
        </tbody>
      </table>
    </CustomModal>
  );
}

export default LargeModal;