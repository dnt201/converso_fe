import { Button, Input } from 'antd';
import './style.less';
const ContactForm = () => {
   return (
      <div className="contact-container">
         <Input placeholder="Enter your business mail" />
         <Button type="primary"> Sign Up Free</Button>
      </div>
   );
};

export default ContactForm;
