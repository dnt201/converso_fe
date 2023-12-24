export const extractInfo = (inputString: string) => {
   const lines = inputString.split('\n');
   let price: string | null = null;
   let size: string | null = null;
   let color: string | null = null;
   lines.forEach((line) => {
      if (line.startsWith('Price:')) {
         price = line.split(':')[1].trim();
      } else if (line.startsWith('Size:')) {
         size = line.split(':')[1].trim();
      } else if (line.startsWith('Color:')) {
         color = line.split(':')[1].trim();
      }
   });
   return { price, size, color };
};
