import { Alert, Button, Modal, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useBlocker } from "react-router-dom";

type CustomPromptProps = {
   isBlocked: boolean;
   title?: string;
   subTitle?: string;
   leaveClick?: () => void;
   stayClick?: () => void;
};

const CustomPrompt: React.FC<CustomPromptProps> = (props) => {
   const { isBlocked, title, subTitle, leaveClick, stayClick } = props;
   const [isModalOpen, setIsModalOpen] = useState(false);

   const blocker = useBlocker(isBlocked);

   useEffect(() => {
      if (blocker.state === "blocked" && !isBlocked) {
         blocker.reset();
      }
      if (isBlocked && blocker.state === "blocked") showModal();
      const beforeunload = (event: BeforeUnloadEvent) => {
         if (isBlocked) {
            event.preventDefault();
            event.returnValue = "";
         } else return null;
      };

      window.addEventListener("beforeunload", beforeunload);
      return () => {
         window.removeEventListener("beforeunload", beforeunload);
      };
   }, [blocker, isBlocked]);

   const showModal = () => {
      setIsModalOpen(true);
   };

   const handleSave = () => {
      setIsModalOpen(false);
      leaveClick?.();
      blocker.proceed?.();
   };

   const handleCancel = () => {
      setIsModalOpen(false);
      stayClick?.();
      blocker.reset?.();
   };

   return (
      <Modal
         maskClosable={false}
         title={title || "No title"}
         open={isModalOpen}
         onCancel={handleCancel}
         footer={[
            <Button key="stay" onClick={handleCancel}>
               Stay
            </Button>,
            <Button key="leave" type="primary" onClick={handleSave}>
               Leave
            </Button>,
         ]}>
         {subTitle && <p>{subTitle}</p>}
      </Modal>
   );
};

export default CustomPrompt;
