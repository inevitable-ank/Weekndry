export async function exportElementToPng(el: HTMLElement, fileName = 'weekendly.png') {
  const { toPng } = await import('html-to-image');
  const dataUrl = await toPng(el, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: '#ffffff',
  });

  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataUrl;
  link.click();
}


