// 食物类
class Food {
	foodEle: HTMLElement

	constructor() {
		this.foodEle = document.querySelector(".food")!
	}

	// 获取食物 x轴 坐标的方法
	get X() {
		return this.foodEle.offsetLeft
	}

	// 获取食物 y轴 坐标的方法
	get Y() {
		return this.foodEle.offsetTop
	}

	// 修改食物的位置(随机生成位置)
	change() {
		// const x = this.element.offsetLeft
		// const y = this.element.offsetTop
		/*
      食物生成一个随机的坐标(10的倍数):蛇移动一次是一格(10px)
      0<x,y<290(304-4边框宽度-10自身宽度)
      坐标算法:(0-1)*29再四舍五入*10
      BUG 1:食物不能出现在蛇身上
    */
		const top = Math.round(Math.random() * 29) * 10
		const left = Math.round(Math.random() * 29) * 10

		this.foodEle.style.top = top + "px"
		this.foodEle.style.left = left + "px"
	}
}

export default Food