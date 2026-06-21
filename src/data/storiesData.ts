import { Story } from '../types';
import { adamStories } from './stories/adam';
import { noahHoodSalehStories } from './stories/noah_hood_saleh';
import { ibrahimLotJosephStories } from './stories/ibrahim_lot_joseph';
import { ayoubYounusShuaibStories } from './stories/ayoub_younus_shuaib';
import { moussaSolaimanDawoodStories } from './stories/moussa_solaiman_dawood';
import { essaStories } from './stories/essa';
import { mohammadStories } from './stories/mohammad';

export const STORIES: Story[] = [
  ...adamStories,
  ...noahHoodSalehStories,
  ...ibrahimLotJosephStories,
  ...ayoubYounusShuaibStories,
  ...moussaSolaimanDawoodStories,
  ...essaStories,
  ...mohammadStories
];
