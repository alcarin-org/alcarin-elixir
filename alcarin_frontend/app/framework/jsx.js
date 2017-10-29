import {h} from 'snabbdom';
import {is, head, omit, pick, flatten} from 'ramda';
import {
  CustomComponentContainerClass,
  JsxComponentDataKey,
  EmptyObject
} from './utils';

const SnabbdomModulesAttrs = ['$hook', '$on', '$class', '$dataset', '$style', '$attrs'];
const propsFilter = omit(SnabbdomModulesAttrs);
const snabbdomModulesFilter = pick(SnabbdomModulesAttrs);

/**
 * Transforms "babel-plugin-transform-jsx" jsx structures to "snabbdom" vdom.
 * For Custom Components create component factory function that let system
 * to deffer (or ignore) component creation.
 *
 * @param      {object}    jsxObject  The jsx object (output from "babel-plugin-transform-jsx" lib)
 * @return     {vdom}  { vdom returned by "snabbdom" lib}
 */
export default function jsx(jsxObject) {
  const children = jsxObject.children ? flatten(jsxObject.children) : [];
  const snabbdomModules = resolveSnabbdomModules(jsxObject.attributes);
  const props = propsFilter(jsxObject.attributes);

  if (is(Function, jsxObject.elementName)) {
    const customComponent = {
      props,
      factory: customComponentFactory(jsxObject.elementName, children)
    };
    // DEV MODE ONLY, FOR DEBUG PURPOSES
    DEBUG && (snabbdomModules.props = Object.assign(snabbdomModules.props || {}, {
      'customComponent': customComponent,
    }));
    DEBUG && console.log('attached', customComponent);
    const customComponentWrapper = h('div.' + CustomComponentContainerClass, snabbdomModules);
    customComponentWrapper[JsxComponentDataKey] = customComponent;

    return customComponentWrapper;
  }
  return h(jsxObject.elementName, Object.assign(snabbdomModules, {props}), children);
}

/**
 * prepare factory function that can be call later to create Custom Component vdom
 *
 * @param {Function} customComponentFn - The Custom Component function
 * @param {object}   props             - The properties
 * @param {array}    componentContent  - array of custom component children (component content).
 *                                       note that it aren't resolved component children.
 * @return {Function (state) -> vdom} Factory function that can be used to create Custom Element vdom later
 */
function customComponentFactory(customComponentFn, componentContent) {
  const factory = (totalState) => customComponentFn(Object.assign(
    {$children: componentContent},
    totalState
  ));
  // debug only
  Object.defineProperty(factory, 'name', {value: customComponentFn.name, writable: false});
  return factory;
}

function resolveSnabbdomModules(vNodeAttributes) {
  let modules = {};
  const jsxAttrs = snabbdomModulesFilter(vNodeAttributes);
  for (let key in jsxAttrs) {
    modules[key.slice(1)] = jsxAttrs[key];
  }
  return modules;
}
