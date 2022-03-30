/**
 * @Author: alextang
 * @Description: Home stage
 */

class DemoA extends egret.DisplayObjectContainer {
    public constructor() {
        super();
        this.init();
    }
    public init(): void {
        const bg = Qwan.ui.makeDiv(this, [0,0, Qwan.config.sw, Qwan.config.sh], {bgColor: 0xf8f8f8})

        // 1. text img 2. div 3. rect btn

        Qwan.ui.makeLine(this, [0, 100], [Qwan.config.sw, 100], 2, 0x3399ff)
        Qwan.ui.makeTxt(this, ['center',30, 500, 30], 'Here is Home View', {align: 'center', fontSize: 30})
        
        const btnToGame = Qwan.ui.makeBtn(this, ['right', 10, 150, 60], 'back', {offsetX: -10, radis: 10})
        Qwan.stage.goto(this, btnToGame, {route: 'HomeView'})

        const rdmText = Qwan.tool.getRandom(10, 1000)
        Qwan.ui.makeTxt(this, [20, 130, 700, 50], `Get random number: ${rdmText}`, {color: 0xff3300})
        Qwan.ui.makeTxt(this, [20, 200, 700, 50], `Current pt is h5Game ？ ${Qwan.tool.isH5game}`)

        // img
        const myImg = Qwan.ui.makeImg(this, [20, 270, 100, 100], 'nico_jpg')

        // div
        const myDiv = Qwan.ui.makeDiv(this, [140, 270, 520, 100], {bgColor: 0x666666})
        Qwan.ui.makeTxt(myDiv, [0, 0, 400, 100], '这是容器', {color: 0xffffff, align: 'center', verticalAlign:'middle'})

        // rect x 3
        const rectY = 390
        const myRect = Qwan.ui.makeRect(this, [20, rectY, 200, 100], 0x3399ff)
        Qwan.ui.makeTxt(myRect, [0,0, 200, 100], '这是矩形', {color: 0xffffff, align: 'center', verticalAlign:'middle'})

        const myRoundRect = Qwan.ui.makeRect(this, [240, rectY, 200, 100], 0x3399ff, {radis: 20})
        Qwan.ui.makeTxt(myRoundRect, [0,0, 200, 100], '圆角矩形', {color: 0xffffff, align: 'center', verticalAlign:'middle'})
        
        const myRoundRectWithLine = Qwan.ui.makeRect(this, [460, rectY, 200, 100], 0x3399ff, {radis: 20, lineWidth: 6, lineColor: 0xbbddff})
        Qwan.ui.makeTxt(myRoundRectWithLine, [0,0, 200, 100], '带框圆角矩形', {color: 0xffffff, align: 'center', verticalAlign:'middle'})


        // btn
        const btnY = rectY + 100 + 20
        const btnChangeStyle = Qwan.ui.makeBtn(this, [20, btnY, 200, 60], 'Change Style', {bgColor: 0x559933, radis: 10, color: 0xffffff, fontSize: 24, align: 'center', verticalAlign: 'middle'})
        // 点击更新按钮样式
        Qwan.event.tap(this, btnChangeStyle, ()=>{
            Qwan.media.playAudio('music_click_wav')
            Qwan.ui.updateBtn(btnChangeStyle, {radis:10, content: 'Clicked', color: 0xff4400, fontSize: 30, bgColor: 0x111111})
        })


        // btn - 通用提示信息
        const btnShowMsg = Qwan.ui.makeBtn(this, [240, btnY, 200, 60], 'Show Tips', {bgColor: 0x559933})
        Qwan.event.tap(this, btnShowMsg, ()=>{
            Qwan.ui.showMsg('我给你了一把伞，一起来玩游戏，你在终点等我，然后到山城吃火锅...WorldLine: ' + Qwan.tool.getRandom() , {
                callback: ()=>{
                    console.log('>> you click OK button :', 1);
                }
            })
        })

        // btn - 弹窗（内容按需定义）
        const btnShowTip = Qwan.ui.makeBtn(this, [460, btnY , 200, 60], 'Show Layer', {bgColor: 0x559933})
        Qwan.stage.push(this, btnShowTip, {route: 'HomeView', layer: 'layerTip'})

        // div box
        Qwan.ui.makeTxt(this, ['center', btnY + 120 , '100%', 40], 'div HorizontalLayout and verticalLayout', {align: 'center', fontSize: 26})
        const divBox = Qwan.ui.makeDiv(this, ['center', btnY + 180, '95%', 500], {bgColor: 0x111111})

        Qwan.ui.makeDiv(divBox, ['left', 'top', 100, 100], {bgColor: 0xff7700})
        Qwan.ui.makeDiv(divBox, ['center', 'middle', 100, 100], {bgColor: 0xff8800})
        Qwan.ui.makeDiv(divBox, ['right', 'bottom', 100, 100], {bgColor: 0xff9900})

        Qwan.ui.makeDiv(divBox, [100, 100, 100, 100], {bgColor: 0xffff00})
        Qwan.ui.makeDiv(divBox, ['center', 'middle', 100, 100], {bgColor: 0x3399ff, offsetX: 50, offsetY: 50})


        // play MC
        const kyoMc = Qwan.media.initAnim(this, [50, 900], 'kyo', 'kyo')
        kyoMc.gotoAndStop(19);
        const btnWave = Qwan.ui.makeBtn(this, [30, 1050, 100, 60], 'Wave', {radis: 20})
        Qwan.event.tap(this, btnWave, ()=>{
            Qwan.media.playAudio('music_wave_mp3')
            kyoMc.gotoAndPlay('wave', 1);
        })

    }

    // 自定义弹窗（layer）
    public layerTip(data){
        // 构建layer的根节点（必须），所有layer内容都放入该节点
        const bg = Qwan.ui.makeLayerBg()

        // 以下是内容区域
        const box = Qwan.ui.makeDiv(bg, ['center', 'middle', 600, 400], {bgColor: 0xffffff})
        Qwan.ui.makeTxt(box, [0, 0, '100%', '100%'], '提示信息，你在终点等我', {align: 'center', verticalAlign: 'middle'})

        const btnClose = Qwan.ui.makeBtn(box, ['right', 0, 50, 50], '✕', {bgColor: 0xff3300})
        Qwan.stage.pop(this, btnClose, {route: 'HomeView', layer: 'layerTip'})

        // 返回根结点（必须）
        return bg
    }

}