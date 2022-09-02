
import Slide from './slide.js';


/* args: chamada da lista (ul) de slides, chamada do bloco wrapper da lista de slides. */
const slide = new Slide('.slide', '.slide-wrapper');
slide.init();
slide.changeSlide(2);