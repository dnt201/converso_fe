import './style.less';
import { HTMLProps } from 'react';
interface AppearLayoutProps extends HTMLProps<HTMLDivElement> {}
const AppearLayout: React.FC<AppearLayoutProps> = (props) => {
   return (
      <div {...props} className={'appear-layout ' + props.className}>
         {props.children}
      </div>
   );
};

export default AppearLayout;
