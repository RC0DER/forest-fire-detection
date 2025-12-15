/**
 * StatusBadge - Displays a status indicator with text
 * @param {string} status - Status text to display
 * @param {string} variant - Color variant: 'success', 'warning', 'danger', or 'default'
 */
export const StatusBadge = ({ status, variant = 'default' }) => {
  const variantStyles = {
    success: 'status-badge--success',
    warning: 'status-badge--warning',
    danger: 'status-badge--danger',
    default: 'status-badge--default'
  };

  return (
    <span className={`status-badge ${variantStyles[variant] || variantStyles.default}`}>
      {status}
    </span>
  );
};

