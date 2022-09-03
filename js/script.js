
import SlideNav from './slide.js';


/* args: chamada da lista (ul) de slides, chamada do bloco wrapper da lista de slides. */
const slide = new SlideNav('.slide', '.slide-wrapper', '.prev', '.next', '.custom-control');
slide.init();
