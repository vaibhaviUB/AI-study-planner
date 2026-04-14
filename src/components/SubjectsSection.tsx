import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Subject = {
  id: string;
  name: string;
  notes?: string;
};

const STORAGE_KEY = "ai_study_planner_subjects";

const genId = () => `${Date.now()}-${Math.random().toString(36).slice(2,9)}`;

const SubjectsSection: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSubjects(JSON.parse(raw));
    } catch (e) {
      console.warn("Failed to load subjects", e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
  }, [subjects]);

  const resetForm = () => {
    setName("");
    setNotes("");
    setEditingId(null);
  };

  const handleAdd = () => {
    if (!name.trim()) return;
    if (editingId) {
      setSubjects((s) => s.map((sub) => (sub.id === editingId ? { ...sub, name: name.trim(), notes } : sub)));
    } else {
      const sub: Subject = { id: genId(), name: name.trim(), notes };
      setSubjects((s) => [sub, ...s]);
    }
    resetForm();
  };

  const handleEdit = (id: string) => {
    const sub = subjects.find((s) => s.id === id);
    if (!sub) return;
    setEditingId(id);
    setName(sub.name);
    setNotes(sub.notes || "");
  };

  const handleDelete = (id: string) => {
    // lightweight confirmation
    // eslint-disable-next-line no-restricted-globals
    if (!confirm("Delete this subject?")) return;
    setSubjects((s) => s.filter((x) => x.id !== id));
    if (editingId === id) resetForm();
  };

  return (
    <Card className="bg-[#0a0a0a] border-white/10">
      <CardHeader className="border-b border-white/5 p-4">
        <CardTitle className="text-white text-lg">Subjects</CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="flex gap-2">
          <Input placeholder="Subject name" value={name} onChange={(e) => setName((e.target as HTMLInputElement).value)} />
          <Input placeholder="Short notes (optional)" value={notes} onChange={(e) => setNotes((e.target as HTMLInputElement).value)} />
          <Button onClick={handleAdd} className="whitespace-nowrap">{editingId ? "Save" : "Add"}</Button>
        </div>

        <div className="space-y-2 max-h-64 overflow-auto">
          {subjects.length === 0 && <div className="text-slate-500 text-sm">No subjects yet. Add one above.</div>}
          {subjects.map((sub) => (
            <div key={sub.id} className="flex items-center justify-between gap-3 p-3 bg-white/2 rounded-md border border-white/5">
              <div>
                <div className="font-semibold text-white">{sub.name}</div>
                {sub.notes && <div className="text-slate-400 text-sm">{sub.notes}</div>}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => handleEdit(sub.id)}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(sub.id)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectsSection;
