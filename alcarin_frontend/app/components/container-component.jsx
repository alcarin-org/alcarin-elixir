export function ContainerComponent(x) {
  const {label, children, counter} = x;
  console.log('re-create fieldset comp: ', label)
  console.log('++++++++++', x)
  return (
    <fieldset>
      <legend >{label} {counter}</legend>
      <input type="text" />
      <button attrs={{class: 'wot3'}} on={{click: () => alert(5)}}>test</button>
    </fieldset>
  );
}
