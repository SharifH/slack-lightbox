// function addElement()={
//  var flickrFeed = document.createElement()
// }
function jsonFlickrApi(rsp) {
    window.rsp = rsp;
    var flickrStream = "";
    for (var i = 0; i < rsp.photos.photo.length; i++) {
        photo = rsp.photos.photo[i];
        photoId = photo.id
        farm_url = "http://farm" + photo.farm + ".static.flickr.com/" +
            photo.server + "/" + photo.id + "_" + photo.secret + "_" + "t.jpg";
        big_url = "http://farm" + photo.farm + ".static.flickr.com/" +
            photo.server + "/" + photo.id + "_" + photo.secret + ".jpg";
        picture_url = "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
        flickrStream += '<div data-big="' + big_url + '" class="lightbox stream"><img class="flickrImages" alt="' + photo.title + '"src="' + farm_url + '"/></div>';
    }
    content = document.getElementById("content")
    content.innerHTML = content.innerHTML + (flickrStream);
}

var lightBox = function() {
    this.elements;
    this.width;
    this.images = Array();
    this.body = document.querySelector("body");
    this.value = 0;
    this.transform;
    this.slidesBox;
    this.active;
    this.left;
    this.touchStart;
    this.touchEnd;
    this.buttonRight;
    this.buttonLeft;
    this.loadingAnimation;
    this.html = '<div class="lightbox-background"><div class="lightbox-loader" title="2"><svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"><path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"><animateTransform attributeType="xml"attributeName="transform"type="rotate"from="0 25 25"to="360 25 25"dur="0.6s"repeatCount="indefinite"/></path></svg></div><div class="lightbox-slides"></div><div class="lightbox-exit"></div><div class="lightbox-buttons"><div class="lightbox-button-left lightbox-inactive"></div><div class="lightbox-button-right"></div></div></div>';

    this.initLightBox();
};

lightBox.prototype.initLightBox = function() {
    this.elements = document.querySelectorAll(".lightbox");
    this.transform = 100;

    for (var i = 0, len = this.elements.length; i < len; i++) {
        this.images.push(this.elements[i].dataset.big);
        this.elements[i].addEventListener("click", function(e) {
            e.preventDefault();

            e.target.classList.add("lightbox-clicked");
            this.body.style.overflow = "hidden";
            if (this.body.innerHTML += this.html) {
                this.slidesBox = document.querySelector(".lightbox-slides");
                this.loadingAnimation = document.querySelector(".lightbox-loader");
                this.buttonRight = document.querySelector(".lightbox-button-right");
                this.buttonLeft = document.querySelector(".lightbox-button-left");
                this.buttonRight.addEventListener("click", function() {
                    this.slideRight();
                }.bind(this));
                this.buttonLeft.addEventListener("click", function() {
                    this.slideLeft();
                }.bind(this));

                window.addEventListener("keydown", function(e) {
                    if (e.keyCode === 27) {
                        this.close();
                    }

                    if (e.keyCode === 39) {
                        this.slideRight();
                    }

                    if (e.keyCode === 37) {
                        this.slideLeft();
                    }
                }.bind(this));
                window.addEventListener("touchstart", function(e) {
                    this.touchStart = e.changedTouches[0].pageX;
                }.bind(this));

                window.addEventListener("touchend", function(e) {
                    this.touchEnd = e.changedTouches[0].pageX;

                    if ((this.touchEnd - this.touchStart) > 0) {
                        this.slideLeft();
                    } else {
                        this.slideRight();
                    }
                }.bind(this));
                this.putAllImages();

                document.querySelector(".lightbox-exit").addEventListener("click", function() {
                    this.close();
                }.bind(this));
            }
        }.bind(this));
    };
};

lightBox.prototype.putAllImages = function() {
    for (var i = 0, len = this.elements.length; i < len; i++) {

        if (this.elements[i].children[0].classList.contains("lightbox-clicked")) {
            this.left = -(i * 100);
        }
        this.loadingAnimation.style.opacity = 1;
        this.slidesBox.style.opacity = 0;

        var self = this;
        setTimeout(function() {
            self.loadingAnimation.style.opacity = 0;
            self.slidesBox.style.opacity = 1;
        }, 100 * this.elements.length);
        if (this.elements[i].dataset.caption != undefined && this.elements[i].dataset.caption != "") {
            this.caption = '<div class="lightbox-caption">' + this.elements[i].dataset.caption + '</div>';
        } else {
            this.caption = "";
        }
        this.slidesBox.innerHTML += '<div class="lightbox-slide" style="left:' + i * 100 + '%"><img src="' + this.elements[i].dataset.big + '">' + this.caption + '</div>';

        if (i + 1 === len) {
            if (this.value = this.left) {

                this.transform = 0;

                this.slideRight();

                this.transform = 100;

            }
        }

    }
}

lightBox.prototype.close = function() {
    this.body.style.overflow = "auto";
    document.querySelector(".lightbox-background").remove();
    this.clean();
    this.initLightBox();
}

lightBox.prototype.clean = function() {
    this.elements = 0;
    this.width = 0;
    this.images = Array();
    this.slidesBox = undefined;
    this.value = 0;
    this.transform = undefined;
    this.left = 0;
    document.querySelector(".lightbox-clicked").classList.remove("lightbox-clicked");
    this.loadingAnimation = undefined;
    this.buttonRight = undefined;
    this.buttonLeft = undefined;
};

lightBox.prototype.slideLeft = function() {
    if (this.value >= 0) {
    } else {
        this.buttonRight.classList.remove("lightbox-inactive");
        this.value += this.transform;
        this.slidesBox.style.transform = "translate(" + this.value + "%, 0)";
        if (this.value >= 0) {
            this.buttonLeft.classList.add("lightbox-inactive");
        }
    }
}

lightBox.prototype.slideRight = function() {
    if (-this.value >= (this.elements.length * 100) - this.transform) {
    } else {
        this.buttonLeft.classList.remove("lightbox-inactive");
        this.value -= this.transform;
        this.slidesBox.style.transform = "translate(" + this.value + "%, 0)";
        if (-this.value >= (this.elements.length * 100) - 100) {
            this.buttonRight.classList.add("lightbox-inactive");
        }
    }
}
