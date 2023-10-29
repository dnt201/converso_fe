import './style.less';

const AuthLeftElement: React.FC<{ title: React.ReactNode }> = ({ title }) => {
   return (
      <div className="auth-left-element">
         <span className="title">{title}</span>

         <div className="list-element">
            <div>
               <div className="live-chat" />
               <span>Connect with customers</span>
            </div>
            <div>
               <div className="chat-bot" />
               <span>Automate customer service with AI</span>
            </div>
            <div>
               <div className="help-desk" />
               <span>Support customers with tickets</span>
            </div>
            <div>
               <div className="knowledge-base" />
               <span>Improve support with customer self-service</span>
            </div>
         </div>
         <div className="footer">
            <div className="logo-container">
               <div className="logo" />
            </div>
            <p>
               ChatBot is an all-in-one platform that automates customer service by using
               conversational AI. <span className="learn-more">Learn more</span>
            </p>
         </div>
      </div>
   );
};

export default AuthLeftElement;
