import BenefitListSection from './BenefitListSection';
import SignUpSection from './SignUpSection';
import './style.less';

const HomePage = () => {
   return (
      <div className="home-page">
         <SignUpSection />
         <BenefitListSection />
      </div>
   );
};

export default HomePage;
