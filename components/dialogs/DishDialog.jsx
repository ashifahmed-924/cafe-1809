'use client';
import Dialog from './Dialog';
import Button from '@/components/ui/Button';
import { business, categories } from '@/data/businessData';
import { money, img } from '@/lib/format';

export default function DishDialog({ onClose, dish }) {
  if (!dish) return null;
  const cat = categories.find((c) => c.id === dish.category)?.label;
  return (
    <Dialog onClose={onClose} eyebrow={cat} title={dish.name}>
      <div className="space-y-5">
        {dish.image && (
          <div className="overflow-hidden rounded-2xl">
            <img src={img(dish.image)} alt="" className="aspect-[16/10] w-full object-cover" />
            <p className="mt-2 text-xs text-muted-themed">Representative photography.</p>
          </div>
        )}
        <p className="font-display text-4xl">{money(dish.price)}</p>
        <p className="lead !text-base">
          {dish.desc || 'Ask the team about how this is served on the day.'}
        </p>
        <p className="text-xs text-muted-themed">{business.menuDisclaimer}</p>
        <div className="flex flex-wrap gap-3">
          <Button href={business.order.uberEats} external variant="blue">
            View on Uber Eats
          </Button>
          <Button variant="outline" onClick={onClose}>
            Back to menu
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
