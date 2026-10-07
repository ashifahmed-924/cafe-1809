import { img } from '@/lib/format';

/**
 * Image with one of the ten frame treatments.
 * Final visual state is pure CSS (see globals.css). GSAP only animates *from* a collapsed
 * state, so if JS never runs the image is fully visible.
 *
 * frame: aperture | shutters | asymmetric | porcelain | portal | split | cinematic | grid | masked | outlined
 */
export default function FrameImage({
  src,
  alt = '',
  frame = 'cinematic',
  className = '',
  aspect = 'aspect-[4/5]',
  priority = false,
  caption,
  cover,
  parallax = true,
  objectPosition,
  motionTarget = 'frame',
}) {
  const style = cover ? { '--cover': cover } : undefined;
  return (
    <div
      className={`frame ${aspect} ${className}`.trim()}
      data-frame={frame}
      data-motion-target={motionTarget}
      style={style}
    >
      {frame === 'porcelain' && <span className="frame-panel" data-frame-panel aria-hidden="true" />}
      {frame === 'outlined' && <span className="frame-outline" data-frame-outline aria-hidden="true" />}
      {frame === 'portal' && <span className="frame-ring" data-frame-ring aria-hidden="true" />}
      <div className="frame-mask" data-frame-mask>
        <div className="frame-parallax" {...(parallax ? { 'data-frame-parallax': '' } : { style: { inset: 0 } })}>
          <img
            data-frame-img
            className="frame-img"
            src={img(src)}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            style={objectPosition ? { objectPosition } : undefined}
          />
        </div>
        {frame === 'shutters' && (
          <div className="frame-shutters" aria-hidden="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} data-shutter className="frame-shutter" />
            ))}
          </div>
        )}
        {frame === 'split' && (
          <>
            <span className="frame-split" data-split="top" aria-hidden="true" />
            <span className="frame-split" data-split="bottom" aria-hidden="true" />
          </>
        )}
      </div>
      {frame === 'grid' && (
        <>
          <span className="frame-line" data-frame-line style={{ left: '33.33%', top: 0, bottom: 0, width: 1 }} aria-hidden="true" />
          <span className="frame-line" data-frame-line style={{ left: '66.66%', top: 0, bottom: 0, width: 1 }} aria-hidden="true" />
          <span className="frame-line" data-frame-line style={{ top: '50%', left: 0, right: 0, height: 1 }} aria-hidden="true" />
        </>
      )}
      {caption && <span className="frame-caption">{caption}</span>}
    </div>
  );
}
