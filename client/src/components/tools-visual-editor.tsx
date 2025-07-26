import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Upload, Edit, Save, X } from 'lucide-react';
import { useContent, useUpdateContentSection } from '@/hooks/use-content';

export default function ToolsVisualEditor() {
  const { data: content, isLoading } = useContent();
  const updateSection = useUpdateContentSection();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingBranding, setEditingBranding] = useState(false);

  if (isLoading || !content) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const handleUpdateTools = (updatedTools: any[]) => {
    const updatedHero = {
      ...content.hero,
      tools: updatedTools,
    };
    
    updateSection.mutate({
      section: "hero",
      data: updatedHero,
    });
  };

  const handleUpdateBranding = (field: string, value: string) => {
    const updatedBranding = {
      ...(content.branding || {}),
      [field]: value,
    };
    
    updateSection.mutate({
      section: "branding",
      data: updatedBranding,
    });
  };

  const handleBrandingImageUpload = (field: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleUpdateBranding(field, result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTool = () => {
    const newTool = {
      name: "New Tool",
      color: "blue-500",
      icon: "Frame",
      logoUrl: ""
    };
    const updatedTools = [...content.hero.tools, newTool];
    handleUpdateTools(updatedTools);
  };

  const handleDeleteTool = (index: number) => {
    const updatedTools = content.hero.tools.filter((_, i) => i !== index);
    handleUpdateTools(updatedTools);
  };

  const handleUpdateTool = (index: number, field: string, value: string) => {
    const updatedTools = [...content.hero.tools];
    updatedTools[index] = { ...updatedTools[index], [field]: value };
    handleUpdateTools(updatedTools);
  };

  const handleImageUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleUpdateTool(index, 'logoUrl', result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Tools & Branding Editor</h1>
          <div className="flex space-x-3">
            <Button 
              onClick={() => setEditingBranding(!editingBranding)} 
              variant={editingBranding ? "outline" : "default"}
              className="bg-green-600 hover:bg-green-700"
            >
              {editingBranding ? "Close Branding Editor" : "Edit Logos"}
            </Button>
            <Button onClick={handleAddTool} className="bg-blue-600 hover:bg-blue-700">
              Add New Tool
            </Button>
          </div>
        </div>

        {/* Branding Editor Section */}
        {editingBranding && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl">Logo & Branding Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Navbar Logo */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Navbar Logo</h3>
                  <div className="flex items-center justify-center h-24 bg-gray-100 rounded-lg">
                    {(content.branding as any)?.logoUrl ? (
                      <img
                        src={(content.branding as any).logoUrl}
                        alt="Navbar Logo"
                        className="max-h-16 max-w-32 object-contain"
                      />
                    ) : (
                      <div className="text-2xl font-bold text-gray-500">
                        {(content.branding as any)?.logoText || "Vizart"}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="navbar-logo-text">Logo Text</Label>
                      <Input
                        id="navbar-logo-text"
                        value={(content.branding as any)?.logoText || ''}
                        onChange={(e) => handleUpdateBranding('logoText', e.target.value)}
                        placeholder="Enter logo text"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="navbar-logo-upload">Upload Logo Image</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="navbar-logo-upload"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleBrandingImageUpload('logoUrl', e)}
                          className="flex-1"
                        />
                        <Upload className="h-4 w-4 text-gray-500" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="navbar-logo-url">Or Paste Image URL</Label>
                      <Input
                        id="navbar-logo-url"
                        value={(content.branding as any)?.logoUrl || ''}
                        onChange={(e) => handleUpdateBranding('logoUrl', e.target.value)}
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Logo */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Footer Logo</h3>
                  <div className="flex items-center justify-center h-24 bg-gray-100 rounded-lg">
                    {(content.branding as any)?.footerLogoUrl ? (
                      <img
                        src={(content.branding as any).footerLogoUrl}
                        alt="Footer Logo"
                        className="max-h-16 max-w-32 object-contain"
                      />
                    ) : (
                      <div className="text-2xl font-bold text-gray-500">
                        {(content.branding as any)?.footerLogoText || "Lander"}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="footer-logo-text">Logo Text</Label>
                      <Input
                        id="footer-logo-text"
                        value={(content.branding as any)?.footerLogoText || ''}
                        onChange={(e) => handleUpdateBranding('footerLogoText', e.target.value)}
                        placeholder="Enter footer logo text"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="footer-logo-upload">Upload Logo Image</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="footer-logo-upload"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleBrandingImageUpload('footerLogoUrl', e)}
                          className="flex-1"
                        />
                        <Upload className="h-4 w-4 text-gray-500" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="footer-logo-url">Or Paste Image URL</Label>
                      <Input
                        id="footer-logo-url"
                        value={(content.branding as any)?.footerLogoUrl || ''}
                        onChange={(e) => handleUpdateBranding('footerLogoUrl', e.target.value)}
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tools Section</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.hero.tools.map((tool, index) => (
            <Card key={index} className="relative">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                      className="p-1 h-8 w-8"
                    >
                      {editingIndex === index ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTool(index)}
                      className="p-1 h-8 w-8 text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {editingIndex === index ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor={`name-${index}`}>Tool Name</Label>
                      <Input
                        id={`name-${index}`}
                        value={tool.name}
                        onChange={(e) => handleUpdateTool(index, 'name', e.target.value)}
                        placeholder="Tool Name"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`color-${index}`}>Color Class</Label>
                      <select
                        id={`color-${index}`}
                        value={tool.color}
                        onChange={(e) => handleUpdateTool(index, 'color', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="blue-500">Blue</option>
                        <option value="purple-500">Purple</option>
                        <option value="green-500">Green</option>
                        <option value="red-500">Red</option>
                        <option value="yellow-500">Yellow</option>
                        <option value="indigo-500">Indigo</option>
                        <option value="pink-500">Pink</option>
                        <option value="orange-500">Orange</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor={`logo-${index}`}>Upload Logo</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id={`logo-${index}`}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(index, e)}
                          className="flex-1"
                        />
                        <Upload className="h-4 w-4 text-gray-500" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor={`logoUrl-${index}`}>Or Paste Image URL</Label>
                      <Input
                        id={`logoUrl-${index}`}
                        value={(tool as any).logoUrl || ''}
                        onChange={(e) => handleUpdateTool(index, 'logoUrl', e.target.value)}
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-center h-24 bg-gray-100 rounded-lg">
                      {(tool as any).logoUrl ? (
                        <img
                          src={(tool as any).logoUrl}
                          alt={tool.name}
                          className="max-h-16 max-w-16 object-contain"
                        />
                      ) : (
                        <div className={`w-12 h-12 bg-${tool.color} rounded-md flex items-center justify-center text-white font-bold`}>
                          {tool.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{tool.name}</p>
                      <p className="text-sm text-gray-500">Color: {tool.color}</p>
                      <p className="text-xs text-gray-400">
                        {(tool as any).logoUrl ? 'Custom logo' : 'Default icon'}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {content.hero.tools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No tools added yet</p>
            <Button onClick={handleAddTool} className="bg-blue-600 hover:bg-blue-700">
              Add Your First Tool
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}