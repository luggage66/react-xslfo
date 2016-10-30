// see: https://github.com/facebook/react/blob/3d48139dd7a5c3dbd9ba1814bd31d9d8d8d71eff/src/renderers/dom/shared/ReactDOMInjection.js

let alreadyInjected = false;

export function inject() {
    if (alreadyInjected) {
        // TODO: This is currently true because these injections are shared between
        // the client and the server package. They should be built independently
        // and not share any injection state. Then this problem will be solved.
        return;
    }

}
