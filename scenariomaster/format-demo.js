// Isolated landing-page demonstration. No document access or file export.
for (const form of document.querySelectorAll('.format-controls')) {
  const preview = document.getElementById(`${form.dataset.format}-preview`);
  if (!preview) continue;
  const inputs = [...form.querySelectorAll('input[type="range"]')];
  const selects = [...form.querySelectorAll('select')];
  const numbering = form.querySelector('input[name="scene-numbers"]');
  function render() {
    preview.querySelectorAll('[data-scene-title]').forEach((heading, index) => {
      const title = heading.dataset.sceneTitle;
      heading.textContent = numbering?.checked && !/[0-9０-９]/.test(title) ? `${index + 1}. ${title}` : title;
    });
    for (const input of inputs) {
      const value = Number(input.value);
      const unit = input.dataset.unit;
      preview.style.setProperty(`--demo-${input.name}`, input.name === 'leading' ? String(value / 100) : `${value}${input.name === 'cue' ? 'em' : unit}`);
      form.querySelector(`output[for="${input.id}"]`).textContent = `${value}${unit}`;
      input.setAttribute('aria-valuetext', `${value}${unit}`);
    }
    for (const select of selects) {
      if (select.name.endsWith('-style')) {
        const role = select.name.replace('-style', '');
        preview.style.setProperty(`--${role}-weight`, select.value.includes('bold') ? '700' : '400');
        preview.style.setProperty(`--${role}-style`, select.value.includes('italic') ? 'italic' : 'normal');
      } else preview.dataset[select.name] = select.value;
    }
  }
  form.addEventListener('input', render);
  form.addEventListener('change', render);
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('reset', () => {
    // Reset values explicitly before rendering instead of waiting on the default action.
    for (const input of inputs) input.value = input.defaultValue;
    for (const select of selects) select.value = [...select.options].find(option => option.defaultSelected)?.value ?? select.options[0].value;
    if (numbering) numbering.checked = numbering.defaultChecked;
    render();
  });
  render();
}
