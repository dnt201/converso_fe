import { Input, Modal, ModalProps, Select } from 'antd';
import React from 'react';

interface ModalEditCheckIntentProps extends ModalProps {
   label: string;
   setLabel: (l: string) => void;
}

const listOption: { value: string; label: string }[] = [
   {
      value: 'equal',
      label: 'Equal',
   },
   {
      value: 'not-equal',
      label: 'Not equal',
   },
   {
      value: 'is-less-than',
      label: 'Is less than',
   },
   {
      value: 'is-less-than-or-equal',
      label: 'Is less than or equal',
   },
   {
      value: 'Is greater than',
      label: 'Is greater than or equal',
   },
   {
      value: 'starts-with',
      label: 'Start with',
   },
   {
      value: 'ends-with',
      label: 'Ends with',
   },
   {
      value: 'contains',
      label: 'Contains',
   },
   {
      value: 'Empty',
      label: 'Exist',
   },
];

const ModalEditCheckIntent: React.FC<ModalEditCheckIntentProps> = (props) => {
   const { label, setLabel, ...modalProps } = props;
   return (
      <Modal title="Check Intent" {...modalProps}>
         <div>
            <div>
               <label>Condition</label>
               <Select options={listOption} />
            </div>
            <div>
               <label>Value</label>
               <Input
                  onChange={(e) => {
                     setLabel(e.target.value);
                  }}
               />
            </div>
         </div>
      </Modal>
   );
};

export default ModalEditCheckIntent;
