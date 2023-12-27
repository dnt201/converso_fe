import { DeleteOutlined } from '@ant-design/icons';
import { Button, Input, InputProps, InputRef } from 'antd';
import React, { useRef } from 'react';

type CustomInputType = InputProps & {
   onSave: (e: string) => void;
   onDelete: () => void;
};

const CustomInput: React.FC<CustomInputType> = (props) => {
   const { onSave, onDelete, ...inputProps } = props;
   const inputRef = useRef<InputRef>(undefined);

   return (
      <div style={{ display: 'flex', gap: 4 }}>
         <Input
            ref={inputRef}
            onKeyDown={(e) => {
               if (e.code === 'Enter') {
                  if (!inputRef.current || inputRef.current.input.value.toString().length <= 0) {
                     onDelete();
                  } else {
                     onSave(inputRef.current.input.value.toString());
                  }
               }
            }}
            onBlur={() => {
               if (!inputRef.current || inputRef.current.input.value.toString().length <= 0) {
                  onDelete();
               } else {
                  onSave(inputRef.current.input.value.toString());
               }
            }}
            placeholder="Enter value"
            {...inputProps}
         />
         <Button onClick={() => onDelete()} danger>
            <DeleteOutlined />
         </Button>
      </div>
   );
};
export default CustomInput;
