import { useState } from "react";
import { Settings, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface TextSizeConfig {
  heroTitle: string;
  heroSubtitle: string;
  heroStats: string;
  button: string;
  accepting: string;
  projectTitle: string;
  projectDesc: string;
  aboutTitle: string;
  aboutText: string;
  contactTitle: string;
  contactText: string;
}

const DEFAULT_SIZES: TextSizeConfig = {
  heroTitle: "96px",
  heroSubtitle: "20px", 
  heroStats: "18px",
  button: "18px",
  accepting: "14px",
  projectTitle: "32px",
  projectDesc: "16px",
  aboutTitle: "48px",
  aboutText: "16px",
  contactTitle: "36px",
  contactText: "16px"
};

export function TextSizeEditor() {
  const [isOpen, setIsOpen] = useState(false);
  const [sizes, setSizes] = useState<TextSizeConfig>(() => {
    const saved = localStorage.getItem('textSizes');
    return saved ? JSON.parse(saved) : DEFAULT_SIZES;
  });

  const handleSizeChange = (key: keyof TextSizeConfig, value: string) => {
    setSizes(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyStyles = () => {
    // Hapus style lama jika ada
    const existingStyle = document.getElementById('custom-text-sizes');
    if (existingStyle) {
      existingStyle.remove();
    }

    // Buat style baru
    const style = document.createElement('style');
    style.id = 'custom-text-sizes';
    style.textContent = `
      .custom-hero-title { font-size: ${sizes.heroTitle} !important; }
      .custom-hero-subtitle { font-size: ${sizes.heroSubtitle} !important; }
      .custom-hero-stats { font-size: ${sizes.heroStats} !important; }
      .custom-button { font-size: ${sizes.button} !important; }
      .custom-accepting { font-size: ${sizes.accepting} !important; }
      .custom-project-title { font-size: ${sizes.projectTitle} !important; }
      .custom-project-desc { font-size: ${sizes.projectDesc} !important; }
      .custom-about-title { font-size: ${sizes.aboutTitle} !important; }
      .custom-about-text { font-size: ${sizes.aboutText} !important; }
      .custom-contact-title { font-size: ${sizes.contactTitle} !important; }
      .custom-contact-text { font-size: ${sizes.contactText} !important; }
    `;
    
    document.head.appendChild(style);
    
    // Simpan ke localStorage
    localStorage.setItem('textSizes', JSON.stringify(sizes));
    
    // Reload halaman untuk memastikan perubahan terlihat
    window.location.reload();
  };

  const resetToDefault = () => {
    setSizes(DEFAULT_SIZES);
    localStorage.removeItem('textSizes');
    
    // Hapus custom styles
    const existingStyle = document.getElementById('custom-text-sizes');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    window.location.reload();
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm" className="bg-white shadow-lg">
            <Settings className="w-4 h-4 mr-2" />
            Edit Ukuran Teks
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <Card className="w-80 mt-2 bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg">Editor Ukuran Teks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="heroTitle">Judul Hero (H1)</Label>
                  <Input
                    id="heroTitle"
                    value={sizes.heroTitle}
                    onChange={(e) => handleSizeChange('heroTitle', e.target.value)}
                    placeholder="96px"
                  />
                </div>
                
                <div>
                  <Label htmlFor="heroSubtitle">Subtitle Hero</Label>
                  <Input
                    id="heroSubtitle"
                    value={sizes.heroSubtitle}
                    onChange={(e) => handleSizeChange('heroSubtitle', e.target.value)}
                    placeholder="20px"
                  />
                </div>
                
                <div>
                  <Label htmlFor="heroStats">Teks Hero Stats</Label>
                  <Input
                    id="heroStats"
                    value={sizes.heroStats}
                    onChange={(e) => handleSizeChange('heroStats', e.target.value)}
                    placeholder="18px"
                  />
                </div>
                
                <div>
                  <Label htmlFor="button">Ukuran Button</Label>
                  <Input
                    id="button"
                    value={sizes.button}
                    onChange={(e) => handleSizeChange('button', e.target.value)}
                    placeholder="18px"
                  />
                </div>
                
                <div>
                  <Label htmlFor="accepting">Teks "Accepting"</Label>
                  <Input
                    id="accepting"
                    value={sizes.accepting}
                    onChange={(e) => handleSizeChange('accepting', e.target.value)}
                    placeholder="14px"
                  />
                </div>
                
                <div>
                  <Label htmlFor="projectTitle">Judul Project</Label>
                  <Input
                    id="projectTitle"
                    value={sizes.projectTitle}
                    onChange={(e) => handleSizeChange('projectTitle', e.target.value)}
                    placeholder="32px"
                  />
                </div>
                
                <div>
                  <Label htmlFor="projectDesc">Deskripsi Project</Label>
                  <Input
                    id="projectDesc"
                    value={sizes.projectDesc}
                    onChange={(e) => handleSizeChange('projectDesc', e.target.value)}
                    placeholder="16px"
                  />
                </div>
                
                <div>
                  <Label htmlFor="aboutTitle">Judul About</Label>
                  <Input
                    id="aboutTitle"
                    value={sizes.aboutTitle}
                    onChange={(e) => handleSizeChange('aboutTitle', e.target.value)}
                    placeholder="48px"
                  />
                </div>
                
                <div>
                  <Label htmlFor="aboutText">Teks About</Label>
                  <Input
                    id="aboutText"
                    value={sizes.aboutText}
                    onChange={(e) => handleSizeChange('aboutText', e.target.value)}
                    placeholder="16px"
                  />
                </div>
                
                <div>
                  <Label htmlFor="contactTitle">Judul Contact</Label>
                  <Input
                    id="contactTitle"
                    value={sizes.contactTitle}
                    onChange={(e) => handleSizeChange('contactTitle', e.target.value)}
                    placeholder="36px"
                  />
                </div>
                
                <div>
                  <Label htmlFor="contactText">Teks Contact</Label>
                  <Input
                    id="contactText"
                    value={sizes.contactText}
                    onChange={(e) => handleSizeChange('contactText', e.target.value)}
                    placeholder="16px"
                  />
                </div>
              </div>
              
              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={applyStyles} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Terapkan
                </Button>
                <Button onClick={resetToDefault} variant="outline" className="flex-1">
                  Reset
                </Button>
              </div>
              
              <div className="text-xs text-gray-500 mt-2">
                <p>Tips: Gunakan px, rem, em, atau %</p>
                <p>Contoh: 24px, 1.5rem, 2em, 120%</p>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}