import {h} from 'snabbdom';
import {is, head, omit, pick, clone} from 'ramda';
import {storeProvider} from './index';

const SnabbdomModulesAttrs = ['$hook', '$on', '$class', '$dataset', '$style', '$attrs'];
const propsFilter = omit(SnabbdomModulesAttrs);
const snabbdomModulesFilter = pick(SnabbdomModulesAttrs);

const ComponentContainerClass = '__c';
const ComponentContentClass  = '__c-c';

export default function jsx(jsxObject) {
  const snabbdomModules = Object.assign(resolveSnabbdomModules(jsxObject.attributes), {
    props: propsFilter(jsxObject.attributes),
  });

  if (is(Function, jsxObject.elementName)) {
    const customComponentWrapper = h('div.' + ComponentContainerClass, snabbdomModules);
    return Object.assign(customComponentWrapper, {
      factory: customComponentFactory(jsxObject.elementName, snabbdomModules.props, jsxObject.children)
    })
  }

  return h(jsxObject.elementName, snabbdomModules, jsxObject.children);
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
  return (state) => customComponentFn(Object.assign(
    {$children: wrapContent(componentContent)},
    props,
    state
  ));
}

function resolveSnabbdomModules(vNodeAttributes) {
  let modules = {};
  const jsxAttrs = snabbdomModulesFilter(vNodeAttributes);
  for (let key in jsxAttrs) {
    modules[key.slice(1)] = jsxAttrs[key];
  }
  return modules;
}

function wrapContent(children) {
  // chilren are wrapped by single div if they are more than one
  return children && (children.length > 1 ? h('div.' + ComponentContentClass, {}, children) : head(children));
}
