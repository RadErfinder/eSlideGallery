class eSlideGallery {
    constructor (selector,shift='center',convertImg=false) {
        if (shift!='left' && shift != 'right' && shift != 'center') {
            shift = 'center'
        }
        let imageCount;
        this.activeNum = 0;
        this.container = document.querySelector(selector);
        this.container.classList.add('__eslidegallery-container');
        if (convertImg) {
            let imageElemList = this.container.querySelectorAll(selector+' > img');
            if (imageElemList && imageElemList.length>0) {
                imageCount = imageElemList.length;
                /*if (imageCount != 0 && imageCount % 2 == 1) {
                    shift = 'center';
                }*/
                /*this.activeNum = Math.floor(imageCount/2);
                if (shift == 'left') {
                    this.activeNum = this.activeNum - 1;
                }*/
                for (let i=0; i<imageCount; i++) {
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
            }
        }
        else {
            let imageElemList = this.container.children;
            if (imageElemList && imageElemList.length>0) {
                imageCount = imageElemList.length;
                /*if (imageCount != 0 && imageCount % 2 == 1) {
                    shift = 'center';
                }*/
                /*this.activeNum = Math.floor(imageCount/2);
                if (shift == 'left') {
                    this.activeNum = this.activeNum - 1;
                }*/
                for (let i=0; i<imageCount; i++) {
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
            }
        }
        /*this.activeNum = Math.floor(imageCount/2) + 1;
        if (shift == 'left') {
            this.activeNum = this.activeNum - 1;
        }
        
        this.container.querySelector('.__eslidegallery-slide:nth-child('+this.activeNum+')').classList.add('__eslidegallery-active');*/

        this.container.classList.add('__eslidegallery-'+shift);

        this.next = function() {
            this.container.append(this.container.querySelector('.__eslidegallery-slide:first-child'));
            /*this.container.querySelector('.__eslidegallery-slide').classList.remove('__eslidegallery-active');
            this.container.querySelector('.__eslidegallery-slide:nth-child('+this.activeNum+')').classList.add('__eslidegallery-active');*/
        }

        this.prev = function() {
            this.container.prepend(this.container.querySelector('.__eslidegallery-slide:last-child'));
            /*this.container.querySelector('.__eslidegallery-slide').classList.remove('__eslidegallery-active');
            this.container.querySelector('.__eslidegallery-slide:nth-child('+this.activeNum+')').classList.add('__eslidegallery-active');*/
        }
    }
}