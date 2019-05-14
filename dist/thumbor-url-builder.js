"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = __importStar(require("crypto-js"));
__export(require("./models"));
var ThumborUrlBuilder = /** @class */ (function () {
    function ThumborUrlBuilder(securityKey, serverUrl) {
        this.securityKey = securityKey;
        this.serverUrl = serverUrl;
        this.imagePath = '';
        this.width = 0;
        this.height = 0;
        this.smart = false;
        this.fitInFlag = false;
        this.flipHorizontally = false;
        this.flipVertically = false;
        this.hAlignValue = null;
        this.vAlignValue = null;
        this.cropValues = null;
        this.meta = false;
        this.filtersCalls = [];
    }
    /**
     * Set path of image
     * @param {string} imagePath [description]
     */
    ThumborUrlBuilder.prototype.setImagePath = function (imagePath) {
        this.imagePath =
            imagePath.charAt(0) === '/'
                ? imagePath.substring(1, imagePath.length)
                : imagePath;
        return this;
    };
    /**
     * Resize the image to the specified dimensions. Overrides any previous call
     * to `fitIn` or `resize`.
     *
     * Use a value of 0 for proportional resizing. E.g. for a 640 x 480 image,
     * `.resize(320, 0)` yields a 320 x 240 thumbnail.
     *
     * Use a value of 'orig' to use an original image dimension. E.g. for a 640
     * x 480 image, `.resize(320, 'orig')` yields a 320 x 480 thumbnail.
     * @param  {number} width
     * @param  {number} height
     */
    ThumborUrlBuilder.prototype.resize = function (width, height) {
        this.width = width;
        this.height = height;
        return this;
    };
    ThumborUrlBuilder.prototype.smartCrop = function (smartCrop) {
        this.smart = smartCrop;
        return this;
    };
    /**
     * Resize the image to fit in a box of the specified dimensions. Overrides
     * any previous call to `fitIn` or `resize`.
     *
     * @param  {String} width
     * @param  {String} height
     */
    ThumborUrlBuilder.prototype.fitIn = function (width, height) {
        this.width = width;
        this.height = height;
        this.fitInFlag = true;
        return this;
    };
    /**
     * Flip image horizontally
     */
    ThumborUrlBuilder.prototype.withFlipHorizontally = function () {
        this.flipHorizontally = true;
        return this;
    };
    /**
     * Flip image vertically
     */
    ThumborUrlBuilder.prototype.withFlipVertically = function () {
        this.flipVertically = true;
        return this;
    };
    /**
     * Specify horizontal alignment used if width is altered due to cropping
     * @param  {HAlgin} vAlign 'left', 'center', 'right'
     */
    ThumborUrlBuilder.prototype.hAlign = function (hAlign) {
        this.hAlignValue = hAlign;
        return this;
    };
    /**
     * Specify vertical alignment used if height is altered due to cropping
     * @param  {VAlgin} vAlign 'top', 'middle', 'bottom'
     */
    ThumborUrlBuilder.prototype.vAlign = function (vAlign) {
        this.vAlignValue = vAlign;
        return this;
    };
    /**
     * Specify that JSON metadata should be returned instead of the thumbnailed
     * image.
     */
    ThumborUrlBuilder.prototype.metaDataOnly = function () {
        this.meta = true;
        return this;
    };
    /**
     * Append a filter, e.g. quality(80)
     * @param  {String} filterCall
     */
    ThumborUrlBuilder.prototype.filter = function (filterCall) {
        this.filtersCalls.push(filterCall);
        return this;
    };
    ThumborUrlBuilder.prototype.format = function (format) {
        this.filter("format(" + format + ")");
        return this;
    };
    /**
     * Manually specify crop window.
     * @param  {Integer} left
     * @param  {Integer} top
     * @param  {Integer} right
     * @param  {Integer} bottom
     */
    ThumborUrlBuilder.prototype.crop = function (left, top, right, bottom) {
        if (left > 0 && top > 0 && right > 0 && bottom > 0) {
            this.cropValues = {
                left: left,
                top: top,
                right: right,
                bottom: bottom
            };
        }
        return this;
    };
    /**
     * Combine image url and operations with secure and unsecure (unsafe) paths
     * @return {string}
     */
    ThumborUrlBuilder.prototype.buildUrl = function () {
        var operation = this.getOperationPath();
        if (this.securityKey != null) {
            var key = crypto.HmacSHA1(operation + this.imagePath, this.securityKey);
            var keyString = crypto.enc.Base64.stringify(key);
            keyString = keyString.replace(/\+/g, '-').replace(/\//g, '_');
            return (this.serverUrl + '/' + key + '/' + operation + this.imagePath);
        }
        return this.serverUrl + '/unsafe/' + operation + this.imagePath;
    };
    /**
     * Converts operation array to string
     * @return {string}
     */
    ThumborUrlBuilder.prototype.getOperationPath = function () {
        var parts = this.urlParts();
        if (0 === parts.length) {
            return '';
        }
        return parts.join('/') + '/';
    };
    /**
     * Build operation array
     *
     * @TODO Should be refactored so that strings are generated in the
     * commands as opposed to in 1 massive function
     *
     * @return {string[]}
     */
    ThumborUrlBuilder.prototype.urlParts = function () {
        if (!this.imagePath) {
            throw new Error("The image url can't be null or empty.");
        }
        var parts = [];
        if (this.meta === true) {
            parts.push('meta');
        }
        if (this.cropValues != null) {
            var _a = this.cropValues, left = _a.left, top_1 = _a.top, right = _a.right, bottom = _a.bottom;
            parts.push(left + "x" + top_1 + ":" + right + "x" + bottom);
        }
        if (this.fitInFlag === true) {
            parts.push('fit-in');
        }
        if (this.width ||
            this.height ||
            this.flipHorizontally ||
            this.flipVertically) {
            var sizeString = '';
            if (this.flipHorizontally === true) {
                sizeString += '-';
            }
            sizeString += this.width;
            sizeString += 'x';
            if (this.flipVertically === true) {
                sizeString += '-';
            }
            sizeString += this.height;
            parts.push(sizeString);
        }
        if (this.hAlignValue != null) {
            parts.push(this.hAlignValue);
        }
        if (this.vAlignValue != null) {
            parts.push(this.vAlignValue);
        }
        if (this.smart === true) {
            parts.push('smart');
        }
        if (this.filtersCalls.length > 0) {
            parts.push('filters:' + this.filtersCalls.join(':'));
        }
        return parts;
    };
    return ThumborUrlBuilder;
}());
exports.ThumborUrlBuilder = ThumborUrlBuilder;
