class eSlideGallery {
    constructor (selector,shift='center',convertImg=false,additional='') {
        if (shift!='left' && shift != 'right' && shift != 'center') {
            shift = 'center'
        }
        this.imageCount;
        //this.activeNum = 0;
        this.position = 1;
        this.container = document.querySelector(selector);
        this.container.classList.add('__eslidegallery-container');

        let activePosition = 2;
        if (shift=='left') {
            activePosition = 1;
        }

        if (convertImg) {
            let imageElemList = this.container.querySelectorAll(selector+' > img');
            if (imageElemList && imageElemList.length>0) {
                this.imageCount = imageElemList.length;
                /*if (this.imageCount != 0 && this.imageCount % 2 == 1) {
                    shift = 'center';
                }*/
                /*this.activeNum = Math.floor(this.imageCount/2);
                if (shift == 'left') {
                    this.activeNum = this.activeNum - 1;
                }*/
                for (let i=0; i<this.imageCount; i++) {
                    let imgSrc = imageElemList[i].getAttribute('src');
                    imageElemList[i].remove();
                    if (imgSrc != '' && imgSrc !== null && imgSrc !== undefined && imgSrc != 'undefined' && imgSrc !== false) {
                        let imgElement = document.createElement('div');
                        imgElement.classList.add('__eslidegallery-slide');
                        imgElement.style.backgroundImage = "url('"+imgSrc+"')";
                        imgElement.setAttribute('data-img',imgSrc);
                        /*if (i == this.activeNum) {
                            imgElement.classList.add('__eslidegallery-active');
                        }*/
                        this.container.append(imgElement);
                    }
                }
                if (shift == 'left') {
                    this.container.prepend(this.container.querySelector('.__eslidegallery-slide:last-child'));
                }
                else if (shift == 'right') {
                    this.container.prepend(this.container.querySelector('.__eslidegallery-slide:last-child'));
                    this.container.prepend(this.container.querySelector('.__eslidegallery-slide:last-child'));
                }
                else if (shift == 'center') {
                    this.container.prepend(this.container.querySelector('.__eslidegallery-slide:last-child'));
                    this.container.prepend(this.container.querySelector('.__eslidegallery-slide:last-child'));
                }
            }
        }
        else {
            let imageElemList = this.container.children;
            if (imageElemList && imageElemList.length>0) {
                this.imageCount = imageElemList.length;
                /*if (this.imageCount != 0 && this.imageCount % 2 == 1) {
                    shift = 'center';
                }*/
                /*this.activeNum = Math.floor(this.imageCount/2);
                if (shift == 'left') {
                    this.activeNum = this.activeNum - 1;
                }*/
                for (let i=0; i<this.imageCount; i++) {
                    imageElemList[i].classList.add('__eslidegallery-slide');
                    /*if (i == this.activeNum) {
                        imageElemList[i].classList.add('__eslidegallery-active');
                    }*/
                }
                if (shift == 'left') {
                    this.container.prepend(this.container.querySelector('.__eslidegallery-slide:last-child'));
                }
                else if (shift == 'right') {
                    this.container.prepend(this.container.querySelector('.__eslidegallery-slide:last-child'));
                    this.container.prepend(this.container.querySelector('.__eslidegallery-slide:last-child'));
                }
                else if (shift == 'center') {
                    this.container.prepend(this.container.querySelector('.__eslidegallery-slide:last-child'));
                    this.container.prepend(this.container.querySelector('.__eslidegallery-slide:last-child'));
                }
            }
        }

        this.container.setAttribute('data-count',this.imageCount);
        this.container.setAttribute('data-position',this.position);

        /* touch */
        let th = this;
        this.winWith = document.documentElement.clientWidth;
        this.moveKoef = this.winWith/100;
        this.touchMaxMove = this.winWith*.3 > 100 ? 100 : parseInt(this.winWith*.3);
        this.touchStart = 0;
        this.touchCurrent = 0;
        this.touchEnd = 0;
        this.container.addEventListener('touchstart',function(e){
            th.touchStart = th.touchCurrent = th.touchEnd = e.touches[0].pageX;
        },false);

        this.container.addEventListener('touchend',function(e){
            th.touchEnd = th.touchCurrent;
            let touchMoving = th.touchEnd - th.touchStart;
            if (touchMoving > th.touchMaxMove) {
                th.prev();
            }
            else if (touchMoving < -1*th.touchMaxMove) {
                th.next();
            }
            let imageElemList = th.container.children;
            for (let i=0; i<imageElemList.length; i++) {
                imageElemList[i].style.transform = '';
            }
        },false);

        this.container.addEventListener('touchmove',function(e){
            th.touchCurrent = e.touches[0].pageX;
            let touchMoving = th.touchCurrent - th.touchStart;
            th.move(touchMoving);
        },false);

        this.container.addEventListener('touchcancel',function(e){
            th.touchStart = 0;
            th.touchCurrent = 0;
            th.touchEnd = 0;
            let imageElemList = th.container.children;
            for (let i=0; i<imageElemList.length; i++) {
                imageElemList[i].style.transform = '';
            }
        },false);


        this.move = function (mov) {
            let moving = mov/this.moveKoef
            let styleMove = '+ '+moving;
            if (moving<0) {
                styleMove = '- '+moving;
            }
            th.container.children[activePosition].style.transform = 'translateX(' + moving + 'px)';
        }



        /*this.activeNum = Math.floor(this.imageCount/2) + 1;
        if (shift == 'left') {
            this.activeNum = this.activeNum - 1;
        }
        
        this.container.querySelector('.__eslidegallery-slide:nth-child('+this.activeNum+')').classList.add('__eslidegallery-active');*/

        this.container.classList.add('__eslidegallery-'+shift);

        this.next = function() {
            this.container.append(this.container.querySelector('.__eslidegallery-slide:first-child'));
            this.position++;
            if (this.position > this.imageCount) {
                this.position = 1;
            }
            this.container.setAttribute('data-position',this.position);
            return this.position;
            /*this.container.querySelector('.__eslidegallery-slide').classList.remove('__eslidegallery-active');
            this.container.querySelector('.__eslidegallery-slide:nth-child('+this.activeNum+')').classList.add('__eslidegallery-active');*/
        }

        this.prev = function() {
            this.container.prepend(this.container.querySelector('.__eslidegallery-slide:last-child'));
            this.position--;
            if (this.position < 1) {
                this.position = this.imageCount;
            }
            this.container.setAttribute('data-position',this.position);
            return this.position;
            /*this.container.querySelector('.__eslidegallery-slide').classList.remove('__eslidegallery-active');
            this.container.querySelector('.__eslidegallery-slide:nth-child('+this.activeNum+')').classList.add('__eslidegallery-active');*/
        }
    }
}