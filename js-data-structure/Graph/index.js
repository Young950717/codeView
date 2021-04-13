/**
 * @description 图结构 图常用的两种表现方式，邻接矩阵和邻接表，如果是稀疏图的话，邻接矩阵会造成大量的空间浪费，所以采用的是邻接表来表示图
 * @author Young
 */
const Dictionay = require('../Dictionay/index') // 引用字典类型
const Queue = require('../Queue/index') // 引用队列类
// 无向图类
class Graph {
    constructor() {
        this.vertexes = [] // 点 数组类型
        this.edges = new Dictionay() // 边 字典类型
    }
    // 添加顶点
    addVertex(v) {
        this.vertexes.push(v)
        this.edges.set(v, [])
    }
    // 添加边
    addEdge(v1, v2) {
        this.edges.get(v1).push(v2)
        this.edges.get(v2).push(v1)
    }
    toString() {
        let str = ''
        this.vertexes.forEach(v => {
            str = `${str}${v}->`
            this.edges.get(v).forEach(e => {
                str += `${e} `
            })
            str += '\n'
        })
        return str
    }
    /*
     Breadth-First Search 广度优先
     white 未被探索 gray 探索但是未被访问 black 探索并访问
     */

    bfs(initV, callback) {
        // 初始化颜色
        const colors = this.initColor()
        const queue = new Queue()
        queue.enqueue(initV) // 将顶点加入队列
        while (!queue.isEmpty()) {
            const v = queue.dequeue() // 获取出队列的顶点
            colors[v] = 'gray' // 将其置灰
            const edges = this.edges.get(v) // 获得与该顶点相连的所有点
            edges.forEach(e => {
                if (colors[e] === 'white') {
                    // 避免重复
                    colors[e] = 'gray'
                    queue.enqueue(e)
                } 3
            })
            callback(v)
            // 访问了 设置为黑色
            colors[v] = 'black'
        }

    }
    /*
     计算路径以及前溯点
     */
    BFS(initV) {
        const vertexes = this.vertexes  // 所有的点
        const edges = this.edges  // 所有的边
        const colors = this.initColor()
        const queue = new Queue()
        const distances = {}
        const predecessors = {}
        queue.enqueue(initV)

        // 初始化距离和前溯点
        for (let i = 0; i < vertexes.length; i++) {
            distances[vertexes[i]] = 0
            predecessors[vertexes[i]] = null
        }
        while (!queue.isEmpty()) {
            const u = queue.dequeue()
            const neighbors = edges.get(u) // 邻边
            colors[u] = 'gray'
            for (let i = 0; i < neighbors.length; i++) {
                const w = neighbors[i]
                if (colors[w] === 'white') {
                    colors[w] = 'gray'
                    distances[w] = distances[u] + 1
                    predecessors[w] = u
                    queue.enqueue(w)
                }
            }
            colors[u] = 'black'
        }
        return {
            distances,
            predecessors
        }
    }

    // Depth-First Search 深度优先
    dfs(initV, callback) {
        const colors = this.initColor()
        for (var i = 0; i < this.vertexes.length; i++) {
            if (colors[this.vertexes[i]] === "white") {
                this._dfsVisit(this.vertexes[i], colors, callback)
            }
        }
    }

    _dfsVisit(v, colors, callback) {
        colors[v] = 'gray'
        callback(v)
        const edges = this.edges.get(v) // 或者与改顶点相连的所有点
        edges.forEach(e => {
            if (colors[e] === 'white') {
                // 递归处理相连并为访问的点
                this._dfsVisit(e, colors, callback)
            }
        })
        colors[v] = "black"
    }

    initColor() {
        const colors = []
        this.vertexes.forEach(v => {
            colors[v] = 'white'
        })
        return colors
    }
}

// 测试代码
const graph = new Graph()

// 添加顶点
const myVertexes = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
for (let i = 0; i < myVertexes.length; i++) {
    graph.addVertex(myVertexes[i])
}
graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')
// console.log(graph.toString())
// let str1 = ''
// graph.bfs(graph.vertexes[0], v => {
//     str1 = str1 + v + ' '
// })
// console.log(graph.BFS(graph.vertexes[0]))
// console.log(str1)

// let str2 = ''
// graph.dfs(graph.vertexes[0], v => {
//     str2 = str2 + v + ' '
// })
// console.log(str2)
