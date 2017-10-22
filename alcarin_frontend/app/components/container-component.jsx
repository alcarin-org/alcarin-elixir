export function ContainerComponent({label, children, counter}) {
  console.log('generating component: ', label)
  return (
    <fieldset>
      <legend >{label} {counter}</legend>
      <input type="text" />
      <button attrs={{class: 'wot3'}} on={{click: () => alert(5)}}>test</button>
    </fieldset>
  );
}
