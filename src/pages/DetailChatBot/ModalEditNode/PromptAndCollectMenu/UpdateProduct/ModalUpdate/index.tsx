import { PromptCollectData } from '@pages/DetailChatBot/CustomNode/PromptCollectNode';
import { Col, Form, Image, Input, Modal, ModalProps, Row, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import React, { useState } from 'react';
import { Node } from 'reactflow';

import './style.less';
import { FileImageFilled } from '@ant-design/icons';
interface ModalUpdateProps extends ModalProps {
   setOpenModal: (b: boolean) => void;
   innerNode: Node<PromptCollectData>;
   index: number;
   setInnerNode: (node: Node<PromptCollectData>) => void;
}
// export type tProduct = {
//    title: string;
//    subtitle: string;
//    image_url: string;
//    default_action: {
//       url: string;
//       type: string;
//       webview_height_ratio: string;
//    };
//    buttons: tButtonInProduct[];
// };
// export type tButtonInProduct = {
//    type: tTypeButtonInProduct;
//    title: string;
//    payload: string;
// };
const ModalUpdate: React.FC<ModalUpdateProps> = (props) => {
   const { setOpenModal, innerNode, setInnerNode, index, ...modalProps } = props;
   const init = props.innerNode.data.extend[index];
   const [form] = useForm();
   const [previewLink, setPreviewLink] = useState<string>(init.image_url);
   const formSubmit = (formValue) => {
      setInnerNode({
         ...innerNode,
         data: {
            ...innerNode.data,
            extend: innerNode.data.extend.map((item, i) => {
               if (i === index) {
                  let subTitle = '';
                  if (formValue.quantity) subTitle += `Quantity: ${formValue.quantity}\n`;
                  if (formValue.size) subTitle += `Size: ${formValue.size}\n`;
                  if (formValue.color) subTitle += `Color: ${formValue.color}\n`;
                  return {
                     title: formValue.title,
                     // subtitle: `${formValue.quantity ?? `Quantity: ${formValue.quantity}`}\n ${formValue.size ?? `Size: ${formValue.size}`,
                     subtitle: subTitle,
                     image_url: formValue.img,
                     default_action: { type: '', url: '', webview_height_ratio: '' },
                     buttons: [],
                  };
               } else return item;
            }),
         },
      });
   };
   return (
      <Modal
         title={<h2>Update item</h2>}
         {...modalProps}
         onCancel={() => setOpenModal(false)}
         className="modal-update"
         onOk={() => {
            form.submit();
         }}>
         <Form
            layout="vertical"
            form={form}
            onFinish={formSubmit}
            initialValues={{
               img: init.image_url,
               title: init.title,
            }}>
            <FormItem name="title" label="Title" required>
               <Input placeholder="Title/name product..." />
            </FormItem>

            <Space>
               <FormItem name="quantity" label="Quantity">
                  <Input placeholder="Ex: 52" />
               </FormItem>
               <FormItem name="size" label="Size">
                  <Input placeholder="Ex: XS" />
               </FormItem>
               <FormItem name="color" label="Color">
                  <Input placeholder="Ex: Black" />
               </FormItem>
            </Space>
            {/*             
            <FormItem name="subTitle" label="Sub-title">
               <Input placeholder="Description abcxyz..." />
            </FormItem> */}
            <div className="form-img-input">
               <FormItem name="img" label="Image" required>
                  <Input
                     placeholder="Description abcxyz..."
                     onChange={(e) => {
                        setPreviewLink(e.target.value);
                     }}
                  />
               </FormItem>
               <div className="img-preview-container">
                  {previewLink ? (
                     <Image preview src={previewLink} style={{ height: 120, width: 120 }} />
                  ) : (
                     <div className="img">
                        <FileImageFilled />
                     </div>
                  )}
               </div>
            </div>
         </Form>
      </Modal>
   );
};

export default ModalUpdate;
