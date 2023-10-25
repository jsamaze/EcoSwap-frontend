import placeholder from '../assets/images/scott-lord-PiqZfESKt3k-unsplash.jpg'
import pinPicture from './images/EMOJICON.png'
export {placeholder,pinPicture}

import iconRetinaUrl from  'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

import L from 'leaflet'

L.Icon.Default.mergeOptions({
    iconRetinaUrl: iconRetinaUrl,
    iconUrl: iconUrl,
    shadowUrl: shadowUrl,
 });