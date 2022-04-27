// 记分牌
class ScorePanel {
	score = 0
	level = 1

	scoreEle: HTMLElement
	levelEle: HTMLElement
  // 最高等级
	maxLevel: number
  // 升级需要的分数
	upScore: number

	constructor(maxLevel: number = 10, upScore: number = 10) {
		this.scoreEle = document.querySelector(".score")!
		this.levelEle = document.querySelector(".level")!
		this.maxLevel = maxLevel
		this.upScore = upScore
	}

	addScore() {
		this.scoreEle.innerText = ++this.score + ""
		if (this.score % this.upScore === 0) this.levelUp()
	}

	levelUp() {
		if (this.level < this.maxLevel) this.levelEle.innerText = ++this.level + ""
	}
}

export default ScorePanel