import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SettingSection {
  title: string;
  isOpen: boolean;
  items: {
    label: string;
    type: 'switch' | 'select' | 'button';
    value?: boolean | string;
    options?: string[];
  }[];
}

export default function AdminSettings() {
  const [sections, setSections] = useState<SettingSection[]>([
    {
      title: "General",
      isOpen: true,
      items: [
        { label: "Language", type: "select", value: "EN", options: ["EN", "ES", "FR", "DE"] },
        { label: "Data Backup", type: "switch", value: true },
      ]
    },
    {
      title: "Connect To",
      isOpen: false,
      items: [
        { label: "GoDash", type: "switch", value: true },
        { label: "SuperController", type: "switch", value: true },
      ]
    },
    {
      title: "Email",
      isOpen: false,
      items: [
        { label: "Enable SMTP", type: "switch", value: true },
      ]
    },
    {
      title: "Authorization",
      isOpen: false,
      items: [
        { label: "Edit authorization", type: "switch", value: true },
        { label: "Authority Level", type: "button" },
      ]
    },
    {
      title: "Notification",
      isOpen: false,
      items: [
        { label: "Enable Notification", type: "switch", value: true },
      ]
    },
  ]);

  const toggleSection = (index: number) => {
    setSections(prev => prev.map((section, i) => 
      i === index ? { ...section, isOpen: !section.isOpen } : section
    ));
  };

  const updateSetting = (sectionIndex: number, itemIndex: number, value: boolean | string) => {
    setSections(prev => prev.map((section, i) => 
      i === sectionIndex ? {
        ...section,
        items: section.items.map((item, j) => 
          j === itemIndex ? { ...item, value } : item
        )
      } : section
    ));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">Setting</h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-0">
            {sections.map((section, sectionIndex) => (
              <div key={section.title} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => toggleSection(sectionIndex)}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
                  style={{ backgroundColor: section.isOpen ? 'hsl(171, 60%, 55%)' : 'transparent' }}
                >
                  <span className={`font-medium ${section.isOpen ? 'text-white' : 'text-gray-900'}`}>
                    {section.title}
                  </span>
                  {section.isOpen ? (
                    <ChevronUp className={`h-4 w-4 ${section.isOpen ? 'text-white' : 'text-gray-500'}`} />
                  ) : (
                    <ChevronDown className={`h-4 w-4 ${section.isOpen ? 'text-white' : 'text-gray-500'}`} />
                  )}
                </button>
                
                {section.isOpen && (
                  <div className="px-4 py-3 bg-white space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <span className="text-gray-700">{item.label}</span>
                        
                        {item.type === 'switch' && (
                          <Switch
                            checked={item.value as boolean}
                            onCheckedChange={(checked) => updateSetting(sectionIndex, itemIndex, checked)}
                          />
                        )}
                        
                        {item.type === 'select' && (
                          <div className="flex items-center gap-2">
                            <div className="flex items-center bg-black text-white px-3 py-1 rounded text-sm font-medium">
                              EM
                            </div>
                            <Select
                              value={item.value as string}
                              onValueChange={(value) => updateSetting(sectionIndex, itemIndex, value)}
                            >
                              <SelectTrigger className="w-20">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {item.options?.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        {item.type === 'button' && (
                          <Button variant="ghost" size="icon" className="text-gray-600">
                            📄
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}