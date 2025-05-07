import type { Item } from './Navigation.vue'
import {
  Bot,
  MapPin,
} from 'lucide-vue-next'

export const menus: Item[] = [
  {
    title: 'Locations',
    path: '/locations',
    icon: MapPin,
  },
  {
    title: 'Robots',
    path: '/robots',
    icon: Bot,
  },
]
