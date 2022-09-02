export default class Slide{
    constructor(slide, wrapper){
        this.slide = document.querySelector(slide);
        this.wrapper = document.querySelector(wrapper);

        this.dist = {
            finalPosition: 0,
            startX: 0,
            movement: 0,
        };
    }

    moveSlide(distX){
        this.dist.movePosition = distX;
        this.slide.style.transform = `translate3d(${distX}px, 0px, 0px)`;
    }

    updatePosition(clientX){
        this.dist.movement = (clientX - this.dist.startX)*1.6;
        return this.dist.finalPosition + this.dist.movement;
    }

    onStart(event){
        let moveType;
        if(event.type === 'mousedown'){
            event.preventDefault();
            this.dist.startX = event.clientX;
            moveType = 'mousemove';
        }else{
            this.dist.startX = event.changedTouches[0].clientX;
            moveType = 'touchmove';
        }
        this.wrapper.addEventListener(moveType, this.onMove);
    }

    onMove(event){
        const pointerPosition = (event.type ==='mousemove')? event.clientX : event.changedTouches[0].clientX;
        const finalPosition = this.updatePosition(pointerPosition);
        this.moveSlide(finalPosition);
    }

    onEnd(event){
        const eventType = (event.type === 'mouseup') ? 'mousemove' : 'touchmove';
        this.wrapper.removeEventListener(eventType, this.onMove);
        this.dist.finalPosition = this.dist.movePosition;
    }

    addSlideEvents(){
        this.wrapper.addEventListener('mousedown', this.onStart);
        this.wrapper.addEventListener('mouseup', this.onEnd);
        this.wrapper.addEventListener('touchstart', this.onStart);
        this.wrapper.addEventListener('touchend', this.onEnd);
    }

    bindEvents(){
        this.onStart = this.onStart.bind(this);
        this.onMove = this.onMove.bind(this);
        this.onEnd = this.onEnd.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
    }

    //pega a posicao exata que a imagem deve se mover para ficar centralizado na tela.
    slidePosition(slide){
        //pega a margem esquerda da imagem para que ela fique centralizada na tela
        const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;

        //margemEsquerda - distanciaDaImagemParaBordaDaEsquerda
        return margin - slide.offsetLeft;
    }

    /* retorna um array com objetos que contem o slide e o quanto ele deve se mover para ficar no centro da tela */
    slidesConfig(){
        /* Desestrutura this.slide.children (li's), os coloca dentro de um array e da o map */
        this.slideArray = [...this.slide.children].map((element)=>{
            const position = this.slidePosition(element);;
            return {
                element,
                position,
            }
        });;
    }

    slideIndexNav(index){
        const last = this.slideArray.length - 1;
        this.index = {
            prev: index ? index - 1 : 0,
            active: index,
            next: index >= last ? last : index + 1,
        }
    }

    changeSlide(index){
        const activeSlide = this.slideArray[index];
        this.moveSlide(activeSlide.position);
        this.dist.finalPosition = activeSlide.position;
        this.slideIndexNav(index);
        console.log(this.index);
    }

    init(){
        this.bindEvents();
        this.addSlideEvents();
        this.slidesConfig();
        return this;
    }
}