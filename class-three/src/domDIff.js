import {
    ATTR,
    TEXT,
    REPLACE,
    REMOVE
} from './patchType.js'

let patches = {},
    vNodeIndex = 0
function domDiff (oldVDom, newVDom) {
    let index = 0
    vNodeWalk(oldVDom, newVDom, index)
    return patches
}
function vNodeWalk (oldNode, newNode, index) {
    let vnPatch = []
    if (!newNode) {
        // 新的节点是空的
        vnPatch.push({
            type: REMOVE,
            index
        })
    } else if (typeof oldNode === 'string' && typeof newNode === 'string') {
        // 两个都是文本节点 先仅考虑字符串
        if (oldNode !== newNode) {
            vnPatch.push({
                type: TEXT,
                text: newNode
            })
        }
    } else if (oldNode.type === newNode.type) {
        const attrPatch = attrsWalk(oldNode.props, newNode.props)
        if (Object.keys(attrPatch).length > 0) {
            vnPatch.push({
                type: ATTR,
                attrs: attrPatch
            })
        }
        childrenWalk(oldNode.children, newNode.children)
    }

    if (Object.keys(vnPatch).length > 0) {
        patches[index] = vnPatch
    }
}

function attrsWalk (oldAttrs, newAttrs) {
    let attrPatch = {}
    // 修改属性
    for (const key in oldAttrs) {
        if (oldAttrs[key] !== newAttrs[key]) {
            attrPatch[key] = newAttrs[key]
        }
    }
    // 添加属性
    for (const key in newAttrs) {
        if (!oldAttrs.hasOwnProperty(key)) {
            attrPatch[key] = newAttrs[key]
        }
    }
    return attrPatch

}

function childrenWalk (oldChildren, newChildren) {
    oldChildren.map((c, idx) => {
        vNodeWalk(c, newChildren[idx], ++vNodeIndex)
    })
}

export default domDiff