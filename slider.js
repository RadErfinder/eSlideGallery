class eSlideGallery {
    constructor (selector, params={}) {
        this.count = 5; //1
        this.containCount = 2; //0
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

        this.galleryBox = document.createElement('div');
        this.galleryBox.classList.add('__eslidegallery-container');
        this.galleryBox.classList.add('__eslidegallery-oneway-'+this.oneWayCount);
        this.galleryBox.classList.add('__eslidegallery-backway-'+this.backWayCount);
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


        this.container.append(this.galleryBox);
        
        console.log(this.imageList);
        console.log(this.parity);
    }
}