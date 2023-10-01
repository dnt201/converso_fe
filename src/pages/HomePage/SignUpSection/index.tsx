import videoDemo from '@assets/video/chatbot-home-app.mp4';
import { CheckOutlined } from '@ant-design/icons';
import ContactForm from '@components/contact-form';
import './style.less';
const SignUpSection = () => {
   return (
      <div className="sign-up-section">
         <div className="left-container">
            <h1>
               With ChatBot, automating customer service is a{' '}
               <span className="text-mark">breeze</span>
            </h1>
            <span>
               An all-in-one platform to build and launch conversational chatbots without coding.
            </span>
            <ContactForm />
            <div className="slogan-container">
               <div className="slogan-item">
                  <CheckOutlined style={{ fontSize: '10px', fontWeight: 'bold' }} /> Free 14-day
                  trial
               </div>
               <div className="slogan-item">
                  <CheckOutlined style={{ fontSize: '10px', fontWeight: 'bold' }} /> No required
                  credit card
               </div>
            </div>
         </div>
         {/* right */}
         <div className="right-container">
            <video preload="none" autoPlay loop muted src={videoDemo} />
         </div>
      </div>
   );
};

export default SignUpSection;
