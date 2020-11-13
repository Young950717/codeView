import {
    ATTR,
    TEXT,
    REPLACE,
    REMOVE
} from './patchType.js'
import { setAttrs, render } from './virtuaDom.js'
import Element from './Element'
let finalPatches = {},
    rnIndex = 0
function doPAtch (rDom, patches) {
    finalPatches = patches
    rNodeWalk(rDom)
}
function rNodeWalk (rNode) {
    const rnPatch = finalPatches[rnIndex++]
    const childNodes = rNode.childNodes
    Array.from(childNodes).map(c => {
        rNodeWalk(c)
    })
    if (rnPatch) {
        patchAction(rNode, rnPatch)
    }
}
function patchAction (rNode, rnPatch) {
    rnPatch.forEach(p => {
        switch (p.type) {
            case ATTR:
                for (const key in p.attrs) {
                    const value = p.attrs[key]
                    if (value) {
                        // 有属性
                        setAttrs(rNode, key, value)
                    } else {
                        rNode.removeAttribute(key)
                    }
                }
                break
            case TEXT:
                rNode.textContent = p.text
                break
            case REPLACE:
                const newNode = p.newNode instanceof Element
                    ?
                    render(p.newNode)
                    :
                    document.createTextNode(p.newNode)
                rNode.parentNode.replaceChild(newNode, rNode)
                break
            case REMOVE:
                rNode.parentNode.removeChild(rNode)
                break
            default:
                break

        }
    })
}
export default doPAtch