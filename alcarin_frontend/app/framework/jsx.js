import {h} from 'snabbdom';
import {is, head} from 'ramda';

export default function jsx(jsxObject) {
  if (is(Function, jsxObject.elementName)) {
    // custom element support
    return jsxObject.elementName(Object.assign(
      {children: wrapChildren(jsxObject.children)},
      jsxObject.attributes
    ));
  }
  return h(jsxObject.elementName, {props: jsxObject.attributes}, jsxObject.children);
}

function wrapChildren(children) {
  // chilren are wrapped by single div if they are more than one
  return children && (children.length > 1 ? h('div', {}, children) : head(children));
}
