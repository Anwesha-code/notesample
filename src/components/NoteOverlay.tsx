import { useState, useRef } from "react";
import { X, Save, Pin, Type, Plus, Minus, Palette, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type NoteColor = "yellow" | "pink" | "blue" | "green" | "purple";

const NOTE_COLORS: Record<NoteColor, { bg: string; border: string; shadow: string }> = {
  yellow: {
    bg: "hsl(var(--note-yellow))",
    border: "hsl(var(--note-yellow-border))",
    shadow: "hsl(var(--note-yellow-shadow))",
  },
  pink: {
    bg: "hsl(var(--note-pink))",
    border: "hsl(var(--note-pink-border))",
    shadow: "hsl(var(--note-pink-shadow))",
  },
  blue: {
    bg: "hsl(var(--note-blue))",
    border: "hsl(var(--note-blue-border))",
    shadow: "hsl(var(--note-blue-shadow))",
  },
  green: {
    bg: "hsl(var(--note-green))",
    border: "hsl(var(--note-green-border))",
    shadow: "hsl(var(--note-green-shadow))",
  },
  purple: {
    bg: "hsl(var(--note-purple))",
    border: "hsl(var(--note-purple-border))",
    shadow: "hsl(var(--note-purple-shadow))",
  },
};

const FONTS = [
  { value: "comic-sans", label: "Comic Sans", family: "'Comic Sans MS', cursive" },
  { value: "arial", label: "Arial", family: "Arial, sans-serif" },
  { value: "times", label: "Times New Roman", family: "'Times New Roman', serif" },
  { value: "courier", label: "Courier", family: "'Courier New', monospace" },
  { value: "georgia", label: "Georgia", family: "Georgia, serif" },
];

interface NoteOverlayProps {
  onClose: () => void;
}

export const NoteOverlay = ({ onClose }: NoteOverlayProps) => {
  const [noteColor, setNoteColor] = useState<NoteColor>("yellow");
  const [fontSize, setFontSize] = useState(16);
  const [noteWidth, setNoteWidth] = useState(520);
  const [selectedFont, setSelectedFont] = useState("comic-sans");
  const [title, setTitle] = useState("Note title here");
  const [content, setContent] = useState("Start typing your note here...");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentColors = NOTE_COLORS[noteColor];
  const currentFont = FONTS.find((f) => f.value === selectedFont)?.family || FONTS[0].family;

  const handleSave = () => {
    toast.success("Note saved successfully!");
    onClose();
  };

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 2, 32));
    toast.info(`Font size: ${fontSize + 2}px`);
  };

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, 12));
    toast.info(`Font size: ${fontSize - 2}px`);
  };

  const increaseNoteSize = () => {
    setNoteWidth((prev) => Math.min(prev + 50, 800));
  };

  const decreaseNoteSize = () => {
    setNoteWidth((prev) => Math.max(prev - 50, 400));
  };

  const handleAttachImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.success(`Attached: ${file.name}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="flex rounded-[20px_8px_20px_8px] shadow-2xl transition-all duration-300 ease-out animate-in zoom-in-95"
        style={{
          width: `${noteWidth}px`,
          maxWidth: "90vw",
          backgroundColor: currentColors.bg,
          border: `2px solid ${currentColors.border}`,
          boxShadow: `6px 8px 16px ${currentColors.shadow}`,
        }}
      >
        {/* Toolbar Column */}
        <div
          className="flex flex-col items-center gap-3 rounded-l-[18px] border-r-2 p-2"
          style={{
            backgroundColor: "hsl(var(--toolbar-bg))",
            borderColor: currentColors.border,
          }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-[hsl(var(--toolbar-hover))] text-[hsl(var(--toolbar-text))] transition-all duration-200"
            onClick={handleAttachImage}
            title="Attach Image/Diagram"
          >
            <Pin className="h-4 w-4" />
          </Button>

          <Select value={selectedFont} onValueChange={setSelectedFont}>
            <SelectTrigger className="h-9 w-9 border-0 bg-transparent hover:bg-[hsl(var(--toolbar-hover))] text-[hsl(var(--toolbar-text))]">
              <Type className="h-4 w-4" />
            </SelectTrigger>
            <SelectContent>
              {FONTS.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  <span style={{ fontFamily: font.family }}>{font.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-[hsl(var(--toolbar-hover))] text-[hsl(var(--toolbar-text))] transition-all duration-200"
            onClick={increaseFontSize}
            title="Increase Font Size"
          >
            <Plus className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-[hsl(var(--toolbar-hover))] text-[hsl(var(--toolbar-text))] transition-all duration-200"
            onClick={decreaseFontSize}
            title="Decrease Font Size"
          >
            <Minus className="h-4 w-4" />
          </Button>

          <div className="my-1 h-px w-6 bg-[hsl(var(--toolbar-text))]/20" />

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-[hsl(var(--toolbar-hover))] text-[hsl(var(--toolbar-text))] transition-all duration-200"
            onClick={increaseNoteSize}
            title="Increase Note Width"
          >
            <div className="flex items-center gap-0.5">
              <div className="h-3 w-0.5 bg-current" />
              <Plus className="h-3 w-3" />
              <div className="h-3 w-0.5 bg-current" />
            </div>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 hover:bg-[hsl(var(--toolbar-hover))] text-[hsl(var(--toolbar-text))] transition-all duration-200"
            onClick={decreaseNoteSize}
            title="Decrease Note Width"
          >
            <div className="flex items-center gap-0.5">
              <div className="h-3 w-0.5 bg-current" />
              <Minus className="h-3 w-3" />
              <div className="h-3 w-0.5 bg-current" />
            </div>
          </Button>

          <div className="my-1 h-px w-6 bg-[hsl(var(--toolbar-text))]/20" />

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 hover:bg-[hsl(var(--toolbar-hover))] text-[hsl(var(--toolbar-text))] transition-all duration-200"
                title="Change Note Color"
              >
                <Palette className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-3" side="right">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Note Color</p>
                <div className="flex gap-2">
                  {(Object.keys(NOTE_COLORS) as NoteColor[]).map((color) => (
                    <button
                      key={color}
                      className="h-8 w-8 rounded-full border-2 transition-all duration-200 hover:scale-110"
                      style={{
                        backgroundColor: NOTE_COLORS[color].bg,
                        borderColor: noteColor === color ? NOTE_COLORS[color].shadow : NOTE_COLORS[color].border,
                        borderWidth: noteColor === color ? "3px" : "2px",
                      }}
                      onClick={() => {
                        setNoteColor(color);
                        toast.info(`Color changed to ${color}`);
                      }}
                      title={color.charAt(0).toUpperCase() + color.slice(1)}
                    />
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Note Content */}
        <div className="flex flex-1 flex-col p-6 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-8 w-8 text-[hsl(var(--toolbar-text))] hover:bg-[hsl(var(--toolbar-hover))] rounded-full"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4 border-none bg-transparent text-2xl font-black text-[hsl(var(--toolbar-text))] outline-none placeholder:text-[hsl(var(--toolbar-text))]/40"
            style={{ fontFamily: currentFont, textShadow: `1px 1px ${currentColors.border}` }}
            placeholder="Note title here"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[200px] flex-1 resize-none border-none bg-transparent text-[hsl(var(--toolbar-text))] outline-none placeholder:text-[hsl(var(--toolbar-text))]/40"
            style={{ fontFamily: currentFont, fontSize: `${fontSize}px`, lineHeight: "1.6" }}
            placeholder="Start typing your note here..."
          />

          <div className="mt-6 flex justify-end">
            <Button
              onClick={handleSave}
              className="rounded-full px-6 font-bold shadow-lg transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: currentColors.border,
                color: "hsl(var(--toolbar-text))",
              }}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Note
            </Button>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};
