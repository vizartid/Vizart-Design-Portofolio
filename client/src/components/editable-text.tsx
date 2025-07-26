import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
  tag?: keyof JSX.IntrinsicElements;
  disabled?: boolean;
}

export function EditableText({
  value,
  onChange,
  className,
  placeholder,
  multiline = false,
  tag = "span",
  disabled = false,
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleClick = () => {
    if (!disabled) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (tempValue !== value) {
      onChange(tempValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      setIsEditing(false);
      if (tempValue !== value) {
        onChange(tempValue);
      }
    } else if (e.key === "Escape") {
      setTempValue(value);
      setIsEditing(false);
    }
  };

  const handleInput = (e: React.FormEvent<HTMLElement>) => {
    setTempValue(e.currentTarget.textContent || "");
  };

  const Tag = tag as any;

  return (
    <Tag
      ref={ref}
      className="outline-none cursor-text hover:bg-transparent inline text-[20px]"
      contentEditable={!disabled}
      suppressContentEditableWarning
      onClick={handleClick}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onInput={handleInput}
      data-placeholder={placeholder}
      dangerouslySetInnerHTML={{ __html: tempValue }}
    />
  );
}