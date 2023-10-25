import placeholder from '../assets/images/scott-lord-PiqZfESKt3k-unsplash.jpg'
import pinPicture from './images/EMOJICON.png'
export {placeholder,pinPicture}

import L from 'leaflet'

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
 });