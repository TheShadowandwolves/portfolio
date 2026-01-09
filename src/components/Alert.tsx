interface AlertProps {
    children: React.ReactNode;
    type?: 'success' | 'error' | 'warning' | 'info';
    onClose: () => void;
}

const Alert = ({ children, type = 'info', onClose }: AlertProps) => {
  const alertClass = `alert alert-${type} alert-dismissible`;
  return (
    <div className={alertClass}>
        {children}
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}>X</button>
    </div>
    
  )
}

export default Alert