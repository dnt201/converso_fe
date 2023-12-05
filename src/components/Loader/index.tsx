import './style.less';
import IMAGE from '/src/favicon.ico';
const Loader = () => {
   return (
      <div className="loader-wrapper">
         <img src={IMAGE} />
         <div className="dot-flashing"></div>
      </div>
   );
};

export default Loader;
