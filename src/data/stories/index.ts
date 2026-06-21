import { Story } from '../../types';
import { adamStories } from './adam';
import { noahHoodSalehStories } from './noah_hood_saleh';
import { ibrahimLotJosephStories } from './ibrahim_lot_joseph';
import { ayoubYounusShuaibStories } from './ayoub_younus_shuaib';
import { moussaSolaimanDawoodStories } from './moussa_solaiman_dawood';
import { essaStories } from './essa';
import { mohammadStories } from './mohammad';

export const STORIES: Story[] = [
  ...adamStories,
  ...noahHoodSalehStories,
  ...ibrahimLotJosephStories,
  ...ayoubYounusShuaibStories,
  ...moussaSolaimanDawoodStories,
  ...essaStories,
  ...mohammadStories
];

export default STORIES;
