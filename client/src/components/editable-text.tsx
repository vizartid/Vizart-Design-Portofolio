
import React, { useState, useRef, useEffect } from 'react';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  tag?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  multiline?: boolean;
  className?: string;
  placeholder?: string;
}

export function EditableText({
  value,
  onChange,
  tag = 'span',
  multiline = false,
  className = '',
  placeholder = 'Click to edit...'
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLInputElement || inputRef.current instanceof HTMLTextAreaElement) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = () => {
    onChange(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Enter' && multiline && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleBlur = () => {
    handleSubmit();
  };

  if (isEditing) {
    const inputProps = {
      ref: inputRef as any,
      value: editValue,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
        setEditValue(e.target.value),
      onKeyDown: handleKeyDown,
      onBlur: handleBlur,
      className: `border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`,
      placeholder
    };

    if (multiline) {
      return (
        <textarea
          {...inputProps}
          rows={3}
          style={{ resize: 'vertical', minHeight: '60px' }}
        />
      );
    }

    return <input type="text" {...inputProps} />;
  }

  const Tag = tag as keyof JSX.IntrinsicElements;
  
  return (
    <Tag
      onClick={handleClick}
      className={`cursor-pointer hover:bg-gray-100 hover:bg-opacity-50 rounded px-1 transition-colors duration-200 ${className}`}
      title="Click to edit"
    >
      {value || placeholder}
    </Tag>
  );
}
