import { forwardRef } from 'react';

/**
 * Scene wrapper shared by every homepage section.
 *  - data-motion-section : id used by motion code, debugger and scene handoffs
 *  - data-scene-transition: id of the handoff that ENTERS this section (see lib/sceneTransitions.js)
 *  - theme: 'ink' | 'rice' | 'porcelain'
 */
const Section = forwardRef(function Section(
  { id, motionId, theme = 'rice', transition, labelledBy, className = '', children, as: Tag = 'section', ...rest },
  ref
) {
  return (
    <Tag
      ref={ref}
      id={id}
      aria-labelledby={labelledBy}
      data-motion-section={motionId || id}
      data-scene-transition={transition}
      data-theme={theme}
      className={`scene theme-${theme} ${className}`.trim()}
      {...rest}
    >
      {transition && <span data-scene-seam className="seam" aria-hidden="true" />}
      {children}
    </Tag>
  );
});

export default Section;
