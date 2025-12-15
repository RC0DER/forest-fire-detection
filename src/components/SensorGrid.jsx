import { SensorCard } from './SensorCard';
import { StatusBadge } from './StatusBadge';

/**
 * SensorGrid - Displays all sensor readings in a grid layout
 * @param {Object} readings - Sensor readings object
 */
export const SensorGrid = ({ readings }) => {
  if (!readings) {
    return (
      <div className="sensor-grid sensor-grid--empty">
        <div className="sensor-grid__empty-message">No sensor data available</div>
      </div>
    );
  }

  const { temperature, humidity, mq2, mq135, flame, timestamp } = readings;

  const formatTimestamp = (ts) => {
    if (!ts) return 'Never';
    const date = new Date(ts);
    return date.toLocaleString();
  };

  return (
    <div className="sensor-grid">
      <div className="sensor-grid__header">
        <h2 className="sensor-grid__title">Sensor Readings</h2>
        <div className="sensor-grid__timestamp">
          Last updated: {formatTimestamp(timestamp)}
        </div>
      </div>
      
      <div className="sensor-grid__content">
        <SensorCard label="Temperature" value={temperature} unit="°C" />
        <SensorCard label="Humidity" value={humidity} unit="%" />
        <SensorCard label="MQ-2 (Gas)" value={mq2} unit="ppm" />
        <SensorCard label="MQ-135 (Air Quality)" value={mq135} unit="ppm" />
        
        <div className="sensor-card sensor-card--flame">
          <div className="sensor-card__label">Flame Detection</div>
          <div className="sensor-card__value">
            <StatusBadge 
              status={flame === 1 ? 'ON' : 'OFF'} 
              variant={flame === 1 ? 'danger' : 'success'} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

