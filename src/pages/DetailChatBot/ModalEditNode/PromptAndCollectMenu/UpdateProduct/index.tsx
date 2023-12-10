import { DeleteOutlined, EditOutlined, FileImageFilled } from '@ant-design/icons';
import { PromptCollectData, tProduct } from '@pages/DetailChatBot/CustomNode/PromptCollectNode';
import React, { useState } from 'react';

import './style.less';
import { Button, Popconfirm, Space } from 'antd';
import { Node } from 'reactflow';
import ModalUpdate from './ModalUpdate';
type UpdateProductProps = tProduct & {
   index: number;
   innerNode: Node<PromptCollectData>;
   setInnerNode: (node: Node<PromptCollectData>) => void;
};
const UpdateProduct: React.FC<UpdateProductProps> = (props) => {
   const { innerNode, setInnerNode, index } = props;
   const [openModalUpdate, setOpenModalUpdate] = useState(false);
   return (
      <div className="update-product-container">
         <ModalUpdate
            index={index}
            innerNode={innerNode}
            setInnerNode={(node) => setInnerNode(node)}
            setOpenModal={(b) => {
               setOpenModalUpdate(b);
            }}
            open={openModalUpdate}
         />
         <div className="img">
            <FileImageFilled />
         </div>
         <div className="title" />
         <div className="title" />
         <Space className="list-btn" align="center" size={4}>
            <Button style={{ width: '100%' }} onClick={() => setOpenModalUpdate(true)}>
               <EditOutlined />
            </Button>
            <Popconfirm
               title="Are you sure to delete it?"
               description="Any changes you made will be deleted and can't recovery! "
               onConfirm={() => {
                  setInnerNode({
                     ...innerNode,
                     data: {
                        ...innerNode.data,
                        extend: innerNode.data.extend.filter((_, i) => {
                           return i !== index;
                        }),
                     },
                  });
               }}>
               <Button style={{ width: '100%' }}>
                  <DeleteOutlined />
               </Button>
            </Popconfirm>
         </Space>
      </div>
   );
};

export default UpdateProduct;
