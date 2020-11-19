/**
 * @description 图结构 图常用的两种表现方式，邻接矩阵和邻接表，如果是稀疏图的话，邻接矩阵会造成大量的空间浪费，所以采用的是邻接表来表示图
 * @author Young
 */
const Dictionay = require('../Dictionay/index') // 引用字典类型

class Graph {
    constructor() {
        this.vertexes = [] // 点 数组类型
        this.edges = new Dictionay() // 边 字典类型
    }
}