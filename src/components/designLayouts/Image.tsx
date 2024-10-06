/* eslint-disable */

const Image = ({
  imgSrc,
  className,
}: {
  imgSrc: string;
  className?: string;
}) => {
  return <img className={className} src={imgSrc} alt={imgSrc} />;
};

export default Image;
