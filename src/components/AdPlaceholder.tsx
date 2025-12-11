interface AdPlaceholderProps {
  position: 'banner' | 'sidebar' | 'bottom' | 'in-article';
  className?: string;
}

export function AdPlaceholder({ position, className = '' }: AdPlaceholderProps) {
  const sizes = {
    banner: 'h-24 md:h-28',
    sidebar: 'h-64 md:h-80',
    bottom: 'h-24 md:h-28',
    'in-article': 'h-20 md:h-24 my-6',
  };

  return (
    <div 
      className={`w-full ${sizes[position]} bg-muted/30 border border-dashed border-border rounded-lg flex items-center justify-center ${className}`}
      aria-label="Advertisement placeholder"
    >
      <span className="text-xs text-muted-foreground/50">Ad Space</span>
    </div>
  );
}
