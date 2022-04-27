class Snake {
	// 蛇头 控制蛇
	headEle: HTMLElement
	// 蛇容器
	snakeEle: HTMLElement
	// 蛇的身体(包括蛇头)
	bodyEles : HTMLCollectionOf<HTMLElement>

	constructor() {
		this.headEle = document.querySelector(".snake>div") as HTMLElement
		this.snakeEle = document.querySelector(".snake")!
		// 不用querySelectorAll是因为它是一个数组
		this.bodyEles = this.snakeEle.getElementsByTagName("div")
	}

	// 蛇的坐标(主要是蛇头坐标)
	get X() {
		return this.headEle.offsetLeft
	}
	get Y() {
		return this.headEle.offsetTop
	}

	// 设置蛇头的坐标
	set X(value: number) {
		// 如果 新值==旧值 ,不修改
		if (this.X === value) return

		// 判断是否撞墙(合法值范围0<x<290),否则抛异常
		if (value < 0 || value > 290) throw new Error("蛇撞墙了!")

		// 蛇身碰撞问题
		// 水平移动时,不能掉头
		if (this.bodyEles[1] && (this.bodyEles[1] as HTMLElement).offsetLeft === value) {
			// 如果发生掉头,则继续移动(掉头无效)
			// 如果新值value大于旧值X，则说明蛇在向右走，此时发生掉头，应该使蛇继续向右走
			if (value > this.X) value = this.X - 10
			// 向左
			else value = this.X + 10
		}

		// 注意 执行顺序 1.移动身体 2.设置蛇头坐标 3.检车相撞
		this.moveBody()
		this.headEle.style.left = value + "px"
    this.isCollision()
	}

	set Y(value: number) {
		if (this.Y === value) return

		// 判断是否撞墙(合法值范围0<y<290)
		if (value < 0 || value > 290) throw new Error("蛇撞墙了!")

		// 蛇身碰撞问题
		// 垂直移动,不能掉头
		if (this.bodyEles[1] && (this.bodyEles[1] as HTMLElement).offsetTop === value) {
			// 如果发生掉头,则继续移动(掉头无效)
			// 如果新值value大于旧值X，则说明蛇在向下走，此时发生掉头，应该使蛇继续向下走
			if (value > this.Y) value = this.Y - 10
			// 向上
			else value = this.Y + 10
		}

		this.moveBody()
		this.headEle.style.top = value + "px"
    this.isCollision()
	}

	// 添加蛇身体(蛇容器中添加div)
	addBody() {
		// 注意方法ele.insertAdjacentHTML(position,text)
		this.snakeEle.insertAdjacentHTML("beforeend", "<div></div>")
	}

	// 蛇身跟随蛇头
	moveBody() {
		// 从后往前改
		for (let i = this.bodyEles.length - 1; i > 0; i--) {
			const prevX = this.bodyEles[i - 1].offsetLeft
			const prevY = this.bodyEles[i - 1].offsetTop

			// 之前坐标设置到目前坐标
			;(this.bodyEles[i] as HTMLElement).style.left = prevX + "px"
			;(this.bodyEles[i] as HTMLElement).style.top = prevY + "px"
		}
	}

	// 检查是否头与身相撞
	isCollision() {
		// 获取所有身体,检查其坐标是否与蛇头坐标重叠
		for (let i = 1; i < this.bodyEles.length; i++) {
			if (this.X === this.bodyEles[i].offsetLeft && this.Y === this.bodyEles[i].offsetTop) {
				throw new Error("撞到自己了!")
			}
		}
	}
}

export default Snake
