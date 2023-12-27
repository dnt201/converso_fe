export type iIntentDetail = {
   intent: string;
   prompts: string[];
};
export type iIntent = {
   id: number;
   referenceId: string;
   name: string;
   intents: string; //iIntentDetail[];
   entities: null;
   userId: number;
   createdAt: string;
   updatedAt: string;
};

export type iIntentCreate = {
   refId: string; //Id
   name: string;
   intents: iIntentDetail[];
};
