import { HAlign, VAlign, Format } from './models';
export declare class ThumborUrlBuilder {
    private securityKey;
    private serverUrl;
    private imagePath;
    private width;
    private height;
    private smart;
    private fitInFlag;
    private flipHorizontally;
    private flipVertically;
    private hAlignValue;
    private vAlignValue;
    private cropValues;
    private meta;
    private filtersCalls;
    constructor(securityKey: string, serverUrl: string);
    /**
     * Set path of image
     * @param {string} imagePath [description]
     */
    setImagePath(imagePath: string): ThumborUrlBuilder;
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
    resize(width: number, height: number): ThumborUrlBuilder;
    smartCrop(smartCrop: boolean): ThumborUrlBuilder;
    /**
     * Resize the image to fit in a box of the specified dimensions. Overrides
     * any previous call to `fitIn` or `resize`.
     *
     * @param  {String} width
     * @param  {String} height
     */
    fitIn(width: number, height: number): ThumborUrlBuilder;
    /**
     * Flip image horizontally
     */
    withFlipHorizontally(): ThumborUrlBuilder;
    /**
     * Flip image vertically
     */
    withFlipVertically(): ThumborUrlBuilder;
    /**
     * Specify horizontal alignment used if width is altered due to cropping
     * @param  {HAlign} vAlign 'left', 'center', 'right'
     */
    hAlign(hAlign: HAlign): ThumborUrlBuilder;
    /**
     * Specify vertical alignment used if height is altered due to cropping
     * @param  {VAlign} vAlign 'top', 'middle', 'bottom'
     */
    vAlign(vAlign: VAlign): ThumborUrlBuilder;
    /**
     * Specify that JSON metadata should be returned instead of the thumbnailed
     * image.
     */
    metaDataOnly(): ThumborUrlBuilder;
    /**
     * Append a filter, e.g. quality(80)
     * @param  {String} filterCall
     */
    filter(filterCall: string): ThumborUrlBuilder;
    format(format: Format): ThumborUrlBuilder;
    /**
     * Manually specify crop window.
     * @param  {Integer} left
     * @param  {Integer} top
     * @param  {Integer} right
     * @param  {Integer} bottom
     */
    crop(left: number, top: number, right: number, bottom: number): ThumborUrlBuilder;
    /**
     * Combine image url and operations with secure and unsecure (unsafe) paths
     * @return {string}
     */
    buildUrl(): string;
    private getSecureString;
    /**
     * Converts operation array to string
     * @return {string}
     */
    private getOperationPath;
    /**
     * Build operation array
     *
     * @TODO Should be refactored so that strings are generated in the
     * commands as opposed to in 1 massive function
     *
     * @return {string[]}
     */
    urlParts(): string[];
}
