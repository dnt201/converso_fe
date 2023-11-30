import AppearLayout from '@layouts/AppearLayout';
import BenefitListSection from './BenefitListSection';
import SignUpSection from './SignUpSection';
import './style.less';

const HomePage = () => {
   return (
      <AppearLayout className="home-page">
         <SignUpSection />
         <BenefitListSection />
      </AppearLayout>
   );
};

export default HomePage;
