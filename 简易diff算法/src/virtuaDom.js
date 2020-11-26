import Element from './Element'
function createElement (type, props, children) {
    return new Element(type, props, children)
}
function setAttrs (node, prop, value) {
    switch (prop) {
        case 'value':
            if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
                node.value = value
            } else {
                node.setAttribute(prop, value)
            }
            break
        case 'style':
            node.style.cssText = value
            break
        default:
            node.setAttribute(prop, value)
            break
    }
}

function render (vDom) {
    const { type, props, children } = vDom
    const el = document.createElement(type)
    for (const key in props) {
        setAttrs(el, key, props[key])
    }
    children.map(e => {
        e = e instanceof Element
            ?
            render(e)
            :
            document.createTextNode(e)
        el.appendChild(e)
    })
    // console.log(el);
    return el
}

function renderDom (rDom, rootEl) {
    rootEl.appendChild(rDom)
}
export {
    createElement,
    render,
    setAttrs,
    renderDom
}