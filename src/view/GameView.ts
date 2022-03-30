class GameView extends eui.Component {
    private btnBack
    public constructor() {
        super();
        this.skinName = "skins.Game";
    }
    protected childrenCreated(): void {
        super.childrenCreated();
        
        Qwan.stage.goto(this, this.btnBack, {route: 'HomeView'})
    }

    // 进入该场景自动执行，开启各种初始化，可接受页面跳转附带参数
    public start(){
        console.log('>> call game start :', );
    }
    // 退出该场景自动执行 ，如：事件解绑，ui reset等
    public end (){
        console.log('>> call game end :', );
    }
}