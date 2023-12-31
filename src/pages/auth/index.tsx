import { useState } from 'react';
import AuthLeftElement from '@components/AuthLeftElement';
import './style.less';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ChatBotLogo } from '@assets/icons';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import AppearLayout from '@layouts/AppearLayout';
const AuthPage = () => {
   const navigate = useNavigate();
   const [searchParam] = useSearchParams();
   const [action, setAction] = useState(searchParam.get('action'));
   useEffect(() => {
      const temp = searchParam.get('action');
      if (temp !== null && (temp.toString() === 'login' || temp.toString() === 'register')) {
         setAction(temp);
      } else {
         navigate('/', { replace: true });
      }
   }, [window.location.search]);
   return (
      <AppearLayout className="auth">
         <AuthLeftElement
            title={
               action === 'login' ? (
                  <>
                     Log in to all your <b>{' text| '}</b>
                     products
                  </>
               ) : (
                  <>
                     One account for all {<b>{' text| '}</b>}
                     products{' '}
                  </>
               )
            }
         />
         <div className="right-element">
            <div className="logo" onClick={() => navigate('/')}>
               <ChatBotLogo />
            </div>
            <span className="title">
               {action === 'login' ? 'Login' : 'Create your free account'}
            </span>

            {action === 'login' ? <LoginForm /> : <RegisterForm />}
            {
               <span className="sign-up">
                  {action === 'login' ? 'Need new account?' : 'Already have an account?'}
                  <Link to={action === 'login' ? '?action=register' : '?action=login'}>
                     {action === 'login' ? ' Sign up free' : ' Log in'}
                  </Link>
               </span>
            }
         </div>
      </AppearLayout>
   );
};

export default AuthPage;
