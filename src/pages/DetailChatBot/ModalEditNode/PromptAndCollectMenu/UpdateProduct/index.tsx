import { DeleteOutlined, EditOutlined, FileImageFilled } from '@ant-design/icons';
import { PromptCollectData, tProduct } from '@pages/DetailChatBot/CustomNode/PromptCollectNode';
import React, { useState } from 'react';

import './style.less';
import { Button, Image, Popconfirm, Space } from 'antd';
import { Node } from 'reactflow';
import ModalUpdate from './ModalUpdate';
import { extractInfo } from '@utils/string';
type UpdateProductProps = tProduct & {
   index: number;
   innerNode: Node<PromptCollectData>;
   setInnerNode: (node: Node<PromptCollectData>) => void;
};
const UpdateProduct: React.FC<UpdateProductProps> = (props) => {
   const { innerNode, setInnerNode, index } = props;
   const curExtendData = innerNode.data.extend[index];
   const { color, quantity, size } = extractInfo(curExtendData.subtitle);
   const [openModalUpdate, setOpenModalUpdate] = useState(false);
   console.log(innerNode);
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
         <div
            className="img"
            style={{
               backgroundColor:
                  curExtendData.image_url && curExtendData.image_url.length > 0 && 'transparent',
            }}>
            {curExtendData.image_url && curExtendData.image_url.length > 0 ? (
               <Image src={curExtendData.image_url} style={{ height: '100%', width: '100%' }} />
            ) : (
               <FileImageFilled />
            )}
         </div>
         {curExtendData.title && curExtendData.title.length > 0 ? (
            <div className="title-container-content">
               <span className="title">{curExtendData.title}</span>
               {quantity ? (
                  <span className="quantity">
                     <Space size={4}>
                        <b>Quantity:</b>
                        {quantity}
                     </Space>
                  </span>
               ) : null}
               {size ? (
                  <span className="size">
                     <Space size={4}>
                        <b>Size:</b>
                        {size}
                     </Space>
                  </span>
               ) : null}
               {color ? (
                  <span className="color">
                     <Space size={4}>
                        <b>Color: </b> {color}
                     </Space>
                  </span>
               ) : null}
            </div>
         ) : (
            <div className="title-container-skeleton">
               <div className="title" />
               <div className="title" />
            </div>
         )}
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
