import { HttpRequestData } from '@pages/DetailChatBot/CustomNode/HttpRequestNode';
import { listVariableAtom } from '@pages/DetailChatBot/VariablesModal';
import { Select } from 'antd';
import { useAtom } from 'jotai';
import React from 'react';
import { Node } from 'reactflow';

type ResponseEditProps = {
   innerNode: Node<HttpRequestData>;
   setInnerNode: (node: Node<HttpRequestData>) => void;
};
const ResponseEdit: React.FC<ResponseEditProps> = (props) => {
   const { innerNode, setInnerNode } = props;
   const [listVariable] = useAtom(listVariableAtom);

   return (
      <div>
         <Select
            options={listVariable.map((item) => item)}
            defaultValue={innerNode.data.response}
            onSelect={(v) => {
               setInnerNode({
                  ...innerNode,
                  data: { ...innerNode.data, response: v },
               });
            }}
         />
      </div>
   );
};

export default ResponseEdit;
