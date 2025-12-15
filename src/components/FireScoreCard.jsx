import { StatusBadge } from './StatusBadge';

/**
 * FireScoreCard - Displays fire score with color-coded status
 * @param {number} fireScore - Fire score value (0-1)
 * @param {number} timestamp - Last update timestamp
 */
export const FireScoreCard = ({ fireScore, timestamp }) => {
  const getStatus = (score) => {
    if (score === null || score === undefined) return 'default';
    if (score > 0.8) return 'danger';
    if (score > 0.5) return 'warning';
    return 'success';
  };

  const getStatusText = (score) => {
    if (score === null || score === undefined) return 'No Data';
    if (score > 0.8) return 'Critical';
    if (score > 0.5) return 'Warning';
    return 'Safe';
  };

  const formatTimestamp = (ts) => {
    if (!ts) return 'Never';
    const date = new Date(ts);
    return date.toLocaleTimeString();
  };

  const status = getStatus(fireScore);
  const statusText = getStatusText(fireScore);

  return (
    <div className="fire-score-card">
      <div className="fire-score-card__label">Fire Score</div>
      <div className={`fire-score-card__value fire-score-card__value--${status}`}>
        {fireScore !== null && fireScore !== undefined ? fireScore.toFixed(1) : '--'}
      </div>
      <div className="fire-score-card__status">
        <StatusBadge status={statusText} variant={status} />
      </div>
      <div className="fire-score-card__timestamp">
        Last updated: {formatTimestamp(timestamp)}
      </div>
    </div>
  );
};

