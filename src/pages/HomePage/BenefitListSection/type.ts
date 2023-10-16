import Marketing from '@assets/images/marketing.png';
import Sales from '@assets/images/sales.png';
import Support from '@assets/images/support.png';
import { iBenefitItem } from './BenefitItem';
export const listBenefit: iBenefitItem[] = [
   {
      title: 'Power up your marketing Power up your marketing Power up your marketing',
      listContent: [
         'Personalize your customer experience.',
         'Engage prospects and customers across multiple communication channels.',
      ],
      purpose: 'Benefits for Marketing',
      image: Marketing,
   },
   {
      title: 'Supercharge your sales',
      listContent: [
         'Scale your efforts without increasing employee headcount.',
         'Generate and qualify leads automatically.',
      ],
      purpose: 'Benefits for Sales',
      image: Sales,
   },
   {
      title: 'Optimize your support',
      listContent: ['Keep your customer support going after hours.', 'Improve resolution times.'],
      purpose: 'Benefits for Support',
      image: Support,
   },
];
