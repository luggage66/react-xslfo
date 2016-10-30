// see: https://github.com/facebook/react/blob/3d48139dd7a5c3dbd9ba1814bd31d9d8d8d71eff/src/renderers/dom/shared/ReactDOMInjection.js
import ReactInjection from 'react/lib/ReactInjection';
import ReactHostComponent from 'react/lib/ReactHostComponent';
import ReactXSLFOComponent from './ReactXSLFOComponent';
import ReactXSLFOTextComponent from './ReactXSLFOTextComponent';

// console.log('ReactStackInjection', ReactInjection);

let alreadyInjected = false;

export function inject() {
    if (alreadyInjected) {
        // TODO: This is currently true because these injections are shared between
        // the client and the server package. They should be built independently
        // and not share any injection state. Then this problem will be solved.
        return;
    }

    ReactHostComponent.injection.injectGenericComponentClass(ReactXSLFOComponent);
    ReactHostComponent.injection.injectTextComponentClass(ReactXSLFOTextComponent);
    //ReactHostComponent.injection.injectEmptyComponentFactory(xxx);

    // ReactEmptyComponent.injection.injectEmptyComponentFactory(
    //     function(instantiate) {
    //         return new ReactDOMEmptyComponent(instantiate);
    //     }
    // );

    // ReactUpdates.injection.injectReconcileTransaction(ReactReconcileTransaction);
    // ReactUpdates.injection.injectBatchingStrategy(ReactDefaultBatchingStrategy);

    // ReactComponentEnvironment.injection.injectEnvironment(ReactComponentBrowserEnvironment);
}
