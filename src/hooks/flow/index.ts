import { tListNodeData } from '@pages/DetailChatBot/CustomNode';
import { Edge, Node } from 'reactflow';

export type iFlowParams = Pick<iFlow, 'name' | 'flowType'>;

export interface iFlow {
   id: number;
   name: string;
   flowType: iFlowType;
   status: null;
   diagram: Node<tListNodeData>[];
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
   value: string;
   label: string;
   default: boolean;
}

export interface iAttributes {
   label: string;
   value: string;
}
