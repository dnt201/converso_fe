import './style.less';
const ListOptionRegister = () => {
   return (
      <div className="list-option-register">
         <div className="register-option">
            <div className="logo-google" />
            <span>
               Sign up with <b>Google</b>
            </span>
         </div>
         <div className="register-option">
            <div className="logo-microsoft" />
            <span>
               Sign up with <b>Microsoft</b>
            </span>
         </div>
         <div className="register-option">
            <div className="logo-apple" />
            <span>
               Sign up with <b>Apple</b>
            </span>
         </div>
         <div className="register-option">
            <div className="logo-facebook" />
            <span>
               Sign up with <b>Facebook</b>
            </span>
         </div>
      </div>
   );
};

export default ListOptionRegister;
