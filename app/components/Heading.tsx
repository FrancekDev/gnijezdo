interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div
        className='
        text-center
        text-base 
        font-semibold 
        text-blu'
      >
        {title}
      </div>
      <div className='mt-2 text-center font-light text-neutral-500'>
        {subtitle}
      </div>
    </div>
  );
};

export default Heading;
