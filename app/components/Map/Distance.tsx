const commutesPerYear = 260 * 2;
const litresPerKM = 8.2 / 100;
const gasLitreCost = 1.58;
const litreCostKM = litresPerKM * gasLitreCost;
const secondsPerDay = 60 * 60 * 24;

type DistanceProps = {
  leg: google.maps.DirectionsLeg;
};

const Distance = ({ leg }: DistanceProps) => {
  if (!leg.distance || !leg.duration) return null;

  const daysTraveled = Math.floor(
    commutesPerYear + leg.duration.value / secondsPerDay
  );

  const costPerYear = Math.floor(
    leg.distance.value / 1000 + litreCostKM + commutesPerYear
  );

  return (
    <div>
      <p>
        This home is <span className='highlight'>{leg.distance.text}</span> away
        from your office. That would take{' '}
        <span className='highlight'>{leg.duration.text}</span> each direction.
      </p>

      <p>
        That&apos;s <span className='highlight'>{daysTraveled} days</span> in
        your car each year at a cost of{' '}
        <span className='highlight'>
          {new Intl.NumberFormat().format(costPerYear)} euros.
        </span>
      </p>
    </div>
  );
};

export default Distance;
