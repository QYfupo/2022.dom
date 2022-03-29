window.dom = {
    create(string) {
        let container = document.createElement('template')
        container.innerHTML = string.trim()
        return container.content.firstChild
    },
    after(node, string) {
        let a = dom.create(string)
        node.parentNode.insertBefore(a, node.nextSibling)
    },
    before(node, string) {
        let a = dom.create(string)
        node.parentNode.insertBefore(a, node)
    },
    append(node, node1) {
        node.appendChild(node1)
    },
    remove(node) {
        node.parentNode.removeChild(node)
    },
    empty(node) {
        let a = node.firstChild
        let array = []
        while (a) {
            array.push(node.removeChild(a))
            a = node.firstChild
        }
    },
    attr(node, name, value) {
        if (arguments.length === 2) {
            return node.getAttribute(name)
        } else if (arguments.length === 3) {
            node.setAttribute(name, value)
        }//重载
    },
    text(node, string) {
        if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerText
            } else {
                return node.textConetet
            }//适配
        } else if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText = string
            } else {
                node.textConetet = string
            }
        }
    },
    style(node, name, value) {
        if (node instanceof Text) {
            console.log("i am text")
        } else {
            if (arguments.length === 2) {
                if (typeof name === 'string') {
                    return node.style[name]
                } else if (name instanceof Object) {
                    let object = name
                    for (let key in object) {
                        node.style[key] = name[key]
                    }
                }
            } else if (arguments.length === 3) {
                console.log('node.style', node, name, value, node.style)
                node.style[name] = value
            }
        }
    },
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            let a = node.classList.contains(className)
            console.log(a)
            return a
        }
    },
    on(node, enentName, fn) {
        node.addEventListener(enentName, fn)
    },
    off(node, enentName, fn) {
        node.removeEventListener(enentName, fn)
    },
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },
    grandparent(node) {
        return node.parentNode.parentNode
    },
    parent(node) {
        return node.parentNode
    },
    children(node) {
        return node.childNodes//node.children
    },
    siblings(node) {
        return Array.from(node.parentNode.children)
            .filter(n => n !== node)
    },
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },
    previous(node) {
        let x = node.previousSibling
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn(nodeList[i])
        }
    },
    index(node) {
        let parent = node.parentNode
        for (let i = 0; i < parent.childNodes.length; i++) {
            if (parent.childNodes[i] === node) {
                return i
            }
        }
    }
}