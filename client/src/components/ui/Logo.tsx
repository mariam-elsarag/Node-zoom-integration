import { VideoIcon } from "../../assets/Icon";

interface logoType {
  className?: string;
}
const Logo: React.FC<logoType> = ({ className }) => {
  return (
    <div className={`flex_center gap-2 ${className} `}>
      <span className="flex_center logo_linear w-[32px] h-[30px] rounded-lg">
        <VideoIcon />
      </span>
      <span className="text-lg font-bold tracking-[2px] uppercase">
        Meeting
      </span>
    </div>
  );
};

export default Logo;
