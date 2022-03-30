class HomeView extends eui.Component {
    private btnGame
    private btnDemoA
    private btnDemoB
    public constructor() {
        super();
        this.skinName = "skins.Home";
    }
    protected childrenCreated(): void {
        super.childrenCreated();
        this.init()
    }

    private init (){
        Qwan.stage.goto(this, this.btnGame, {route: 'GameView'})
        Qwan.stage.goto(this, this.btnDemoA, {route: 'DemoA'})
        Qwan.stage.goto(this, this.btnDemoB, {route: 'DemoB'})
    }

    // 进入该场景自动执行，开启各种初始化
    public start(){
        console.log('>> call home start :', );
    }
    // 退出该场景自动执行 ，如：事件解绑，ui reset等
    public end (){
        console.log('>> call home end :', );
    }
}