/*
 * @Author: Alextang
 * @Description: Qwan 核心sdk，包含通用UI，事件封装，常用工具类库
 */

namespace Qwan {
    export function init(mainStage) {
        Qwan.config.init(mainStage)
        Qwan.tool.init()
        Qwan.StageManager.startUp(mainStage)
    }
    // init and storage global config
    export class config {
        public static sw ;
        public static sh ;
        public static init(mainStage){
            this.sw = mainStage.stageWidth
            this.sh = mainStage.stageHeight
        }
    }
    export class tool {
        public static isWxgame ;
        public static isQqgame ;
        public static isH5game ;

        public static init(){
            this.isWxgame = (typeof window['wx'] != 'undefined' && !!window['wx'].login && typeof window['qq'] == 'undefined')
            this.isQqgame = (typeof window['qq'] != 'undefined' && !!window['qq'].login) 
            this.isH5game = (!this.isWxgame) && (!this.isQqgame)
        }

        public static getRandom(min: number = 0, max: number = 100): number {
            return Math.ceil(Math.random() * (max - min)) + min;
        }

        public static objToStr(object = {}) : string{
            const keys = Object.keys(object);
            const result = keys.reduce((pre, cur) =>{
                pre += `&${cur}=${object[cur]}`;
                return pre;
            }, "").slice(1);
            return result;
        }

        public static throttle(fn, delay = 300){
            let canRun = true
            return (opt)=>{
                if (!canRun) {
                    return
                }
                canRun = false
                setTimeout(()=>{
                    canRun = true
                }, delay)
                fn(opt)
            }
        }
    
        /**
         * @description: cut str by length
         * @param {string} str origin string
         * @param {len} len length of you need save
         * @return {string} saved string
         */
        public static cutStr(str, len){
            var regAll = /\ud83c[\udffb-\udfff](?=\ud83c[\udffb-\udfff])|(?:[^\ud800-\udfff][\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]?|[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?)*/g
    
            var regW = /[\x00-\xff]/
            var match = str.match(regAll) || [];
            let strLen = match.length;
    
            len = len * 2
    
    
            var ret = ''
            var k = ''
            var toEnd = false
            for (var i= 0, j = 0; i < len; i++) {
                k = match[j++]
    
                if (j == strLen) {
                    toEnd = true
                }
    
                if(!k) {
                    toEnd = true
                    break
                }
    
                if (regW.test(k)) {
                    ret += k
    
                } else {
                    if (++i < len) {
                        ret += k
                    }
                }
            }
            return ret + (toEnd ? '' : '...')
        }
    }
    // UI
    export class ui {
        // attrs: pNode, posAndSize, core, ext: {style}

        // basic fn: calc string pos and percent size
        public static setPosAndSize(parentNode, posAndSize, el, ext: any = {}){
            parentNode = parentNode || {width:0, height: 0}
            const parentSize = [parentNode.width , parentNode.height ]
            ext.offsetX = ext.offsetX || 0
            ext.offsetY = ext.offsetY || 0

            let elWidth = posAndSize[2];
            let elHeight = posAndSize[3];
            if (typeof elWidth === 'string' && elWidth.indexOf('%') > -1) {
                elWidth = Number(elWidth.replace('%', '')) / 100 * parentSize[0]
            }
            if (typeof elHeight === 'string' && elHeight.indexOf('%') > -1) {
                elHeight = Number(elHeight.replace('%', '')) / 100 * parentSize[1]
            }

            let finalX = posAndSize[0]
            if (typeof finalX === 'string') {
                let tempX  = 0;
                if (!elWidth) {
                    return console.error('>> QwanError : 使用语义定位必须制定当前元素的宽高');
                }
                (finalX === 'center') && (tempX = (parentSize[0] - elWidth) / 2);
                (finalX === 'right') && (tempX = (parentSize[0] - elWidth) );
                finalX = tempX 
            }
            finalX += ext.offsetX

            let finalY = posAndSize[1]
            if (typeof finalY === 'string') {
                let tempY  = 0;
                if (!elHeight) {
                    return console.error('>> QwanError : 使用语义定位必须制定当前元素的宽高');
                }
                (finalY === 'middle') && (tempY = (parentSize[1] - elHeight) / 2);
                (finalY === 'bottom') && (tempY = (parentSize[1] - elHeight) );
                finalY = tempY 
            }
            finalY += ext.offsetY

            el.x = finalX
            el.y = finalY ;

            elWidth && (el.width = elWidth)
            elHeight && (el.height = elHeight)
            
            return [finalX, finalY, elWidth, elHeight]
        }

        /**
         * @description: 创建文本
         * @param {dco} parentNode
         * @param {dco} posAndSize position and posAndSize
         * @param {string} txt
         * @param {number} fontSize
         * @param {number} fontColor
         * @return TextField
         */
        public static makeTxt(parentNode: any, posAndSize: any[], content:string, ext: any = {}){
            const el = new egret.TextField()
            el.text = content
            el.size = ext.fontSize || 24
            el.textColor = ext.color || 0x333333

            this.setPosAndSize( parentNode, posAndSize, el, ext )

            if (ext.align === 'center') {
                el.textAlign = egret.HorizontalAlign.CENTER
            }else if(ext.align === 'right'){
                el.textAlign = egret.HorizontalAlign.RIGHT
            }

            if (ext.verticalAlign === 'middle') {
                el.verticalAlign = egret.VerticalAlign.MIDDLE
            }else if(ext.verticalAlign === 'bottom'){
                el.verticalAlign = egret.VerticalAlign.BOTTOM
            }

            parentNode.addChild(el)
            return el
        }

        /**
         * @description: 创建图片
         * @param {string} name img name or texture 
         * @param {number} posAndSize img position and posAndSize , [x, y, width, height], 其中width和height可不填写
         * @param {any} parentNode the parentNode img will adding into
         * @return bitmap
         */
        public static makeImg(parentNode: any,  posAndSize: any[], name: any, ext: any = {}){
            const el = new egret.Bitmap(ext.isTexture ? name : RES.getRes(name));
            this.setPosAndSize( parentNode, posAndSize, el, ext );
            (parentNode && parentNode.addChild) && (parentNode.addChild(el))
            return el
        }
    
        /**
         * @description: 创建一个类似div的容器，可定制背景色
         * @param {number} posAndSize
         * @param {any} parentNode
         * @return sprite
         */
        public static makeDiv(parentNode: any, posAndSize: any[], ext: any = {}){
            const el = new egret.Sprite()
            const posAndSizeFix = this.setPosAndSize( parentNode, posAndSize, el, ext )
    
            if (ext.bgColor !== undefined) {
                el.graphics.beginFill(ext.bgColor)
                el.graphics.drawRect(0,0, posAndSizeFix[2], posAndSizeFix[3])
                el.graphics.endFill()
            }
    
            (parentNode && parentNode.addChild) && (parentNode.addChild(el))
            return el
        }
    
        /**
         * @description: 创建矩形（可定制圆角、边框颜色、背景色透明度）
         * @param {number[]} posAndSize rect position and posAndSize , [x, y, width, height]
         * @param {number} bgColor
         * @param {dco} parentNode
         * @return sprite
         */
        // todo offset 
        public static makeRect(parentNode, posAndSize: any[], bgColor: number,  ext: any = {} ){
            const el = new egret.Sprite()
            const posAndSizeFix = this.setPosAndSize( parentNode, posAndSize, el, ext )
    
            // do line style
            if (ext.lineWidth && ext.lineColor) {
                // 边框是向内外同时延展，计算布局时需要注意
                el.graphics.lineStyle(ext.lineWidth, ext.lineColor)
            }
    
            el.graphics.beginFill(bgColor, ext.alpha || 1)
    
            // do round rect
            if (ext.radis) {
                el.graphics.drawRoundRect(0,0,posAndSizeFix[2], posAndSizeFix[3], ext.radis)
            }else{
                el.graphics.drawRect(0,0,posAndSizeFix[2], posAndSizeFix[3])
            }
    
            el.graphics.endFill()
            parentNode.addChild(el)
            return el
        }

        public static updateBtn(elRect , style){
            const elTxt = elRect.$children[0]
            style.w = style.w || elRect.width
            style.h = style.h || elRect.height
            if (style.bgColor) {
                elRect.graphics.beginFill(style.bgColor)
                elRect.graphics.drawRoundRect(0,0, style.w, style.h, style.radis || 0)
                elRect.graphics.endFill()
            }

            (style.color) && (elTxt.textColor = style.color);
            (style.fontSize) && (elTxt.size = style.fontSize);
            (style.content) && (elTxt.text = style.content);
            return elRect
        }
    
    
        /**
         * @description: create btn （some txt in rect）
         * @param {array} posAndSize position and posAndSize
         * @param {number} bgColor
         * @param {string} txt
         * @param {number} fontSize
         * @param {number} fontColor
         * @param {*} parentNode
         * @return rect
         */
        public static makeBtn(parentNode, posAndSize: any[], content: string, ext: any= {} ){
            const defaultExt = {bgColor: 0x3399ff, color: 0xffffff, align: 'center', verticalAlign: 'middle'}
            const mixExt = {...defaultExt, ...ext}
            const rect = this.makeRect(parentNode, posAndSize, mixExt.bgColor, mixExt)
            const text = this.makeTxt(rect, [0,0,posAndSize[2], posAndSize[3]], content, {...mixExt, offsetX:0, offsetY:0 })
            return rect
        }
    
    
        public static makeLine(parentNode,  startPos, endPos ,lineWidth, lineColor){
            const el = new egret.Shape()
            el.graphics.lineStyle(lineWidth, lineColor);
            el.graphics.moveTo(startPos[0], startPos[1]);
            el.graphics.lineTo(endPos[0], endPos[1]);
            parentNode.addChild(el)
            return el
        }
    
    
        /**
         * @description: make a shadow cover full screen
         * @param {egret} parentNode into which parent
         * @param {number} alpha
         * @return {egert} egret sprite
         */
        public static makeShadow(ext:any = {}){
            const alpha = ext.alpha || 0.75
            const parentNode = ext.parentNode || null

            const el = new egret.Sprite()
            el.graphics.beginFill(0x000000);
            el.graphics.drawRect(0, 0, Qwan.config.sw, Qwan.config.sh);
            el.graphics.endFill();
            el.x = 0;
            el.y = 0;
            el.alpha = alpha
            el.touchEnabled = true ;

            (parentNode && parentNode.addChild) && (parentNode.addChild(el))
            return el
        }

        public static makeLayerBg(){
            const el = this.makeDiv(null, [0,0, Qwan.config.sw, Qwan.config.sh])
            const bg = this.makeShadow({parentNode: el})
            return el
        }

        public static initMsg(){
            const bg = this.makeLayerBg()

            const box = Qwan.ui.makeDiv(bg, ['center', 'middle', 600, 350], {bgColor: 0xffffff})
            const hd = Qwan.ui.makeBtn(box, ['center',0, '100%', 60], '  提示', {align: 'left'})
            const msgTxt = Qwan.ui.makeTxt(box, ['center',100, '90%'], 'init msg')
            msgTxt.lineSpacing = 10

            const btnOk = Qwan.ui.makeBtn(box, ['center', 'bottom', 150, 50], '确定', {radis: 10, offsetY: -40})

            const btnClose = Qwan.ui.makeBtn(box, ['right', 10, 40,40], '✕', {bgColor: 0xee5500, offsetX: -10, fontSize: 30})
            Qwan.event.tap(this, btnClose, ()=>{
                StageManager.mainStage.removeChild(bg)
            })

            return {bg, msgTxt, btnOk}
        }
        

        // show msg
        public static showMsg(msg: string, ext: any = {}){
            const {bg, msgTxt, btnOk} = this.initMsg()
            ext.callback = ext.callback || (()=>{})

            msgTxt.text = msg
            Qwan.event.tap(this, btnOk, ()=>{
                ext.callback()
                StageManager.mainStage.removeChild(bg)
            })

            StageManager.mainStage.addChild(bg)
        }
    }

    // Event
    export class event {
        public static tap(context, target, fn){
            target.touchEnabled = true
            target.addEventListener(egret.TouchEvent.TOUCH_TAP, (e)=>{
                fn(e)
            }, context)
        }
    }

    // Media (audio, anim)
    export class media {
        public static playAudio(audioName, ext :any = {}){
            let sound = RES.getRes(audioName);
            if (!sound) {
                return false
            }
            sound.play(0, ext.infinity ? 0 : 1);
            return sound
        }

        /**
         * @description: init anim
         * @param {*} fileName 文件夹名（不包含扩展名）
         * @param {*} anim 动画名，在texture编辑器中，顶层对象名称，一个动画下可以包含多个动作(action)
         * @param {*} action 动作名，比如一个动画中可包含攻击，防守等动作
         * @return {*} MovieClip
         */        
        public static initAnim(parentNode, posAndSize, fileName, anim, ext: any = {}){
            const data = RES.getRes(`${fileName}_json`);
            const txture = RES.getRes(`${fileName}_png`);
            const mcFactory = new egret.MovieClipDataFactory(data, txture);
            const mc = new egret.MovieClip(mcFactory.generateMovieClipData(anim));

            posAndSize[0] && (mc.x = posAndSize[0]) ;
            posAndSize[1] && (mc.y = posAndSize[1]) ;
            posAndSize[2] && (mc.width = posAndSize[2]) ;
            posAndSize[3] && (mc.height = posAndSize[3]) ;
            parentNode.addChild(mc);
            return mc
        }

        /**
         * @description: 初始化视频
         * @param {egret.DisplayObjectContainer} parentNode 视频parent节点
         * @param {array} posAndSize [x, y, width, height]
         * @param {*} videoSrc 视频路径
         * @param {*} poster 封面路径
         * @param {any} ext 扩展参数
         * @return {*} 视频节点
         */        
        public static initVideo(parentNode, posAndSize, videoSrc, poster, ext :any = {}){
            const el = new egret.Video();
            posAndSize[0] && (el.x = posAndSize[0]) ;
            posAndSize[1] && (el.y = posAndSize[1]) ;
            posAndSize[2] && (el.width = posAndSize[2]) ;
            posAndSize[3] && (el.height = posAndSize[3]) ;
            el.fullscreen = false;

            el.load(videoSrc);
            el.poster = poster
            parentNode.addChild(el)
            return el
        }
    }
}