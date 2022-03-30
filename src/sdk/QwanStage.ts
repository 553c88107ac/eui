/*
 * @Author: alextang
 * @Description: 场景管理器，包含gotoView（切换场景）和pushView（在当前stage上压入一个浮层）方法
 */

namespace Qwan {
    export class stage {
        public static jump(data){
            Qwan.StageManager.instance.gotoView(data)
        }

        // goto some view
        public static goto(context, target, data){
            Qwan.event.tap(context, target, ()=>{
                Qwan.StageManager.instance.gotoView(data)
            })
        }
        
        // // show layer
        public static push(context, target, data){
            Qwan.event.tap(context, target, ()=>{
                Qwan.StageManager.instance.pushView(data)
            })
        }
        public static pop(context, target, data){
            Qwan.event.tap(context, target, ()=>{
                Qwan.StageManager.instance.closeView(data)
            })
        }
    }

    export class StageManager extends egret.DisplayObjectContainer {
        public constructor(){
            super();
            this.init();
        }
    
        public static instance ;
        // 全局主场景
        public static mainStage ; 
        private viewStore = {} ;
        private layerStore = {}

        // private viewDict = {} ;
        // store layer and its instance relations
    
        private init(){
            // console.log('>> route :', routeArr);
            // routeArr.forEach(route=>{
            //     this.viewDict[route] = ()=>{
            //         this.viewStore[route] = new (window as any)[route]()
            //     }
            // })
        }
    
        public static startUp(mainStage){
            if(StageManager.instance == null){
                StageManager.mainStage = mainStage
                StageManager.instance = new StageManager()
                mainStage.addChild(StageManager.instance)
            }
            return StageManager.instance
        }
    
        private lastViewName = '';
        private lastView = null;
        public gotoView(evtData){
            // console.log(`>> GotoView Args, lastView:`, this.lastView, ', data:', evtData);
            console.log(`>> GotoView from: ${this.lastViewName} to ${evtData.route}` );
    
            // 1. clear
            // clear all layer
            for (const layer in this.layerStore) {
                if (this.layerStore[layer]) {
                    StageManager.mainStage.removeChild(this.layerStore[layer])
                    this.layerStore[layer] = null
                }
            }
    
            // clear last view
            if (this.lastView) {
                this.lastView.end && this.lastView.end()
                this.removeChild(this.lastView)
            }
            
            // 2. check has view instance 
            const view = evtData.route
            if (!this.viewStore[view]) {
                if (!window.hasOwnProperty(view)) {
                    return console.error('>> 没有找到该场景，请检查拼写 :', view );
                }
                this.viewStore[view] = new (window as any)[view]()
            }
            const insView = this.viewStore[view]
    
            // 3. show instance and record it
            this.addChild(insView)
            insView.start && insView.start(evtData.data || {})
            this.lastView = insView
            this.lastViewName = evtData.route
        }
    
    
        /**
         * @description: 将一个view或者一个view中的某个layer（弹窗）以蒙层(有半透明黑色背景)的形式压入到当前stage
         * @param {string} evtData.view 要展示的view的实例名，或者要展示的layer所在的view的实例, 如：DebugBox
         * @param {string} evtData.layer 要展示的某个layer的名称，一个view可以包含多个layer，如：layerShareOk，如果要展示整个view，该参数填 all 或者留空
         */    
        public pushView(evtData){
            const view = evtData.route
            const layerName = evtData.layer || 'all'
    
            if (!this.viewStore[view]) {
                if (!window.hasOwnProperty(view)) {
                    return console.error('>> 没有找到该场景，请检查拼写 :', view );
                }
                this.viewStore[view] = new (window as any)[view]()
            }
            const insView = this.viewStore[view]

            let elLayer
            // 如果展示整个实例，直接调用start渲染数据
            if (layerName === 'all') {
                insView['start'](evtData.data || {})
                elLayer = insView
            }else {
                elLayer = insView[layerName](evtData.data || {})
            }
            StageManager.mainStage.addChild(elLayer)
            this.layerStore[`${view}_${layerName}`] = elLayer
        }

        // close single layer
        public closeView(evtData){
            const view = evtData.route
            const layerName = evtData.layer || 'all'
            
            const elLayer = this.layerStore[`${view}_${layerName}`]
            if (elLayer) {
                StageManager.mainStage.removeChild(elLayer)
                this.layerStore[`${view}_${layerName}`] = null
            }
        }
    }

}