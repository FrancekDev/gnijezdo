interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className='text-2xl font-bold text-blu'>{title}</div>
      <div className='mb-5 mt-2 font-light text-neutral-500'>{subtitle}</div>
    </div>
  );
};

export default Heading;
