import {h} from 'snabbdom';
import {is, head, omit, pick, clone} from 'ramda';
import {storeProvider} from './index';
import {
  CustomComponentContainerClass,
  CustomComponentContentClass,
  CustomComponentKey,
  EmptyObject
} from './const';

const SnabbdomModulesAttrs = ['$hook', '$on', '$class', '$dataset', '$style', '$attrs'];
const propsFilter = omit(SnabbdomModulesAttrs);
const snabbdomModulesFilter = pick(SnabbdomModulesAttrs);

export default function jsx(jsxObject) {
  const snabbdomModules = resolveSnabbdomModules(jsxObject.attributes);
  const props = propsFilter(jsxObject.attributes);

  if (is(Function, jsxObject.elementName)) {
    const customComponent = {
      props,
      factory: customComponentFactory(jsxObject.elementName, jsxObject.children)
    };
    // DEV MODE ONLY, FOR DEBUG PURPOSES
    snabbdomModules.props = Object.assign(snabbdomModules.props || {}, {
      'customComponent': customComponent,
    });
    const customComponentWrapper = h('div.' + CustomComponentContainerClass, snabbdomModules);
    customComponentWrapper[CustomComponentKey] = customComponent;

    return customComponentWrapper;
  }

  return h(jsxObject.elementName, Object.assign(snabbdomModules, {props}), jsxObject.children);
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
function customComponentFactory(customComponentFn, props, componentContent) {
  const factory = (props = EmptyObject, state = EmptyObject) => customComponentFn(Object.assign(
    {$children: wrapCustomComponentContent(componentContent)},
    props,
    state
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

function wrapCustomComponentContent(children) {
  // chilren are wrapped by single div if they are more than one
  return children && (children.length > 1 ? h('div.' + CustomComponentContentClass, {}, children) : head(children));
}
