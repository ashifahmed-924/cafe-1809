'use client';
import Dialog from './Dialog';
import { business } from '@/data/businessData';
import { img } from '@/lib/format';

export default function LightboxDialog({ onClose, photo }) {
  if (!photo) return null;
  return (
    <Dialog onClose={onClose} wide theme="ink" eyebrow="Atmosphere" title={photo.caption}>
      <img src={img(photo.src)} alt={photo.alt} className="max-h-[60vh] w-full rounded-2xl object-cover" />
      <p className="mt-3 text-xs text-muted-themed">{business.imageryNote}</p>
    </Dialog>
  );
}
