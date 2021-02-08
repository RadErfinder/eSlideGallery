/**
Copyright 2020 Maxim Klassen

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */
class eSlideGallery {
    constructor (selector, params = {shift: 'center', convertImg: false, dots: null, dotClick: false, imgClick: false}) {
        if (params.shift!='left' && params.shift != 'right' && params.shift != 'center') {
            params.shift = 'center'
        }
        if (params.convertImg === undefined) {
            params.convertImg = false;
        }
        if (params.dots === undefined) {
            params.dots = null;
        }
        if (params.imgClick === undefined) {
            params.imgClick = false;
        }
        if (params.dotClick === undefined) {
            params.dotClick = false;
        }
        this.imageCount;
        this.position = 1;
        this.container = document.querySelector(selector);
        if (!this.container) {
            console.warn('Container is not defined');
            //return;
        }
        else {
            this.container.classList.add('__eslidegallery-container');
            this.autoInterval = null;
            this.dotContainer = null;
            if (params.dots) {
                this.dotContainer = document.querySelector(params.dots);
            }

            let activePosition = 2;
            if (params.shift=='left') {
                activePosition = 1;
            }

            if (params.convertImg) {
                let imageElemList = this.container.querySelectorAll(selector+' > img');
                if (imageElemList && imageElemList.length>0) {
                    this.imageCount = imageElemList.length;
                    for (let i=0; i<this.imageCount; i++) {
                        let imgSrc = imageElemList[i].getAttribute('src');
                        imageElemList[i].remove();
                        if (imgSrc != '' && imgSrc !== null && imgSrc !== undefined && imgSrc != 'undefined' && imgSrc !== false) {
                            let imgElement = document.createElement('div');
                            imgElement.classList.add('__eslidegallery-slide');
                            imgElement.style.backgroundImage = "url('"+imgSrc+"')";
                            imgElement.setAttribute('data-img',imgSrc);
                            this.container.append(imgElement);
                            if (params.imgClick) {
                                imgElement.addEventListener('click',()=>{
                                    th.setPosition(i+1)
                                });
                            }
                            if (this.dotContainer) {
                                let dotElement = document.createElement('span');
                                dotElement.classList.add('__eslidegallery-dot');
                                if (i == 0) {
                                    dotElement.classList.add('__eslidegallery-active-dot');
                                }
                                dotElement.setAttribute('data-item',i+1);
                                this.dotContainer.append(dotElement);
                                if (params.dotClick) {
                                    let th = this;
                                    dotElement.addEventListener('click',()=>{
                                        th.setPosition(i+1)
                                    });
                                }
                            }
                        }
                    }
                    if (params.shift == 'left') {
                        this.container.prepend(this.container.querySelector('.__eslidegallery-slide:last-child'));
                    }
                    else if (params.shift == 'right') {
                        this.container.prepend(this.container.querySelector('.__eslidegallery-slide:last-child'));
                        this.container.prepend(this.container.querySelector('.__eslidegallery-slide:last-child'));
                    }
                    else if (params.shift == 'center') {
                        this.container.prepend(this.container.querySelector('.__eslidegallery-slide:last-child'));
                        this.container.prepend(this.container.querySelector('.__eslidegallery-slide:last-child'));
                    }
                }
            }
            else {
                let imageElemList = this.container.children;
                if (imageElemList && imageElemList.length>0) {
                    this.imageCount = imageElemList.length;
                    for (let i=0; i<this.imageCount; i++) {
                        imageElemList[i].classList.add('__eslidegallery-slide');
                        if (params.imgClick) {
                            imageElemList[i].addEventListener('click',()=>{
                                th.setPosition(i+1)
                            });
                        }
                        if (this.dotContainer) {
                            let dotElement = document.createElement('span');
                            dotElement.classList.add('__eslidegallery-dot');
                            if (i == 0) {
                                dotElement.classList.add('__eslidegallery-active-dot');
                            }
                            dotElement.setAttribute('data-item',(i+1));
                            this.dotContainer.append(dotElement);
                            if (params.dotClick) {
                                let th = this;
                                dotElement.addEventListener('click',()=>{
                                    th.setPosition(i+1)
                                });
                            }
                        }
                    }
                    if (params.shift == 'left') {
                        this.container.prepend(this.container.querySelector('.__eslidegallery-slide:last-child'));
                    }
                    else if (params.shift == 'right') {
                        this.container.prepend(this.container.querySelector('.__eslidegallery-slide:last-child'));
                        this.container.prepend(this.container.querySelector('.__eslidegallery-slide:last-child'));
                    }
                    else if (params.shift == 'center') {
                        this.container.prepend(this.container.querySelector('.__eslidegallery-slide:last-child'));
                        this.container.prepend(this.container.querySelector('.__eslidegallery-slide:last-child'));
                    }
                }
            }

            this.container.setAttribute('data-count',this.imageCount);
            this.container.setAttribute('data-position',this.position);
            this.container.classList.add('__eslidegallery-'+params.shift);

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
        }

        this.changeDot = function () {
            if (!this.dotContainer) {
                return
            }
            let activeDot = this.dotContainer.querySelector('.__eslidegallery-active-dot');
            if (activeDot) {
                activeDot.classList.remove('__eslidegallery-active-dot');
            }
            let newActiveDot = this.dotContainer.querySelector('.__eslidegallery-dot[data-item="' + this.position + '"]');
            if (newActiveDot) {
                newActiveDot.classList.add('__eslidegallery-active-dot');
            }
        }

        this.move = function (mov) {
            if (!this.container) {
                return;
            }
            let moving = mov/this.moveKoef
            let styleMove = '+ '+moving;
            if (moving<0) {
                styleMove = '- '+moving;
            }
            th.container.children[activePosition].style.transform = 'translateX(' + moving + 'px)';
        }

        this.setPosition = function(position) {
            if (!this.container || isNaN(position) || position == 0 || isNaN(this.imageCount) || this.imageCount == 0 || this.position == position) {
                return;
            }
            let oldPosition = this.position;
            let rightShift = this.imageCount - oldPosition + position;
            let leftShift = this.imageCount + oldPosition - position;
            
            let th = this;

            if (oldPosition < position && leftShift >= position - oldPosition) {
                for (let i=0; i<(position - oldPosition); i++) {
                    setTimeout(()=>{th.next()},0);
                }
            }
            else if (oldPosition < position && leftShift < position - oldPosition) {
                /*let i = 1;
                while (i < leftShift) {

                }*/
                for (let i=0; i<leftShift; i++) {
                    setTimeout(()=>{th.prev()},0);
                }
            }
            else if (oldPosition > position && rightShift < oldPosition - position) {
                for (let i=0; i<rightShift; i++) {
                    setTimeout(()=>{th.next()},0);
                }
            }
            else if (oldPosition > position && rightShift >= oldPosition - position) {
                for (let i=0; i<(oldPosition - position); i++) {
                    setTimeout(()=>{th.prev()},0);
                }
            }
        }

        this.next = function() {
            if (!this.container) {
                return;
            }
            this.container.append(this.container.querySelector('.__eslidegallery-slide:first-child'));
            this.position++;
            if (this.position > this.imageCount) {
                this.position = 1;
            }
            this.container.setAttribute('data-position',this.position);
            this.changeDot();
            return this.position;
        }

        this.prev = function() {
            if (!this.container) {
                return;
            }
            this.container.prepend(this.container.querySelector('.__eslidegallery-slide:last-child'));
            this.position--;
            if (this.position < 1) {
                this.position = this.imageCount;
            }
            this.container.setAttribute('data-position',this.position);
            this.changeDot();
            return this.position;
        }

        this.auto = function(delay=3) {
            if (!this.container) {
                return;
            }
            if (this.autoInterval !== null) {
                clearInterval(this.autoInterval);
            }
            let th = this;
            delay = Number(delay);
            if (isNaN(delay) || delay == 0) {
                return;
            }
            if (delay < 100) {
                delay = delay * 1000;
            }
            this.autoInterval = setInterval(() => {
                th.next();
            }, delay);
        }
    }
}