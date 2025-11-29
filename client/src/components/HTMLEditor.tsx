import { Textarea } from "@/components/ui/textarea";

interface HTMLEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function HTMLEditor({ value, onChange, placeholder = "Enter content..." }: HTMLEditorProps) {
  return (
    <div className="space-y-2">
      <Textarea 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={12}
        className="font-mono text-sm"
      />
      <p className="text-xs text-muted-foreground">
        📝 Tip: Use HTML tags like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, etc. for formatting
      </p>
    </div>
  );
}
