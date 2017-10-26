export function ContainerComponent({label, $children}) {
  console.warn('drawing nested')
  return (
    <fieldset>
      <legend>wot</legend>
      {$children}
    </fieldset>
  );
}
