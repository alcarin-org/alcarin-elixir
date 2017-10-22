import {h} from 'snabbdom';
import {is, head, omit, pick, clone} from 'ramda';
import {storeProvider} from './index';

const SpecialAttributes = ['hook', 'on', 'class', 'dataset', 'style', 'attrs'];
const propsOnly = omit(SpecialAttributes);
const specialAttributes = pick(SpecialAttributes);
const ComponentContainerClass = '__c-c';

export default function jsx(jsxObject) {
  const modules = Object.assign(specialAttributes(jsxObject.attributes), {
    props: propsOnly(jsxObject.attributes),
  });

  if (is(Function, jsxObject.elementName)) {
    // custom element support
    // const className = jsxObject.attributes.className ?
    //   (' ' + jsxObject.attributes.className) : '';

    // jsxObject.attributes.className = ComponentContainerClass + className;
    return Object.assign(h('div.' + ComponentContainerClass, modules), {
      factory: (state) => jsxObject.elementName(Object.assign(
        {children: wrapChildren(jsxObject.children)},
        modules.props,
        state,
      ))
    })
  }

  return h(jsxObject.elementName, modules, jsxObject.children);
}

function wrapChildren(children) {
  // chilren are wrapped by single div if they are more than one
  return children && (children.length > 1 ? h('div', {}, children) : head(children));
}
