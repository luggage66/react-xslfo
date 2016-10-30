// see: https://github.com/facebook/react/blob/e3131c1d55d6695c2f0966379535f88b813f912b/src/renderers/dom/stack/client/ReactDOMComponent.js
import ReactMultiChild from 'react/lib/ReactMultiChild';
import XMLWriter from 'xml-writer';

const twoPartProperties = [
    'block-progression-dimension.maximum',
    'block-progression-dimension.minimum',
    'block-progression-dimension.optimum',
    'border-before-width.conditional',
    'border-before-width.length',
    'border-separation.block-progression-direction',
    'border-separation.inline-progression-direction',
    'inline-progression-dimension.maximum',
    'inline-progression-dimension.minimum',
    'inline-progression-dimension.optimum',
    'keep-together.within-column',
    'keep-together.within-line',
    'keep-together.within-page',
    'keep-with-next.within-line',
    'keep-with-previous.within-line',
    'leader-length.maximum',
    'leader-length.minimum',
    'leader-length.optimum',
    'line-height.conditionality',
    'line-height.maximum',
    'line-height.minimum',
    'line-height.optimum',
    'line-height.precedence',
    'space-after.precedence',
    'space-before.conditionality',
    'space-before.maximum',
    'space-before.minimum',
    'space-before.optimum',
    'space-before.precedence',
    'space.minimum'
].map(p => p.replace(/[.].*/, ''));

function fixAttributeName(attributeName) {
    attributeName = decamelize(attributeName, '-');

    let splitFrom = twoPartProperties.find(p => attributeName.indexOf(p) === 0);

    if (splitFrom) {
        return `${splitFrom}.${attributeName.substring(splitFrom.length + 1)}`
    }
    else {
        return attributeName;
    }
}

export default class ReactXSLFOComponent {
    _currentElement;
    _renderedChildren = null; //expected to exist by ReactMultiChild

    constructor(element) {
        this._currentElement = element;
        // console.log('new ReactXSLFOComponent()', arguments);
    }

    receiveComponent() {
        console.log('ReactXSLFOComponent.receiveComponent()', ...arguments);
        throw new Error('ReactXSLFOComponent.receiveComponent() not implemented');
    }

    toJSON() {
        console.log('ReactXSLFOComponent.toJSON()', ...arguments);
        throw new Error('ReactXSLFOComponent.toJSON() not implemented');
    }

    mountComponent(transaction, hostParent, hostContainerInfo, context) {
        // console.log('ReactXSLFOComponent.mountComponent()', this._currentElement, ...arguments);

        // mountChildren from ReactMultiChild. looks like it might need replaced for my use
        let tagName = this._currentElement.type;
        let tagContents = this.mountChildren(this._currentElement.props.children, transaction, context);

        return `<${tagName}>${tagContents}</${tagName}>`;

        const element = this._currentElement;

        if (typeof(element) === 'string') {
            writer.text(element);
        }
        else if (Array.isArray(element)) {
            Array.prototype.forEach.call(element, (e) => elementToStream(e, writer));
        }
        else {
            writer.startElementNS('fo', element.tag);

            let innerXML;

            for (let attributeName in element.attributes) {
                if (attributeName === 'dangerouslySetInnerXML') {
                    console.error(element.attributes[attributeName].__xml);
                    innerXML = element.attributes[attributeName].__xml;
                }
                else {
                    writer.writeAttribute(fixAttributeName(attributeName), element.attributes[attributeName]);
                }
            }

            if (innerXML) {
                writer.writeRaw(innerXML);
            }
            else {
                elementToStream(element.children, writer);
            }

            writer.endElement();
        }
    }

    getHostNode() {
        console.log('ReactXSLFOComponent.getHostNode()', ...arguments);
        throw new Error('ReactXSLFOComponent.getHostNode() not implemented');
    }
    unmountComponent() {
        console.log('ReactXSLFOComponent.unmountComponent()', ...arguments);
        throw new Error('ReactXSLFOComponent.unmountComponent() not implemented');
    }
}

// Extending the component with the MultiChild mixin. For some reason..?

Object.assign(ReactXSLFOComponent.prototype, ReactMultiChild.Mixin);
