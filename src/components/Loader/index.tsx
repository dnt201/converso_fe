import './style.less';
import IMAGE from '/src/favicon.ico';
const Loader = () => {
   return (
      <div className="loader-wrapper">
         <img src={IMAGE} />
         <svg>
            <rect x="1" y="1"></rect>
         </svg>
      </div>
   );
};

export default Loader;
