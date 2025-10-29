import { useState } from "react";
import { NoteOverlay } from "@/components/NoteOverlay";
import { Button } from "@/components/ui/button";
import { StickyNote } from "lucide-react";

const Index = () => {
  const [showNote, setShowNote] = useState(true);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground">
          Sticky Notes App
        </h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Beautiful, interactive note-taking with style
        </p>
        
        <Button
          size="lg"
          onClick={() => setShowNote(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transition-all duration-200 hover:scale-105"
        >
          <StickyNote className="mr-2 h-5 w-5" />
          Open Note
        </Button>
      </div>

      {showNote && <NoteOverlay onClose={() => setShowNote(false)} />}
    </div>
  );
};

export default Index;
