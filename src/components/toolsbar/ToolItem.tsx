// components/tool-item.tsx
import * as React from "react";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

interface ToolItemProps {
  isActive?: boolean;
  disabled?: boolean;
  className: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

const ToolItem: React.FC<ToolItemProps> = ({
  isActive = false,
  disabled = false,
  className,
  onClick,
  children,
}) => {
  return (
    <Button
      variant={isActive ? "outline" : "default"}
      className={cn("outline outline-transparent", className)}
      disabled={disabled}
      onClick={onClick}
    >
      {children && children}
    </Button>
  );
};

export default ToolItem;
