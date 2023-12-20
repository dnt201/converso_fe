import { tLanguage, tListNodeData } from '@pages/DetailChatBot/CustomNode';
import { Edge, Node } from 'reactflow';

export type iFlowParams = Pick<iFlow, 'name' | 'flowType'>;

export interface iFlow {
   id: string;
   name: string;
   flowType: iFlowType;
   status: null;
   diagram: string; // Node<tListNodeData>[]; //Trust backend - parse
   edges: string; //Edge<any>[];
   settings: string;

   // {
   //    language: string; // iLanguageFollow[];
   // };
   attributes: iAttributes[];
   flow: tListNodeData[];
   publishedFlow: null;
   isPublished: boolean;
   userId: number;
   createdAt: string;
   updatedAt: string;
}

export interface iFLowPut {
   id: string;
   name: string;
   flowType: iFlowType;
   status: null;
   diagram: Node<tListNodeData>[]; //Trust backend - parse
   edges: Edge<any>[];
   settings: {
      language: iLanguageFollow[];
   };
   attributes: iAttributes[];
   flow: tListNodeData[];
   publishedFlow: null;
   isPublished: boolean;
   userId: number;
   createdAt: string;
   updatedAt: string;
}
export type iFlowType = 'MSG';

export interface iLanguageFollow {
   value: tLanguage;
   label: string;
   default: boolean;
}

export interface iAttributes {
   label: string;
   value: string;
}
