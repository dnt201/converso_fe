import { HttpRequestData } from '@pages/DetailChatBot/CustomNode/HttpRequestNode';
import { listVariableAtom } from '@pages/DetailChatBot/VariablesModal';
import { Divider, Select } from 'antd';
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
         <Divider orientation="left">
            <h5>Set response</h5>
         </Divider>
         <div style={{ margin: '4px 0px 4px 4px' }}>Response </div>
         <Select
            style={{ width: '100%' }}
            placeholder="Select variable to contain your response!"
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
