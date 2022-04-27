import Snake from "./Snake"
import Food from "./Food"
import ScorePanel from "./ScorePanel"

// 游戏控制器 控制其他所有类
class GameControl {
	// 定义三个属性
	snake: Snake
	food: Food
	scorePanel: ScorePanel
	// 属性:蛇的移动方向(按键方向)
	direction: string = ""
	// 记录游戏是否结束
	isLive = true

	constructor() {
		this.snake = new Snake()
		this.food = new Food()
		this.scorePanel = new ScorePanel()
		this.init()
	}

	// 初始化
	init() {
		// 1.绑定键盘按下事件(this指向)
		document.addEventListener("keydown", this.keydownHandler.bind(this))
		// 2.调用蛇移动的方法
		this.crawl()
	}

	keydownHandler(event: KeyboardEvent) {
		// 1.检测按键值是否合法
		this.direction = event.key
	}

	// 蛇移动
	crawl() {
		// 获取蛇头目前坐标
		let X = this.snake.X
		let Y = this.snake.Y

		// 原理:上(top减)下(top加)左(left减)右(left加)
		switch (this.direction) {
			case "ArrowUp":
			case "Up":
				// 向上移动 top 减少
				Y -= 10
				break
			case "ArrowDown":
			case "Down":
				// 向下移动 top 增加
				Y += 10
				break
			case "ArrowLeft":
			case "Left":
				// 向左移动 left 减少
				X -= 10
				break
			case "ArrowRight":
			case "Right":
				// 向右移动 left 增加
				X += 10
				break
		}

		// 检测是否吃到食物...
		this.isEaten(X,Y)

		// 修改蛇的坐标
		try {
			this.snake.X = X
			this.snake.Y = Y
		} catch (e: any) {
			alert(e.message)
			this.isLive = false
		}

		// 定时移动(速度随等级提升)
		const velocity = 200 - (this.scorePanel.level - 1) * 20
		// 活着才开启定时器
		this.isLive && setTimeout(this.crawl.bind(this), velocity)
	}

	// 检测蛇是否吃到食物
	isEaten(X: number, Y: number) {
		if (this.food.X === X && this.food.Y === Y) {
			// 食物位置重置
			this.food.change()
			// 加分
			this.scorePanel.addScore()
			// 加长
			this.snake.addBody()
		}
	}
}

export default GameControl
