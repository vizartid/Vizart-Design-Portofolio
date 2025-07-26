import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { Settings, Save, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ErrorBoundary from "./error-boundary";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface SectionItem {
  id: string;
  name: string;
  component: string;
}

const DEFAULT_SECTIONS: SectionItem[] = [
  { id: "hero", name: "Hero Section", component: "HeroSection" },
  { id: "services", name: "Services", component: "ServicesSection" },
  { id: "process", name: "Process", component: "ProcessSection" },
  { id: "winning-edge", name: "Winning Edge", component: "WinningEdgeSection" },
  { id: "hero-showcase", name: "Hero Showcase", component: "HeroSectionsShowcase" },
  { id: "testimonials", name: "Testimonials", component: "TestimonialsSection" },
  { id: "faq", name: "FAQ", component: "FAQSection" }
];

export function SectionOrderEditor() {
  const [isOpen, setIsOpen] = useState(false);
  const [sections, setSections] = useLocalStorage<SectionItem[]>('sectionOrder', DEFAULT_SECTIONS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Emit event setiap kali urutan section berubah
  useEffect(() => {
    if (mounted) {
      window.dispatchEvent(new CustomEvent('sectionOrderChanged', { 
        detail: { sections } 
      }));
    }
  }, [sections, mounted]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSections(items);
  };

  const applySectionOrder = () => {
    // Data sudah otomatis tersimpan, hanya perlu reload
    window.location.reload();
  };

  const resetToDefault = () => {
    setSections(DEFAULT_SECTIONS);
    window.location.reload();
  };

  return (
    <ErrorBoundary>
      <div className="fixed top-4 left-4 z-50">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm" className="bg-white shadow-lg">
            <Settings className="w-4 h-4 mr-2" />
            Urutan Section
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <Card className="w-80 mt-2 bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg">Editor Urutan Section</CardTitle>
              <p className="text-sm text-gray-600">Drag untuk mengubah urutan</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {mounted ? (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="sections">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="space-y-2"
                      >
                        {sections.map((section, index) => (
                          <Draggable
                            key={section.id}
                            draggableId={section.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border ${
                                  snapshot.isDragging ? 'shadow-lg' : ''
                                }`}
                              >
                                <GripVertical className="w-4 h-4 text-gray-400" />
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{section.name}</p>
                                  <p className="text-xs text-gray-500">{section.component}</p>
                                </div>
                                <span className="text-xs text-gray-400">#{index + 1}</span>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              ) : (
                <div className="space-y-2">
                  {sections.map((section, index) => (
                    <div key={section.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border">
                      <GripVertical className="w-4 h-4 text-gray-400" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{section.name}</p>
                        <p className="text-xs text-gray-500">{section.component}</p>
                      </div>
                      <span className="text-xs text-gray-400">#{index + 1}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={applySectionOrder} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Terapkan
                </Button>
                <Button onClick={resetToDefault} variant="outline" className="flex-1">
                  Reset
                </Button>
              </div>
              
              <div className="text-xs text-gray-500 mt-2">
                <p>Drag item untuk mengubah urutan tampilan section</p>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
    </ErrorBoundary>
  );
}