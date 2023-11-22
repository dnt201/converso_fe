import { Edge } from 'reactflow';
import PromptCollectEdge from './PromptCollectEdge';
import { iValueEdgePromptCollect } from './ModalEditCheckIntent';

export const edgeTypes = {
   promptCollectEdge: PromptCollectEdge,
};

export type ListEdgeType = iValueEdgePromptCollect;
