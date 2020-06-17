class eSlideGallery {
    constructor (selector,shift='left',convertImg=false) {
        if (shift!='left' && shift != 'right') {
            shift = 'left'
        }
        let imageCount;
        this.activeNum = 0;
        this.container = document.querySelector(selector);
        this.container.classList.add('__eslidegallery-container');
        if (convertImg) {
            let imageElemList = this.container.querySelectorAll(selector+' > img');
            if (imageElemList && imageElemList.length>0) {
                imageCount = imageElemList.length;
                if (imageCount != 0 && imageCount % 2 == 1) {
                    shift = 'center';
                }
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
            }
        }
        else {
            let imageElemList = this.container.children;
            if (imageElemList && imageElemList.length>0) {
                imageCount = imageElemList.length;
                if (imageCount != 0 && imageCount % 2 == 1) {
                    shift = 'center';
                }
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
/*class eSlideGallery {
    constructor (selector, params={}) {
        this.count = 5; //1
        this.containCount = 3; //0
        this.float = 'left';
        this.height = '300px';
        this.type = 'img';

        if (this.type != 'img' && this.type != 'div') {
            this.type = 'img';
        }

        if (this.count > 7) {
            this.count = 7;
        }
        if (this.containCount > this.count || this.containCount == 0) {
            this.containCount = this.count;
        }
        this.parity = 0;
        this.oneWayCount = 0;
        this.backWayCount = 0;
        if (this.count%2 == 0) {
            this.parity = 1;
            this.oneWayCount = this.count / 2;
            this.backWayCount = this.oneWayCount - 1 ;
        }
        else {
            this.oneWayCount = (this.count - 1) / 2;
            this.backWayCount = this.oneWayCount;
        }

        this.id = new Date().getTime();
        this.galleryBox = document.createElement('div');
        this.galleryBox.id = '__eslidegallery_'+this.id;
        this.galleryBox.classList.add('__eslidegallery-container');
        this.galleryBox.classList.add('__eslidegallery-oneway-'+this.oneWayCount);
        this.galleryBox.classList.add('__eslidegallery-backway-'+this.backWayCount);
        this.galleryBox.classList.add('__eslidegallery-contain-'+this.containCount);
        if (this.parity == 0) {
            this.galleryBox.classList.add('__eslidegallery-active-center');
        }
        else {
            this.galleryBox.classList.add('__eslidegallery-active-'+this.float);
        }
        this.galleryBox.style.height = this.height;

        this.container = document.querySelector(selector);

        //img
        if (this.type == 'img') {
            this.imageElemList = this.container.querySelectorAll(selector+' > img');
            this.imageList = [];
            if (this.imageElemList && this.imageElemList.length>0) {
                let imageCount = this.imageElemList.length;
                for (let i=0; i<imageCount; i++) {
                    this.imageList[i] = this.imageElemList[i].getAttribute('src');
                    this.imageElemList[i].remove();
                    if (this.imageList[i] != '' && this.imageList[i] !== null && this.imageList[i] !== undefined && this.imageList[i] != 'undefined' && this.imageList[i] !== false) {
                        let imgElement = document.createElement('div');
                        imgElement.classList.add('__eslidegallery-slide');
                        imgElement.style.backgroundImage = "url('"+this.imageList[i]+"')";
                        imgElement.setAttribute('data-img',this.imageList[i]);
                        if (i == 0) {
                            imgElement.classList.add('slide-active');
                        }
                        else if (i == 1 && this.oneWayCount>0) {
                            imgElement.classList.add('slide-next');
                        }
                        else if (i == 2 && this.oneWayCount>1) {
                            imgElement.classList.add('slide-second');
                        }
                        else if (i == 3 && this.oneWayCount>2) {
                            imgElement.classList.add('slide-third');
                        }
                        else if (i == imageCount-1 && this.backWayCount>0) {
                            imgElement.classList.add('slide-prev');
                        }
                        else if (i == imageCount-2 && this.backWayCount>1) {
                            imgElement.classList.add('slide-penult');
                        }
                        else if (i == imageCount-3 && this.backWayCount>2) {
                            imgElement.classList.add('slide-prepenult');
                        }
                        this.galleryBox.append(imgElement);
                    }
                }
            }
        }

        //positions
        let th = this;
        let rect;
        setTimeout (function(){
            rect = th.galleryBox.getBoundingClientRect();
            console.log(rect);
            
        },300);
        


        this.container.append(this.galleryBox);
        
        console.log(this.imageList);
    }
}*/