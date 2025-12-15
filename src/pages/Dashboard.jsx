import { useReadings } from '../hooks/useReadings';
import { MapView } from '../components/MapView';
import { FireScoreCard } from '../components/FireScoreCard';
import { SensorGrid } from '../components/SensorGrid';

/**
 * Dashboard - Main dashboard page with map and sensor readings
 */
export const Dashboard = () => {
  const readings = useReadings();

  const fireScore = readings?.fire_score ?? null;
  const latitude = readings?.latitude ?? null;
  const longitude = readings?.longitude ?? null;
  const timestamp = readings?.timestamp ?? null;

  return (
    <div className="dashboard">
      <div className="dashboard__map">
        <MapView 
          latitude={latitude} 
          longitude={longitude} 
          fireScore={fireScore}
        />
      </div>
      
      <div className="dashboard__panels">
        <div className="dashboard__panels-content">
          <FireScoreCard fireScore={fireScore} timestamp={timestamp} />
          <SensorGrid readings={readings} />
        </div>
      </div>
    </div>
  );
};

