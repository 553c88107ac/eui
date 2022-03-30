/**
 * @Author: alextang
 * @Description: Home stage
 */

class DemoB extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.init();
    }
    public init(): void {
        const bg = Qwan.ui.makeDiv(this, [0,0, Qwan.config.sw, Qwan.config.sh], {bgColor: 0xf2f2f2})

        Qwan.ui.makeLine(this, [0, 100], [Qwan.config.sw, 100], 2, 0x666666)
        Qwan.ui.makeTxt(this, ['center',30, 500, 30], 'Here is Game View', {align: 'center', fontSize: 30})

        const btnToHome = Qwan.ui.makeBtn(this, ['right', 10, 150, 60], 'back', {offsetX: -10, radis: 10})
        Qwan.stage.goto(this, btnToHome, {route: 'HomeView'})


        // img box
        Qwan.ui.makeTxt(this, ['center', 130, '100%', 40], 'img HorizontalLayout and verticalLayout', {align: 'center', fontSize: 26})
        const imgBox = Qwan.ui.makeDiv(this, ['center', 190, '90%', 300], {bgColor: 0x111111})
        Qwan.ui.makeImg(imgBox, ['left', 'top', 100, 100], 'nico_jpg')
        Qwan.ui.makeImg(imgBox, ['center', 'middle', 100, 100], 'nico_jpg')
        Qwan.ui.makeImg(imgBox, ['right', 'bottom', 100, 100], 'nico_jpg')

        Qwan.ui.makeImg(imgBox, ['center', 'middle', 100, 100], 'nico_jpg', {offsetX:100, offsetY: 50})
        Qwan.ui.makeImg(imgBox, [100,100,  100, 100], 'nico_jpg')


        // txt box
        Qwan.ui.makeTxt(this, ['center', 520, '100%', 40], 'txt HorizontalLayout and verticalLayout', {align: 'center', fontSize: 26})
        const txtBox = Qwan.ui.makeDiv(this, ['center', 570, '90%', 300], {bgColor: 0x333333})

        Qwan.ui.makeTxt(txtBox, ['left', 'top', 100, 50], 'leftTop', {color: 0xffffff})
        Qwan.ui.makeTxt(txtBox, ['center', 'middle', 150, 50], 'centerMiddle', {color: 0x3399ff})
        Qwan.ui.makeTxt(txtBox, ['right', 'bottom', 150, 50], 'rightBottom', {color: 0xffffff})
        Qwan.ui.makeTxt(txtBox, [100, 100, 150, 50], 'customPos', {color: 0xff33ff})
        
        
        // init video
        const myVideo = Qwan.media.initVideo(this, [75, 900, 600,300], 'resource/sound/vdo.mp4', 'resource/img/bg.jpg')
        const btnPlayVideo = Qwan.ui.makeBtn(this, ['center', 1220,150,60] , 'play video', {radis: 20})

        // play video
        myVideo.once(egret.Event.COMPLETE, ()=>{
            Qwan.event.tap(this, btnPlayVideo,()=>{
                myVideo.play()
            })
        }, this);

        
    }
}