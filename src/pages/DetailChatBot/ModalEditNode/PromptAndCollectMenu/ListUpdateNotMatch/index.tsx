import { CaretDownFilled, PlusOutlined } from '@ant-design/icons';
import { languagesAtom } from '@pages/DetailChatBot';
import { useAtom } from 'jotai';
import React, { useState } from 'react';

import { PromptCollectData } from '@pages/DetailChatBot/CustomNode/PromptCollectNode';
import { Node } from 'reactflow';
import { useForm } from 'antd/es/form/Form';
import { tLanguage } from '@pages/DetailChatBot/CustomNode';
import FormItem from 'antd/es/form/FormItem';
import { Form, Input, Space } from 'antd';
import { iLanguageFollow } from '@hooks/flow';
import UpdateTextNotMatch from './UpdateTextNotMatch';

type ListUpdateNotMatchProps = {
   innerNode: Node<PromptCollectData>;
   setInnerNode: (node: Node<PromptCollectData>) => void;
   item: iLanguageFollow;
};

type FormChatbotResponse = {
   chatbotResponse: string;
   language: tLanguage;
};
const ListUpdateNotMatch: React.FC<ListUpdateNotMatchProps> = (props) => {
   const { innerNode, setInnerNode, item } = props;
   const [isExpand, setIsExpand] = useState(false);
   const curLanguage = innerNode.data.notmatchprompts.find((i) => i.language === item.value);
   return (
      <div className="language-container" key={item.value}>
         <div
            className={'header' + (isExpand ? ' expand' : '')}
            onClick={() => setIsExpand((pre) => !pre)}>
            <span className="label">
               {item.label} - {item.value}
            </span>
            <i className={isExpand ? 'expand' : ''}>
               <CaretDownFilled />
            </i>
         </div>
         <div className={'list-input ' + (isExpand ? ' expand' : '')}>
            <UpdateTextNotMatch
               innerNode={innerNode}
               curUpdateText={{ language: item.value, message: curLanguage?.message ?? '' }}
               setInnerNode={(n) => setInnerNode(n)}
               key={item.value}
            />
         </div>
      </div>
   );
};

export default ListUpdateNotMatch;
