/**
 * Eyebrow + headline + lead used by most sections.
 * Headline is a static element (safe for splitText); wrap emphasised words in <em>.
 * Mobile (<768px) centers by default; desktop/tablet keep the requested align.
 */
export default function SectionHead({ id, eyebrow, jp, title, lead, align = 'left', className = '', as: H = 'h2', headingClass = 'h-section' }) {
  const centered = align === 'center';
  return (
    <div className={`${centered ? 'mx-auto text-center' : 'max-md:mx-auto max-md:text-center'} ${className}`.trim()}>
      <p data-motion-target="label" className={`eyebrow ${centered ? 'justify-center' : 'max-md:justify-center'}`}>
        {jp && (
          <span className="jp-label text-base normal-case tracking-[0.3em]" aria-hidden="true">
            {jp}
          </span>
        )}
        <span>{eyebrow}</span>
      </p>
      <H id={id} data-motion-target="heading" className={`${headingClass} mt-5 max-w-[20ch] ${centered ? 'mx-auto' : 'max-md:mx-auto'}`}>
        {title}
      </H>
      {lead && (
        <p data-motion-target="body" className={`lead mt-6 ${centered ? 'mx-auto' : 'max-md:mx-auto'}`}>
          {lead}
        </p>
      )}
    </div>
  );
}
