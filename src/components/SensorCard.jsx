/**
 * SensorCard - Displays a single sensor reading
 * @param {string} label - Sensor label
 * @param {number|string} value - Sensor value
 * @param {string} unit - Unit of measurement
 */
export const SensorCard = ({ label, value, unit = '' }) => {
  const displayValue = value !== null && value !== undefined 
    ? typeof value === 'number' 
      ? value.toFixed(1) 
      : value
    : '--';

  return (
    <div className="sensor-card">
      <div className="sensor-card__label">{label}</div>
      <div className="sensor-card__value">
        {displayValue}
        {unit && <span className="sensor-card__unit">{unit}</span>}
      </div>
    </div>
  );
};

