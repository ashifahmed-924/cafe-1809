/**
 * Minimal, dependency-free text splitter (SplitText Club plugin replacement).
 *
 * splitText(el, { type: 'lines' | 'lines,words' | 'words' | 'chars,words' ... })
 * - Words/chars are inline-block spans.
 * - Lines are wrapped as <span.split-line style="overflow:hidden"><span.split-line-inner>…</span></span>
 *   so GSAP can animate `.split-line-inner` with yPercent for a masked rise.
 * - Nested inline tags (<em>, <i>, <span class>) are flattened but their class / italics are kept per word.
 * - A screen-reader copy of the original text is appended and visual fragments are aria-hidden.
 * - revert() restores the original markup.
 *
 * Browser-only. Call after fonts are ready so line breaks are measured correctly.
 */
export function splitText(el, options = {}) {
  const type = options.type || 'lines';
  const wantLines = type.includes('lines');
  const wantChars = type.includes('chars');
  const lineClass = options.lineClass || 'split-line';
  const wordClass = options.wordClass || 'split-word';
  const charClass = options.charClass || 'split-char';

  const original = el.innerHTML;
  const plain = el.textContent.replace(/\s+/g, ' ').trim();
  const words = [];

  const walk = (node, inherit) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(' '));
            return;
          }
          const w = document.createElement('span');
          w.className = `${wordClass} ${inherit.cls}`.trim();
          w.style.display = 'inline-block';
          if (inherit.italic) w.style.fontStyle = 'italic';
          if (wantChars) {
            Array.from(part).forEach((ch) => {
              const c = document.createElement('span');
              c.className = charClass;
              c.style.display = 'inline-block';
              c.textContent = ch;
              w.appendChild(c);
            });
          } else {
            w.textContent = part;
          }
          frag.appendChild(w);
          words.push(w);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === 1 && child.nodeName !== 'BR') {
        walk(child, {
          cls: `${inherit.cls} ${typeof child.className === 'string' ? child.className : ''}`.trim(),
          italic: inherit.italic || /^(EM|I)$/.test(child.nodeName),
        });
      }
    });
  };

  walk(el, { cls: '', italic: false });

  let lineWrappers = [];
  let lineInners = [];

  if (wantLines && words.length) {
    const groups = [];
    let lastTop = null;
    words.forEach((w) => {
      const top = w.offsetTop;
      if (lastTop === null || Math.abs(top - lastTop) > w.offsetHeight * 0.5) {
        groups.push([]);
        lastTop = top;
      }
      groups[groups.length - 1].push(w);
    });

    el.textContent = '';
    groups.forEach((group) => {
      const line = document.createElement('span');
      line.className = lineClass;
      line.style.cssText =
        'display:block;overflow:hidden;padding:0.06em 0 0.16em;margin:-0.06em 0 -0.16em;';
      line.setAttribute('aria-hidden', 'true');
      const inner = document.createElement('span');
      inner.className = `${lineClass}-inner`;
      inner.style.cssText = 'display:inline-block;will-change:transform;';
      group.forEach((w, i) => {
        inner.appendChild(w);
        if (i < group.length - 1) inner.appendChild(document.createTextNode(' '));
      });
      line.appendChild(inner);
      el.appendChild(line);
      lineWrappers.push(line);
      lineInners.push(inner);
    });
  } else {
    words.forEach((w) => w.setAttribute('aria-hidden', 'true'));
  }

  const sr = document.createElement('span');
  sr.className = 'sr-only';
  sr.textContent = plain;
  el.appendChild(sr);

  return {
    el,
    lines: lineInners,
    lineWrappers,
    words,
    chars: words.flatMap((w) => Array.from(w.querySelectorAll(`.${charClass}`))),
    revert() {
      el.innerHTML = original;
    },
  };
}
